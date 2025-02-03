import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import PlayButton from '../../assets/playButton.svg';
import CompletedIndexIcon from '../../assets/completedRadio.svg';
import EndIndexIcon from '../../assets/defaultRadio.svg';

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

const StartComponentWrapper = styled.div`
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

const EndComponentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  width: 80vw;
  gap: 30px;
  margin-bottom: 20px;

  @media (max-width: 850px) {
    gap: 20px;
  }

  @media (max-width: 560px) {
    gap: 8px;
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
    width: 30px;
  }
`;

const IndexIcon = styled.div`
  display: flex;
  width: 45px;
  height: 45px;
  position: relative;

  @media (max-width: 850px) {
    width: 32px;
    height: 32px;
  }

  @media (max-width: 560px) {
    width: 22px;
    height: 22px;
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

  @media (max-width: 370px) {
    width: 50px;
    height: 50px;
    min-width: 40px;
    min-height: 40px;
    top: 38px;
    right: -12px;
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
    background: rgba(245, 245, 255, 1);

    & > ${ButtonWrapper} {
      transform: translate(-10px, -63px);

      @media (max-width: 850px) {
        transform: translate(-7px, -50px);
      }
      @media (max-width: 560px) {
        transform: translate(-4px, -30px);
      }
      @media (max-width: 370px) {
        transform: translate(-6px, -30px);
      }
    }
  }

  @media (max-width: 850px) {
    height: 90px;
  }

  @media (max-width: 560px) {
    height: 50px;
    border-radius: 5px;
  }

  @media (max-width: 370px) {
    height: 45px;
  }
`;

const StartIndexWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 95%;
  height: 100px;

  @media (max-width: 850px) {
    height: 90px;
  }

  @media (max-width: 560px) {
    margin-bottom: 0px;
    height: 60px;
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

const StartIndexContainer = styled.div`
  font-size: 18px;
  font-weight: 600;

  @media (max-width: 850px) {
    font-size: 16px;
  }

  @media (max-width: 560px) {
    font-size: 10px;
  }
`;

const EndIndexContainer = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: rgba(221, 224, 228, 1);

  @media (max-width: 850px) {
    font-size: 16px;
  }

  @media (max-width: 560px) {
    font-size: 10px;
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

  @media (max-width: 370px) {
    margin-left: 9px;
  }
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
    font-size: 8px;
    margin-bottom: 5px;
  }

  @media (max-width: 370px) {
    font-size: 7px;
    margin-bottom: 4px;
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

  @media (max-width: 370px) {
    font-size: 9px;
    margin-bottom: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 170px;
  }
`;

const StartIndex = () => {
  return (
    <StartComponentWrapper>
      <RadioWrapper>
        <IndexIcon>
          <Image
            src={CompletedIndexIcon}
            alt="completed-icon"
            fill
            style={{ objectFit: 'contain' }}
          />
        </IndexIcon>
      </RadioWrapper>

      <StartIndexWrapper>
        <StartIndexContainer>
          Welcome Onboard! 컬렉션 여정을 시작해보세요!
        </StartIndexContainer>
      </StartIndexWrapper>
    </StartComponentWrapper>
  );
};

const EndIndex = () => {
  return (
    <EndComponentWrapper>
      <RadioWrapper>
        <IndexIcon>
          <Image
            src={EndIndexIcon}
            alt="End-icon"
            fill
            style={{ objectFit: 'contain' }}
          />
        </IndexIcon>
      </RadioWrapper>
      <StartIndexWrapper>
        <EndIndexContainer>
            Congrats! 컬렉션 완주를 축하드려요!
        </EndIndexContainer>
      </StartIndexWrapper>
    </EndComponentWrapper>
  );
};

const ClassIndex: React.FC<{ orderText: string; src: string }> = ({
  orderText,
  src,
}) => {
  return (
    <ComponentWrapper>
      <RadioWrapper>
        <IndexIcon>
          <Image
            src={CompletedIndexIcon}
            alt="completed-icon"
            fill
            style={{ objectFit: 'contain' }}
          />
        </IndexIcon>
      </RadioWrapper>
      <IndexWrapper>
        <PlatformIcon>
          <Image
            src={src}
            alt="platform-icon"
            fill
            style={{ objectFit: 'contain' }}
          />
        </PlatformIcon>
        <IndexContainer>
          <OrderBox>{orderText}</OrderBox>
          <TitleBox>브랜치 포스터 "와이어프레임을 활용하는 이유"</TitleBox>
        </IndexContainer>
        <ButtonWrapper>
          <Image
            src={PlayButton}
            alt="Play Button"
            fill
            style={{ objectFit: 'contain' }}
          />
        </ButtonWrapper>
      </IndexWrapper>
    </ComponentWrapper>
  );
};

export { ClassIndex, StartIndex, EndIndex };
