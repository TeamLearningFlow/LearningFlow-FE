import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/searchHeader';
import Banner from '../components/home/homeBanner';
import Footer from '../components/homeFooter';
import HomeCollection from '../components/home/homeCollection';
import RecentCollection from '../components/home/recentCollection';
import HomeModal from '../components/modal/homeModal';

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

  useEffect(() => {
    // 로컬 스토리지에서 모달 표시 여부 확인
    const showModal = localStorage.getItem('showHomeModal');
    if (showModal === 'true') {
      setIsModalOpen(true);
      localStorage.removeItem('showHomeModal');
    }
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header />
      <Banner />
      <RecentCollection />
      <HomeCollection />
      <Wrapper>
        {isModalOpen && <HomeModal onClose={handleCloseModal} />}
        {!isModalOpen && <Main></Main>}
      </Wrapper>
      <Footer />
    </>
  );
};

export default HomeLogin;
