import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/learnHeader';
import TitleBar from '../components/learn/learnTitleBar';
import ClassTitle from '../components/learn/learnClassTitle';
import ClassList from '../components/learn/learnClassList';
import Article from '../components/learn/article';
import Note from '../components/learn/note';
import {
  SkeletonClassList_S,
  SkeletonClassTitle,
} from '@/components/skeleton/skeleton_learnComponents';

const PageWrapper = styled.div``;

const BodyWrapper = styled.div`
  padding: 0 2.5%;
  margin-top: 2%;
  display: flex;
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
  const { episodeId } = useParams(); // episodeId 파라미터 가져오기
  const loading = false; // Skeleton UI 확인용

  return (
    <PageWrapper>
      <Header />
      <TitleBar />
      {loading ? (
        <BodyWrapper>
          <LeftWrapper>
            <SkeletonClassTitle />
            <SkeletonClassList_S />
          </LeftWrapper>
        </BodyWrapper>
      ) : (
        <BodyWrapper>
          <LeftWrapper>
            <Article episodeId={episodeId} />
            <ClassWrapper>
              <ClassTitle />
              <ClassList />
            </ClassWrapper>
          </LeftWrapper>
          <RightWrapper>
            <Note episodeId={episodeId} />
            {/* <Note /> */}
          </RightWrapper>
        </BodyWrapper>
      )}
    </PageWrapper>
  );
};

export default LearnPage;
