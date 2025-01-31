import React from 'react';
import styled from 'styled-components';
import { CompletedClass, CurrentClass, NextClass } from './learnClassIndex';

const ComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  // width: 65%;
  // margin-left: 3%;
  max-height: 200px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px; /* 스크롤바의 너비 */
  }

  &::-webkit-scrollbar-track {
    background: #f0f0f0; /* 스크롤 트랙 색상 */
    border-radius: 10px; /* 트랙 모서리 둥글게 */
  }

  &::-webkit-scrollbar-thumb {
    background: #888; /* 스크롤바 색상 */
    border-radius: 10px; /* 스크롤바 모서리 둥글게 */
  }
`;

const ClassList: React.FC = () => {
  const completedClasses = [
    {
      orderText: '1회차',
      title: '브랜치 포스터 "와이어프레임을 활용하는 이유"',
    },
    {
      orderText: '2회차',
      title: '브랜치 포스터 "와이어프레임을 활용하는 이유"',
    },
  ];

  return (
    <ComponentWrapper>
      {completedClasses.map((classItem, index) => (
        <CompletedClass
          key={index}
          orderText={classItem.orderText}
          title={classItem.title}
        />
      ))}
      <CurrentClass />
      <NextClass />
    </ComponentWrapper>
  );
};

export default ClassList;
