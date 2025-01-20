import React from 'react';
import styled from 'styled-components';
import Header from './components/collectionHeader';
import TitleBar from './components/collectionTitleBar';
import CollectionInfo from './components/collectionInfo';
import ClassIndex from './components/classIndex';
import NowPlaying from './components/nowPlaying';

const PageWrapper = styled.div`
  background-color: #f5f5ff;
  min-height: 100vh;
`;

const CollectionPage: React.FC = () => {
  const stops = [
    '출발지',
    '1번째 경유지',
    '2번째 경유지',
    '3번째 경유지',
    '4번째 경유지',
  ];

  return (
    <PageWrapper>
      <Header />
      <TitleBar />
      <CollectionInfo />
      {stops.map((stop, index) => (
        <ClassIndex key={index} orderText={stop} />
      ))}
      <NowPlaying />
    </PageWrapper>
  );
};

export default CollectionPage;
