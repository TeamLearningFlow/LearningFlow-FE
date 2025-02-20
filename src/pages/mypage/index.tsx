import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Header from '@/components/header';
import ProfileBanner from '@/components/mypage/profileBanner';
import TabHeader from '../../components/mypage/tabHeader';
import NotCompleted from '../../components/mypage/notCompleted';
import Completed from '../../components/mypage/completed';
import Footer from '@/components/homeFooter';
import { CompletedCollectionData } from '@/types/types';

import LoginProtected from '../../components/loginProtected';

const PageContainer = styled.div`
  width: 1200px;
  margin: 54px 120px 120px 120px;

  @media (max-width: 1400px) {
    width: 1000px;
    margin: 20px 50px 100px 50px;
  }

  @media (max-width: 1024px) {
    width: 1000px;
    margin: 20px 10px 100px 10px;
  }

  @media (max-width: 768px) {
    width: calc(100vw - 20px);
  }

  @media (max-width: 480px) {
    width: calc(100vw - 10px);
    margin: 10px 5px 0 5px;
  }
`;

const LearnedWrapper = styled.div`
  display: flex;
  width: 1200px;
  flex-direction: column;
  align-items: flex-start;
  display: flex;
  gap: 54px;

  @media (max-width: 1024px) {
    width: 1000px;
    margin: 20px 10px 0 10px;
  }

  @media (max-width: 768px) {
    width: calc(100vw - 20px);

  @media (max-width: 480px) {
    width: calc(100vw - 10px);
    margin: 10px 5px 0 5px;
  }
`;

const CompletedWrapper = styled.div`
  display: flex;
  width: 1200px;
  flex-direction: column;
  align-items: flex-start;
  display: flex;
  gap: 54px;
  margin-top: 54px;

  @media (max-width: 1024px) {
    width: 1000px;
    margin: 20px 10px 0 10px;
  }

  @media (max-width: 768px) {
    width: calc(100vw - 20px);

  @media (max-width: 480px) {
    width: calc(100vw - 10px);
    margin: 10px 5px 0 5px;
  }
`;

const DEFAULT_BANNER = 'linear-gradient(90deg, #5e52ff 0%, #383199 100%)';

interface EpisodeData {
  resourceId: number;
  collectionId: number;
  collectionTitle: string;
  resourceSource: string;
  episodeNumber: number;
  episodeName: string;
  progressRatePercentage: number;
  progressRatio: string;
  currentProgress: number;
  totalProgress: number;
}

const MyPage = () => {
  const [isClient, setIsClient] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    job: '',
    profileImgUrl: null,
    bannerImgUrl: DEFAULT_BANNER,
  });

  const [recentlyWatched, setRecentlyWatched] = useState<EpisodeData[]>([]);
  const [completedCollections, setCompletedCollections] = useState<
    CompletedCollectionData[]
  >([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('로그인이 필요한 서비스입니다.');
        }

        const response = await axios.get(
          'https://onboarding.p-e.kr/user/mypage',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log('Response:', response.data);

        if (response.data.isSuccess && response.data.result) {
          setUserInfo({
            name: response.data.result.userPreviewDTO.name,
            email: response.data.result.userPreviewDTO.email,
            job: response.data.result.userPreviewDTO.job,
            profileImgUrl:
              response.data.result.userPreviewDTO.profileImgUrl || null,
            bannerImgUrl:
              response.data.result.userPreviewDTO.bannerImgUrl ||
              DEFAULT_BANNER,
          });

          setRecentlyWatched(
            response.data.result.recentlyWatchedEpisodeList || [],
          );

          setCompletedCollections(
            response.data.result.completedCollectionList || [],
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <LoginProtected>
      <Header />
      <ProfileBanner userInfo={userInfo} />
      <TabHeader />
      <PageContainer>
        <LearnedWrapper>
          <NotCompleted episodes={recentlyWatched} />
        </LearnedWrapper>
        <CompletedWrapper>
          <Completed completedCollections={completedCollections} />
        </CompletedWrapper>
      </PageContainer>
      <Footer />
    </LoginProtected>
  );
};

export default MyPage;
