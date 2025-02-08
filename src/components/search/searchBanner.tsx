import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import BannerText from '../../assets/bannerTextP.svg';
import Logo from '../../assets/bannerLogo.svg';
import Plane from '../../assets/paperplane.svg';

const BannerWrapper = styled.div`
  width: 100%;
  height: 250px;
  padding: 0 10%;
  background: linear-gradient(
    90deg,
    rgba(250, 250, 252, 1),
    rgba(244, 244, 255, 1)
  );
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  position: relative;

  @media (max-width: 480px) {
    height: 22vh;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 592.895px;
    height: 661.127px;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 100%;
  height: 100%;
  margin-left: 10%;
  z-index: 1;

  @media (max-width: 768px) {
    margin-left: 7%;
  }

  @media (max-width: 480px) {
    margin-left: 5%;
  }
`;

const Title = styled.div`
  color: rgba(31, 31, 31, 1);
  width: 462px;
  font-size: 33px;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.76px;
  justify-content: center;

  @media (max-width: 1024px) {
    font-size: 30px;
  }

  @media (max-width: 768px) {
    font-size: 27px;
  }

  @media (max-width: 480px) {
    font-size: 4vw;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 40px;
  margin-bottom: 0.2vh;

  @media (max-width: 768px) {
    width: 180px;
    height: 30px;
    margin-bottom: 0.2vh;
  }

  @media (max-width: 480px) {
    width: 130px;
    height: 25px;
  }
`;

const PlaneIcon = styled(Image)`
  position: absolute;
  width: 200px;
  height: 200px;
  top: 25%;
  left: 53%;
  transform: rotate(1deg);

  @media (max-width: 1024px) {
    width: 170px;
    height: 170px;
    left: 57%;
  }

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
    left: 60%;
  }

  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
    left: 64%;
  }
`;

const Banner: React.FC = () => {
  return (
    <BannerWrapper>
      <TextWrapper>
        <ImageWrapper>
          <Image
            src={BannerText}
            alt="Banner Text"
            fill
            style={{ objectFit: 'contain' }}
          />
        </ImageWrapper>
        <Title>어디로 학습 여정을 떠나볼까요?</Title>
      </TextWrapper>

        <PlaneIcon src={Plane} alt="paperplane" />
    
      <LogoWrapper>
        <Image src={Logo} alt="Logo Mark" width={592.895} height={661.127} />
      </LogoWrapper>
    </BannerWrapper>
  );
};

export default Banner;
