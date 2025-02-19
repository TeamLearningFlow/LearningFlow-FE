import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styled from 'styled-components';
import Header from '../../components/header';
import TitleBar from '../../components/collection/collectionTitleBar';
import CollectionInfo from '../../components/collection/collectionInfo';
import CollectionList from '../../components/collection/collectionList';
import SkeletonCollectionList from '../../components/skeleton/skeleton_classList_M';
import SkeletonCollectionInfo from '../../components/skeleton/skeleton_collectionInfo';
import Footer from '@/components/homeFooter';

const PageWrapper = styled.div`
  background-color: #fafafc;
  min-height: 100vh;
  // position: relative;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export interface CollectionData {
  collectionId: number;
  imageUrl: string;
  interestField: string;
  title: string;
  creator: string;
  keywords: string[];
  difficulties: number[];
  amount: number;
  runtime: number;
  textCount: number;
  videoCount: number;
  resource: {
    episodeId: number;
    episodeName: string;
    url: string;
    resourceSource: 'youtube' | 'naverBlog' | 'tistory' | 'velog';
    episodeNumber: number;
    today: boolean;
    progress: number; // 테스트용
  }[];
  likesCount: number;
  progressRatePercentage: number;
  progressRatio: string;
  learningStatus: 'BEFORE' | 'IN_PROGRESS' | 'COMPLETED';
  startDate: string;
  completedDate: string;
  liked: boolean;
}

export default function CollectionPage() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const { collectionId } = router.query;
  const [collection, setCollection] = useState<CollectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!collectionId) {
      setError('Collection ID가 없습니다.');
      setLoading(false);
      return;
    }

    const fetchCollection = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          `https://onboarding.p-e.kr/collections/${collectionId}`,
        );

        if (response.data.isSuccess) {
          setCollection(response.data.result);
          console.log('데이터 로드 성공:', response.data.result);
        } else {
          // setCollection(dummyData);
          console.log('데이터 로드 실패: 더미 데이터를 사용합니다.');
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          console.log('Error fetching collection:', err.message);

          if (err.response?.status === 404) {
            console.log('404 에러: 해당 컬렉션을 찾을 수 없습니다.');
            // setCollection(dummyData);
          } else {
            console.log('서버 오류로 데이터를 불러올 수 없습니다.');
            setCollection(null);
          }
        } else if (err instanceof Error) {
          console.log(err.message);
        } else {
          console.log(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [collectionId]);

  // ESLint 오류 방지용
  useEffect(() => {
    console.log('현재 에러 상태:', error);
  }, [error]);

  if (!isClient) {
    return null;
  }

  return (
    <PageWrapper>
      <Header />
      {collection && <TitleBar data={collection} />}
      {loading ? (
        <>
          <ContentWrapper>
            <SkeletonCollectionInfo />
            <SkeletonCollectionList />
          </ContentWrapper>
          <Footer />
        </>
      ) : (
        <>
          {collection && (
            <CollectionInfo
              data={collection}
              collectionId={collection.collectionId}
            />
          )}
          <ContentWrapper>
            {collection && <CollectionList collection={collection} />}
          </ContentWrapper>
        </>
      )}
      <Footer />
    </PageWrapper>
  );
}
