import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/header';
import Banner from '../components/home/homeBanner';
import Footer from '../components/homeFooter';
import HomeCollection from '../components/home/homeCollection';
import RecentCollection, {
  RecentLearning,
} from '../components/home/recentCollection';
import HomeModal from '../components/modal/homeModal';
import axios from 'axios';

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #ffffff;
`;

const Main = styled.div`
  text-align: center;
  padding: 20px;
`;

const HomeLogin: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nickname, setNickname] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [recentLearning, setRecentLearning] = useState<RecentLearning | null>(
    null,
  );
  const [recommendedCollections, setRecommendedCollections] = useState<[]>([]);

  useEffect(() => {
    // 닉네임 연동
    const storedNickname = localStorage.getItem('userName');

    if (storedNickname) {
      setNickname(storedNickname);
    }

    // 회원가입 후 모달 표시 여부 확인
    if (localStorage.getItem('isFromSignup') === 'true') {
      setIsModalOpen(true); // 모달 열기
      localStorage.removeItem('isFromSignup'); // 플래그 제거
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('token: ', token);

    if (token) {
      const fetchHomeData = async () => {
        try {
          const response = await axios.get(`https://onboarding.p-e.kr`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          });
          const data = await response.data.result;
          console.log('home data WITH token: ', data);
          setRecentLearning(data.recentLearning);
          setRecommendedCollections(data.recommendedCollections);
        } catch (error) {
          console.error('Home data fetch 오류:', error);
        }
      };
      fetchHomeData();
      setIsLoggedIn(true);
    } else {
      const fetchHomeData = async () => {
        try {
          const response = await axios.get(`https://onboarding.p-e.kr`);
          const data = await response.data.result;
          console.log('home data WITHOUT token: ', data);
          setRecommendedCollections(data.recommendedCollections);
        } catch (error) {
          console.error('Home data fetch 오류:', error);
        }
      };
      console.log('토큰이 없습니다.');
      fetchHomeData();
      setIsLoggedIn(false);
    }
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header />
      <Banner />
      {recentLearning ? (
        <RecentCollection collectionInfo={recentLearning} />
      ) : null}
      <HomeCollection
        nickname={nickname}
        collections={recommendedCollections}
      />
      <Wrapper>
        {isModalOpen && <HomeModal onClose={handleCloseModal} />}
        {!isModalOpen && <Main></Main>}
      </Wrapper>
      <Footer />
    </>
  );
};

export default HomeLogin;
