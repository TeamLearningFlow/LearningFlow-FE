import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/searchHeader';
import CategoryList from '../components/search/categoryList';
import BoardingPass from '../components/search/boardingPass';
import Filters from '../components/search/filters';
import Pagination from '@/components/search/pagination';
import BoardingPassList from '@/components/search/boardingPassList';
import TitleBar from '../components/learn/learnTitleBar';
import CollectionInfo from '../components/collection/collectionInfo';
import CollectionList from '../components/collection/collectionList';
import SkeletonCollectionList from '@/components/skeleton/skeleton_classList_M';

const PageWrapper = styled.div`
  background-color: #fafafc;
  min-height: 100vh;
  position: relative;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const CollectionPage: React.FC = () => {
  const [searchActive, setSearchActive] = useState(false); // 검색창 활성화 상태
  const loading = false; // Skeleton UI 확인용

  // 헤더 상태 업데이트 전달
  const handleSearchStateChange = (active: boolean) => {
    setSearchActive(active);
  };

  return (
    <PageWrapper>
      <Header onSearchStateChange={handleSearchStateChange} />
      {loading ? (
        <>
          <TitleBar />
          <ContentWrapper>
            <SkeletonCollectionList />
          </ContentWrapper>
        </>
      ) : searchActive ? (
        <div>
          <CategoryList />
          <Filters />
          <BoardingPassList>
            {Array.from({ length: 8 }).map((_, index) => (
              <BoardingPass key={index} showHoverCollection={true} />
            ))}
          </BoardingPassList>
          <Pagination />
        </div>
      ) : (
        <>
          <TitleBar />
          <CollectionInfo />
          <ContentWrapper>
            <CollectionList />
          </ContentWrapper>
        </>
      )}
    </PageWrapper>
  );
};

export default CollectionPage;
