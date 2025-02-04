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
  height: 333px;
  width: 282px;
  position: relative;
`;

const BoardingPassImage = styled(SkeletonItem)`
  height: 158px;
  width: 100%;
  border-radius: 16px 16px 0px 0px;
  border-top: 1px solid #d9d9d9;
  border-left: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
`;

const Circle = styled.span`
  height: 34px;
  width: 17px;
  background: #fff;
  position: absolute;
  top: 141px;
  z-index: 10;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
`;

const LeftCircle = styled(Circle)`
  border-radius: 0px 17px 17px 0px;
  left: 0;
  border-right: 1px solid #d9d9d9;
`;

const RightCircle = styled(Circle)`
  border-radius: 17px 0px 0px 17px;
  right: 0;
  border-left: 1px solid #d9d9d9;
`;

const Body = styled.div`
  background: #fff;
  height: 122px;
  position: relative;
  border-right: 1px solid #d9d9d9;
  border-left: 1px solid #d9d9d9;
`;

const TagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  position: absolute;
  top: 18px;
  left: 20px;
`;

const Tag = styled(SkeletonItem)`
  width: 42px;
  height: 16px;
  border-radius: 4px;
`;

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: absolute;
  top: 42px;
  left: 20px;
`;

const Label = styled(SkeletonItem)`
  height: 20px;
  border-radius: 4px;
`;

const Label1 = styled(Label)`
  width: 80px;
`;

const Label2 = styled(Label)`
  width: 200px;
`;

const Label3 = styled(Label)`
  width: 120px;
`;

const BoardingPassBottom = styled(SkeletonItem)`
  width: 100%;
  height: 53px;
  border-radius: 0px 0px 16px 16px;
  border-left: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
`;

const Skeleton_BoardingPass_S = () => {
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

export default Skeleton_BoardingPass_S;
