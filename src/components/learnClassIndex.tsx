import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import CheckedYoutube from '../assets/checkedYoutube.svg';
import Youtube from '../assets/Youtube.svg';


const IndexWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 70px;
  min-height: 70px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
  padding: 0 1.7%;
  overflow: hidden;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background 0.5s;

  &:hover {
    background: rgba(245, 245, 245, 1);
  }
`;

const CurrentIndexWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 70px;
  min-height: 70px;
  background-color: rgba(245, 245, 255, 1);
  border-radius: 10px;
  padding: 0 1.7%;
  overflow: hidden;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background 0.5s;
`;

const PlatformIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: #dcd9ff;
  overflow: hidden;
`;

const CurrentPlatformIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #dcd9ff;
  border: 3px solid #5e52ff;
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

const CurrentOrderBox = styled.div`
  display: flex;
  font-size: 15px;
  margin-bottom: 8px;
  color: #5e52ff;
`;

const TitleBox = styled.div`
  display: flex;
  font-size: 18px;
  font-weight: 600;
`;


interface ClassListProps {
  orderText?: string;
  title?: string;
}

export const CompletedClass: React.FC<ClassListProps> = ({
  orderText = '1회차',
  title = '브랜치 포스터 "와이어프레임을 활용하는 이유"',
}) => {
  return (
      <IndexWrapper>
        <PlatformIcon>
          <Image src={CheckedYoutube} alt="platform-icon" width={50} height={50} />
        </PlatformIcon>
        <IndexContainer>
          <OrderBox>{orderText}</OrderBox>
          <TitleBox>{title}</TitleBox>
        </IndexContainer>
      </IndexWrapper>
  );
};

export const CurrentClass: React.FC = () => {
  return (
      <CurrentIndexWrapper>
        <CurrentPlatformIcon>
          <Image src={Youtube} alt="platform-icon" width={45} height={45} />
        </CurrentPlatformIcon>
        <IndexContainer>
          <CurrentOrderBox>3회차</CurrentOrderBox>
          <TitleBox>브랜치 포스터 "와이어프레임을 활용하는 이유"</TitleBox>
        </IndexContainer>
      </CurrentIndexWrapper>
  );
};

export const NextClass: React.FC = () => {
    return (
        <IndexWrapper>
          <PlatformIcon>
            <Image src={Youtube} alt="platform-icon" width={45} height={45} />
          </PlatformIcon>
          <IndexContainer>
            <OrderBox>3회차</OrderBox>
            <TitleBox>브랜치 포스터 "와이어프레임을 활용하는 이유"</TitleBox>
          </IndexContainer>
        </IndexWrapper>
    );
};
