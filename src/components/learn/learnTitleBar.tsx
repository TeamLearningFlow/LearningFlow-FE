import React from 'react';
import styled from 'styled-components';

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  height: 50px;
  background-color: rgba(31, 31, 31, 1);
  padding-left: 3%;
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
  
`;

const LineIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 0.9px;
  height: 32px;
  background-color: white;
`;

const TitleDot = styled.span`
  margin: 0 20px;
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
