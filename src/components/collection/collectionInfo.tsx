import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Image from 'next/image';
import collectionInfoIMG from '/public/CollectionInfo.png';
import yesBookMarked from '/public/yesBookMarked.svg';
import noBookMarked from '/public/noBookMarked.svg';
import NaverblogIcon from '/public/platformicon/naverblog_nostroke_ic.svg';
import TistoryIcon from '/public/platformicon/tistory_nostroke_ic.svg';
import VelogIcon from '/public/platformicon/velog_nostroke_ic.svg';
import YoutubeIcon from '/public/platformicon/youtube_nostroke_ic.svg';
import line from '/public/Line.svg';
import dot from '/public/dot.svg';
import plane from '/public/Airplane.svg';
// import { CgPathCrop } from 'react-icons/cg';

interface CollectionData {
  collectionId: number;
  imageUrl: string;
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
    episodeId: number;
    episodeName: string;
    url: string;
    resourceSource: string;
    episodeNumber: number;
    today: boolean;
    progress: number; // 테스트용
  }[];
  likesCount: number;
  progressRatePercentage: number;
  progressRatio: string;
  learningStatus: 'BEFORE' | 'IN_PROGRESS' | 'COMPLETED';
  startDate: string;
  completedDate: string;
  liked: boolean;
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
  const [articleCount, setArticleCount] = useState<boolean>(false);
  const [videoCount, setVideoCount] = useState<boolean>(false);

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
        `https://onboarding.p-e.kr/collections/${collectionId}`,
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
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('북마크 상태 가져오기 오류:', err.message);
      } else {
        console.error('북마크 상태 가져오기 오류:', err);
      }
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
        `https://onboarding.p-e.kr/collections/${collectionId}/likes`,
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
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
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
      } else if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log(err);
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
    if (data.textCount === 0) {
      setArticleCount(false);
    } else {
      setArticleCount(true);
    }
    if (data.videoCount === 0) {
      setVideoCount(false);
    } else {
      setVideoCount(true);
    }
  }, [collectionId]);

  return (
    <CollectionInfoWrapper>
      <CollectionTicket>
        <CollectionLeftIMGBox
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <CollectionLeftIMG
            src={data.imageUrl}
            alt="컬렉션 이미지"
            height={252}
            width={252}
          />
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
            <TypeImgBoxWrapper>
              <TypeImgList>
                {availableImages.map((image, index) => (
                  <TypeImgWrapper
                    key={image.alt}
                    index={index}
                    totalImages={availableImages.length}
                  >
                    <TypeImg src={image.src} alt={image.alt} />
                  </TypeImgWrapper>
                ))}
              </TypeImgList>
              <LineNDotWrapper numImages={availableImages.length}>
                <LineNDot>
                  <LineWrapper>
                    <TypeImgToArticleLine
                      src={line}
                      alt="------"
                      numImages={availableImages.length}
                      articleCount={articleCount}
                      videoCount={videoCount}
                      layout="responsive"
                    />
                  </LineWrapper>
                  <TypeImgToArticleDot src={dot} alt="O" />
                </LineNDot>
              </LineNDotWrapper>
              <ArticleNVideo>
                {data.textCount !== 0 && (
                  <>
                    <ArticleLetter>아티클</ArticleLetter>
                    <ArticleNumber>{data.textCount}</ArticleNumber>
                  </>
                )}
                {data.videoCount !== 0 && (
                  <>
                    <VideoLetter>영상</VideoLetter>
                    <VideoNumber>{data.videoCount}</VideoNumber>
                  </>
                )}
              </ArticleNVideo>
            </TypeImgBoxWrapper>
          </TypeImgBox>
          <TitleWrapper>
            <Title>{renderTitleWithLineBreaks(data.title)}</Title>
            {/* <Title>
              두줄 두줄 <br /> 제목제목제목제목
            </Title> */}
          </TitleWrapper>
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
    border-radius: 10px;
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

  @media (max-width: 850px) {
    height: 150px;
  }

  @media (max-width: 560px) {
    border-radius: 10px;
    height: 80px;
  }
`;

const BookMarkedBox = styled.div`
  // position: absolute;

  margin-left: -16%;
  margin-top: 22px;

  z-index: 2000;

  @media (max-width: 1160px) {
    margin-left: -18%;
  }

  @media (max-width: 960px) {
    margin-top: 13px;
  }

  @media (max-width: 850px) {
    margin-left: -17%;
    margin-top: 11px;
  }

  @media (max-width: 560px) {
    margin-left: -15%;
    margin-top: -4px;
  }

  @media (max-width: 340px) {
    margin-left: -17%;
    // margin-top:
  }
`;

const BookMarkedIMG = styled(Image)<{ isHovered: boolean }>`
  cursor: pointer;
  z-index: 2000;

  opacity: ${(props) => (props.isHovered ? 1 : 0)};
  visibility: ${(props) => (props.isHovered ? 'visible' : 'hidden')};

  @media (max-width: 960px) {
    width: 25px;
    height: 25px;
  }

  @media (max-width: 850px) {
    width: 19px;
    height: 19px;
  }

  @media (max-width: 560px) {
    width: 10px;
    height: 10px;
  }

  @media (max-width: 400px) {
    width: 8px;
    height: 8px;
  }
`;

const CollectionRightIMGBox = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
`;

const CollectionRightIMG = styled(Image)`
  display: flex;

  width: 100%;
  border-radius: 20px;

  @media (max-width: 850px) {
    height: 150px;
  }

  @media (max-width: 560px) {
    height: 80px;
    border-radius: 10px;
  }
`;

const CollectionUpperDescription = styled.div`
  display: flex;
  position: absolute;
  margin-top: -60px;
  margin-left: 22vw;

  @media (max-width: 850px) {
    margin-top: -30px;
    margin-left: 21vw;
  }

  @media (max-width: 560px) {
    margin-top: -17px;
  }
`;

const KeywordBox = styled.div`
  position: absolute;

  margin-left: 25px;
  margin-top: 5px;
  // margin-top: 20px;

  @media (max-width: 850px) {
    margin-top: 0px;
    margin-left: 14px;
  }

  @media (max-width: 560px) {
    margin-top: 1px;
    margin-left: 9px;
  }
`;

const Interest = styled.div<{ interestField: string }>`
  width: 150px;
  display: inline;
  // padding: 1.4% 3.3%;
  padding: 6px 12px;
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
    width: 90px;
    font-size: 8px;
    line-height: 10px;
    padding: 3px 6px;
    margin-right: 3px;

    border-radius: 3px;
  }

  @media (max-width: 560px) {
    width: 80px;
    font-size: 5px;
    padding: 2px 5px;
    margin-right: 3px;
    border-radius: 3px;
  }
`;

const Keyword = styled.span`
  width: 150px;
  display: inline;
  // padding: 1.4% 3.5%;
  padding: 6px 12px;
  margin-right: 10px;

  border-radius: 6px;
  background-color: #f5f5f5;
  color: #4f5357;
  font-size: 14px;
  font-weight: 600;
  line-height: 23.996px;

  @media (max-width: 850px) {
    width: 90px;
    font-size: 8px;
    line-height: 10px;
    padding: 3px 6px;
    margin-right: 3px;

    border-radius: 3px;
  }

  @media (max-width: 560px) {
    width: 80px;
    font-size: 5px;
    padding: 2px 5px;
    margin-right: 3px;
    border-radius: 3px;
  }
`;

const TitleWrapper = styled.div`
  position: absolute;
  height: 90px;

  align-items: center;

  // margin-top: 20px;
  margin-top: 30px;
  margin-left: 25px;
  width: 327.273px;

  @media (max-width: 850px) {
    height: 50px;
    width: 250px;
    margin-top: 0px;
    margin-left: 14px;
  }

  @media (max-width: 560px) {
    height: 30px;
    width: 200px;
    margin-top: -10px;
    margin-left: 10px;
  }
`;

const Title = styled.div`
  position: absolute;
  font-size: 23px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: -0.48px;

  // width: 327.273px;

  whitespace: pre-line;
  display: flex;
  flex-direction: column;

  // height: 90px;
  height: 82px;
  margin-top: 7px;
  justify-content: center;

  @media (max-width: 850px) {
    font-size: 16px;
    line-height: 21px;
  }

  @media (max-width: 560px) {
    font-size: 9px;
    line-height: 13px;
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
    margin-left: 10px;
  }
`;

const TypeImgBox = styled.div`
  display: flex;
  margin-top: 110px;

  height: 40px;
  width: 54vw;

  padding-left: 33vw;

  @media (max-width: 1150px) {
    padding-left: 30vw;
    width: 53vw;
  }

  border: 1px solid red;

  @media (max-width: 850px) {
    margin-top: 66px;
    width: 52vw;
    padding-left: 30vw;
  }

  @media (max-width: 560px) {
    margin-top: 36px;
  }
`;

const TypeImgBoxWrapper = styled.span`
  display: flex;
  flex: 1;
  justify-content: space-between;
  width: 30%;

  // border: 1px solid black;

  @media (max-width: 850px) {
    justify-content: flex-end;
    gap: 0px;
    // width: 80%;
  }
`;

const TypeImgList = styled.div`
  display: flex;
  position: relative;
  min-width: 30px;
  align-items: center;

  // border: 1px solid blue;

  @media (max-width: 850px) {
    justify-content: flex-start;
  }
`;

const TypeImgWrapper = styled.div<{ index: number; totalImages: number }>`
  position: absolute;
  left: ${({ index }) => `${index * 25}px`}; /* 겹침 효과 */
  z-index: ${({ index }) => 100 - index};

  @media (max-width: 850px) {
    left: ${({ index }) => `${index * 13}px`};
  }

  @media (max-width: 560px) {
    left: ${({ index }) => `${index * 8}px`};
    margin-bottom: 3px;
  }
`;

const TypeImg = styled(Image)`
  width: 35px;
  height: 35px;

  @media (max-width: 850px) {
    width: 18px;
    height: 18px;
  }

  @media (max-width: 560px) {
    width: 11px;
    height: 11px;
  }
`;

const LineNDotWrapper = styled.div<{ numImages: number }>`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  // border: 1px solid green;

  margin-left: ${({ numImages }) =>
    `${numImages * 25}px`}; /* 마지막 아이콘 기준 여백 유지 */
  }
  
  @media (max-width: 850px) {
    
  }
`;
// margin-left: ${({ numImages }) => ` ${numImages * 5}px`};

const LineNDot = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  position: relative;
  // position: absolute;

  @media (max-width: 850px) {
    // width: 100%;
  }

  @media (max-width: 560px) {
    margin-left: 9vw;
  }
`;

const LineWrapper = styled.div`
  flex: 1;

  @media (max-width: 850px) {
    // flex-grow: 1;
  }
`;

// width: ${(props) => (props.numImages === 4 ? '100px' : props.numImages === 3 ? '80px' : '50px')};
const TypeImgToArticleLine = styled(Image)<{
  numImages: number;
  articleCount: boolean;
  videoCount: boolean;
}>`
  display: block;
  width: 100%;
  min-width: 20px;

  @media (max-width: 850px) {
    // min-width: 300px;
  }

  @media (max-width: 560px) {
    width: 10px;
    margin-bottom: 1px;
  }
`;

const TypeImgToArticleDot = styled(Image)`
  display: flex;

  @media (max-width: 850px) {
    height: 3px;
    margin-bottom: 0.5px;
  }

  @media (max-width: 560px) {
    height: 1px;
    margin-bottom: 0.4px;
  }
`;

const ArticleNVideo = styled.div`
  display: flex;
  align-items: center;
  margin-left: 15px;

  padding-bottom: 1px;

  // border: 1px solid yellow;

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
  width: 17px;
  height: 17px;

  align-items: center;
  justify-content: center;
  text-align: center;

  font-size: 12px;
  font-weight: 500;
  line-height: 12px;
  letter-spacing: -0.24px;
  font-weight: 500;
  color: #5e52ff;
  background-color: #f5f5ff;
  border-radius: 50px;

  @media (max-width: 850px) {
    font-size: 8px;
    width: 12px;
    height: 12px;
    padding-bottom: 0.45px;
    // padding: 0.5px;
  }

  @media (max-width: 560px) {
    font-size: 4px;
    line-height: 5px;
    width: 6px;
    height: 6px;
    padding: 2px;
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
  width: 17px;
  height: 17px;

  align-items: center;
  justify-content: center;
  text-align: center;

  font-size: 12px;
  font-weight: 500;
  line-height: 12px;
  letter-spacing: -0.24px;
  font-weight: 500;
  color: #5e52ff;
  background-color: #f5f5ff;
  border-radius: 50px;

  @media (max-width: 850px) {
    font-size: 8px;
    width: 12px;
    height: 12px;
    padding-bottom: 0.5px;
  }

  @media (max-width: 560px) {
    font-size: 4px;
    line-height: 5px;
    width: 6px;
    height: 6px;
    padding: 2px;
  }
`;

const Departure = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  margin-top: 184px;
  margin-left: -54vw;
  padding: 16px 100px 16px 70px;
  width: 54vw;
  height: 69px;

  @media (max-width: 850px) {
    margin-top: 110px;
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
