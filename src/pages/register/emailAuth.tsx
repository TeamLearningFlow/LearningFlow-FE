import React, { useState } from 'react';
import styled from 'styled-components';
import DarkTopLogo from '../../components/topLogo_dark';
// import EmailIcon from './assets/mailIcon.png';
// import Image from 'next/image';
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
          <Container>
            <DarkTopLogo />
            <PageContainer>
              <TitleContainer>인증 메일을 보내드렸어요</TitleContainer>
              <IconContainer>
                {/*<Image src={EmailIcon} alt="Email Icon" width={240} height={240} /> */}
              </IconContainer>
              <Textwrapper>
                {`메일함을 확인해주세요\n가입하신 이메일을 인증해 주시면,\n온보딩의 서비스를 마음껏 이용하실 수 있어요`}
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 145px;
`;

const TitleContainer = styled.div`
  text-align: center;
  font-size: 30px;
  font-weight: 600;
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
`;

const GoBackButton = styled.button`
  display: flex;
  width: 532px;
  padding: 18px 0px;

  justify-content: center;
  align-items: center;
  background-color: rgba(94, 82, 255, 1);
  border: none;
  border-radius: 16px;
  font-size: 20px;
  font-weight: 300;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
`;
