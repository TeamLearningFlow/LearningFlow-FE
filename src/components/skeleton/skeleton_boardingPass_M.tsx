import React from 'react';
import styled from 'styled-components';

const SkeletonItem = styled.div`
  background: rgba(0, 0, 0, 0.2);
  animation: pulse 1.7s infinite ease-in-out;
  @keyframes pulse {
    0% {
      background: rgba(0, 0, 0, 0.1);
    }
    50% {
      background: rgba(0, 0, 0, 0.2);
    }
    100% {
      background: rgba(0, 0, 0, 0.1);
    }
  }
`;

const Container = styled.div`
  width: 384px;
  height: 450px;
  position: relative;
`;

const BoardingPassImage = styled(SkeletonItem)`
  height: 215px;
  width: 100%;
  border-radius: 20px 20px 0px 0px;
  border-top: 1px solid #d9d9d9;
  border-left: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
`;

const Circle = styled.span`
  height: 48px;
  width: 24px;
  background: #fff;
  position: absolute;
  top: 191px;
  z-index: 10;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
`;

const LeftCircle = styled(Circle)`
  border-radius: 0px 24px 24px 0px;
  left: 0;
  border-right: 1px solid #d9d9d9;
`;

const RightCircle = styled(Circle)`
  border-radius: 24px 0px 0px 24px;
  right: 0;
  border-left: 1px solid #d9d9d9;
`;

const Body = styled.div`
  background: #fff;
  height: 166px;
  position: relative;
  border-right: 1px solid #d9d9d9;
  border-left: 1px solid #d9d9d9;
`;

const TagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
  position: absolute;
  top: 24px;
  left: 28px;
`;

const Tag = styled(SkeletonItem)`
  width: 60px;
  height: 20px;
  border-radius: 4px;
`;

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: absolute;
  top: 58px;
  left: 28px;
`;

const Label = styled(SkeletonItem)`
  height: 26px;
  border-radius: 4px;
`;

const Label1 = styled(Label)`
  width: 120px;
`;

const Label2 = styled(Label)`
  width: 250px;
`;

const Label3 = styled(Label)`
  width: 180px;
`;

const BoardingPassBottom = styled(SkeletonItem)`
  width: 100%;
  height: 69px;
  border-radius: 0px 0px 20px 20px;
  border-left: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
`;

const Skeleton_BoardingPass_M = () => {
  return (
    <Container>
      <BoardingPassImage />
      <LeftCircle />
      <RightCircle />
      <Body>
        <TagWrapper>
          <Tag />
          <Tag />
          <Tag />
        </TagWrapper>
        <LabelWrapper>
          <Label1 />
          <Label2 />
          <Label3 />
        </LabelWrapper>
      </Body>
      <BoardingPassBottom />
    </Container>
  );
};

export default Skeleton_BoardingPass_M;
