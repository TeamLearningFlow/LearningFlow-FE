import React from 'react';
import styled from 'styled-components';
import Header from '../components/learnHeader';
import TitleBar from '../components/learnTitleBar';
import ClassTitle from '../components/learnClassTitle';
import ClassList from '../components/learnClassList';
import Article from '../components/article';
import Note from '../components/note';

const PageWrapper = styled.div``;

const BodyWrapper = styled.div`
  padding: 0 2.5%;
  margin-top: 2%;

  display: flex;
  align-items: space-between;
  justify-content: space-between;
`;

const LeftWrapper = styled.div`
  width: 63vw;
`;

const ClassWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightWrapper = styled.div`
  width: 30vw;
`;

const LearnPage: React.FC = () => {
  return (
    <PageWrapper>
      <Header />
      <TitleBar />
      <BodyWrapper>
        <LeftWrapper>
          <Article />
          <ClassWrapper>
            <ClassTitle />
            <ClassList />
          </ClassWrapper>
        </LeftWrapper>
        <RightWrapper>
          <Note />
        </RightWrapper>
      </BodyWrapper>
    </PageWrapper>
  );
};

export default LearnPage;
