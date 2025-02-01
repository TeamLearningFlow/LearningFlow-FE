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
`;

const IndexIcon = styled.div`
  display: flex;
  width: 100px;
  height: 120px;
  right: 1.5vw;
  position: relative;
  top: 3.5vh;

  border: 1px solid red;

  @media (max-width: 850px) {
    width: 70px;
    height: 90px;
  }

  @media (max-width: 560px) {
    width: 40px;
    height: 40px;
    top: 2.5vh;
  }
`;

const EndIconContainer = styled.div`
  display: flex;
  width: 38px;
  height: 38px;
  right: -9px;
  position: relative;
  top: 30px;
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
    top: 66px;
    right: -48px;
    width: 90px;
    height: 90px;
  }

  @media (max-width: 560px) {
    top: 66px;
    right: -48px;
    width: 90px;
    height: 90px;
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
  padding: 0 1.7%;
  overflow: hidden;
  margin-bottom: 20px;
  cursor: pointer;
  transition: background 0.5s;

  &:hover {
    background: rgba(245, 245, 255, 1);

    & > ${ButtonWrapper} {
      transform: translate(-10px, -63px);

      @media (max-width: 850px) {
        transform: translate(-7px, -50px);
      }
@media (max-width: 560px) {
    
  }
    }
  }

  @media (max-width: 850px) {
    height: 80px;
    padding: 0 3%;
    margin-bottom: 15px;
    
  }

  @media (max-width: 560px) {
    height: 50px;
    padding: 0 5%;
    margin-bottom: 8px;
  }
`;

const StartIndexWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 95%;
  margin-bottom: 20px;

  @media (max-width: 850px) {

  }

  @media (max-width: 560px) {
    margin-bottom: 0px;
  }
`; 

const PlatformIcon = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  min-width: 40px;
  min-height: 40px;

  @media (max-width: 850px) {
    width: 45px;
    height: 45px;
    min-width: 35px;
    min-height: 35px;
  }

  @media (max-width: 560px) {
    width: 40px;
    height: 40px;
    min-width: 30px;
    min-height: 30px;
  }
`;

const StartIndexContainer = styled.div`
  font-size: 18px;
  font-weight: 600;

  @media (max-width: 850px) {

  }

  @media (max-width: 560px) {
    font-size: 8px;
  }
`;

const EndIndexContainer = styled.div`
  margin-left: 45px;
  position: relative;
  top: 3.5vh;

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

  @media (max-width: 850px) {
    font-size: 13px;
    margin-bottom: 7px;
  }

  @media (max-width: 560px) {
    font-size: 10px;
    margin-bottom: 5px;
  }
`;

const TitleBox = styled.div`
  display: inline-block;
  font-size: 18px;
  font-weight: 600;

  @media (max-width: 850px) {
    font-size: 16px;
    margin-bottom: 7px;
  }

  @media (max-width: 560px) {
    font-size: 12px;
    margin-bottom: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 150px; 
  }
`;

const StartIndex = () => {
  return (
    <ComponentWrapper>
      <IndexIcon>
        <Image src={CompletedIndexIcon} alt="completed-icon" fill style={{ objectFit: 'contain' }} />
      </IndexIcon>
      <StartIndexWrapper>
        <StartIndexContainer>
          Welcome Onboard! 컬렉션 여정을 시작해보세요!
        </StartIndexContainer>
      </StartIndexWrapper>
    </ComponentWrapper>
  );
};

const EndIndex = () => {
  return (
    <ComponentWrapper>
      <EndIconContainer>
        <Image src={EndIndexIcon} alt="End-icon" fill style={{ objectFit: 'contain' }} />
      </EndIconContainer>
      <StartIndexWrapper>
        <EndIndexContainer>
          <p style={{fontSize: '18px', fontWeight: '600', color:'rgba(221, 224, 228, 1)'}}>Congrats! 컬렉션 완주를 축하드려요!</p>
        </EndIndexContainer>
      </StartIndexWrapper>
    </ComponentWrapper>
  );
};

const ClassIndex: React.FC<{ orderText: string; src: string }> = ({ orderText, src }) => {
  return (
    <ComponentWrapper>
      <IndexIcon>
        <Image src={CompletedIndexIcon} alt="completed-icon" fill style={{ objectFit: 'contain' }} />
      </IndexIcon>
      <IndexWrapper>
        <PlatformIcon>
          <Image src={src} alt="platform-icon" fill style={{ objectFit: 'contain' }} />
        </PlatformIcon>
        <IndexContainer>
          <OrderBox>{orderText}</OrderBox>
          <TitleBox>브랜치 포스터 "와이어프레임을 활용하는 이유"</TitleBox>
        </IndexContainer>
        <ButtonWrapper>
          <Image src={PlayButton} alt="Play Button" fill style={{ objectFit: 'contain' }} />
        </ButtonWrapper>
      </IndexWrapper>
    </ComponentWrapper>
  );
};

export {ClassIndex, StartIndex, EndIndex};
