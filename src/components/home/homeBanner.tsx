import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Slider from 'react-slick';
import BannerText from '../../assets/bannerText.svg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BannerWrapper = styled.div`
  width: 100%;
  height: 250px;
  padding: 0 10%;
  background: linear-gradient(to right, #5e52ff, #383199);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Slide = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 90%; 
  height: 100%;
  margin-left: 10%;
`;

const CustomSlider = styled(Slider)`
  width: 100%;
  position: relative; /* 버튼을 부모 기준으로 배치 */

  .slick-prev, .slick-next {
    position: absolute;
    top: 50%;
    margin: 0 2%;
    transform: translateY(-50%);
    z-index: 10;
  }

  .slick-prev:before, .slick-next:before {
    font-size: 35px;
    color: white;
  }
`;


const TextWrapper = styled.div`
  color: rgba(255, 255, 255, 1);
  font-size: 30px;
  font-weight: 600;
  line-height: 1.5em;
  justify-content: center;
`;

const Banner: React.FC = () => {
  const slides = [
    '성장을 원하는 사람들을 위한<br />가장 빠른 학습 여정 플랫폼, 온보딩',
    '홈페이지<br />배너 내용 1',
    '홈페이지<br />배너 내용 2'
  ];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    //dots: true,
    //autoplay: true,
    //autoplaySpeed: 3000,
  };

  return (
    <BannerWrapper>
      <CustomSlider {...settings}>
        {slides.map((text, index) => (
          <Slide key={index}>
            <Image src={BannerText} alt="Banner Text" width={220} height={40} />
            <TextWrapper dangerouslySetInnerHTML={{ __html: text }} />
          </Slide>
        ))}
      </CustomSlider>
    </BannerWrapper>
  );
};

export default Banner;
