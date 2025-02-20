import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import LikedCollection from './likedCollection';
import EmptyLiked from './emptyLiked';
import axios from 'axios';
import Pagination from './pagination';
import { useRouter } from 'next/router';

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
  // height: 1047px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 한 줄에 4개 */
  justify-items: center;
  gap: 24px;
  padding-bottom: 54px;

  /* 반응형 설정 */
  @media (max-width: 1024px) {
    padding: 0 20px 20px 20px;
    gap: 20px;
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    padding: 0 30px 30px 30px; /* 모바일 화면 */
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
  const router = useRouter();
  const { query } = router;

  const [activeSort, setActiveSort] = useState('최신순');

  const [liked, setLiked] = useState<LikedCollectionData[]>([]);

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (option: string) => {
    const sortOption = [
      { id: 0, text: '최신순' },
      { id: 1, text: '인기순' },
    ];

    const selectedSort = sortOption.find((sort) => sort.text === option);
    if (!selectedSort) return;

    setActiveSort(selectedSort.text);

    router.replace({
      pathname: '/mypage/Liked',
      query: {
        ...query,
        sortType: selectedSort.id,
        page: '1',
      },
    });
  };

  useEffect(() => {
    // query에 page 또는 sortType이 없으면 기본값 설정
    if (!query.page || !query.sortType) {
      router.replace({
        pathname: '/mypage/Liked',
        query: {
          ...query,
          page: query.page || '1',
          sortType: query.sortType || '0',
        },
      });
    }
    return;
  }, [query.page, query.sortType]);

  useEffect(() => {
    fetchUserData();
  }, [query.page, query.sortType]);

  useEffect(() => {
    // 정렬 값이 변경될 때 activeSort 업데이트
    if (query.sortType === '1') {
      setActiveSort('인기순');
    } else {
      setActiveSort('최신순');
    }
  }, [query.sortType]);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('로그인이 필요한 서비스입니다.');
      }

      const response = await axios.get('https://onboarding.p-e.kr/user/likes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          sortType: query?.sortType || '0',
          page: query?.page || '1',
        },
      });
      if (response.data.isSuccess && response.data.result) {
        const data = await response.data.result;
        setLiked(data.searchResults);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <LikedWrapper>
        <TitleWrapper>
          <Title>관심 컬렉션</Title>
          <OptionWrapper>
            <Option
              active={activeSort === '최신순'}
              onClick={() => handleSort('최신순')}
            >
              최신순
            </Option>
            <Option
              active={activeSort === '인기순'}
              onClick={() => handleSort('인기순')}
            >
              인기순
            </Option>
          </OptionWrapper>
        </TitleWrapper>
        {liked.length > 0 ? (
          <>
            <CollectionList>
              {liked.map((item, index) => (
                <LikedCollection
                  key={index}
                  data={item}
                  showHoverCollection={true}
                />
              ))}
            </CollectionList>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </>
        ) : (
          <EmptyLiked />
        )}
      </LikedWrapper>
    </>
  );
};

export default Liked;
