import React from 'react';
import styled from 'styled-components';

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: rgba(31, 31, 31, 1);

  @media (max-width: 850px) {
    height: 45px;
  }
  @media (max-width: 560px) {
    height: 40px;
  }
`;

const LetterWrapper = styled.div`
  display: flex;
  width: 80vw;
  justify-content: flex-start;
  align-items: center;
`;

const LineIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -7px;

  color: white;
  font-size: 25px;

  @media (max-width: 850px) {
    font-size: 22px;
    margin-top: -5px;
  }
  @media (max-width: 560px) {
    font-size: 20px;
    margin-top: -6px;
  }
`;

// const LineIcon = styled.div`
//   display: flex;
//   // align-items: center;
//   justify-content: center;
//   width: 0.9px;
//   height: 25px;
//   background-color: white;

//   @media (max-width: 560px) {
//     height: 22px;
//   }
// `;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 17px;
  font-weight: 500;
  margin-left: 15px;
  margin-top: -2px;

  @media (max-width: 850px) {
    font-size: 15px;
  }
  @media (max-width: 560px) {
    font-size: 13px;
    margin-top: -4px;
  }
`;

const TitleDot = styled.span`
  margin: 0 15px;
  font-size: 25px;

  @media (max-width: 560px) {
    margin: 0 15px;
  }
`;

interface TitleBarProps {
  data: {
    title: string;
    interestField: string;
  };
}

const interestFieldMap: Record<string, string> = {
  APP_DEVELOPMENT: '앱개발',
  WEB_DEVELOPMENT: '웹개발',
  PROGRAMMING_LANGUAGE: '컴퓨터언어',
  DEEP_LEARNING: '딥러닝',
  STATISTICS: '통계',
  DATA_ANALYSIS: '데이터분석',
  UI_UX: 'UX/UI',
  PLANNING: '기획',
  BUSINESS_PRODUCTIVITY: '업무생산성',
  FOREIGN_LANGUAGE: '외국어',
  CAREER: '취업',
};

const TitleBar: React.FC<TitleBarProps> = ({ data }) => {
  return (
    <TitleWrapper>
      <LetterWrapper>
        <LineIconWrapper>{/* <LineIcon /> */}|</LineIconWrapper>
        <TitleBox>
          {data.title} <TitleDot>·</TitleDot>
          {interestFieldMap[data.interestField]}
        </TitleBox>
      </LetterWrapper>
    </TitleWrapper>
  );
};

export default TitleBar;
