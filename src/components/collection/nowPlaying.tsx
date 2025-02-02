import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import CurrentPlayButton from '../../assets/currentPlayButton.svg';
import HoverPlayButton from '../../assets/hoverPlayButton.svg';
import ActiveRadio from '../../assets/activeRadio.svg';
import YoutubeHoverIcon from '../../assets/platformicon/youtube_ic.svg';
import YoutubeActiveIcon from '../../assets/platformicon/youtube_active_ic.svg';

const ComponentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  width: 80vw;
  gap: 30px;
  margin-bottom: 20px;

  @media (max-width: 850px) {
    margin-bottom: 15px;
    gap: 20px;
  }

  @media (max-width: 560px) {
    margin-bottom: 10px;
    gap: 8px;
  }
`;

const IndexIcon = styled.div`
  display: flex;
  width: 55px;
  height: 55px;
  position: relative;

  @media (max-width: 850px) {
    width: 44px;
    height: 44px;
  }

  @media (max-width: 560px) {
    width: 25px;
    height: 25px;
  }
`;


const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  min-height: 100px;

  @media (max-width: 850px) {
    min-height: 70px;
  }

  @media (max-width: 560px) {
    min-height: 40px;
    width: 20px;
  }
`;

const ButtonWrapper = styled.div`
  position: relative;
  width: 110px;
  height: 110px;
  min-width: 40px;
  min-height: 40px;

  top: 85px;
  right: -48px;
  transform: translateY(-50%);
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 850px) {
    width: 90px;
    height: 90px;
    top: 75px;
    right: -40px;
  }

  @media (max-width: 560px) {
    width: 50px;
    height: 50px;
    min-width: 40px;
    min-height: 40px;
    top: 37px;
    right: -17px;
  }
`;

const OrderBox = styled.div`
  display: flex;
  font-size: 15px;
  margin-bottom: 8px;
  color: rgba(94, 82, 255, 1);

  @media (max-width: 850px) {
    font-size: 13px;
    margin-bottom: 7px;
  }

  @media (max-width: 560px) {
    font-size: 8px;
    margin-bottom: 5px;
  }
`;

const IndexContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-left: 35px;

  @media (max-width: 560px) {
    margin-left: 12px;
  }
`;

const PlatformIcon = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  min-width: 40px;
  min-height: 40px;

  @media (max-width: 850px) {
    width: 45px;
    height: 45px;
    min-width: 35px;
    min-height: 35px;
  }

  @media (max-width: 560px) {
    width: 30px;
    height: 30px;
    min-width: 25px;
    min-height: 25px;
  }
`;

const IndexWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 95%;
  height: 100px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
  padding: 0 2.5%;
  overflow: hidden;
  cursor: pointer;
  transition: background 0.5s;

  &:hover {
    background: rgba(94, 82, 255, 1);
    color: rgba(255, 255, 255, 1);

    & > ${ButtonWrapper} {
      transform: translate(-10px, -63px);

      @media (max-width: 850px) {
        transform: translate(-7px, -50px);
      }
      @media (max-width: 560px) {
        transform: translate(-4px, -30px);
      }
    }

    & ${IndexContainer} ${OrderBox} {
      color: rgba(232, 232, 255, 1);
    }
  }

  @media (max-width: 850px) {
    height: 90px;
  }

  @media (max-width: 560px) {
    height: 50px;
  }
`;

const TitleBox = styled.div`
  display: inline-block;
  font-size: 18px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 650px;

  @media (max-width: 850px) {
    font-size: 16px;
    margin-bottom: 7px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 400px;
  }

  @media (max-width: 560px) {
    font-size: 10px;
    margin-bottom: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 180px;
  }
`;

const NowPlaying: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ComponentWrapper>
      <RadioWrapper>
        <IndexIcon>
          <Image
            src={ActiveRadio}
            alt="Active-icon"
            fill
            style={{ objectFit: 'contain' }}
          />
        </IndexIcon>
      </RadioWrapper>
      <IndexWrapper
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <PlatformIcon>
          <Image
            src={isHovered ? YoutubeHoverIcon : YoutubeActiveIcon}
            alt="platform-icon"
            fill
            style={{ objectFit: 'contain' }}
          />
        </PlatformIcon>
        <IndexContainer>
          <OrderBox>3회차</OrderBox>
          <TitleBox>브랜치 포스터 "와이어프레임을 활용하는 이유"</TitleBox>
        </IndexContainer>
        <ButtonWrapper>
          <Image
            src={isHovered ? HoverPlayButton : CurrentPlayButton}
            alt="Current Play Button"
            fill
            style={{ objectFit: 'contain' }}
          />
        </ButtonWrapper>
      </IndexWrapper>
    </ComponentWrapper>
  );
};

export default NowPlaying;
