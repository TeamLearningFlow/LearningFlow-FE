import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
// import BoardingPass from './homeBoardingPass';
import AirplaneIcon from '../../assets/airplaneIcon.svg';

const HomeCollectionWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 50px 0px;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  flex-shrink: 0;
  border-radius: 32px 32px 0px 0px;
  background: #fafafc;
`;

const CollectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
`;

const HeaderText = styled.div`
  text-align: center;
  margin-top: 10px;

  h1 {
    color: #959ca4;
    text-align: center;
    font-feature-settings:
      'liga' off,
      'clig' off;
    font-size: 20px;
    font-weight: 500;
    line-height: 150%; /* 36px */
    letter-spacing: -0.48px;

    @media (max-width: 768px) {
      font-size: 17px;
    }

    @media (max-width: 480px) {
      font-size: 15px;
    }
  }

  p {
    color: #323538;
    font-feature-settings:
      'liga' off,
      'clig' off;
    font-size: 25px;
    font-weight: 600;
    line-height: 150%; /* 48px */
    letter-spacing: -0.64px;

    @media (max-width: 768px) {
      font-size: 23px;
    }

    @media (max-width: 480px) {
      font-size: 18px;
    }
  }
`;

const CollectionList = styled.div`
  height: auto;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  justify-items: center;
  align-items: center;
  gap: 24px;
  margin-bottom: 120px;
  padding: 0px 8%;

  @media (max-width: 480px) {
    padding: 0;
  }
`;

const HomeCollection = () => {
  return (
    <>
      <HomeCollectionWrapper>
        <CollectionHeader>
          <IconWrapper>
            <Image
              src={AirplaneIcon}
              alt="airplaneicon"
              width={50}
              height={50}
            />
          </IconWrapper>
          <HeaderText>
            <h1>‘서비스 기획’ 분야를 학습하고 계신 푸글 님!</h1>
            <p>푸글 님 맞춤 컬렉션을 추천해 드릴게요</p>
          </HeaderText>
        </CollectionHeader>
        <CollectionList>
          {/*<BoardingPass showHoverCollection={true} />
          <BoardingPass showHoverCollection={true} />
          <BoardingPass showHoverCollection={true} />
          <BoardingPass showHoverCollection={true} />
          <BoardingPass showHoverCollection={true} />
          <BoardingPass showHoverCollection={true} /> */}
        </CollectionList>
      </HomeCollectionWrapper>
    </>
  );
};

export default HomeCollection;
