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
  SkeletonArticle,
} from '@/components/skeleton/skeleton_learnComponents';

const PageWrapper = styled.div``;

const BodyWrapper = styled.div`
  padding: 0 2.5%;
  margin-top: 30px;
  display: flex;

  display: grid;
  grid-template-columns: 62vw 30vw;
  grid-template-rows: 60vh 20vh;
  gap: 2.5%;

  @media (max-width: 850px) {
    display: flex;
    // flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 0 20px;
    margin-top: 2%;
  }

  @media (max-width: 560px) {
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    // justify-content: center;

    padding: 0 5%;
  }
`;

const TopWrapper = styled.div``;

const MidWrapper = styled.div`
  grid-column: 2/4;
`;

const BottomWrapper = styled.div``;

const LearnPage: React.FC = () => {
  const { episodeId } = useParams(); // episodeId 파라미터 가져오기
  const loading = false; // Skeleton UI 확인용

  const collection = {
    title: '제목',
    interestField: '필드',
  };

  return (
    <PageWrapper>
      <Header />
      {collection && <TitleBar data={collection} />}
      {loading ? (
        <BodyWrapper>
          <TopWrapper>
            <SkeletonArticle />
            <SkeletonClassTitle />
          </TopWrapper>
          <MidWrapper>
            <Note />
          </MidWrapper>
          <BottomWrapper>
            <SkeletonClassList_S />
          </BottomWrapper>
        </BodyWrapper>
      ) : (
        // <BodyWrapper>
        //   <LeftWrapper>
        //     <Article episodeId={episodeId} />
        //     <ClassWrapper>
        //       <ClassTitle />
        //       <ClassList />
        //     </ClassWrapper>
        //   </LeftWrapper>
        //   <RightWrapper>
        //     <Note episodeId={episodeId} />
        //     {/* <Note /> */}
        //   </RightWrapper>
        // </BodyWrapper>
        <BodyWrapper>
          <TopWrapper>
            <Article epsiodeId={episodeId} />
            <ClassTitle />
          </TopWrapper>
          <MidWrapper>
            <Note epsiodeId={episodeId} />
          </MidWrapper>
          <BottomWrapper>
            <ClassList />
          </BottomWrapper>
        </BodyWrapper>
      )}
    </PageWrapper>
  );
};

export default LearnPage;
