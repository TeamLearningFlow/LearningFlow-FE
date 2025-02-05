import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import DefaultRadio from '../../assets/defaultRadio.svg';
import SkeletonPlayButton from '../../assets/skeletonPlayButton.svg';

const ContentWrapper = styled.div`
  display: flex;
  width: 60px;
  height: 100%;
  min-height: 100px;
  justify-content: center;
  align-items: center;

  @media (max-width: 850px) {
    width: 56px;
    min-height: 70px;
  }

  @media (max-width: 560px) {
    min-height: 40px;
    width: 28px;
  }
`;

const LineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(221, 224, 228, 1);
  width: 2px;
  height: 100%;

  @media (max-width: 850px) {
    width: 1.4x;
  }

  @media (max-width: 560px) {
    width: 1px;
  }
`;


const SkeletonIndexLine: React.FC = () => {

  return (
    <ContentWrapper>
      <LineWrapper>
      </LineWrapper>
    </ContentWrapper>
  );
};



const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 40%;
  height: 25px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.08);

  @media (max-width: 850px) {
    height: 25px;
  }

  @media (max-width: 560px) {
    margin-bottom: 0px;
    height: 15px;
    width: 150px;
    border-radius: 1px;
  }
`;


const SkeletonTextIndex: React.FC = () => {
  return (
    <ComponentWrapper>
      <RadioWrapper>
        <IndexIcon>
          <Image
            src={DefaultRadio}
            alt="completed-icon"
            fill
            style={{ objectFit: 'contain' }}
          />
        </IndexIcon>
      </RadioWrapper>
      <TextWrapper>
      </TextWrapper>
    </ComponentWrapper>
  );
};


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
    width: 30px;
    height: 30px;
  }

  @media (max-width: 560px) {
    width: 20px;
    height: 20px;
  }
`;

const ButtonWrapper = styled.div`
  position: relative;
  width: 110px;
  height: 110px;
  min-width: 40px;
  min-height: 40px;

  top: 30px;
  right: -58px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 850px) {
    width: 80px;
    height: 80px;
    top: 30px;
    right: -38px;
  }

  @media (max-width: 480px) {
    width: 45px;
    height: 45px;
    min-width: 40px;
    min-height: 40px;
    top: 15px;
    right: -20px;
  }
`;

const PlatformIcon = styled.div`
 position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.08);
  aspect-ratio: 1 / 1;

  @media (max-width: 850px) {
    width: 45px;
    height: 45px;
  }

  @media (max-width: 560px) {
    width: 30px;
    height: 30px;
  }
`;


const IndexContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-left: 35px;

  @media (max-width: 560px) {
    margin-left: 12px;
    margin-top: 5px;
  }

  @media (max-width: 370px) {
    margin-left: 9px;
    margin-top: 5px;
  }
`;

const OrderBox = styled.div`
  display: flex;
  width: 180px;
  height: 25px;
  margin-bottom: 8px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.08);

  @media (max-width: 850px) {
    margin-bottom: 7px;
    height: 18px;
    width: 150px;
  }

  @media (max-width: 560px) {
    margin-bottom: 5px;
    height: 11px;
    width: 75px;
    border-radius: 1px;
  }

  @media (max-width: 370px) {
    margin-bottom: 4px;
    height: 11px;
    width: 75px;
    border-radius: 1px;
  }
`;

const TitleBox = styled.div`
  display: flex;
  width: 400px;
  height: 25px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.08);

  @media (max-width: 850px) {
    margin-bottom: 7px;
    width: 300px;
    height: 20px;
  }

  @media (max-width: 560px) {
    width: 140px;
    height: 11px;
    border-radius: 1px;
  }

  @media (max-width: 370px) {
    width: 140px;
    height: 11px;
    border-radius: 1px;
  }
`;

const SkeletonClassIndex: React.FC = () => {
  return (
    <ComponentWrapper>
      <RadioWrapper>
        <IndexIcon>
          <Image
            src={DefaultRadio}
            alt="completed-icon"
            fill
            style={{ objectFit: 'contain' }}
          />
        </IndexIcon>
      </RadioWrapper>
      <IndexWrapper>
        <PlatformIcon></PlatformIcon>
        <IndexContainer>
          <OrderBox></OrderBox>
          <TitleBox></TitleBox>
        </IndexContainer>
        <ButtonWrapper>
        <Image src={SkeletonPlayButton} alt="Play Button" fill style={{ objectFit: 'contain' }} />
        </ButtonWrapper>
      </IndexWrapper>
    </ComponentWrapper>
  );
};

export { SkeletonIndexLine, SkeletonTextIndex, SkeletonClassIndex};

