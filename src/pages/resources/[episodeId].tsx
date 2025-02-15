import React, { useEffect, useState, useContext } from 'react';
import { LearnContext } from '../context/LearnContext';
import { useParams } from 'react-router-dom';
import { useRouter } from 'next/router';
import axios from 'axios';
import styled from 'styled-components';
import Header from '../../components/learnHeader';
import TitleBar from '../../components/learn/learnTitleBar';
import ClassTitle from '../../components/learn/learnClassTitle';
import ClassList from '../../components/learn/learnClassList';
// import Article from '../../components/learn/article';
import BlogArticle from '@/components/learn/articleFolder/blogArticle';
import YoutubeArticle from '@/components/learn/articleFolder/newYoutubeArticle';

import Note from '../../components/learn/note';
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

interface CollectionData {
  title: string;
  interestField: string;
  resource: {
    episodeName: string;
    url: string;
    resourceSource: string;
    episodeNumber: number;
    // progress: number;
  }[];
}

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
  // const { collectionId } = useParams<{ collectionId: number }>();
  const episodeId: number = 34;
  const collectionId: number = 1;
  const [type, setType] = useState<'youtube' | 'blog' | null>(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState<string>('');
    const [field, setField] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [collection, setCollection] = useState<CollectionData | null>(null);
  const context = useContext(LearnContext);
  const router = useRouter();

  const { isCompleted } = context.state;
  const { setIsCompleted } = context.actions;

  const dummyData: CollectionData = {
    interestField: 'WEB_DEVELOPMENT',
    title: `처음 배우는 스프링 부트`,
    resource: [
      {
        episodeName: '스프링 부트란?',
        url: 'https://youtube.com/1',
        resourceSource: 'youtube',
        episodeNumber: 1,
        // progress: 100, //테스트용
      },
      {
        episodeName: '프로젝트 설정하기',
        url: 'https://youtube.com/2',
        resourceSource: 'youtube',
        episodeNumber: 2,
        // progress: 100,
      },
      {
        episodeName: '첫 애플리케이션 만들기',
        url: 'https://naver.com/3',
        resourceSource: 'youtube',
        episodeNumber: 3,
        // progress: 100,
      },
      {
        episodeName: '첫 애플리케이션 만들기',
        url: 'https://tistory.com/4',
        resourceSource: 'tistory',
        episodeNumber: 4,
        // progress: 100,
      },
    ],
  };

  useEffect(() => {
    const fetchCollectionData = async () => {
      try {
        const response = await axios.get(
          `http://onboarding.p-e.kr:8080/collections/${collectionId}`,
        );
        if (response.data.isSuccess) {
          setCollection(response.data.result);
        } else {
          console.error('API 응답 실패:', response.data.message);
          setCollection(dummyData); // 실패 시 더미 데이터 사용
        }
      } catch (error) {
        console.error('컬렉션 데이터를 불러오는 중 오류 발생:', error);
        setCollection(dummyData);
      } finally {
        setLoading(false);
      }
    };

    fetchCollectionData();
  }, [episodeId]);

  useEffect(() => {
    if (!episodeId) return;

    const checkResourceType = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('토큰: ', token);
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const youtubeResponse = await axios.get(
          `http://onboarding.p-e.kr:8080/resources/${episodeId}/youtube`,
          { headers },
        );

        if (youtubeResponse.data.result.resourceType === 'VIDEO') {
          console.log(youtubeResponse);
          setType('youtube');
          const data = await youtubeResponse.json();
          setTitle(data.result.urlTitle);
          setField(data.result.interestField);
        } else {
          // YouTube가 아니라면 Blog
          const blogResponse = await axios.get(
            `http://onboarding.p-e.kr:8080/resources/${episodeId}/blog`,
            { headers },
          );

          if(blogResponse.data.result.resourceType === 'TEXT')
          console.log(blogResponse);
          setType('blog');
          const data = await blogResponse.json();
            setTitle(data.result.urlTitle);
            setField(data.result.interestField);
          } else {
          console.error('유튜브로 블로그도 아닌 오류');
          setType(null);
        
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
            {collection && 
              <Article episodeId={episodeId} isCompleted={isCompleted}/>
            }
            {/* {collection &&
              (type === 'youtube' ? (
                <YoutubeArticle
                  episodeId={episodeId}
                  isCompleted={isCompleted}
                />
              ) : (
                <BlogArticle
                  episodeId={episodeId}
                  isCompleted={isCompleted}
                />
              ))} */}
            <ClassTitle episodeId={episodeId} isCompleted={isCompleted} />
          </TopWrapper>
          <MidWrapper>
            <Note episodeId={episodeId} />
          </MidWrapper>
          <BottomWrapper>
            {/* {collection && (
            <ClassList
              resource={collection.resource}
              currentEpisode={episodeId}
            />
            )} */}
          </BottomWrapper>
        </BodyWrapper>
      )}
    </PageWrapper>
  );
};

export default LearnPage;
