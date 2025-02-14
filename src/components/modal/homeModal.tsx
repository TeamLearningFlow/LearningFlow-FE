import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Icon from '../../assets/oversea.svg';

import { motion } from 'framer-motion';
import Confetti1 from '../../assets/confetti/confetti1.svg';
import Confetti2 from '../../assets/confetti/confetti2.svg';
import Confetti3 from '../../assets/confetti/confetti3.svg';
import Confetti4 from '../../assets/confetti/confetti4.svg';
import Confetti5 from '../../assets/confetti/confetti5.svg';
import Confetti6 from '../../assets/confetti/confetti6.svg';
import Confetti7 from '../../assets/confetti/confetti7.svg';
import Confetti8 from '../../assets/confetti/confetti8.svg';
import Confetti9 from '../../assets/confetti/confetti9.svg';
// import Confetti10 from '../../assets/confetti/confetti10.svg';
import Confetti11 from '../../assets/confetti/confetti11.svg';
import Confetti12 from '../../assets/confetti/confetti12.svg';
import Confetti13 from '../../assets/confetti/confetti13.svg';
import Confetti14 from '../../assets/confetti/confetti14.svg';
import Confetti15 from '../../assets/confetti/confetti15.svg';
import Confetti16 from '../../assets/confetti/confetti16.svg';
import Confetti17 from '../../assets/confetti/confetti17.svg';
import Confetti18 from '../../assets/confetti/confetti18.svg';
import Confetti19 from '../../assets/confetti/confetti19.svg';

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
  margin-bottom: 8px;
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
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 14px;
  cursor: pointer;
`;

const ConfettiContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1001;
`;

const Confetti = styled(motion.div)`
  position: absolute;
  width: 40px;
  height: 40px;
`;

interface ModalProps {
  onClose: () => void;
}

const HomeModal: React.FC<ModalProps> = ({ onClose }) => {
  const confettiArray = [
    Confetti1,
    Confetti2,
    Confetti3,
    Confetti4,
    Confetti5,
    Confetti6,
    Confetti7,
    Confetti8,
    Confetti9,
    // Confetti10,
    Confetti11,
    Confetti12,
    Confetti13,
    Confetti14,
    Confetti15,
    Confetti16,
    Confetti17,
    Confetti18,
    Confetti19,
  ];

  const [nickname, setNickname] = useState('');

  useEffect(() => {
    // 닉네임 연동
    const storedNickname = localStorage.getItem('userName');

    if (storedNickname) {
      setNickname(storedNickname);
    }
  }, []);

  return (
    <>
      <ConfettiContainer>
        {confettiArray.map((confetti, i) => (
          <Confetti
            key={i}
            initial={{ top: '-140%', opacity: 0 }}
            animate={{ top: '0%', opacity: [1, 0] }}
            transition={{
              duration: 0.6,
              delay: i * 0.2,
              ease: 'easeOut',
            }}
            style={{
              position: 'absolute',
              left: `${-20 + i * 5}%`,
            }}
          >
            <Image src={confetti} alt={`confetti-${i}`} />
          </Confetti>
        ))}
      </ConfettiContainer>

      <ModalOverlay onClick={onClose} />
      <ModalContainer>
        <Title>
          {nickname}님,
          <br />
          온보딩에 오신 것을 환영해요!
        </Title>
        <Image src={Icon} alt="Icon" width={210} height={210} />
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
