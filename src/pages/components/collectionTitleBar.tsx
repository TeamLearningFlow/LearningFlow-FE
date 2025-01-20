import React from 'react';
import styled from 'styled-components';

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  height: 50px;
  background: linear-gradient(to right, #5e52ff, #383199);
  padding-left: 10%;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  font-weight: 500;
  margin-left: 12px;
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

interface TitleBarProps {
  title?: string;
}

const TitleBar: React.FC<TitleBarProps> = ({ title = '와이어프레임 입문' }) => {
  return (
    <TitleWrapper>
      <LineIcon />
      <TitleBox>{title}</TitleBox>
    </TitleWrapper>
  );
};

export default TitleBar;
