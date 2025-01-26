import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import PlayButton from '../assets/playButton.svg';
import Youtube from '../assets/Youtube.png';
import NextIndexIcon from '../assets/nextIndexIcon.svg';

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

const IndexWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 95%;
  height: 100px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
  padding: 0 1.7%;
  overflow: hidden;
  margin-bottom: 20px;
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

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  position: relative;
  left: 55px;
  margin-top: 63px;
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
            <Image src={Youtube} alt="platform-icon" width={60} height={60} />
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
