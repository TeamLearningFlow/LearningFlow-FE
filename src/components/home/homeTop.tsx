import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Image from 'next/image';
import LogoGraphic from '../../assets/logoMark.svg';
import Airplane from '../../assets/homeAirplane.svg';
import Window from '../../assets/homeWindow.svg'; // 이미지 수정 필요
import Search from '../../assets/searchIcon.svg';

const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 1020px;
  background-color: #fff;
  position: relative;
  overflow-x: hidden;

  @media (max-width: 1024px) {
    height: 900px;
  }

  @media (max-width: 768px) {
    height: 800px;
  }

  @media (max-width: 480px) {
    height: 700px;
  }
`;

const Title = styled.h1`
  color: #000;
  text-align: center;
  font-family: 'Sandoll Geobok'; // 글씨체 변경 필요
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-size: 66px;
  font-weight: 700;
  line-height: 130%; /* 93.6px */
  letter-spacing: -1.32px;
  margin: -259px 0 82px 0;
  z-index: 1;

  @media (max-width: 1024px) {
    font-size: 55px;
    margin-top: -150px;
  }

  @media (max-width: 768px) {
    font-size: 45px;
    margin: -120px 0 40px 0;
  }

  @media (max-width: 480px) {
    font-size: 30px;
    margin-top: -90px;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 1.5px 2px 8px 0px rgba(0, 0, 0, 0.1);
  padding: 14px 20px;
  width: 65%;
  height: 65px;
  cursor: pointer;
  z-index: 1;

  @media (max-width: 1024px) {
    height: 60px;
  }

  @media (max-width: 768px) {
    height: 50px;
  }
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: none;
  font-size: 17px;
  font-weight: 500;
  line-height: 150%; /* 29.55px */
  letter-spacing: -0.394px;
  text-overflow: ellipsis;
  color: #1f1f1f;

  &::placeholder {
    color: #afb8c1;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 40px;
    height: 40px;

    @media (max-width: 768px) {
      width: 30px;
      height: 30px;
    }

    @media (max-width: 480px) {
      width: 25px;
      height: 25px;
    }
  }
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 1020px;
  top: 0;
  left: 0;
  background-color: transparent;

  @media (max-width: 1024px) {
    height: 900px;
  }

  @media (max-width: 768px) {
    height: 800px;
  }

  @media (max-width: 480px) {
    height: 700px;
  }
`;

const AirplaneWrapper = styled.div`
  position: absolute;
  top: 1%;
  left: 5%;
  // flex-shrink: 0;

  img {
    width: 600px;
    height: 500px;

    @media (max-width: 1024px) {
      width: 500px;
      height: 400px;
    }

    @media (max-width: 768px) {
      width: 400px;
      height: 300px;
    }

    @media (max-width: 480px) {
      width: 400px;
      height: 300px;
    }
  }

  @media (max-width: 1024px) {
    top: 0%;
  }

  @media (max-width: 768px) {
    top: 2%;
    left: 2%;
  }

  @media (max-width: 480px) {
    left: -17%;
  }
`;

const WindowWrapper = styled.div`
  position: absolute;
  bottom: 15%;
  left: 0;
  // flex-shrink: 0;

  img {
    width: 466.39px;
    height: 618.061px;

    @media (max-width: 1024px) {
      width: 400px;
      height: 600px;
    }

    @media (max-width: 768px) {
      width: 320px;
      height: 500px;
    }

    @media (max-width: 480px) {
      width: 280px;
      height: 400px;
    }
  }
`;

const LogoMarkWrapper = styled.div`
  position: absolute;
  top: 30%;
  right: -2%;
  // transform: rotate(0deg);
  // flex-shrink: 0;

  img {
    width: 530.994px;
    height: 465.077px;

    @media (max-width: 1024px) {
      width: 500px;
      height: 400px;
    }

    @media (max-width: 768px) {
      width: 400px;
      height: 300px;
    }

    @media (max-width: 480px) {
      width: 300px;
      height: 200px;
    }
  }

  @media (max-width: 1024px) {
    right: -6%;
  }

  @media (max-width: 768px) {
    right: -8%;
  }

  @media (max-width: 480px) {
    right: -12%;
  }
`;

const LogoGraphicImg = styled(Image)`
  // width: 35vw;
  height: auto;
  animation: floatUpDown 1.5s ease-in-out infinite alternate;

  @keyframes floatUpDown {
    0% {
      transform: translateY(0px);
    }
    100% {
      transform: translateY(-8px);
    }
  }
`;

const ShadowWrapper = styled.div`
  position: absolute;
  bottom: 18%;
  right: -5%;
  width: 28vw;
  height: 4vh;
  background: rgba(172, 172, 172, 0.3);
  filter: blur(35px);
  border-radius: 402.5px;
  z-index: 0;

  animation: shadowGlow 1.5s ease-in-out infinite alternate;

  @keyframes shadowGlow {
    0% {
      background: rgba(172, 172, 172, 0.3);
      filter: blur(25px) brightness(0.9);
    }
    100% {
      background: rgba(172, 172, 172, 0.3);
      filter: blur(40px) brightness(1.2);
    }
  }
`;

const HomeTop: React.FC = () => {
  const router = useRouter();

  return (
    <TopWrapper>
      <Title>
        Welcome Onboard!
        <br /> Fasten your Learning
        <br /> Journey!
      </Title>

      <SearchWrapper onClick={() => router.push('/search')}>
        <Input type="text" placeholder="찾고 싶은 컬렉션을 검색해보세요." />
        <SearchIcon>
          <Image src={Search} alt="searchicon" width={40} height={40} />
        </SearchIcon>
      </SearchWrapper>

      <Background>
        <AirplaneWrapper>
          <Image src={Airplane} alt="airplane" width={600} height={500} />
        </AirplaneWrapper>
        <WindowWrapper>
          <Image src={Window} alt="window" width={466.39} height={618.061} />
        </WindowWrapper>
        <LogoMarkWrapper>
          <LogoGraphicImg
            src={LogoGraphic}
            alt="logo"
            width={530.994}
            height={465.077}
          />
        </LogoMarkWrapper>
        <ShadowWrapper />
      </Background>
    </TopWrapper>
  );
};

export default HomeTop;
