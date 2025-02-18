import React, { useState, useEffect, useContext } from 'react';
import NotLoginHeader from '../components/home/homeNotLoginHeader';
import HomeTop from '../components/home/homeTop';
import HomeMiddle from '../components/home/homeMiddle';
import Footer from '../components/homeFooter';
import styled from 'styled-components';
import Header from '../components/header';
import Banner from '../components/home/homeBanner';
import HomeCollection from '../components/home/homeCollection'; // RecommendedCollection
import RecentCollection, {
  RecentLearning,
} from '../components/home/recentCollection';
import HomeModal from '../components/modal/homeModal';
import axios from 'axios';
import { LoginContext } from '../components/context/LoginContext';

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

const HomePage = () => {
  const [isClient, setIsClient] = useState(false); // 클라이언트 환경 여부 결정
  const context = useContext(LoginContext);

  if (!context) {
    throw new Error('LoginContext를 찾을 수 없습니다.');
  }

  const { isLoggedIn } = context.state; // 로그인 상태

  const [recentLearning, setRecentLearning] = useState<RecentLearning | null>(
    null,
  );
  const [recommendedCollections, setRecommendedCollections] = useState<[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    setIsClient(true);
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

    fetchHomeData();
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const fetchHomeData = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('token: ', token);

      // 요청 헤더 설정 (token이 있으면 Authorization 추가)
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await axios.get(`https://onboarding.p-e.kr/`, {
        headers,
        withCredentials: true,
      });
      const data = await response.data.result;
      console.log('home data: ', data);
      setRecentLearning(data?.recentLearning);
      setRecommendedCollections(data.recommendedCollections);
    } catch (error) {
      console.error('Home data fetch 오류:', error);
    }
  };

  if (!isClient) {
    return null; // 클라이언트 환경에서만 렌더링
  }

  return (
    <>
      {isLoggedIn ? <Header /> : <NotLoginHeader />}

      {isLoggedIn && recentLearning ? (
        <>
          <Banner />
          <RecentCollection collectionInfo={recentLearning} />
          <Wrapper>
            {isModalOpen && <HomeModal onClose={handleCloseModal} />}
            {!isModalOpen && <Main></Main>}
          </Wrapper>
        </>
      ) : (
        <>
          <HomeTop />
          <HomeMiddle />
        </>
      )}
      <HomeCollection
        isLoggedIn={isLoggedIn}
        nickname={nickname}
        collections={recommendedCollections}
      />

      <Footer />
    </>
  );
};

export default HomePage;
