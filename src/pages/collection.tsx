import React from 'react';
import styled from 'styled-components';
import Header from '../components/collectionHeader';
import TitleBar from '../components/collectionTitleBar';
import CollectionInfo from '../components/collectionInfo';
import { ClassIndex, StartIndex, EndIndex } from '../components/classIndex';
import NowPlaying from '../components/nowPlaying';
import NextClassIndex from '../components/nextClassIndex';
import CheckedYoutube from '../assets/checkedYoutube.svg';

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
  const stops = ['1회차', '2회차'];

  return (
    <PageWrapper>
      <Header />
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
    </PageWrapper>
  );
};

export default CollectionPage;
