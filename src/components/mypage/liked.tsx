import React from 'react';
import styled from 'styled-components';
import BoardingPass from './boardingPass';

const LikedWrapper = styled.div`
  width: 1200px;
  height: 1107px;

  /* 반응형 설정 */
  @media (max-width: 1024px) {
    width: 1000px;
  }

  @media (max-width: 768px) {
    width: calc(100vw - 20px); /* 모바일 화면 */
    padding: 0 10px;
  }

  @media (max-width: 480px) {
    width: calc(100vw - 10px); /* 폰 화면 */
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.div`
  height: 36px;
  width: 148px;
  color: #000;
  white-space: nowrap;

  /* Body/xl/SemiBold */
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 36px; /* 150% */
  letter-spacing: -0.48px;
`;

const CollectionList = styled.div`
  height: 1047px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 한 줄에 4개 */
  justify-items: center;
  gap: 24px;

  /* 반응형 설정 */
  @media (max-width: 1024px) {
    padding: 0 20px;
    gap: 20px;
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    padding: 0 30px; /* 모바일 화면 */
    gap: 25px;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr); /* 폰 화면 */
    place-items: center;
  }
`;

const Liked = () => {
  return (
    <>
      <LikedWrapper>
        <TitleWrapper>
          <Title>찜한 학습 컬렉션</Title>
        </TitleWrapper>
        <CollectionList>
          <BoardingPass showHoverCollection={true} />
          <BoardingPass showHoverCollection={true} />
          <BoardingPass showHoverCollection={true} />
          <BoardingPass showHoverCollection={true} />
          <BoardingPass showHoverCollection={true} />
          <BoardingPass showHoverCollection={true} />
          <BoardingPass showHoverCollection={true} />
          <BoardingPass showHoverCollection={true} />
          <BoardingPass showHoverCollection={true} />
          <BoardingPass showHoverCollection={true} />
          <BoardingPass showHoverCollection={true} />
          <BoardingPass showHoverCollection={true} />
        </CollectionList>
      </LikedWrapper>
    </>
  );
};

export default Liked;
