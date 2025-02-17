import React from 'react';
import styled from 'styled-components';
import Skeleton_BoardingPass_S from './skeleton_boardingPass_S';

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

const SkeletonLabel = styled(SkeletonItem)`
  border-radius: 4px;
`;

const Container = styled.div`
  width: 736px;
  height: 395px;
  margin-bottom: 35px;
  padding: 30px 40px;
  display: flex;
  flex-direction: row;
  gap: 36px;
  border-radius: 8.757px;
  background: #fff;
  box-shadow:
    0px 4px 4px 0px rgba(0, 0, 0, 0.04),
    0px 4px 13.3px 0px rgba(202, 198, 255, 0.27);
`;

const ContentDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const LearningRate = styled.div`
  display: flex;
  width: 338px;
  height: 52px;
  flex-direction: column;
  gap: 8px;
`;

const TitleLabel = styled(SkeletonLabel)`
  width: 200px;
  height: 16px;
`;

const ProgressBar = styled(SkeletonItem)`
  height: 8px;
  width: 338px;
  border-radius: 17.515px;
`;

const LabelWrapper = styled.div`
  height: 12px;
  width: 338px;
  padding-top: 2px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ProgressRate = styled(SkeletonLabel)`
  height: 12px;
  width: 80px;
`;

const ProgressLabel = styled(SkeletonLabel)`
  width: 100px;
  height: 12px;
`;

const ContentList = styled.div`
  display: flex;
  width: 338px;
  flex-direction: column;
  gap: 5px;
`;

const Content = styled.div`
  display: flex;
  width: 338px;
  align-items: center;
  padding: 8px;
  gap: 12px;
`;

const Thumbnail = styled(SkeletonItem)`
  width: 48px;
  height: 48px;
  border-radius: 24px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ContentNumber = styled(SkeletonLabel)`
  width: 100px;
  height: 16px;
`;

const ContentTitle = styled(SkeletonLabel)`
  width: 240px;
  height: 16px;
`;

const Skeleton_RecentCollection = () => {
  return (
    <Container>
      <Skeleton_BoardingPass_S />
      <ContentDescription>
        <LearningRate>
          <TitleLabel />
          <ProgressBar />
          <LabelWrapper>
            <ProgressRate />
            <ProgressLabel />
          </LabelWrapper>
        </LearningRate>
        <ContentList>
          {Array.from({ length: 4 }).map((_, index) => (
            <Content key={index}>
              <Thumbnail />
              <ContentWrapper>
                <ContentNumber />
                <ContentTitle />
              </ContentWrapper>
            </Content>
          ))}
        </ContentList>
      </ContentDescription>
    </Container>
  );
};

export default Skeleton_RecentCollection;
