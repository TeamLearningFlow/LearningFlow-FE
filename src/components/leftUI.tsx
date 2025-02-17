import React from 'react';
import styled from 'styled-components';
import Image from 'next/image'; /* 이미지를 가져올 때 StaticImageData 타입을 자동으로 처리 */
import LogoGraphic from '/public/logoMark.svg';
import PlaneGraphic from '/public/PlaneGraphic.svg';
import NoteBookGraphic from '/public/noteBook.svg';

const leftUI: React.FC = () => {
  return (
    <LoginPageCover>
      <ShadowWrapper />
      <LogoWrapper>
        <LogoGraphicImg src={LogoGraphic} alt="Logo Graphic" />
      </LogoWrapper>
      <IconWrapper>
        <PlaneGraphicImg src={PlaneGraphic} alt="Plane Graphic" />
      </IconWrapper>
      <NoteBookWrapper>
        <NoteBookGraphicImg src={NoteBookGraphic} alt="NoteBook Graphic" />
      </NoteBookWrapper>
      <InstructionContainer>
        <Instruction1>성장을 원한다면,</Instruction1>
        <Instruction2>
          지금 바로 <span>탑승하세요.</span>
        </Instruction2>
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
  overflow: hidden;

  display: flex;
  flex-direction: column;
  border-radius: 0px 32px 32px 0px;
  background-color: rgba(250, 250, 252, 1);
`;

const LogoWrapper = styled.div`
  display: flex;
  position: absolute;
  bottom: 14%;
  right: -2%;
  // transform: rotate(15deg);

  
  @media (max-width: 768px) {

  }
`;

const LogoGraphicImg = styled(Image)`
  width: 35vw;
  height: auto;
  animation: floatUpDown 1.5s ease-in-out infinite alternate;

  @media (max-width: 768px) {
    width: 190px;
  }

  @media (max-width: 480px) {
    width: 150px;
  }

  @keyframes floatUpDown {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-25px);
    }
  }
`;

const ShadowWrapper = styled.div`
  position: absolute;
  bottom: 5%;
  right: -10%;
  width: 28vw;
  height: 4vh;
  background: rgba(172, 172, 172, 0.55);
  filter: blur(25px) brightness(1);
  border-radius: 50%;
  z-index: 0;

  animation: shadowGlow 1.5s ease-in-out infinite alternate;

  @keyframes shadowGlow {
    0% {
      background: rgba(172, 172, 172, 0.55);
      filter: blur(25px) brightness(1);
    }
    100% {
      background: rgba(172, 172, 172, 0.3); 
      filter: blur(40px) brightness(1.5);
    }
  }
`;


const IconWrapper = styled.div`
  display: flex;
  position: absolute;
  bottom: 29%;
  left: 18%;
  
  @media (max-width: 768px) {

  }
`;

const PlaneGraphicImg = styled(Image)`
  width: 36vw;
  height: auto;
  transform: rotate(5deg);

  @media (max-width: 768px) {
    width: 190px;
  }

  @media (max-width: 480px) {
    width: 150px;
  }
`;

const NoteBookWrapper = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;

  
  @media (max-width: 768px) {

  }
`;

const NoteBookGraphicImg = styled(Image)`
  width: 55vw;
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
  align-items: left;

  position: absolute;
  left: 8%;
  top: 16%;

  @media (max-width: 768px) {
    right: 7%;
  }
`;

const Instruction1 = styled.div`
  font-size: 47px;
  font-weight: 600;
  color: #181818;
  text-align: left;
  letter-spacing: -1.5px;

  @media (max-width: 768px) {
    font-size: 23px;
  }

  @media (max-width: 480px) {
    font-size: 17px;
  }
`;

const Instruction2 = styled.div`
  font-size: 47px;
  font-weight: 600;
  text-align: left;
  letter-spacing: -1.5px;

  @media (max-width: 768px) {
    font-size: 22px;
  }

  @media (max-width: 480px) {
    font-size: 17px;
  }

  span {
    color: #7a71f5;
  }
`;
