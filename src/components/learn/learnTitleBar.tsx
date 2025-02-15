import React from 'react';
import styled from 'styled-components';

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  background-color: rgba(31, 31, 31, 1);
  padding: 0 3%;

  @media (max-width: 850px) {
    height: 45px;
    padding: 0 5%;
  }
  @media (max-width: 560px) {
    height: 40px;
  }
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
    font-size: 16px;
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

const TitleBar: React.FC<TitleBarProps> = ({ data }) => {
  return (
    <TitleWrapper>
      <LineIconWrapper>{/* <LineIcon /> */}|</LineIconWrapper>
      <TitleBox>
        {data.title} <TitleDot>·</TitleDot>
        {data.interestField}
      </TitleBox>
    </TitleWrapper>
  );
};

export default TitleBar;
