import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import CheckedYoutube from '../../assets/platformicon/youtube_checked_ic.svg';
import YoutubeIcon from '../../assets/platformicon/youtube_nostroke_ic.svg';

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

  @media (max-width: 560px) {
    margin-bottom: 3px;
    height: 60px;
    min-height: 60px;
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

  @media (max-width: 560px) {
    margin-bottom: 3px;
    height: 60px;
    min-height: 60px;
  }
`;

const PlatformIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
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
    width: 35px;
    height: 35px;
    min-width: 30px;
    min-height: 30px;
  }
`;

const CurrentPlatformIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
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
    width: 35px;
    height: 35px;
    min-width: 30px;
    min-height: 30px;
  }
`;

const IndexContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-left: 25px;

  @media (max-width: 850px) {

  }

  @media (max-width: 560px) {
    margin-left: 13px;
  }
`;

const OrderBox = styled.div`
  display: flex;
  font-size: 15px;
  margin-bottom: 8px;
  color: rgba(149, 156, 164, 1);

  @media (max-width: 850px) {
    font-size: 12px;
    margin-bottom: 6px;
  }

  @media (max-width: 560px) {
    font-size: 9px;
    margin-bottom: 3px;
  }
`;

const CurrentOrderBox = styled.div`
  display: flex;
  font-size: 15px;
  margin-bottom: 8px;
  color: #5e52ff;

  @media (max-width: 850px) {
    font-size: 12px;
    margin-bottom: 6px;
  }

  @media (max-width: 560px) {
    font-size: 9px;
    margin-bottom: 3px;
  }
`;

const TitleBox = styled.div`
  display: block;
  font-size: 18px;
  font-weight: 600;

  @media (max-width: 850px) {
    font-size: 15px;
  }

  @media (max-width: 560px) {
    font-size: 12px;
    white-space: wrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 180px;
  }
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
        <Image
          src={CheckedYoutube}
          alt="platform-icon"
          fill style={{ objectFit: 'contain' }}
        />
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
        <Image src={YoutubeIcon} alt="platform-icon" fill style={{ objectFit: 'contain' }} />
      </CurrentPlatformIcon>
      <IndexContainer>
        <CurrentOrderBox>6회차</CurrentOrderBox>
        <TitleBox>브랜치 포스터 "와이어프레임을 활용하는 이유"</TitleBox>
      </IndexContainer>
    </CurrentIndexWrapper>
  );
};

export const NextClass: React.FC = () => {
  return (
    <IndexWrapper>
      <PlatformIcon>
        <Image src={YoutubeIcon} alt="platform-icon" fill style={{ objectFit: 'contain' }} />
      </PlatformIcon>
      <IndexContainer>
        <OrderBox>7회차</OrderBox>
        <TitleBox>브랜치 포스터 "와이어프레임을 활용하는 이유"</TitleBox>
      </IndexContainer>
    </IndexWrapper>
  );
};
