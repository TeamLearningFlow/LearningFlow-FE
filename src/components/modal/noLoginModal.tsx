import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  white-space: nowrap;
`;

const ModalContainer = styled.div`
  background: white;
  width: 456px;
  padding: 36px;
  border-radius: 16px;
  text-align: center;
  background: #fff;
`;

const ModalTitle = styled.h2`
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 48px */
  letter-spacing: -0.64px;
  color: #323538;
  text-align: center;
  margin-bottom: 6px;
`;

const ModalMessage = styled.p`
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 30px */
  letter-spacing: -0.4px;
  color: #64696e;
  text-align: center;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const Button = styled.button`
  background: #5e52ff;
  color: #fff;
  border: none;
  padding: 6px 16px;
  justify-content: center;
  align-items: center;
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 27px */
  letter-spacing: -0.36px;
  border-radius: 8px;
  cursor: pointer;
`;

interface NoLoginModalProps {
  onClose: () => void;
}

const NoLoginModal: React.FC<NoLoginModalProps> = ({ onClose }) => {
  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalTitle>앗! 로그인이 안 돼요</ModalTitle>
        <ModalMessage>
          잠시 문제가 생겼어요.
          <br /> 조금 뒤에 다시 시도해주세요!
        </ModalMessage>
        <ButtonContainer>
          <Button onClick={onClose}>확인</Button>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default NoLoginModal;
