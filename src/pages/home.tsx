// pages/home.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import TopLogo from '../components/home/homeHeader';
import HomeModal from '../pages/modal/homeModal';

const Wrapper = styled.div`
  display: flex;
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

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <TopLogo />
      <Wrapper>
        {isModalOpen && <HomeModal onClose={handleCloseModal} />}
        {!isModalOpen && <Main></Main>}
      </Wrapper>
    </>
  );
};

export default Home;
