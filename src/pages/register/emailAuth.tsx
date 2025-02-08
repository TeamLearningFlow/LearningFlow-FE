import React, { useState } from 'react';
import styled from 'styled-components';
import DarkTopLogo from '../../components/topLogo_dark';
import Image from 'next/image';
import PlaneIcon from '../../assets/paperplane.svg';
import EmailAuthModal from '../../components/modal/emailAuthModal';
import RegisterPage from './index';

const EmailAuthPage: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showAuth, setShowAuth] = useState(true);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleAuthClose = () => {
    setShowAuth(false); // 이메일 인증 페이지 숨김
  };

  return (
    <>
      {showAuth ? (
        <>
          <DarkTopLogo />
          <Container>
            <PageContainer>
              <TitleContainer>인증 메일을 보내드렸어요</TitleContainer>
              <IconContainer>
                <Image
                  src={PlaneIcon}
                  alt="Email Icon"
                  width={220}
                  height={220}
                />
              </IconContainer>
              <Textwrapper>
                {`수신 메일함을 확인해주세요\n인증 시, 온보딩을 마음껏 이용하실 수 있어요`}
              </Textwrapper>
              <GoBackButton onClick={handleModalOpen}>
                이전 페이지로 돌아가기
              </GoBackButton>
            </PageContainer>
          </Container>
          {showModal && (
            <EmailAuthModal
              onClose={handleAuthClose}
              onContinue={handleModalClose}
            />
          )}
        </>
      ) : (
        <RegisterPage />
      )}
    </>
  );
};

export default EmailAuthPage;

const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleContainer = styled.div`
  text-align: center;
  font-size: 30px;
  font-weight: 600;

  @media (max-width: 850px) {
    font-size: 25px;
  }

  @media (max-width: 560px) {
    font-size: 18px;
  }
`;

const IconContainer = styled.div`
  display: flex;
  margin: 32px;
`;

const Textwrapper = styled.div`
  white-space: pre-line;
  text-align: center;
  font-size: 20px;
  margin-bottom: 32px;
  line-height: 28px;

  @media (max-width: 850px) {
    font-size: 15px;
    line-height: 23px;
  }

  @media (max-width: 560px) {
    font-size: 10px;
    line-height: 15px;
    margin-bottom: 20px;
  }
`;

const GoBackButton = styled.button`
  display: flex;
  width: 500px;
  padding: 16px 0px;

  justify-content: center;
  align-items: center;
  background-color: rgba(94, 82, 255, 1);
  border: none;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 600;
  line-height: 140%; /* 30.8px */
  letter-spacing: -0.44px;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;

  @media (max-width: 850px) {
    font-size: 15px;
    width: 400px;
    padding: 15px 0px;
  }

  @media (max-width: 560px) {
    font-size: 10px;
    width: 250px;
    padding: 10px 0px;
    border-radius: 8px;
  }
`;
