import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Image from 'next/image';
import LogoMark from '../../assets/logoMark.svg';
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
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-size: 65px;
  font-weight: 700;
  line-height: 120%; /* 93.6px */
  letter-spacing: -1.44px;
  margin: -180px 0 50px 0;
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
  border-radius: 7.388px;
  box-shadow: 0px 4px 2.3px 0px rgba(0, 0, 0, 0.13);
  padding: 14.775px 19.7px;
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
  top: 25%;
  right: -4%;
  transform: rotate(15deg);
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
    right: -8%;
  }

  @media (max-width: 768px) {
    right: -10%;
  }

  @media (max-width: 480px) {
    right: -14%;
  }
`;

const HomeTop: React.FC = () => {
  const router = useRouter();

  return (
    <TopWrapper>
      <Title>
        Welcome Onboard!
        <br /> Fasten your Learning Journey!
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
          <Image src={LogoMark} alt="logo" width={530.994} height={465.077} />
        </LogoMarkWrapper>
      </Background>
    </TopWrapper>
  );
};

export default HomeTop;
