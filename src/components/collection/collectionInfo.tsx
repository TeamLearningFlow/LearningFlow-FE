import React, { useEffect, useState, useParams } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Image from 'next/image';
import tmpIMG from '../../assets/collection-clock.png';
import collectionInfoIMG from '../../assets/CollectionInfo.png';
import yesBookMarked from '../../assets/yesBookMarked.svg';
import noBookMarked from '../../assets/noBookMarked.svg';
import NaverblogIcon from '../../assets/platformicon/naverblog_nostroke_ic.svg';
import TistoryIcon from '../../assets/platformicon/tistory_nostroke_ic.svg';
import VelogIcon from '../../assets/platformicon/velog_nostroke_ic.svg';
import YoutubeIcon from '../../assets/platformicon/youtube_nostroke_ic.svg';
import line from '../../assets/Line.svg';
import dot from '../../assets/dot.svg';
import plane from '../../assets/Airplane.svg';
import { CgPathCrop } from 'react-icons/cg';

interface CollectionData {
  id: number;
  interestField: string;
  title: string;
  creator: string;
  keywords: string[];
  difficulties: number[];
  amount: number;
  runtime: number;
  textCount: number;
  videoCount: number;
  resource: {
    episodeName: string;
    url: string;
    resourceSource: string;
    episodeNumber: number;
  }[];
  bookmarkCount: number;
  bookmarked: boolean;
}

interface CollectionInfoProps {
  data: CollectionData;
  collectionId: number;
}

const interestFieldMap: Record<string, string> = {
  APP_DEVELOPMENT: '앱개발',
  WEB_DEVELOPMENT: '웹개발',
  PROGRAMMING_LANGUAGE: '컴퓨터언어',
  DEEP_LEARNING: '딥러닝',
  STATISTICS: '통계',
  DATA_ANALYSIS: '데이터분석',
  UI_UX: 'UX/UI',
  PLANNING: '기획',
  BUSINESS_PRODUCTIVITY: '업무생산성',
  FOREIGN_LANGUAGE: '외국어',
  CAREER: '취업',
};

const imageSources = [
  { src: YoutubeIcon, alt: 'youtube', show: false },
  { src: TistoryIcon, alt: 'tistory', show: false },
  { src: NaverblogIcon, alt: 'blog', show: false },
  { src: VelogIcon, alt: 'velog', show: false },
];

