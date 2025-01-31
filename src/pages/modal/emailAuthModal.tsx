import React, { useState } from 'react';
import styled from 'styled-components';
import SignupPage from '../register';

interface ModalProps {
  onClose: () => void;
}

const emailAuthModal: React.FC<ModalProps> = ({ onClose }) => {
  const [showSignupPage, setShowSignupPage] = useState<boolean>(false);

  const handleSignupPage = () => {
    setShowSignupPage(true);
  };

  return (
    <>
      {!showSignupPage ? (
        <ModalWrapper>
          <ModalBox>
            <Title>이전 페이지로 돌아갈까요?</Title>
            <Description>
              지금 돌아가면 입력하신 회원가입 정보는 삭제됩니다.
            </Description>
            <Button>
              <BackButton onClick={handleSignupPage}>돌아갈래요</BackButton>
              <ForwardButton onClick={onClose}>이어서하기</ForwardButton>
            </Button>
          </ModalBox>
        </ModalWrapper>
      ) : (
        <SignupPage />
      )}
    </>
  );
};

export default emailAuthModal;

const ModalWrapper = styled.div`
  white-space: nowrap;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const ModalBox = styled.div`
  position: relative;
  box-sizing: border-box;
  padding: 36px;
  flex-direction: column;
  align-items: flex-end;

  // width: 472px;
  // width: 31%;
  height: 231px;

  border-radius: 16px;
  background-color: #fff;
`;

const Title = styled.div`
  color: #323538;
  text-align: center;

  font-size: 30px;
  font-weight: 600;
  letter-spacing: -0.64px;
  margin-bottom: 10px;
`;

const Description = styled.div`
  color: #64696e;
  text-align: center;

  font-size: 18.5px;
  font-weight: 500;
  line-height: 30px;
  letter-spacing: -0.4px;
`;
const Button = styled.div`
  position: absolute;
  width: 228px;
  right: 0;
  bottom: 0;
  margin: 36px;
  margin-bottom: 40px;

  align-items: center;
`;

const BackButton = styled.span`
  display: inline;
  padding: 6px 16px;
  width: 109px;
  height: 29px;
  justify-content: center;
  align-items: center;
  margin-right: 10px;

  font-size; 15px;
  height: 20px;

  border-radius: 100px;
  background-color: rgba(118, 118, 128, 0.12);
  color: #1f1f1f;

 cursor: pointer;
`;

const ForwardButton = styled.span`
  display: inline;
  padding: 6px 16px;
  width: 109px;
  height: 29px;
  justify-content: center;
  align-items: center;

  font-size; 15px;
  height: 20px;

  border-radius: 100px;
  background-color: #5e52ff;
  color: #fff;

  cursor: pointer;
`;
