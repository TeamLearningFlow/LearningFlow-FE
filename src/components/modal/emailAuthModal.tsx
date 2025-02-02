import React from 'react';
import styled from 'styled-components';

const emailAuthModal: React.FC = ({ onClose, onContinue }) => {
  return (
    <>
      <ModalWrapper>
        <ModalBox>
          <Title>이전 페이지로 돌아갈까요?</Title>
          <Description>
            지금 돌아가면 입력하신 회원가입 정보는 삭제됩니다.
          </Description>
          <Button>
            <BackButton onClick={onClose}>돌아갈래요</BackButton>
            <ForwardButton onClick={onContinue}>이어서하기</ForwardButton>
          </Button>
        </ModalBox>
      </ModalWrapper>
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

  height: 231px;

  border-radius: 16px;
  background-color: #fff;

  @media (max-width: 850px) {
    padding: 30px;
    height: 200px;
  }

  @media (max-width: 560px) {
    padding: 25px;
    height: 155px;
  }
`;

const Title = styled.div`
  color: #323538;
  text-align: center;

  font-size: 30px;
  font-weight: 600;
  letter-spacing: -0.64px;
  margin-bottom: 10px;

  @media (max-width: 850px) {
    font-size: 25px;
  }

  @media (max-width: 560px) {
    font-size: 18px;
    margin-bottom: 2px;
  }
`;

const Description = styled.div`
  color: #64696e;
  text-align: center;

  font-size: 18.5px;
  font-weight: 500;
  line-height: 30px;
  letter-spacing: -0.4px;

  @media (max-width: 850px) {
    font-size: 15px;
  }

  @media (max-width: 560px) {
    font-size: 10px;
  }
`;
const Button = styled.div`
  display: flex;
  flex-direction: row;
  width: 228px;

  position: absolute;
  right: 0;
  bottom: 0;
  margin: 36px;
  margin-bottom: 40px;

  align-items: center;

  @media (max-width: 850px) {
    margin: 40px -12px 35px 20px;
  }

  @media (max-width: 560px) {
    margin-right: -50px;
    margin-bottom: 27px;
  }
`;

const BackButton = styled.span`
  display: flex;
  padding: 6px 16px;
  width: 109px;
  height: 33px;
  justify-content: center;
  align-items: center;
  margin-right: 10px;

  font-size: 15px;

  border-radius: 100px;
  background-color: rgba(118, 118, 128, 0.12);
  color: #1f1f1f;

  cursor: pointer;

  @media (max-width: 850px) {
    font-size: 12px;
    width: 90px;
    height: 30px;
  }

  @media (max-width: 560px) {
    font-size: 9px;
    width: 70px;
    height: 20px;
  }
`;

const ForwardButton = styled.span`
  display: flex;
  padding: 6px 16px;
  width: 109px;
  height: 33px;
  justify-content: center;
  align-items: center;

  font-size; 15px;

  border-radius: 100px;
  background-color: #5e52ff;
  color: #fff;

  cursor: pointer;

  @media (max-width: 850px) {
    font-size: 12px;
    width: 90px;
    height: 30px;
  }

  @media (max-width: 560px) {
    font-size: 9px;
    width: 70px;
    height: 20px;
  }
`;
