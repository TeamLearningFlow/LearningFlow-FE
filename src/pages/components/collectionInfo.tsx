import React, { useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import tmpIMG from '../assets/tmpIMG.png';
import boardingCollectionIMG from '../assets/boarding_collection_L.svg';
import youtubeIMG from '../assets/Youtube.png';
import tistoryIMG from '../assets/Tistory.png';
import blogIMG from '../assets/NaverBlog.png';
import velogIMG from '../assets/Velog.png';
import line from '../assets/Line.png';
import dot from '../assets/dot.png';
import plane from '../assets/Airplane.png';

const CollectionInfo: React.FC = () => {
  return (
    <CollectionTicket>
      <CollectionLeftIMG src={tmpIMG} alt="컬렉션 이미지" height={252} />
      <CollectionDescription>
        <CollectionRightIMG
          src={boardingCollectionIMG}
          alt="컬렉션 이미지"
          height={252}
        />
        <KeywordBox>
          <Keyword>키워드1</Keyword>
          <Keyword>키워드2</Keyword>
          <Keyword>키워드3</Keyword>
        </KeywordBox>
        <TypeImgBox>
          <TypeImg src={youtubeIMG} alt="youtube" index={0} />
          <TypeImg src={tistoryIMG} alt="tistory" index={1} />
          <TypeImg src={blogIMG} alt="blog" index={2} />
          <TypeImg src={velogIMG} alt="velog" index={3} />
          <TypeImgEtc>+</TypeImgEtc>
          <TypeImgEtcNum>4</TypeImgEtcNum>
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
        <Title>컬렉션의 제목을 입력해주세요요요우용요요ㅛ</Title>
        <Author>컬렉션의 제작자명</Author>
        {/* <LowerDescription> */}
        <Departure>
          <DepartureLeft>
            <DepartureLetter>Departure</DepartureLetter>
            <DepartureLevel>분야 난이도</DepartureLevel>
          </DepartureLeft>
          <DepartureCenter>
            <DepartureToArrivalLetter>00시간</DepartureToArrivalLetter>
            <PlaneImg src={plane} alt="비행기" />
          </DepartureCenter>
          {/* <Arrival> */}
          {/* <ArrivalLetter>Arrival</ArrivalLetter> */}
          {/* <ArrivalLevel>분야 난이도</ArrivalLevel> */}
          {/* </Arrival> */}
          {/* </LowerDescription> */}
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
  height: 254px;
  margin: 2% 9.5% 2.5% 9.5%;
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
  color: #1f1f1f;
  font-size: 14.679px;
  font-weight: 600;
  line-height: 23.996px;
`;

const Title = styled.div`
  position: absolute;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 700;

  line-height: 36px;
  letter-spacing: -0.48px;

  margin-top: 70px;
  margin-left: 25px;
  width: 327.273px;
`;

const Author = styled.div`
  position: absolute;
  color: #7c8389;
  font-size: 18px;
  font-weight: 600;

  margin-top: 145px;
  margin-left: 25px;
  width: 327.273px;
`;

const TypeImgBox = styled.div`
  position: absolute;
  margin-top: 135px;

  margin-left: 390px;
  width: 300px;
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

const TypeImgEtc = styled.span`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 10.367px;
  height: 40px;
  margin-left: 123px;
  color: #4f5357;
`;

const TypeImgEtcNum = styled.span`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 10.367px;
  height: 40px;
  margin-left: 130px;
  color: #4f5357;
`;

const TypeImgLetterBox = styled.div`
  display: flex;
  align-items: center;
  position: absolute;

  width: 250px;
  height: 40px;
  margin-left: 150px;

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

  width: 400px;
  height: 40px;
`;

const ArticleLetter = styled.span`
  margin-right: 5px;
`;

const ArticleNumber = styled.span`
  display: flex;
  width: 13.574px;
  height: 13.574px;

  align-items: center;
  justify-content: center;
  padding: 1.939px;
  padding-bottom: 2.8px;

  font-size: 10.367px;
  font-weight: 500;
  color: #5e52ff;
  background-color: #f5f5ff;
  border-radius: 9.509px;
`;

const VideoLetter = styled.span`
  margin-left: 7px;
  margin-right: 5px;
`;

const VideoNumber = styled.span`
  display: flex;
  width: 13.574px;
  height: 13.574px;

  align-items: center;
  justify-content: center;
  padding: 1.939px;
  padding-bottom: 2.8px;

  font-size: 10.367px;
  font-weight: 500;
  color: #5e52ff;
  background-color: #f5f5ff;
  border-radius: 9.509px;
`;

const Departure = styled.span`
  border: 1px solid red;
  display: flex;
  // justify-content: center;
  align-items: center;

  margin-top: 180px;
  margin-left: -780px;
  width: 54vw;
  height: 50px;
`;

const DepartureLeft = styled.span`
  border: 1px solid blue;
  position: absolute;
  margin-left: 20px;

  width: 80px;
  // height: 50px;
`;

const DepartureLetter = styled.div`
  color: #9e9e9e;

  font-size: 12px;
  font-weight: 500;
  line-height: 18px;

  margin-bottom: 5px;
`;

const DepartureLevel = styled.div`
  color: #4f5357;

  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
`;

const DepartureCenter = styled.div`
  border: 1px solid green;
`;

const DepartureToArrivalLetter = styled.div`
  color: #5e52ff;

  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: -0.24px;

  margin-bottom: 5px;
`;

const PlaneImg = styled(Image)`
  width: 11.366px;
  height: 18.09px;
`;

// const Arrival = styled.span``;

// const ArrivalLetter = styled.div`
//   color: #bbb6ff;
// `;

// const ArrivalLevel = styled.div``;
