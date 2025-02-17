import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import noResult from '../../assets/noResult.svg';

const Container = styled.div`
  width: 100%;
  padding: 156px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Label1 = styled.div`
  color: #323538;
  text-align: center;
  padding: 4px 0 2px 0;
  white-space: nowrap;

  /* Body/m/Semibold */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 27px */
  letter-spacing: -0.36px;
`;

const Label2 = styled.div`
  color: #959ca4;
  text-align: center;
  font-feature-settings:
    'liga' off,
    'clig' off;
  white-space: nowrap;

  /* Body/s/Regular */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
`;

const NoResult = () => {
  return (
    <Container>
      <Image src={noResult} alt="no result" />
      <Label1>조건에 맞는 컬렉션이 없어요</Label1>
      <Label2>적용한 필터나 검색어를 변경해보세요</Label2>
    </Container>
  );
};

export default NoResult;
