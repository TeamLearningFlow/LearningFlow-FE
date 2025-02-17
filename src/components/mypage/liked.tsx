import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import LikedCollection from './likedCollection';
import EmptyLiked from './emptyLiked';
import axios from 'axios';

const LikedWrapper = styled.div`
  width: 1200px;
  // height: 1107px;

  /* 반응형 설정 */
  @media (max-width: 1024px) {
    width: 1000px;
  }

  @media (max-width: 768px) {
    width: calc(100vw - 20px); /* 모바일 화면 */
    padding: 0 10px;
  }

  @media (max-width: 480px) {
    width: calc(100vw - 10px); /* 폰 화면 */
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.div`
  height: 36px;
  width: 148px;
  color: #000;
  white-space: nowrap;

  /* Body/xl/SemiBold */
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 36px; /* 150% */
  letter-spacing: -0.48px;
`;

const OptionWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const Option = styled.div<{ active: boolean }>`
  font-size: 18px;
  font-weight: 600;
  line-height: 150%; /* 27px */
  letter-spacing: -0.36px;
  color: ${(props) => (props.active ? '#000' : '#DDE0E4')};
  cursor: pointer;
`;

const CollectionList = styled.div`
  height: 1047px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 한 줄에 4개 */
  justify-items: center;
  gap: 24px;

  /* 반응형 설정 */
  @media (max-width: 1024px) {
    padding: 0 20px;
    gap: 20px;
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    padding: 0 30px; /* 모바일 화면 */
    gap: 25px;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr); /* 폰 화면 */
    place-items: center;
  }
`;

export type LikedCollectionData = {
  collectionId: number;
  imageUrl: string;
  interestField: string;
  keywords: string[];
  title: string;
  creator: string;
  difficulties: number[];
  runtime: number;
  amount: number;
  textCount: number;
  videoCount: number;
  resourceSourceTypes: string[];
  resource: {
    episodeNumber: number;
    episodeName: string;
    resourceSource: string;
    url: string;
  }[];
  likesCount: number;
  progressRatePercentage: number;
  progressRatio: string;
  learningStatus: string;
  startDate: string;
  completedDate: string;
  liked: boolean;
};

const Liked = () => {
  const [activeSort, setActiveSort] = useState('최신순');

  const [liked, setLiked] = useState<LikedCollectionData[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('로그인이 필요한 서비스입니다.');
        }

        const response = await axios.get(
          'http://onboarding.p-e.kr:8080/user/likes?page=1',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data.isSuccess && response.data.result) {
          setLiked(response.data.result.searchResults || []);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  console.log(liked);

  return (
    <>
      <LikedWrapper>
        <TitleWrapper>
          <Title>관심 컬렉션</Title>
          <OptionWrapper>
            <Option
              active={activeSort === '최신순'}
              onClick={() => setActiveSort('최신순')}
            >
              최신순
            </Option>
            <Option
              active={activeSort === '인기순'}
              onClick={() => setActiveSort('인기순')}
            >
              인기순
            </Option>
          </OptionWrapper>
        </TitleWrapper>
        {liked.length > 0 ? (
          <CollectionList>
            {liked.map((item, index) => (
              <LikedCollection
                key={index}
                data={item}
                showHoverCollection={true}
              />
            ))}
          </CollectionList>
        ) : (
          <EmptyLiked />
        )}
      </LikedWrapper>
    </>
  );
};

export default Liked;
