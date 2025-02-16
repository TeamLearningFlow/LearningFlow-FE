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
import Article from '../../components/learn/article';
//import BlogArticle from '@/components/learn/articleFolder/blogArticle';
//import YoutubeArticle from '@/components/learn/articleFolder/newYoutubeArticle';

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
    // const [collectionData, setCollectionData] = useState<CollectionData | null>(null);
    const [type, setType] = useState<'youtube' | 'blog' | null>(null);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState<string>('');
    const [field, setField] = useState<string>('');
    const [progress, setProgress] = useState(0);
    const context = useContext(LearnContext);
  
    const router = useRouter();
    const { episodeId, episodeData, collectionData } = router.query;
  
    // episodeId를 string 타입에서 숫자 타입으로 변환
    const episodeIdNumber = Array.isArray(episodeId) ? Number(episodeId[0]) : Number(episodeId);
   
    // episodeData와 collectionData를 JSON 파싱해서 사용할 준비
    const EpisodeData = episodeData ? JSON.parse(episodeData as string) : null;
    const CollectionData = collectionData ? JSON.parse(collectionData as string) : null;



    useEffect(() => {
      if (EpisodeData && EpisodeData.episodeName) {
        console.log("강의 제목:", EpisodeData.episodeName);  // EpisodeName이 정상적으로 로드되는지 확인
      } else {
        console.log("EpisodeData 또는 episodeName이 없어요.");
      }
    }, [EpisodeData]);
    

    const { isCompleted } = context.state;
    const { setIsCompleted } = context.actions;
  
    // resource type을 확인하는 비동기 함수
    const checkResourceType = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
  
        const youtubeResponse = await axios.get(
          `http://onboarding.p-e.kr:8080/resources/${episodeId}/youtube`,
          { headers }
        );
  
        if (youtubeResponse.data.result.resourceType === 'VIDEO') {
          setType('youtube');
          setTitle(youtubeResponse.data.result.urlTitle);
          setField(youtubeResponse.data.result.interestField);
          return; // YouTube가 확인되었으면 종료
        }
  
        // YouTube가 아니면 Blog 조회
        const blogResponse = await axios.get(
          `http://onboarding.p-e.kr:8080/resources/${episodeId}/blog`,
          { headers }
        );
  
        if (blogResponse.data.result.resourceType === 'TEXT') {
          setType('blog');
          setTitle(blogResponse.data.result.urlTitle);
          setField(blogResponse.data.result.interestField);
        } else {
          console.error('유튜브도 블로그도 아닌 오류');
          setType(null);
        }
      } catch (error) {
        console.error('Error fetching resource type:', error);
        setType(null);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      if (episodeId) {
        checkResourceType();
      }
    }, [episodeId]);
  
    useEffect(() => {
      console.log(`현재 에피소드 ID: ${episodeIdNumber}`);
    }, [episodeIdNumber]);

    return (
      <PageWrapper>
        <Header />
        {CollectionData && CollectionData.title && CollectionData.interestField && (
          <TitleBar
            data={{
              title: CollectionData.title,
              interestField: interestFieldMap[CollectionData.interestField]
            }}
          />
        )}
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
              {CollectionData && episodeId && (
                <Article episodeId={episodeIdNumber} isCompleted={isCompleted} />
              )}
              {CollectionData && EpisodeData && episodeId && (
                <ClassTitle
                  episodeId={episodeIdNumber}
                  episodeData={EpisodeData}
                  isCompleted={isCompleted}
                />
              )}
            </TopWrapper>
            <MidWrapper>
              <Note episodeId={episodeIdNumber} />
            </MidWrapper>
            <BottomWrapper>
              {CollectionData && (
                <ClassList
                  resource={CollectionData.resource}
                  currentEpisode={episodeIdNumber}
                  collectionData={CollectionData}
                />
              )}
            </BottomWrapper>
          </BodyWrapper>
        )}
      </PageWrapper>
    );
  };
  
  export default LearnPage;
  