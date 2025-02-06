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

  @media (max-width: 850px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 0 20px;
  }

  @media (max-width: 560px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 0 5%;
  }
`;

const LeftWrapper = styled.div`
  width: 63vw;

  @media (max-width: 850px) {
    display: flex;
    width: 100vw;
    flex-direction: column; // 이거 설정해서 아래쪽 width 바뀌었을 거에요!! 참고해주세융
    justify-content: center;
    align-items: center;

    // border: 10px solid blue;
    padding: 5px 35px;
  }

  @media (max-width: 560px) {
    display: flex;
    width: 100vw;
    flex-direction: column; // 이거 설정해서 아래쪽 width 바뀌었을 거에요!! 참고해주세융
    justify-content: center;

    // border: 10px solid blue;
    padding: 5px 30px;
  }
`;

const ClassWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightWrapper = styled.div`
  width: 30vw;

  @media (max-width: 850px) {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;

    // border: 10px solid red;
  }

  @media (max-width: 560px) {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;

    // border: 10px solid red;
  }
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
