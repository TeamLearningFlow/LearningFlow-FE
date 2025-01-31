import React, { useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import tmpIMG from '../../assets/tmpIMG.svg';
import collectionInfoIMG from '../../assets/CollectionInfo.svg';
import NaverblogIcon from '../../assets/platformicon/naverblog_nostroke_ic.svg';
import TistoryIcon from '../../assets/platformicon/tistory_nostroke_ic.svg';
import VelogIcon from '../../assets/platformicon/velog_nostroke_ic.svg';
import YoutubeIcon from '../../assets/platformicon/youtube_nostroke_ic.svg';
import line from '../../assets/Line.svg';
import dot from '../../assets/dot.svg';
import plane from '../../assets/Airplane.svg';

const CollectionInfo: React.FC = () => {
  return (
    <CollectionTicket>
      <CollectionLeftIMG src={tmpIMG} alt="컬렉션 이미지" height={252} />
      <CollectionDescription>
        <CollectionRightIMG
          src={collectionInfoIMG}
          alt="컬렉션 이미지"
          height={252}
        />
        <KeywordBox>
          <Keyword>키워드1</Keyword>
          <Keyword>키워드2</Keyword>
          <Keyword>키워드3</Keyword>
        </KeywordBox>
        <TypeImgBox>
          <TypeImg src={YoutubeIcon} alt="youtube" index={0} />
          <TypeImg src={TistoryIcon} alt="tistory" index={1} />
          <TypeImg src={NaverblogIcon} alt="blog" index={2} />
          <TypeImg src={VelogIcon} alt="velog" index={3} />
          {/* <TypeImgEtc>+</TypeImgEtc> */}
          {/* <TypeImgEtcNum>4</TypeImgEtcNum> */}
          <TypeImgLetterBox>
            <TypeImgToArticleLine src={line} alt="------" />
            <TypeImgToArticleDot src={dot} alt="O" />
            <ArticleNVideo>
              <ArticleLetter>아티클</ArticleLetter>
              <ArticleNumber>2</ArticleNumber>
              <VideoLetter>영상</VideoLetter>
              <VideoNumber>6</VideoNumber>
            </ArticleNVideo>
          </TypeImgLetterBox>
        </TypeImgBox>
        <Title>
          컬렉션의
          <br />
          제목을 입력해주세요
        </Title>
        <Author>컬렉션의 제작자명</Author>
        <Departure>
          <DepartureLeft>
            <DepartureLetter>Departure</DepartureLetter>
            <DepartureLevel>분야 난이도</DepartureLevel>
          </DepartureLeft>
          <DepartureCenter>
            <DepartureToArrivalLetter>00시간</DepartureToArrivalLetter>
            <Hr />
            <PlaneImg src={plane} alt="비행기" />
            <Hr />
          </DepartureCenter>
          <DepartureRight>
            <ArrivalLetter>Arrival</ArrivalLetter>
            <ArrivalLevel>분야 난이도</ArrivalLevel>
          </DepartureRight>
        </Departure>
      </CollectionDescription>
    </CollectionTicket>
  );
};

export default CollectionInfo;

const CollectionTicket = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  width: 80vw;
  height: 280px;
  margin: 2% 9.5% 1% 9.5%;

  white-space: nowrap;
  // overflow: hidden;
`;

const CollectionLeftIMG = styled(Image)`
  display: flex;
  width: 26.3vw;
  border-radius: 20px;
`;

const CollectionRightIMG = styled(Image)`
  display: flex;
  width: 54vw;
  border-radius: 20px;
`;

const CollectionDescription = styled.span`
  display: flex;
`;

const KeywordBox = styled.div`
  position: absolute;
  margin-left: 25px;
  margin-top: 20px;
`;

const Keyword = styled.span`
  width: 150px;
  display: inline;
  padding: 7.339px 18.349px;
  margin-right: 10px;

  border-radius: 9.786px;
  background-color: #f5f5f5;
  color: #4f5357;
  font-size: 14px;
  font-weight: 600;
  line-height: 23.996px;
`;

const Title = styled.div`
  position: absolute;
  font-size: 24px;
  font-weight: 700;

  line-height: 36px;
  letter-spacing: -0.48px;

  margin-top: 65px;
  margin-left: 25px;
  width: 327.273px;
`;

const Author = styled.div`
  position: absolute;
  color: #7c8389;
  font-size: 18px;
  font-weight: 600;

  margin-top: 140px;
  margin-left: 25px;
  width: 327.273px;
`;

const TypeImgBox = styled.div`
  position: absolute;
  margin-top: 130px;

  // margin-left: 425px;
  margin-left: 35%;
  // width: 300px;
  width: 30%;
  height: 40px;
`;

const TypeImg = styled(Image)<{ index: number }>`
  position: absolute;
  left: ${({ index }) =>
    index * 25}px; /* 이미지의 기본 위치 조정 (겹침 효과) */
  border-radius: 50%;
  z-index: ${({ index }) =>
    100 - index}; /* 첫 번째 이미지가 가장 위로 오도록 설정 */

  width: 38.185px;
  height: 38.185px;
`;

// const TypeImgEtc = styled.span`
//   position: absolute;
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   font-size: 10.367px;
//   height: 40px;
//   margin-left: 123px;
//   color: #4f5357;
// `;

// const TypeImgEtcNum = styled.span`
//   position: absolute;
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   font-size: 10.367px;
//   height: 40px;
//   margin-left: 130px;
//   color: #4f5357;
// `;

const TypeImgLetterBox = styled.div`
  display: flex;
  align-items: center;
  position: absolute;

  width: 250px;
  height: 40px;
  margin-left: 140px;

  font-size: 10.367px;
  font-style: normal;
  font-weight: 400;
`;

const TypeImgToArticleLine = styled(Image)`
  position: absolute;
`;

const TypeImgToArticleDot = styled(Image)`
  position: absolute;
  margin-left: 65px;
`;

const ArticleNVideo = styled.span`
  position: absolute;
  display: flex;
  align-items: center;
  margin-left: 100px;

  // width: 400px;
  width: 130px;
  height: 40px;
`;

const ArticleLetter = styled.span`
  margin-right: 4px;

  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: -0.24px;
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
`;

const VideoLetter = styled.span`
  margin-left: 7px;
  margin-right: 4px;

  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: -0.24px;
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
`;

const Departure = styled.span`
  display: flex;
  align-items: center;

  margin-top: 184px;
  margin-left: -54vw;
  padding: 16px 100px;
  width: 54vw;
  height: 69px;
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
`;

const DepartureLevel = styled.div`
  color: #4f5357;

  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
`;

const DepartureCenter = styled.span`
  display: flex;
  width: 54vw;
  align-items: center;
  justify-content: center;
  margin-top: 22px;
`;

const DepartureToArrivalLetter = styled.div`
  color: #5e52ff;

  position: absolute;
  top: 217px;

  font-size: 11px;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: -0.24px;
`;

const Hr = styled.hr`
  height: 0.5px;
  flex: 1; /* 남은 공간을 채움 */
  border: none;
  background-color: #5e52ff;
`;

const PlaneImg = styled(Image)`
  margin-left: 10px;
  margin-right: 10px;
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
`;

const ArrivalLevel = styled.div`
  color: #4f5357;

  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
`;
