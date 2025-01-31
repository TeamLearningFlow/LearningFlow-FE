import React from 'react';
import styled from 'styled-components';
// import Image from 'next/image';
// import Confetti from '../../assets/confetti.svg';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 40px 25px;
  text-align: center;
  width: 310px;
  z-index: 1000;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
  line-height: 30px; /* 150% */
  letter-spacing: -0.64px;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #64696e;
  font-weight: 500;
  line-height: 25px; /* 150% */
  letter-spacing: -0.4px;
  margin-bottom: 30px;
`;

const Button = styled.button`
  justify-content: center;
  align-items: center;
  background-color: #5e52ff;
  color: #ffffff;
  width: 100%;
  border: none;
  border-radius: 100px;
  padding: 12px 16px;
  font-size: 14px;
  cursor: pointer;
`;

interface ModalProps {
  onClose: () => void;
}

const HomeModal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <>
      <ModalOverlay onClick={onClose} />
      <ModalContainer>
        <Title>
          00님,
          <br />
          온보딩에 오신 것을 환영해요!
        </Title>
        <div
          style={{
            width: '100%',
            height: '170px',
            background: '#d9d9d9',
            marginBottom: '15px',
          }}
        >
          {/* 이미지나 기타 콘텐츠 자리 */}
        </div>
        <Subtitle>
          필터링을 통해 꼭 맞는 컬렉션으로 <br />
          학습여정을 시작해요!
        </Subtitle>
        <Button onClick={onClose}>여정 시작하기</Button>
      </ModalContainer>
    </>
  );
};

export default HomeModal;
