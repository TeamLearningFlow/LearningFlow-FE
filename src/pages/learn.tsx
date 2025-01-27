import React from 'react';
import styled from 'styled-components';
import Header from './components/learnHeader';
import TitleBar from './components/learnTitleBar';
import ClassTitle from './components/learnClassTitle';
import ClassList from './components/learnClassList';

const PageWrapper = styled.div``;

const LearnPage: React.FC = () => {
  return (
    <PageWrapper>
      <Header />
      <TitleBar />
      <ClassTitle />
      <ClassList />
    </PageWrapper>
  );
};

export default LearnPage;
