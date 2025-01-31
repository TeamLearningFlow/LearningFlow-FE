import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/searchHeader';
import CategoryList from '../components/search/categoryList';
import BoardingPass from '../components/search/boardingPass';
import Filters from '../components/search/filters';
import Pagination from '@/components/search/pagination';

import TitleBar from '../components/collection/collectionTitleBar';
import CollectionInfo from '../components/collection/collectionInfo';
import {
  ClassIndex,
  StartIndex,
  EndIndex,
} from '../components/collection/classIndex';
import NowPlaying from '../components/collection/nowPlaying';
import NextClassIndex from '../components/collection/nextClassIndex';
import CheckedYoutube from '../assets/platformicon/youtube_checked_ic.svg';

const PageWrapper = styled.div`
  background-color: #fafafc;
  min-height: 100vh;
`;

const ListWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ListContainer = styled.div``;

const CollectionPage: React.FC = () => {
  const [searchActive, setSearchActive] = useState(false); // 검색창 활성화 상태

  // 헤더 상태 업데이트 전달
  const handleSearchStateChange = (active: boolean) => {
    setSearchActive(active);
  };

  const stops = ['1회차', '2회차'];

  return (
    <PageWrapper>
      <Header onSearchStateChange={handleSearchStateChange} />
      {searchActive ? (
        <div>
        <CategoryList />
        <Filters />
        <BoardingPass showHoverCollection={true} />
        <Pagination />
      </div>
      ) : (
        <>
          <TitleBar />
          <CollectionInfo />
          <ListWrapper>
            <StartIndex />
            <ListContainer>
              {stops.map((stop, index) => (
                <ClassIndex src={CheckedYoutube} key={index} orderText={stop} />
              ))}
              <NowPlaying />
              <NextClassIndex />
              <NextClassIndex />
            </ListContainer>
            <EndIndex />
          </ListWrapper>
        </>
      )}
    </PageWrapper>
  );
};

export default CollectionPage;
