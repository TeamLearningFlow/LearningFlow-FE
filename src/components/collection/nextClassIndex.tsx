import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import PlayButton from '../../assets/playButton.svg';
import YoutubeIcon from '../../assets/platformicon/youtube_nostroke_ic.svg';
import NextIndexIcon from '../../assets/nextIndexIcon.svg';

const ComponentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 80vw;
  gap: 20px;
`;

const IndexIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5%;
  min-width: 50px;
  height: 100px;
  border-radius: 5px;
  position: relative;
  top: 30px;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 82px;
  right: -34px;
  transform: translateY(-50%);
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IndexWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 95%;
  height: 100px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
  padding: 0 1.7%;
  overflow: hidden;
  margin-bottom: 20px;
  cursor: pointer;
  transition: background 0.5s;

  &:hover {
    background: rgba(245, 245, 255, 1);

    & > ${ButtonWrapper} {
      transform: translate(-10px, -58px);
    }
  }
`;

const PlatformIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #dcd9ff;
  overflow: hidden;
`;


const IndexContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-left: 25px;
`;

const OrderBox = styled.div`
  display: flex;
  font-size: 15px;
  margin-bottom: 8px;
  color: rgba(149, 156, 164, 1);
`;

const TitleBox = styled.div`
  display: flex;
  font-size: 18px;
  font-weight: 600;
`;

const NextClassIndex: React.FC = () => {
  return (
      <ComponentWrapper>
        <IndexIcon>
          <Image src={NextIndexIcon} alt="Next-icon" width={85} height={200} />
        </IndexIcon>
        <IndexWrapper>
          <PlatformIcon>
            <Image src={YoutubeIcon} alt="platform-icon" width={60} height={60} />
          </PlatformIcon>
          <IndexContainer>
            <OrderBox>3회차</OrderBox>
            <TitleBox>브랜치 포스터 "와이어프레임을 활용하는 이유"</TitleBox>
          </IndexContainer>
          <ButtonWrapper>
            <Image src={PlayButton} alt="Next Play Button" width={100} height={100} />
          </ButtonWrapper>
        </IndexWrapper>
      </ComponentWrapper>
  );
};

export default NextClassIndex;
