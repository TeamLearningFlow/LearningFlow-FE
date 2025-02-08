import React from 'react';
import styled from 'styled-components';

const MiddleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 1080px;
  background-color: #fafafc;
  position: relative;
`;

const HomeMiddle: React.FC = () => {
  return <MiddleWrapper></MiddleWrapper>;
};

export default HomeMiddle;
