import React from 'react';
import styled from 'styled-components';
import SkeletonClassIndex_S from './skeleton_classIndex_S';

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1.5% 0 1.5% 0;

  @media (max-width: 850px) {
    padding: 2.5% 0 2.5% 0;
  }

  @media (max-width: 560px) {
  }
`;

const TitleBox = styled.div`
  display: block;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.08);
  width: 380px;
  height: 28px;
  border-radius: 4px;

  @media (max-width: 560px) {
    width: 160px;
    height: 15px;
  }
`;

const ButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 110px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.08);
  border-radius: 24.7px;
  border: none;

  @media (max-width: 560px) {
    width: 50px;
    height: 15px;
  }
`;

const SkeletonClassTitle: React.FC = () => {
  return (
    <TitleWrapper>
      <TitleBox />
      <ButtonWrapper />
    </TitleWrapper>
  );
};

const ComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-height: 200px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px; /* 스크롤바의 너비 */

    @media (max-width: 850px) {
      width: 8px;
    }

    @media (max-width: 560px) {
      width: 5px;
    }
  }

  &::-webkit-scrollbar-track {
    background: #f0f0f0; /* 스크롤 트랙 색상 */
    border-radius: 10px; /* 트랙 모서리 둥글게 */
  }

  &::-webkit-scrollbar-thumb {
    background: #888; /* 스크롤바 색상 */
    border-radius: 10px; /* 스크롤바 모서리 둥글게 */
  }

  @media (max-width: 850px) {
    max-height: 500px;
  }

  @media (max-width: 560px) {
    max-height: 350px;
  }
`;

const SkeletonClassList_S: React.FC = () => {
  return (
    <ComponentWrapper>
      <SkeletonClassIndex_S />
      <SkeletonClassIndex_S />
      <SkeletonClassIndex_S />
      <SkeletonClassIndex_S />
    </ComponentWrapper>
  );
};

const SkeletonArticleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 552px;
  border-radius: 11.483px;
  background: rgba(0, 0, 0, 0.08);
  box-shadow: 1.077px 1.435px 6.459px 0px rgba(0, 0, 0, 0.1);
`;

const SkeletonArticle: React.FC = () => {
  return <SkeletonArticleWrapper></SkeletonArticleWrapper>;
};

export { SkeletonClassTitle, SkeletonClassList_S, SkeletonArticle };
