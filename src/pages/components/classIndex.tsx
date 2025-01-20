import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import PlayIcon from '../assets/playIcon.png';

const ComponentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const IndexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80vw;
  background-color: #fafafc;
  border-radius: 20px;
  border: 1px solid rgb(194, 194, 194);
  padding: 0.7% 1%;
`;

const PlatformIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background-color: #dcd9ff;
`;

const PlayButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  width: 110px;
  height: 38px;
  border-radius: 60px;
  background-color: #181818;
  border: none;
  cursor: pointer;

  img{
    margin-right: 5px;
  }
`;

const IndexContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-left: 25px;

`;

const OrderBox = styled.div`
  display: flex;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const TitleBox = styled.div`
  display: flex;
  font-size: 15px;
  font-weight: 600;

`;

const LineIcon = styled.div`
  width: 2px;
  height: 20px;
  background-color: #5e52ff;
  margin-left: -73.5%;
`;

const ClassIndex: React.FC<{ orderText: string }> = ({ orderText }) => {
  return (
      <ComponentWrapper>
        <IndexWrapper>
          <PlatformIcon />
          <IndexContainer>
            <OrderBox>{orderText}</OrderBox>
            <TitleBox>브랜치 포스터 "와이어프레임을 활용하는 이유"</TitleBox>
          </IndexContainer>
          <PlayButton>
            <Image src={PlayIcon} alt="PlayIcon" width={15} height={15} />
            바로 재생
          </PlayButton>
        </IndexWrapper>
        <LineIcon />
      </ComponentWrapper>
  );
};

export default ClassIndex;
