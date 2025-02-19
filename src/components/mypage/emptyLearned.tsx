import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Icon from '/public/noLearned.svg';

const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  margin-top: 50px;
`;

const EmptyTitle = styled.div`
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 27px */
  letter-spacing: -0.36px;
  text-align: center;
`;

const EmptySubtitle = styled.div`
  color: #959ca4;
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-size: 16px;
  font-weight: 400;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
  text-align: center;
`;

const EmptyLearned: React.FC = () => {
  return (
    <EmptyWrapper>
      <Image src={Icon} alt="icon" width={140} height={140} />
      <EmptyTitle>학습 중인 컬렉션이 없어요</EmptyTitle>
      <EmptySubtitle>브랜딩이 느껴지는 코멘트를 추가해주세요</EmptySubtitle>
    </EmptyWrapper>
  );
};

export default EmptyLearned;
