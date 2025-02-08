import React from 'react';
import styled from 'styled-components';
import Image from 'next/image'; /* 이미지를 가져올 때 StaticImageData 타입을 자동으로 처리 */
import logotypo from '../assets/logoTypo_purple.svg';
import LogoGraphic from '../assets/logoMark.svg';
import TicketGraphic from '../assets/ticket.svg';


const leftUI: React.FC = () => {
  return (
    <LoginPageCover>
      <LogoWrapper>
        <LogoGraphicImg src={LogoGraphic} alt="Logo Graphic" />
      </LogoWrapper>
      <IconWrapper>
        <TicketGraphicImg src={TicketGraphic} alt="Ticket Graphic" />
      </IconWrapper>
      <InstructionContainer>
        <LogoTypoImg src={logotypo} alt="Onboarding" />
        <Instruction1>성장을 원하는 사람들을 위한</Instruction1>
        <Instruction2>가장 빠른 학습 여정 플랫폼</Instruction2>
      </InstructionContainer>
    </LoginPageCover>
  );
};

export default leftUI;

const LoginPageCover = styled.div`
  position: absolute; /* 절대 위치 지정 */
  top: 0;
  left: 0;
  width: 54vw; /* 화면 너비의 54% 사용 */
  // height: 100vh; /* 화면 전체 높이 사용 */
  height: 100%;

  display: flex;
  flex-direction: column;
  border-radius: 0px 32px 32px 0px;
  background-color: rgba(250, 250, 252, 1);
`;

const LogoWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 1%;
  right: 0;
  
  @media (max-width: 768px) {

  }
`;

const LogoGraphicImg = styled(Image)`
  width: 32vw;
  height: auto;


  @media (max-width: 768px) {
    width: 190px;
  }

  @media (max-width: 480px) {
    width: 150px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  position: absolute;
  bottom: -13%;
  left: -19%;
  
  @media (max-width: 768px) {

  }
`;

const TicketGraphicImg = styled(Image)`
  width: 42vw;
  height: auto;


  @media (max-width: 768px) {
    width: 190px;
  }

  @media (max-width: 480px) {
    width: 150px;
  }
`;

const InstructionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;

  position: absolute;
  right: 8%;
  bottom: 5%;

  @media (max-width: 768px) {
    right: 7%;
  }
`;

const LogoTypoImg = styled(Image)`
  // width: 50%;
  width: 230px;
  height: auto;
  margin-bottom: 2%;

  @media (max-width: 768px) {
    width: 190px;
  }

  @media (max-width: 480px) {
    width: 150px;
  }
`;

const Instruction1 = styled.div`
  // font-size: 2.1vw;
  font-size: 28px;
  font-weight: 600;
  color: rgba(79, 83, 87, 1);
  text-align: right;

  @media (max-width: 768px) {
    font-size: 23px;
  }

  @media (max-width: 480px) {
    font-size: 17px;
  }
`;

const Instruction2 = styled.div`
  // font-size: 2.1vw;
  font-size: 28px;
  font-weight: 600;
  color: rgba(79, 83, 87, 1);
  text-align: right;

  @media (max-width: 768px) {
    font-size: 22px;
  }

  @media (max-width: 480px) {
    font-size: 17px;
  }
`;
