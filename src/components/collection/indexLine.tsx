import React from 'react';
import styled from 'styled-components';


const ContentWrapper = styled.div`
  display: flex;
  width: 60px;
  height: 100%;
  min-height: 100px;
  justify-content: center;
  align-items: center;

  @media (max-width: 850px) {
    min-height: 70px;
  }

  @media (max-width: 560px) {
    min-height: 40px;
    width: 20px;
  }
`;

const LineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(221, 224, 228, 1);
  width: 2px;
  height: 100%;
`;

const ActiveWrapper = styled.div<{ height: number }>`
  display: flex;
  align-self: flex-start;
  background-color: rgba(94, 82, 255, 1);
  width: 2px;
  height: ${(props) => props.height}px;
`;



const IndexLine: React.FC = () => {
  const lessonRound = 4; // 현재 강의 회차
  return (
    <ContentWrapper>
      <LineWrapper>
        <ActiveWrapper height={120 * lessonRound}>
        </ActiveWrapper>
      </LineWrapper>
    </ContentWrapper>
  );
};

export default IndexLine;
