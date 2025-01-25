import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Prev from '../assets/Previous.svg';
import Next from '../assets/Next.svg';
import BoardingPass from './boardingPass';

const CompletedWrapper = styled.div`
  width: 1200px;
  height: 393px;
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

const PageButton = styled.div`
  display: flex;
  width: 54px;
  height: 18px;
  align-items: center;
  gap: 20px;
`;

const Button = styled(Image)`
  cursor: pointer;
`;

const CollectionList = styled.div`
  height: 333px;
  width: 100%;
  display: flex;
  gap: 24px;
`;

const Completed = () => {
  return (
    <CompletedWrapper>
      <TitleWrapper>
        <Title>완료한 학습 컬렉션</Title>
        <PageButton>
          <Button src={Prev} alt="prev" />
          <Button src={Next} alt="next" />
        </PageButton>
      </TitleWrapper>
      <CollectionList>
        <BoardingPass showHoverCollection={false} />
        <BoardingPass showHoverCollection={false} />
        <BoardingPass showHoverCollection={false} />
        <BoardingPass showHoverCollection={false} />
      </CollectionList>
    </CompletedWrapper>
  );
};

export default Completed;
