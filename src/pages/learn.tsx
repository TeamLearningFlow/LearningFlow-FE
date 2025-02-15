import React, { useEffect, useState, useContext } from 'react';
import { LearnContext } from './context/LearnContext';
import { useParams } from 'react-router-dom';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Header from '../components/learnHeader';
import TitleBar from '../components/learn/learnTitleBar';
import ClassTitle from '../components/learn/learnClassTitle';
import ClassList from '../components/learn/learnClassList';
import Article from '../components/learn/articleFolder/blogArticle';
import YoutubeArticle from '@/components/learn/article/youtubeArticle';
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

const interestFieldMap: Record<string, string> = {
  APP_DEVELOPMENT: '앱개발',
  WEB_DEVELOPMENT: '웹개발',
  PROGRAMMING_LANGUAGE: '컴퓨터언어',
  DEEP_LEARNING: '딥러닝',
  STATISTICS: '통계',
  DATA_ANALYSIS: '데이터분석',
  UI_UX: 'UX/UI',
  PLANNING: '기획',
  BUSINESS_PRODUCTIVITY: '업무생산성',
  FOREIGN_LANGUAGE: '외국어',
  CAREER: '취업',
};

const LearnPage: React.FC = () => {
  // const { episodeId } = useParams<{ episodeId: number }>();
  const episodeId: number = 34;
  const [type, setType] = useState<'youtube' | 'blog' | null>(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [field, setField] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const context = useContext(LearnContext);
  const router = useRouter();

  const { isCompleted } = context.state;
  const { setIsCompleted } = context.actions;

  useEffect(() => {
    if (!episodeId) return;

    const checkResourceType = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('토큰: ', token);
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const youtubeResponse = await fetch(
          `http://onboarding.p-e.kr:8080/resources/${episodeId}/youtube`,
          { headers },
        );

        if (youtubeResponse.ok) {
          setType('youtube');
          const data = await youtubeResponse.json();
          setTitle(data.result.urlTitle);
          setField(data.result.interestField);
        } else {
          // YouTube가 아니라면 Blog
          const blogResponse = await fetch(
            `http://onboarding.p-e.kr:8080/resources/${episodeId}/blog`,
            { headers },
          );

          if (blogResponse.ok) {
            setType('blog');
            const data = await blogResponse.json();
            setTitle(data.result.urlTitle);
            setField(data.result.interestField);
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

  useEffect(() => {
    console.log(`현재 에피소드 ID: ${episodeId}`);
  }, [episodeId]);

  const collection = {
    title: title,
    interestField: interestFieldMap[field],
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
            {collection && (
              <Article episodeId={episodeId} isCompleted={isCompleted} />
            )}
            <ClassTitle isCompleted={isCompleted} />
          </TopWrapper>
          <MidWrapper>
            <Note episodeId={episodeId} />
          </MidWrapper>
          <BottomWrapper>
            {/* <ClassList currentEpisode={episodeId} /> */}
          </BottomWrapper>
        </BodyWrapper>
      )}
    </PageWrapper>
  );
};

export default LearnPage;
