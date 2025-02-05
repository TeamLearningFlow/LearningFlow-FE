import React from 'react';
import styled from 'styled-components';

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

const PlatformIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  background-color: rgba(0, 0, 0, 0.08);
  width: 50px;
  height: 50px;
  min-width: 40px;
  min-height: 40px;
  border-radius: 50%;

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
  margin-bottom: 8px;
  height: 20px;
  width: 180px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.08);

  @media (max-width: 850px) {
    margin-bottom: 6px;
  }

  @media (max-width: 560px) {
    margin-bottom: 3px;
    height: 12px;
    width: 70px;
    border-radius: 1px;
  }
`;

const TitleBox = styled.div`
  display: block;
  background-color: rgba(0, 0, 0, 0.08);
  height: 20px;
  width: 380px;
  border-radius: 4px;

  @media (max-width: 850px) {
  }

  @media (max-width: 560px) {
    max-width: 180px;
    height: 12px;
    width: 140px;
    border-radius: 1px;
  }
`;


export const SkeletonClassIndex_S: React.FC = () => {
  return (
    <IndexWrapper>
      <PlatformIcon />
      <IndexContainer>
        <OrderBox />
        <TitleBox />
      </IndexContainer>
    </IndexWrapper>
  );
};

export default SkeletonClassIndex_S;