import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/learnHeader';
import TitleBar from '../components/learn/learnTitleBar';
import ClassTitle from '../components/learn/learnClassTitle';
import ClassList from '../components/learn/learnClassList';
import Article from '../components/learn/article';
import YoutubeArticle from '../components/learn/articleFolder/youtubeArticle';
import Note from '../components/learn/note';
import {
  SkeletonClassList_S,
  SkeletonClassTitle,
  SkeletonArticle,
} from '@/components/skeleton/skeleton_learnComponents';
import BlogArticle from '@/components/learn/articleFolder/blogArticle';

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
  const episodeId =42;
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
        const token = localStorage.getItem('token');
    const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {}; // 빈 객체로 설정

    const youtubeResponse = await fetch(
      `http://onboarding.p-e.kr:8080/resources/${episodeId}/youtube`,
      { headers } // 헤더 추가
    );
    console.log('YouTube 응답 상태:', youtubeResponse.status);
    if (youtubeResponse.ok) {
      const youtubeData = await youtubeResponse.json(); // 응답 데이터 확인
      console.log('YouTube 데이터:', youtubeData);
      setType('youtube');
    } else {
      console.error('YouTube 응답 실패:', youtubeResponse.statusText); // 실패 메시지 출력
      // YouTube가 아니라면 Blog
      const blogResponse = await fetch(
        `http://onboarding.p-e.kr:8080/resources/${episodeId}/blog`,
        { headers } // 헤더 추가
      );
    
          if (blogResponse.ok) {
            const blogData = await blogResponse.json(); // 블로그 데이터 확인
            console.log('블로그 데이터:', blogData);
            setType('blog');
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
          {collection && <YoutubeArticle episodeId={episodeId} />}
            <ClassTitle />
          </TopWrapper>
          <MidWrapper>
            <Note episodeId={episodeId} />
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
