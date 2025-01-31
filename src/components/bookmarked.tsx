import React from 'react';
import styled from 'styled-components';
import BoardingPass from './boardingPass';

const BookmarkedWrapper = styled.div`
  width: 1200px;
  height: 1107px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
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
`;

const Bookmarked = () => {
  return (
    <>
      <BookmarkedWrapper>
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
      </BookmarkedWrapper>
    </>
  );
};

export default Bookmarked;
