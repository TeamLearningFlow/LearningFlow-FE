import React from 'react';
import styled from 'styled-components';
import Image from 'next/image'; /* 이미지를 가져올 때 StaticImageData 타입을 자동으로 처리 */
import logotypo from '../assets/LogoTypo_dark.png';

const leftUI: React.FC = () => {
  return (
    <LoginPageCover>
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
  background-color: #323538;
`;

const InstructionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;

  position: absolute;
  right: 8%;
  bottom: 8%;
`;

const LogoTypoImg = styled(Image)`
  // width: 50%;
  width: 230px;
  height: auto;
  margin-bottom: 2%;
`;

const Instruction1 = styled.div`
  // font-size: 2.1vw;
  font-size: 28px;
  font-weight: 500;
  color: #dcd9ff;
  text-align: right;
`;

const Instruction2 = styled.div`
  // font-size: 2.1vw;
  font-size: 28px;
  font-weight: 500;
  color: #dcd9ff;
  text-align: right;
`;
