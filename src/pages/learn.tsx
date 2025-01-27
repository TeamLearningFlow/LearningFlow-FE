import React from 'react';
import styled from 'styled-components';
import Header from './components/learnHeader';
import TitleBar from './components/learnTitleBar';

const PageWrapper = styled.div``;

const LearnPage: React.FC = () => {
  return (
    <PageWrapper>
      <Header />
      <TitleBar />
    </PageWrapper>
  );
};

export default LearnPage;
