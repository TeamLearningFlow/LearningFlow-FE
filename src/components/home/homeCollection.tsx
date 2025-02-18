import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import BoardingPass from './homeBoardingPass';
import AirplaneIcon from '/public/airplaneIcon.svg';

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

export type RecommendedCollection = {
  amount: number;
  collectionId: number;
  completedDate: number[];
  startDate: number[];
  creator: string;
  difficulties: number[];
  imageUrl: string;
  interestField: string;
  keywords: string[];
  learningStatus: string;
  liked: boolean;
  likesCount: number;
  progressRatePercentage: number;
  progressRatio: string;
  title: string;
  runtime: number;
  textCount: number;
  videoCount: number;
  resourceSourceTypes: string[];
  resource: {
    completed: boolean;
    today: boolean;
    episodeId: number;
    episodeNumber: number;
    episodeName: string;
    resourceSource: string;
    url: string;
  }[];
};

const HomeCollection: React.FC<{
  nickname: string;
  collections: RecommendedCollection[];
}> = ({ nickname, collections }) => {
  console.log('collections: ', collections);
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
            <h1>‘서비스 기획’ 분야를 학습하고 계신 {nickname}님!</h1>
            <p>{nickname}님 맞춤 컬렉션을 추천해 드릴게요</p>
          </HeaderText>
        </CollectionHeader>
        <CollectionList>
          {collections?.map((item, index) => (
            <BoardingPass key={index} data={item} showHoverCollection={true} />
          ))}
        </CollectionList>
      </HomeCollectionWrapper>
    </>
  );
};

export default HomeCollection;
