import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/learnHeader';
import TitleBar from '../components/learn/learnTitleBar';
import ClassTitle from '../components/learn/learnClassTitle';
import ClassList from '../components/learn/learnClassList';
// import BlogArticle from '../components/learn/article/blogArticle';
// import YoutubeArticle from '../components/learn/article/youtubeArticle';
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

  display: grid;
  grid-template-columns: 70vw 20vw;
  grid-template-rows: 60vh 20vh;
  gap: 2%;

  @media (max-width: 850px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 0 20px;
    margin-top: 4%;
    // gap: 1%;
  }
`;

const TopWrapper = styled.div`
  @media (max-width: 850px) {
    // width: 100vw;
    width: 95vw;
    height: 50vh;
    padding: 0 25px;
  }
  @media (max-width: 560px) {
    padding: 0 10px;
  }
`;

const MidWrapper = styled.div`
  grid-column: 2/4;

  @media (max-width: 850px) {
    width: 100vw;
    width: 95vw;
    padding: 0 25px;
  }
  @media (max-width: 560px) {
    padding: 0 10px;
  }
`;

const BottomWrapper = styled.div`
  @media (max-width: 850px) {
    width: 100vw;
    width: 95vw;
    padding: 0 25px;
  }
  @media (max-width: 560px) {
    padding: 0 10px;
  }
`;

const LearnPage: React.FC = () => {
  // const { episodeId } = useParams<{ episodeId: number }>();
  const episodeId = 34;
  const [type, setType] = useState<'youtube' | 'blog' | null>(null);
  const [loading, setLoading] = useState(false);

  // // 테스트용
  // const testEpisodeIds = [1, 2]; // 1: 유튜브, 2 : 블로그
  // const [currentEpisodeId, setCurrentEpisodeId] = useState<number>(
  //   testEpisodeIds[0],
  // );

  useEffect(() => {
    if (!episodeId) return;
    // if (!currentEpisodeId) return; // 테스트

    const checkResourceType = async () => {
      try {
        const youtubeResponse = await fetch(
          `http://onboarding.p-e.kr:8080/resources/${episodeId}/youtube`,
        );

        if (youtubeResponse.ok) {
          setType('youtube');
          // console.log(`유튜브 테스트 : ${currentEpisodeId}`);
        } else {
          // YouTube가 아니라면 Blog
          const blogResponse = await fetch(
            `http://onboarding.p-e.kr:8080/resources/${episodeId}/blog`,
          );

          if (blogResponse.ok) {
            setType('blog');
            // console.log(`블로그 테스트 : ${currentEpisodeId}`);
          } else {
            console.error('유튜브로 블로그도 아닌 오류');
            setType(null);
          }
        }
      } catch (error) {
        console.error('Error fetching resource type:', error);
        setType(null);
      } finally {
        setLoading(false);
      }
    };

    checkResourceType();
  }, [episodeId]);
  // }, [currentEpisodeId]);

  // useEffect(() => {
  //   console.log(`현재 에피소드 ID: ${currentEpisodeId}`);
  // }, [currentEpisodeId]);

  const collection = {
    title: '제목',
    interestField: 'APP_DEVELOPMENT',
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
        <BodyWrapper>
          <TopWrapper>
            {/* {collection && <Article episodeId={episodeId} />} */}
            <Article />
            {/* // (type === 'youtube' ? (
              //   <YoutubeArticle episodeId={episodeId} />
              // ) : (
              //   // <YoutubeArticle episodeId={currentEpisodeId} />
              //   <BlogArticle episodeId={episodeId} />
              //   // <BlogArticle episodeId={currentEpisodeId} />
              // ))} */}
            <ClassTitle />
          </TopWrapper>
          {/* <button onClick={() => setCurrentEpisodeId(testEpisodeIds[0])}>
            테스트 (YouTube)
          </button>
          <button onClick={() => setCurrentEpisodeId(testEpisodeIds[1])}>
            테스트 (Blog)
          </button> */}
          <MidWrapper>
            <Note episodeId={episodeId} />
            {/* <Note episodeId={currentEpisodeId} /> */}
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
