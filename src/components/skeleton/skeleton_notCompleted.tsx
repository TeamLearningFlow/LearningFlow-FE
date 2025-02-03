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
  display: flex;
  width: 282px;
  height: 278px;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 16px;
  border: 0.5px solid #dde0e4;
`;

const CollectionImage = styled(SkeletonItem)`
  height: 158px;
  width: 100%;
  border-radius: 16px 16px 0px 0px;
`;

const CollectionTitle = styled(SkeletonItem)`
  height: 20px;
  width: 242px;
  margin: 18px 20px 11px 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 242px;
  height: 31px;
  align-items: center;
  gap: 6px;
  margin: 0 20px 8px 20px;
`;

const ThumbNail = styled(SkeletonItem)`
  width: 30px;
  height: 30px;
  border-radius: 100px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 2px;
  flex: 1 0 0;
`;

const ContentNumber = styled(SkeletonItem)`
  width: 30px;
  height: 14px;
`;

const ContentTitle = styled(SkeletonItem)`
  width: 206px;
  height: 14px;
`;

const ProgressBar = styled(SkeletonItem)`
  height: 4px;
  width: 242px;
  margin: 0 20px 16px 20px;
  border-radius: 2px;
`;

const Skeleton_NotCompleted = () => {
  return (
    <Container>
      <CollectionImage />
      <CollectionTitle />
      <ContentWrapper>
        <ThumbNail />
        <Content>
          <ContentNumber />
          <ContentTitle />
        </Content>
      </ContentWrapper>
      <ProgressBar />
    </Container>
  );
};

export default Skeleton_NotCompleted;
