import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import BannerText from '../../assets/bannerText.svg';
import PrevArrowImage from '../../assets//left_arrow_ic.svg';
import NextArrowImage from '../../assets/right_arrow_ic.svg';
import LogoMark from '../../assets/logoMark.svg';

const BannerWrapper = styled.div`
  width: 100vw;
  height: 250px;
  padding: 0 10%;
  background: linear-gradient(90deg,rgba(250, 250, 252, 1),rgba(244, 244, 255, 1));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;

  @media (max-width: 480px) {
    height: 22vh;
  }
`;

const LogoWrapper = styled.div`
  position: absolute;
  top: 14%;
  right: 16%;
  transform: translateY(-50%);
  width: 120px;
  height: 120px;
  pointer-events: none;

  @media (max-width: 850px) {
    top: 4%;
    right: 28%;
    width: 60px;
    height: 60px;
  }

  @media (max-width: 560px) {
    width: 60px;
    height: 60px;
  }
`;


const Slide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 100%; 
  height: 100%;
  margin-left: 10%;

  @media (max-width: 480px) {
    margin-left: 0;
    padding: 0 5%;
  }
`;

const TextWrapper = styled.div`
  color: rgba(31, 31, 31, 1);
  font-size: 30px;
  font-weight: 600;
  line-height: 1.5em;
  justify-content: center;

  @media (max-width: 850px) {
    font-size: 23px;
  }

  @media (max-width: 560px) {
    font-size: 4vw;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 40px;
  margin-bottom: 0.4vh;

  @media (max-width: 850px) {
    width: 180px;
    height: 30px;
    margin-bottom: 0.2vh;
  }

  @media (max-width: 560px) {
    width: 130px;
    height: 25px;
  }
`;

const Banner: React.FC = () => {

  return (
    <BannerWrapper>
      <LogoWrapper>
        <Image src={LogoMark} alt="Logo Mark" width={310} height={310} />
      </LogoWrapper>
          <Slide>
            <ImageWrapper>
              <Image src={BannerText} alt="Banner Text" fill style={{ objectFit: 'contain' }} />
            </ImageWrapper>
            <TextWrapper>
              성장을 원하는 사람들을 위한<br />가장 빠른 학습 여정 플랫폼, 온보딩
            </TextWrapper>
          </Slide>
    </BannerWrapper>
  );
};

export default Banner;