const CollectionInfo: React.FC<CollectionInfoProps> = ({
  data,
  collectionId,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isBookMarked, setIsBookMarked] = useState<boolean>(false);
  const [departureLabel, setDepartureLabel] = useState('');
  const [arrivalLabel, setArrivalLabel] = useState('');

  // resourceSource 값들을 배열로 추출
  const resourceSources = data.resource.map((item) => item.resourceSource);

  // 조건에 따라 show 값 업데이트
  const updatedImages = imageSources.map((image) => {
    if (image.alt === 'youtube') {
      return { ...image, show: resourceSources.includes('youtube') };
    }
    if (image.alt === 'velog') {
      return { ...image, show: resourceSources.includes('velog') };
    }
    if (image.alt === 'tistory') {
      return { ...image, show: resourceSources.includes('tistory') };
    }
    if (image.alt === 'blog') {
      return { ...image, show: resourceSources.includes('naverBlog') };
    }
    return image;
  });

  const availableImages = updatedImages.filter((image) => image.show); // show==true 이미지들만 필터링

  const fetchBookmarkStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await axios.get(
        `http://onboarding.p-e.kr:8080/collections/${collectionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Refresh-Token': `${token}`,
          },
        },
      );

      if (response.status === 200) {
        const bookmarkedStatus = response.data?.result?.bookmarked ?? false;
        setIsBookMarked(bookmarkedStatus); // 서버 값 반영 + undefined 방지
        localStorage.setItem(
          `bookmark_${collectionId}`,
          JSON.stringify(bookmarkedStatus), // 서버에서 받은 값 반영
        );
      }
    } catch (err: any) {
      console.error(
        '북마크 상태 가져오기 오류:',
        err.response?.data || err.message,
      );
    }
  };

  const handleBookMarked = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('로그인이 필요합니다.');
      console.log('토큰이 없습니다.');
      return;
    }

    try {
      const response = await axios.post(
        `http://onboarding.p-e.kr:8080/collections/${collectionId}/likes`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Refresh-Token': `${token}`,
          },
        },
      );

      console.log('북마크 상태 응답:', response.data);

      if (response.status === 200) {
        // 상태 업데이트 전에 반영될 값을 localStorage에 저장
        const newBookmarkStatus = !isBookMarked;
        setIsBookMarked(newBookmarkStatus);
        console.log('isBookMarked: ', newBookmarkStatus); // 최신 상태
        localStorage.setItem(
          `bookmark_${collectionId}`,
          JSON.stringify(newBookmarkStatus), // 반영된 상태로 저장
        );
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        alert('로그인이 필요합니다.');
        console.log('로그인 필요');
      } else {
        console.log('Error: ', err.response?.data || err.message);
        if (err.response?.data?.message) {
          console.log('Error Message:', err.response.data.message);
        } else {
          console.log('북마크 오류 발생');
        }
      }
    }
  };

  // 컴포넌트가 마운트될 때 북마크 상태 로컬 스토리지에서 불러오기
  useEffect(() => {
    const storedBookmarkStatus = localStorage.getItem(
      `bookmark_${collectionId}`,
    );
    if (storedBookmarkStatus) {
      setIsBookMarked(JSON.parse(storedBookmarkStatus));
    } else {
      fetchBookmarkStatus(); // 서버에서 가져오기 (최초 로딩 시)
    }
  }, []);

  const setDifficultyLabel = () => {
    const equals = (a: number[], b: number[]) =>
      a.length === b.length && a.every((v, i) => v === b[i]);

    const level = data.difficulties.sort();

    if (equals(level, [1])) {
      setDepartureLabel('입문자');
      setArrivalLabel('초급자');
      return;
    }
    if (equals(level, [2])) {
      setDepartureLabel('초급자');
      setArrivalLabel('중급자');
      return;
    }
    if (equals(level, [3])) {
      setDepartureLabel('중급자');
      setArrivalLabel('마스터');
      return;
    }
    if (equals(level, [1, 2])) {
      setDepartureLabel('입문·초급자');
      setArrivalLabel('중급자');
      return;
    }
    if (equals(level, [2, 3])) {
      setDepartureLabel('초급·중급자');
      setArrivalLabel('마스터');
      return;
    }
    if (equals(level, [1, 2, 3])) {
      setDepartureLabel('입문·초급·중급자');
      setArrivalLabel('마스터');
      return;
    }
  };

  useEffect(() => {
    setDifficultyLabel();
  }, []);

  // 줄바꿈을 <br /> 태그로 변환하는 함수
  const renderTitleWithLineBreaks = (title: string) => {
    return title.split('\n').map((item, index) => (
      <React.Fragment key={index}>
        {item}
        {index < title.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  useEffect(() => {
    console.log('collectionId: ', collectionId);
  }, [collectionId]);

  return (
    <CollectionInfoWrapper>
      <CollectionTicket>
        <CollectionLeftIMGBox
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <CollectionLeftIMG src={tmpIMG} alt="컬렉션 이미지" height={252} />
          <HoverColletionLeftIMG isHovered={isHovered}></HoverColletionLeftIMG>
          <BookMarkedBox onClick={handleBookMarked}>
            <BookMarkedIMG
              src={isBookMarked ? yesBookMarked : noBookMarked}
              alt={isBookMarked ? '북마크됨' : '북마크 안 됨'}
              isHovered={isHovered}
              width={30}
              height={30}
            />
          </BookMarkedBox>
        </CollectionLeftIMGBox>
        <CollectionRightIMGBox>
          <CollectionRightIMG
            src={collectionInfoIMG}
            alt="컬렉션 이미지"
            height={252}
          />
        </CollectionRightIMGBox>
        <CollectionUpperDescription>
          <KeywordBox>
            <Interest interestField={data.interestField}>
              {interestFieldMap[data.interestField]}
            </Interest>
            {data.keywords[0] && <Keyword>{data.keywords[0]}</Keyword>}
            {data.keywords[1] && <Keyword>{data.keywords[1]}</Keyword>}
            {data.keywords[2] && <Keyword>{data.keywords[2]}</Keyword>}
            {data.keywords[3] && <Keyword>{data.keywords[3]}</Keyword>}
            {data.keywords[4] && <Keyword>{data.keywords[4]}</Keyword>}
          </KeywordBox>
          <TypeImgBox>
            <TypeImgList>
              {availableImages.map((image, index) => (
                <TypeImg
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  index={index}
                  totalImages={availableImages.length}
                  width={35}
                  height={35}
                />
              ))}
              {/* <TypeImg src={YoutubeIcon} alt="youtube" index={0} />
              <TypeImg src={TistoryIcon} alt="tistory" index={1} />
              <TypeImg src={NaverblogIcon} alt="blog" index={2} />
              <TypeImg src={VelogIcon} alt="velog" index={3} /> */}
            </TypeImgList>
            <LineNDot>
              <TypeImgToArticleLine src={line} alt="------" width={50} />
              <TypeImgToArticleDot src={dot} alt="O" />
            </LineNDot>
            <ArticleNVideo>
              <ArticleLetter>아티클</ArticleLetter>
              <ArticleNumber>{data.textCount}</ArticleNumber>
              <VideoLetter>영상</VideoLetter>
              <VideoNumber>{data.videoCount}</VideoNumber>
            </ArticleNVideo>
          </TypeImgBox>
          <Title>{renderTitleWithLineBreaks(data.title)}</Title>
          <Author>{data.creator}</Author>
        </CollectionUpperDescription>
        <Departure>
          <DepartureLeft>
            <DepartureLetter>Departure</DepartureLetter>
            <DepartureLevel>{departureLabel || '알 수 없음'}</DepartureLevel>
          </DepartureLeft>
          <DepartureCenter>
            <DepartureToArrivalLetter>
              {data.runtime}시간
            </DepartureToArrivalLetter>
            <Hr />
            <PlaneImg src={plane} alt="비행기" />
            <Hr />
          </DepartureCenter>
          <DepartureRight>
            <ArrivalLetter>Arrival</ArrivalLetter>
            <ArrivalLevel>{arrivalLabel || '알 수 없음'}</ArrivalLevel>
          </DepartureRight>
        </Departure>
      </CollectionTicket>
    </CollectionInfoWrapper>
  );
};

export default CollectionInfo;

const CollectionInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  // justify-content: center;
  padding-top: 20px;

  text-overflow: ellipsis;
  overflow: hidden;
`;

const CollectionTicket = styled.div`
  display: flex;
  position: relative;

  align-items: center;
  width: 80vw;
  // height: 280px;
  margin: 2% 9% 1% 9.5%;
  justify-content: center;

  white-space: nowrap;

  @media (max-width: 850px) {
    width: 82vw;
    height: 150px;
  }

  @media (max-width: 560px) {
    width: 84vw;
    height: 80px;
  }
`;

const CollectionLeftIMGBox = styled.div`
  display: flex;
  padding-left: 1%;
  width: 30%;
`;

const CollectionLeftIMG = styled(Image)`
  display: flex;
  // width: 26.3vw;
  width: 100%;
  border-radius: 20px;

  @media (max-width: 850px) {
    height: 150px;
  }
  @media (max-width: 560px) {
    height: 80px;
  }
`;

const HoverColletionLeftIMG = styled.div<{ isHovered: boolean }>`
  dsiplay: flex;
  position: absolute;
  width: 29.02%;
  height: 99.1%;
  border-radius: 20px;

  background-color: ${({ isHovered }) =>
    isHovered ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0,0,0,0)'};
  z-index: 100;
`;

const BookMarkedBox = styled.div`
  // position: absolute;

  margin-left: -3.5vw;
  margin-top: 17px;

  z-index: 2000;

  @media (max-width: 1160px) {
    margin-left: -4vw;
  }

  @media (max-width: 960px) {
    margin-left: -5vw;
  }

  @media (max-width: 560px) {
    // margin-left:
  }
`;

const BookMarkedIMG = styled(Image)<{ isHovered: boolean }>`
  cursor: pointer;
  z-index: 2000;

  opacity: ${(props) => (props.isHovered ? 1 : 0)};
  visibility: ${(props) => (props.isHovered ? 'visible' : 'hidden')};

  @media (max-width: 960px) {
    width: 30px;
    height: 30px;
  }

  @media (max-width: 560px) {
    // width:
    // height:
  }
`;

const CollectionRightIMGBox = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
`;

const CollectionRightIMG = styled(Image)`
  display: flex;

  // width: 54vw;
  width: 100%;
  border-radius: 20px;

  @media (max-width: 850px) {
    height: 150px;
  }

  @media (max-width: 560px) {
    height: 80px;
  }
`;

const CollectionUpperDescription = styled.div`
  display: flex;
  position: absolute;
  margin-top: -60px;
  margin-left: 22vw;

  @media (max-width: 850px) {
    margin-top: -30px;
  }

  @media (max-width: 560px) {
    margin-top: -17px;
  }
`;

const KeywordBox = styled.div`
  position: absolute;

  margin-left: 25px;
  // margin-top: 20px;

  @media (max-width: 850px) {
    margin-left: 14px;
  }

  @media (max-width: 560px) {
    margin-left: 7px;
  }
`;

const Interest = styled.div<{ interestField: string }>`
  width: 150px;
  display: inline;
  padding: 7.339px 18.349px;
  margin-right: 10px;

  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  line-height: 23.996px;

  background-color: ${({ interestField }) => {
    switch (interestField) {
      case 'APP_DEVELOPMENT':
        return '#E5F6FE';
      case 'WEB_DEVELOPMENT':
        return '#EAF2FE';
      case 'PROGRAMMING_LANGUAGE':
        return '#DEFAFF';
      case 'DEEP_LEARNING':
        return '#FEECEC';
      case 'STATISTICS':
        return '#FDE8F0';
      case 'DATA_ANALYSIS':
        return '#FEEEE5';
      case 'UI_UX':
        return '#F5F5FF';
      case 'PLANNING':
        return '#FFF5D6';
      case 'BUSINESS_PRODUCTIVITY':
        return '#E3FFF7';
      case 'FOREIGN_LANGUAGE':
        return '#F9EDFF';
      case 'CAREER':
        return '#F2FFF6';
      default:
        return 'gray';
    }
  }};
  color: ${({ interestField }) => {
    switch (interestField) {
      case 'APP_DEVELOPMENT':
        return '#00AEFF';
      case 'WEB_DEVELOPMENT':
        return '#0066FF';
      case 'PROGRAMMING_LANGUAGE':
        return '#00BDDE';
      case 'DEEP_LEARNING':
        return '#FF4242';
      case 'STATISTICS':
        return '#F04588';
      case 'DATA_ANALYSIS':
        return '#FF5E00';
      case 'UI_UX':
        return '#5E52FF';
      case 'PLANNING':
        return '#FFAA00';
      case 'BUSINESS_PRODUCTIVITY':
        return '#12C79A';
      case 'FOREIGN_LANGUAGE':
        return '#CB59FF';
      case 'CAREER':
        return '#00BF40';
      default:
        return 'gray';
    }
  }};

  @media (max-width: 850px) {
    width: 120px;
    font-size: 8px;
    padding: 3px 8px;
    margin-right: 5px;
  }

  @media (max-width: 560px) {
    width: 80px;
    font-size: 5px;
    padding: 2px 5px;
    margin-right: 3px;
  }
`;

const Keyword = styled.span`
  width: 150px;
  display: inline;
  padding: 7.339px 18.349px;
  margin-right: 10px;

  border-radius: 6px;
  background-color: #f5f5f5;
  color: #4f5357;
  font-size: 14px;
  font-weight: 600;
  line-height: 23.996px;

  @media (max-width: 850px) {
    width: 120px;
    font-size: 8px;
    padding: 3px 8px;
    margin-right: 5px;
  }

  @media (max-width: 560px) {
    width: 80px;
    font-size: 5px;
    padding: 2px 5px;
    margin-right: 3px;
  }
`;

const Title = styled.div`
  position: absolute;
  font-size: 23px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: -0.48px;

  margin-top: 45px;
  margin-left: 25px;
  width: 327.273px;

  whitespace: pre-line;
  display: flex;
  flex-direction: column;

  @media (max-width: 850px) {
    font-size: 16px;
    line-height: 21px;
    margin-top: 32px;
    margin-left: 14px;
  }

  @media (max-width: 560px) {
    font-size: 9px;
    line-height: 13px;
    margin-top: 25px;
    margin-left: 7px;
  }
`;

const Author = styled.div`
  position: absolute;
  color: #7c8389;
  font-size: 16px;
  font-weight: 600;

  margin-left: 25px;
  margin-top: 120px;
  width: 327.273px;

  @media (max-width: 850px) {
    font-size: 11px;
    margin-top: 75px;
    margin-left: 14px;
  }

  @media (max-width: 560px) {
    font-size: 6px;
    margin-top: 52px;
    margin-left: 7px;
  }
`;

const TypeImgBox = styled.div`
  display: flex;
  // position: absolute;
  margin-top: 110px;

  // margin-left: 425px;
  // width: 300px;
  // width: 30%;
  height: 40px;
  width: 54vw;
  padding-left: 30vw;
  // padding-right: 30px;

  @media (max-width: 850px) {
    margin-top: 66px;
  }

  @media (max-width: 560px) {
    margin-top: 36px;
  }
`;

const TypeImgList = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const TypeImg = styled(Image)<{ index: number; totalImages: number }>`
  position: absolute;
  left: ${({ index }) => index * 25}px; /* 이미지의 기본 위치 조정 (겹침 효과)

  border-radius: 50%;
  z-index: ${({ index }) => 100 - index};

  // width: 25.185px;
  // height: 25.185px;

  // margin-left: 30vw;

  @media (max-width: 850px) {
    width: 20px;
    height: 20px;

    left: ${({ index }) => index * 15}px;
  }

  @media (max-width: 560px) {
    width: 10px;
    height: 10px;

    left: ${({ index }) => index * 5}px;
  }
`;

const LineNDot = styled.div`
  display: flex;
  // position: absolute;
  // flex: 1;
  margin-left: 10vw;
  align-items: center;

  // justify-content: center;

  @media (max-width: 560px) {
    margin-left: 9vw;
  }
`;

const TypeImgToArticleLine = styled(Image)`
  position: absolute;
  display: flex;

  @media (max-width: 850px) {
    width: 20px;
  }

 @media (max-width: 560px) {
    width: 10px;
`;

const TypeImgToArticleDot = styled(Image)`
  position: absolute;
  display: flex;
  margin-left: 47px;

  @media (max-width: 850px) {
    margin-left: 18px;
    height: 3px;
  }

  @media (max-width: 560px) {
    margin-left: 9px;
    height: 1px;
    margin-bottom: 0.4px;
  }
`;

const ArticleNVideo = styled.div`
  // position: absolute;
  display: flex;
  align-items: center;
  // margin-left: 100px;
  margin-left: 5.5vw;

  padding-bottom: 1px;

  @media (max-width: 850px) {
    margin-left: 4vw;
  }
`;

const ArticleLetter = styled.span`
  margin-right: 4px;

  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: -0.24px;

  @media (max-width: 850px) {
    font-size: 8px;
    margin-left: 5px;
    margin-right: 2px;
  }

  @media (max-width: 560px) {
    font-size: 4px;
    // margin-left: 5px;
    margin-right: 1px;
  }
`;

const ArticleNumber = styled.span`
  display: flex;
  width: 15px;
  height: 15px;

  align-items: center;
  justify-content: center;
  padding: 1.939px;

  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: -0.24px;
  font-weight: 500;
  color: #5e52ff;
  background-color: #f5f5ff;
  border-radius: 50px;

  @media (max-width: 850px) {
    font-size: 8px;
    width: 7px;
    height: 7px;
    // padding: 0.5px;
  }

  @media (max-width: 560px) {
    font-size: 4px;
    width: 3px;
    height: 3px;
  }
`;

const VideoLetter = styled.span`
  margin-left: 7px;
  margin-right: 4px;

  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: -0.24px;

  @media (max-width: 850px) {
    font-size: 8px;
    margin-left: 5px;
    margin-right: 2px;
  }

  @media (max-width: 560px) {
    font-size: 4px;
    margin-left: 2px;
    margin-right: 1px;
  }
`;

const VideoNumber = styled.span`
  display: flex;
  width: 15px;
  height: 15px;

  align-items: center;
  justify-content: center;
  padding: 1.939px;

  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: -0.24px;
  font-weight: 500;
  color: #5e52ff;
  background-color: #f5f5ff;
  border-radius: 50px;

  @media (max-width: 850px) {
    font-size: 8px;
    width: 7px;
    height: 7px;
    // padding: 0.5px;
  }

  @media (max-width: 560px) {
    font-size: 4px;
    width: 3px;
    height: 3px;
  }
`;

const Departure = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  margin-top: 184px;
  margin-left: -54vw;
  padding: 16px 100px;
  width: 54vw;
  height: 69px;

  @media (max-width: 850px) {
    margin-top: 107px;
    padding: 10px 30px;
    width: 55vw;
    height: 35px;

    padding-right: 45px;
  }

  @media (max-width: 560px) {
    margin-top: 60px;
    width: 55vw;
    height: 8px;
  }
`;

const DepartureLeft = styled.span`
  text-align: left;
  margin-right: 1vw;
`;

const DepartureLetter = styled.div`
  color: #64696e;

  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: -0.24px;

  margin-bottom: 1px;

  @media (max-width: 850px) {
    font-size: 8px;
    line-height: 10px;
  }

  @media (max-width: 560px) {
    font-size: 4px;
    line-height: 5px;
  }
`;

const DepartureLevel = styled.div`
  color: #4f5357;

  font-size: 16px;
  font-weight: 700;
  line-height: 24px;

  @media (max-width: 850px) {
    font-size: 11px;
    line-height: 18px;
  }

  @media (max-width: 560px) {
    font-size: 6px;
    line-height: 10px;
  }
`;

const DepartureCenter = styled.span`
  display: flex;
  width: 54vw;
  align-items: center;
  justify-content: center;
  margin-top: 22px;

  @media (max-width: 850px) {
    margin-top: 11px;
  }

  @media (max-width: 560px) {
    margin-top: 5px;
  }
`;

const DepartureToArrivalLetter = styled.div`
  color: #5e52ff;

  position: absolute;
  top: 205px;

  font-size: 11px;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: -0.24px;

  @media (max-width: 850px) {
    font-size: 6px;
    top: 115px;
  }

  @media (max-width: 560px) {
    font-size: 3.5px;
    top: 56.5px;
  }
`;

const Hr = styled.hr`
  height: 0.5px;
  flex: 1; /* 남은 공간을 채움 */
  border: none;
  background-color: #5e52ff;

  @media (max-width: 850px) {
    height: 0.3px;
  }

  @media (max-width: 560px) {
    height: 0.1px;
  }
`;

const PlaneImg = styled(Image)`
  margin-left: 10px;
  margin-right: 10px;

  @media (max-width: 850px) {
    width: 12px;
    height: 12px;
    margin-bottom: 1px;
  }

  @media (max-width: 560px) {
    width: 6px;
    height: 6px;
    margin-left: 3px;
    margin-right: 3px;
    margin-top: 0.5px;
  }
`;

const DepartureRight = styled.span`
  text-align: left;
  margin-left: 1vw;
`;

const ArrivalLetter = styled.div`
  color: #64696e;

  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: -0.24px;

  margin-bottom: 1px;

  @media (max-width: 850px) {
    font-size: 8px;
    line-height: 10px;
  }

  @media (max-width: 560px) {
    font-size: 4px;
    line-height: 5px;
  }
`;

const ArrivalLevel = styled.div`
  color: #4f5357;

  font-size: 16px;
  font-weight: 700;
  line-height: 24px;

  @media (max-width: 850px) {
    font-size: 11px;
    line-height: 18px;
  }

  @media (max-width: 560px) {
    font-size: 6px;
    line-height: 10px;
  }
`;
