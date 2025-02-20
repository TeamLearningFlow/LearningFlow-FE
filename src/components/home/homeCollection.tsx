import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  isLoggedIn: boolean;
  // nickname: string;
  collections: RecommendedCollection[];
}> = ({ isLoggedIn, collections }) => {
  console.log('collections: ', collections);

  const [nickname, setNickname] = useState<string | null>(null);

  // 유저 닉네임 가져오기
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await axios.get('https://onboarding.p-e.kr/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNickname(response.data.result.name);
    } catch (error) {
      console.error('유저 데이터 가져오기 실패:', error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);

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
            {isLoggedIn ? (
              <>
                <h1>오늘도 한 걸음 더 나아갈 수 있도록 준비했어요!</h1>
                <p>{nickname}님을 위한 맞춤 컬렉션을 추천해 드릴게요</p>
              </>
            ) : (
              <>
                <h1>오늘도 한 걸음 더 나아갈 수 있도록 준비했어요!</h1>
                <p>여러분을 위한 맞춤 컬렉션을 추천해 드릴게요</p>
              </>
            )}
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
