import React,{ useState, useEffect } from 'react';
import styled from 'styled-components';


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

const ActiveWrapper = styled.div<{ height: number }>`
  display: flex;
  align-self: flex-start;
  background-color: rgba(94, 82, 255, 1);
  width: 2px;
  height: ${(props) => props.height}px;

  @media (max-width: 850px) {
    width: 1.4px;
  }

  @media (max-width: 560px) {
    width: 1px;
  }
`;

interface IndexLineProps {
  classRound: number;
}


const IndexLine: React.FC<IndexLineProps> = ({classRound}) => {
  const [activeHeight, setActiveHeight] = useState(120 * classRound);


  useEffect(() => {
    const updateHeight = () => {
      let baseHeight = 120; // 기본 높이
      if (window.innerWidth <= 560) {
        baseHeight = 60; // 작은 화면에서는 높이를 줄이기
      } else if (window.innerWidth <= 850) {
        baseHeight = 105; // 중간 크기 화면
      }
      setActiveHeight(baseHeight * classRound);
    };

    updateHeight(); // 초기 설정
    window.addEventListener('resize', updateHeight); // 화면 크기 변경 감지

    return () => window.removeEventListener('resize', updateHeight);
  }, [classRound]);

  return (
    <ContentWrapper>
      <LineWrapper>
        <ActiveWrapper height={activeHeight}>
        </ActiveWrapper>
      </LineWrapper>
    </ContentWrapper>
  );
};

export default IndexLine;
