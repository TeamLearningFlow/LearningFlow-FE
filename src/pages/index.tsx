import React, { useState, useEffect } from 'react';
import NotLoginHeader from '../components/home/homeNotLoginHeader';
import HomeTop from '../components/home/homeTop';
import HomeMiddle from '../components/home/homeMiddle';
import HomeBottom from '../components/home/homeBottom';
import Footer from '../components/homeFooter';
import styled from 'styled-components';
import Header from '../components/header';
import Banner from '../components/home/homeBanner';
import HomeCollection, {
  // RecommendedCollection,
} from '../components/home/homeCollection';
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

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [recentLearning, setRecentLearning] = useState<RecentLearning | null>(
    null,
  );
  const [recommendedCollections, setRecommendedCollections] = useState<[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nickname, setNickname] = useState('');

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

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    console.log('token: ', token);

    if (token) {
      const fetchHomeData = async () => {
        try {
          const response = await axios.get(`http://onboarding.p-e.kr:8080`, {
            headers: { Authorization: token },
            withCredentials: true,
          });
          const data = await response.data.result;
          console.log('home data: ', data);
          setRecentLearning(data.recentLearning);
          setRecommendedCollections(data.recommendedCollections);
        } catch (error) {
          console.error('Home data fetch 오류:', error);
        }
      };
      fetchHomeData();
      setIsLoggedIn(true);
    } else {
      console.log('토큰이 없습니다.');
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div>
      {isLoggedIn ? <Header /> : <NotLoginHeader />}
      {isLoggedIn ? (
        <>
          <Banner />
          {recentLearning ? (
            <RecentCollection collectionInfo={recentLearning} />
          ) : null}
          {recommendedCollections ? (
            <HomeCollection
              nickname={nickname}
              collections={recommendedCollections}
            />
          ) : null}
          <Wrapper>
            {isModalOpen && <HomeModal onClose={handleCloseModal} />}
            {!isModalOpen && <Main></Main>}
          </Wrapper>
        </>
      ) : (
        <>
          <HomeTop />
          <HomeMiddle />
          <HomeBottom />
        </>
      )}
      <Footer />
    </div>
  );
};

export default HomePage;
