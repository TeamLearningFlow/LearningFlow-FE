import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import LogoIcon from '/public/logoMarkS.svg';
import Plane from '/public/paperplane.svg';

import Notebook2 from '/public/notebook2.svg';
import Notebook4 from '/public/notebook4.svg';
import Notebook6 from '/public/notebook6.svg';

const MiddleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 1080px;
  background-color: #fff;
  position: relative;
  overflow: hidden;
`;

const HomeMiddleHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconWrapper = styled.div`
  width: 74px;
  height: 64.8px;
  margin-top: 64px;
`;

const HeaderText = styled.div`
  text-align: center;
  margin-top: 28px;

  p {
    color: #959ca4;
    text-align: center;
    font-feature-settings:
      'liga' off,
      'clig' off;
    font-size: 23px;
    font-weight: 500;
    line-height: 150%; /* 36px */
    letter-spacing: -0.48px;

    @media (max-width: 768px) {
      font-size: 20px;
    }

    @media (max-width: 480px) {
      font-size: 15px;
    }
  }

  h1 {
    color: #323538;
    font-feature-settings:
      'liga' off,
      'clig' off;
    font-size: 25px;
    font-weight: 600;
    line-height: 150%; /* 48px */
    letter-spacing: -0.64px;

    @media (max-width: 768px) {
      font-size: 23px;
    }

    @media (max-width: 480px) {
      font-size: 18px;
    }
  }
`;

const StepContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  padding: 40px 120px;
  width: 100%;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`;

const StepBox = styled.div<{ isActive: boolean }>`
  position: relative;
  padding: 32px 30px;
  width: 384px;
  height: 172px;
  border-radius: 9.302px;
  background: ${({ isActive }) => (isActive ? '#5e52ff' : '#fff')};
  box-shadow: ${({ isActive }) =>
    isActive ? 'none' : '0px 3.721px 8.558px 0px #e9e7ff'};
  transition: all 0.3s ease-in-out;
  white-space: nowrap;
  z-index: 1;

  @media (max-width: 480px) {
    width: 380px;
  }

  h3 {
    font-size: 24px;
    font-weight: 600;
    line-height: 150%;
    letter-spacing: -0.48px;
    margin-bottom: 8px;
    color: ${({ isActive }) => (isActive ? '#fff' : '#5e52ff')};
  }

  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.28px;
    color: ${({ isActive }) => (isActive ? '#fff' : '#1f1f1f')};
  }
`;

const NotebookContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  place-items: center;
  width: 1200px;
  height: 100%;
  overflow: hidden;
`;

const NotebookImage = styled(Image)<{ isHovered: boolean }>`
  position: absolute;
  width: 100%;
  max-width: 1200px;
  height: 674px;
  object-fit: contain;
  opacity: ${({ isHovered }) => (isHovered ? '1' : '0')};
  transform: translateY(${({ isHovered }) => (isHovered ? '0' : '200px')});
  transition:
    opacity 0.6s ease-in-out,
    transform 0.6s ease-in-out;
  z-index: 1;
  display: flex;

  @media (max-width: 1024px) {
    max-width: 900px;
    max-height: 50vh;
  }

  @media (max-width: 768px) {
    max-width: 600px;
  }

  @media (max-width: 480px) {
    max-width: 400px;
  }
`;

const PlaneWrapper = styled.div<{ activeStep: number | null }>`
  position: absolute;
  width: 280.943px;
  height: 247.626px;
  transform: rotate(1.135deg);

  ${({ activeStep }) => {
    if (activeStep === 2) {
      return `
        top: 50%;
        left: 40%;
        transform: rotate(17.883deg);
      `;
    }
    if (activeStep === 3) {
      return `
        top: 32%;
        left: 80%;
        transform: rotate(-7.622deg);
      `;
    }
    return `
      top: 670px;
      left: 40px;
      transform: rotate(1.135deg);
    `;
  }}

  @media (max-width: 1024px) {
    display: none;
  }
`;

const HomeMiddle: React.FC = () => {
  const [active, setActive] = useState<number>(1);

  return (
    <MiddleWrapper>
      <HomeMiddleHeader>
        <IconWrapper>
          <Image src={LogoIcon} alt="airplaneicon" width={74} height={64.8} />
        </IconWrapper>
        <HeaderText>
          <p>당신의 곁에서 성장의 순간을 함께합니다</p>
          <h1>학습 플랫폼, Onboarding에 대해 알아볼까요?</h1>
        </HeaderText>
      </HomeMiddleHeader>

      <StepContainer onMouseLeave={() => setActive(1)}>
        <StepBox isActive={active === 1} onMouseEnter={() => setActive(1)}>
          <h3>STEP 1.</h3>
          <p>
            필터 기능을 활용해 맞춤 컬렉션을 탐색해요!
            <br />
            마음에 드는 컬렉션이 있다면 관심 컬렉션으로 저장하고,
            <br />
            언제든 다시 확인하세요!
          </p>
        </StepBox>

        <StepBox isActive={active === 2} onMouseEnter={() => setActive(2)}>
          <h3>STEP 2.</h3>
          <p>
            다양한 사용자들이 추천하는
            <br />
            고품질 무료 콘텐츠를 학습하며 실력을 키워보세요.
            <br />
            학습 여정에 첫 발을 내딛어요!
          </p>
        </StepBox>
        <StepBox isActive={active === 3} onMouseEnter={() => setActive(3)}>
          <h3>STEP 3.</h3>
          <p>
            학습 중인 컬렉션과 학습 완료한 컬렉션을 한눈에 확인하고,
            <br />
            나의 학습 진도율을 체크하며 관리하세요.
            <br />
            꾸준한 학습을 통해 성장하는 나를 경험해보세요!
          </p>
        </StepBox>
      </StepContainer>

      <NotebookContainer>
        <NotebookImage
          src={Notebook2}
          alt="notebook2"
          width={1200}
          height={674}
          isHovered={active === 1}
        />
        <NotebookImage
          src={Notebook4}
          alt="notebook4"
          width={1200}
          height={674}
          isHovered={active === 2}
        />
        <NotebookImage
          src={Notebook6}
          alt="notebook6"
          width={1200}
          height={674}
          isHovered={active === 3}
        />
      </NotebookContainer>

      <PlaneWrapper activeStep={active}>
        <Image src={Plane} alt="paper plane" width={280.943} height={247.626} />
      </PlaneWrapper>
    </MiddleWrapper>
  );
};

export default HomeMiddle;
