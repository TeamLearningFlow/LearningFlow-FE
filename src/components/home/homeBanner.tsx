import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Slider from 'react-slick';
import BannerImage1 from '/public/Banner1edit.svg';
import BannerImage2 from '/public/Banner2edit.svg';
import BannerImage3 from '/public/Banner3edit.svg';
import PrevArrowImage from '/public/left_arrow_ic.svg';
import NextArrowImage from '/public/right_arrow_ic.svg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

/* const BannerWrapper = styled.div`
  width: 100vw;
  height: 250px;
  padding: 0 10%;
  background: rgba(250, 250, 252, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;

  @media (max-width: 480px) {
    height: 22vh;
  }
`; */

const ArrowButton = styled.div`
  position: absolute;
  top: 49%;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 10;
  width: 43px;
  height: 43px;

  &.prev {
    left: 120px;
  }

  &.next {
    right: 120px;
  }

  /* @media (max-width: 850px) {
    width: 30px;
    height: 30px;

    &.prev {
      left: -6%;
    }

    &.next {
      right: -6%;
    }
  }

  @media (max-width: 560px) {
    width: 25px;
    height: 25px;

    &.prev {
      left: -8%;
    }

    &.next {
      right: -8%;
    }
  } */
`;

const BannerImage = styled(Image)`
  width: 100%;
  height: auto;
`

const CustomPrevArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <ArrowButton className="prev" onClick={onClick}>
    <Image
      src={PrevArrowImage}
      alt="Previous"
      fill
      style={{ objectFit: 'contain' }}
    />
  </ArrowButton>
);

const CustomNextArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <ArrowButton className="next" onClick={onClick}>
    <Image
      src={NextArrowImage}
      alt="Next"
      fill
      style={{ objectFit: 'contain' }}
    />
  </ArrowButton>
);

const Banner: React.FC = () => {
  const router = useRouter();

  // 각 배너에 대한 이미지와 이동할 URL 매핑
  const slides = [
    { image: BannerImage1, link: '/collection/21' },
    { image: BannerImage2, link: '/collection/7' },
    { image: BannerImage3, link: '/collection/12' },
  ];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // 자동 슬라이드
    autoplaySpeed: 10000, // 10초마다 넘어감
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <Slider {...settings}>
      {slides.map(({ image, link }, index) => (
        <div
          key={index}
          onClick={() => router.push(link)}
          style={{ cursor: 'pointer' }}
        >
          <BannerImage
            src={image}
            alt={`Banner ${index + 1}`}
          />
        </div>
      ))}
    </Slider>
  );
};

export default Banner;
