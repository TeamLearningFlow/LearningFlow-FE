import React from 'react';
import styled from 'styled-components';

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  height: 50px;
  background-color: rgba(31, 31, 31, 1);
  padding-left: 3%;

  @media (max-width: 560px) {
    padding-left: 5%;
    height: 40px;
  }
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  font-weight: 500;
  margin-left: 15px;
  margin-top: -2px;

  @media (max-width: 560px) {
    font-size: 13px; 
  }
`;

const LineIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 0.9px;
  height: 32px;
  background-color: white;

  @media (max-width: 560px) {
    height: 22px;
  }
`;

const TitleDot = styled.span`
  margin: 0 20px;

  @media (max-width: 560px) {
    margin: 0 15px;
  }
`;

interface TitleBarProps {
  title?: string;
  category?: string;
}

const TitleBar: React.FC<TitleBarProps> = ({
  title = '컬렉션명',
  category = '분야',
}) => {
  return (
    <TitleWrapper>
      <LineIcon />
      <TitleBox>
        {title} <TitleDot>·</TitleDot> {category}
      </TitleBox>
    </TitleWrapper>
  );
};

export default TitleBar;
