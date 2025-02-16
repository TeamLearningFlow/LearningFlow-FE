import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/components/header';
import ProfileBanner from '@/components/mypage/profileBanner';
import Tab from '@/components/mypage/mypageTabMenu';
import Footer from '@/components/homeFooter';

const DEFAULT_BANNER = 'linear-gradient(90deg, #5e52ff 0%, #383199 100%)';

interface EpisodeData {
  resourceId: number;
  collectionId: number;
  collectionTitle: string;
  resourceSource: string;
  episodeNumber: number;
  episodeName: string;
  progressRatio: string;
  currentProgress: number;
  totalProgress: number;
}

const MyPage = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    job: '',
    profileImgUrl: null,
    bannerImgUrl: DEFAULT_BANNER,
  });

  const [recentlyWatched, setRecentlyWatched] = useState<EpisodeData[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('로그인이 필요한 서비스입니다.');
        }

        const response = await axios.get(
          'http://onboarding.p-e.kr:8080/user/mypage',
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
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <Header />
      <ProfileBanner userInfo={userInfo} />
      <Tab recentlyWatched={recentlyWatched} />
      <Footer />
    </>
  );
};

export default MyPage;
