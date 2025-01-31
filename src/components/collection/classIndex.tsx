import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import PlayButton from '../../assets/playButton.svg';
import CompletedIndexIcon from '../../assets/completedIndexIcon.svg';
import EndIndexIcon from '../../assets/EndIndexIcon.svg';

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
  top: 32px;
`;

const EndIconContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 5%;
  min-width: 50px; 
  height: 100px; 
  border-radius: 5px;
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

const StartIndexWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 95%;
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

const StartIndexContainer = styled.div`

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

const StartIndex = () => {
  return (
    <ComponentWrapper>
      <IndexIcon>
        <Image src={CompletedIndexIcon} alt="completed-icon" width={85} height={200} />
      </IndexIcon>
      <StartIndexWrapper>
        <StartIndexContainer>
          <p style={{fontSize: '18px', fontWeight: '600'}}>Welcome Onboard! 컬렉션 여정을 시작해보세요!</p>
        </StartIndexContainer>
      </StartIndexWrapper>
    </ComponentWrapper>
  );
};

const EndIndex = () => {
  return (
    <ComponentWrapper>
      <EndIconContainer>
        <Image src={EndIndexIcon} alt="End-icon" width={37} height={90} />
      </EndIconContainer>
      <StartIndexWrapper>
        <StartIndexContainer>
          <p style={{fontSize: '18px', fontWeight: '600', color:'rgba(221, 224, 228, 1)'}}>Congrats! 컬렉션 완주를 축하드려요!</p>
        </StartIndexContainer>
      </StartIndexWrapper>
    </ComponentWrapper>
  );
};

const ClassIndex: React.FC<{ orderText: string; src: string }> = ({ orderText, src }) => {
  return (
    <ComponentWrapper>
      <IndexIcon>
        <Image src={CompletedIndexIcon} alt="completed-icon" width={85} height={200} />
      </IndexIcon>
      <IndexWrapper>
        <PlatformIcon>
          <Image src={src} alt="platform-icon" width={60} height={60} />
        </PlatformIcon>
        <IndexContainer>
          <OrderBox>{orderText}</OrderBox>
          <TitleBox>브랜치 포스터 "와이어프레임을 활용하는 이유"</TitleBox>
        </IndexContainer>
        <ButtonWrapper>
          <Image src={PlayButton} alt="Play Button" width={100} height={100} />
        </ButtonWrapper>
      </IndexWrapper>
    </ComponentWrapper>
  );
};

export {ClassIndex, StartIndex, EndIndex};
