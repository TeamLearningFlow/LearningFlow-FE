import React, { useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import tmpIMG from '../assets/tmpIMG.png';
import bIMG from '../assets/B.png';
import colosoIMG from '../assets/Coloso.png';
import inflearnIMG from '../assets/Inflearn.png';
import youtubeIMG from '../assets/Youtube.png';
import myExIMG from '../assets/MyExample.jpg';

const CollectionInfo: React.FC = () => {
  return (
    <CollectionInformation>
      <CollectionLeft>
        <CollectionLeftIMG src={tmpIMG} alt="컬렉션 이미지" />
      </CollectionLeft>
      <CollectionRight>
        <CollectionRightIMG src={myExIMG} alt="컬렉션 이미지" />
        <CollectionDescription>
          <UpperDescription>
            {/* 키워드 데이터 두고 검사 필요 */}
            <Keyword>키워드1</Keyword>
            <Keyword>키워드2</Keyword>
            <Keyword>키워드3</Keyword>

            <TypeImg src={colosoIMG} alt="coloso" index={0} />
            <TypeImg src={youtubeIMG} alt="youtube" index={1} />
            <TypeImg src={bIMG} alt="b" index={2} />
            <TypeImg src={inflearnIMG} alt="inflearn" index={3} />
            <TypeImgEtc>+4</TypeImgEtc>
            {/* <TypeImgToArticle /> */}
            <ArticleLetter>아티클</ArticleLetter>
            <ArticleNumber>2</ArticleNumber>
            <VideoLetter>영상</VideoLetter>
            <VideoNumber>6</VideoNumber>
            <Title>컬렉션의 제목</Title>
            <Author>컬렉션의 제작자명</Author>
          </UpperDescription>
          <LowerDescription>
            <Departure>
              <DepartureLetter>Departure</DepartureLetter>
              <DepartureLevel>분야 난이도</DepartureLevel>
            </Departure>
            {/* 비행기 이미지 */}
            <DepartureToArrivalLetter>회차</DepartureToArrivalLetter>
            <Arrival>
              <ArrivalLetter>Arrival</ArrivalLetter>
              <ArrivalLevel>분야 난이도</ArrivalLevel>
            </Arrival>
          </LowerDescription>
        </CollectionDescription>
      </CollectionRight>
    </CollectionInformation>
  );
};

export default CollectionInfo;

const CollectionInformation = styled.div`
  margin-bottom: 30px;
`;

const CollectionLeft = styled.span``;

const CollectionLeftIMG = styled(Image)`
  display: inline;
  border-radius: 28.324px;
  // background: url(<path-to-image>) lightgray 50% / cover no-repeat;
  height: 200px;
  width: 300px;
`;

const CollectionRight = styled.span``;

const CollectionRightIMG = styled(Image)`
  display: inline;
  height: 200px;
  width: 600px;
  // 확인
  border: 1px solid #2b2b2b;
`;

const CollectionDescription = styled.span``;

const UpperDescription = styled.div`
  //   background-color: #fff;
  border: 1px solid #2b2b2b; // 크기 파악

  // 이거 따와야함
`;

const Keyword = styled.span`
  //   display: flex;
  display: inline;
  width: 150px;
  justify-content: center;
  align-items: center;
  padding: 10.284px 25.709px;
  //   gap: 15.426px;
  margin-right: 10px;

  border-radius: 13.712px;
  background-color: #f5f5ff;

  color: #5e52ff;
  font-size: 20.568px;
  font-weight: 600;
  line-height: 23.996px;
  // letter-spacing: -0.411px;
`;

const TypeImg = styled(Image)<{ index: number }>`
  position: absolute;
  left: ${({ index }) =>
    index * 30}px; /* 이미지의 기본 위치 조정 (겹침 효과) */
  border-radius: 50%;
  margin-left: -15px;
  z-index: ${({ index }) =>
    100 - index}; /* 첫 번째 이미지가 가장 위로 오도록 설정 */
`;

const TypeImgEtc = styled.span`
  color: #4f5357;
`;

const Title = styled.div``;

const Author = styled.div`
  color: #7c8389;
`;

const ArticleLetter = styled.span``;

const ArticleNumber = styled.span`
  padding: 2.717px;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: #5e52ff;
  background-color: #f5f5ff;
  border-radius: 9.509px;
`;

const VideoLetter = styled.span``;

const VideoNumber = styled.span`
  padding: 2.717px;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: #5e52ff;
  background-color: #f5f5ff;
  border-radius: 9.509px;
`;

const LowerDescription = styled.div`
  border: 1px soild #2b2b2b;
`;

const Departure = styled.span``;

const DepartureLetter = styled.div`
  color: #bbb6ff;
`;

const DepartureLevel = styled.div``;

const DepartureToArrivalLetter = styled.span`
  color: #dcd9ff;
`;

const Arrival = styled.span``;

const ArrivalLetter = styled.div`
  color: #bbb6ff;
`;

const ArrivalLevel = styled.div``;
