import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Prev from '../assets/Previous.svg';
import Next from '../assets/Next.svg';

const NoOverflowDiv = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Container = styled.div`
  display: flex;
  width: 282px;
  height: 278px;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 16px;
  border: 0.5px solid #dde0e4;
  cursor: pointer;
`;

const CollectionImage = styled.div`
  height: 158px;
  width: 100%;
  border-radius: 16px 16px 0px 0px;
  // background: url(<path-to-image>) lightgray 50% / cover no-repeat;
  background-color: lightgray; // 임의 지정
`;

const CollectionTitle = styled(NoOverflowDiv)`
  height: 18px;
  width: 242px;
  color: #181818;
  margin: 18px 20px 11px 20px;

  /* Body/xs/Semibold */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px; /* 150% */
  letter-spacing: -0.28px;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 242px;
  height: 31px;
  align-items: center;
  gap: 6px;
  margin: 0 20px 8px 20px;
`;

const ThumbNail = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 100px;
  border: 1.579px solid #5e52ff;
  background: #cfffe5;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: -2px;
  flex: 1 0 0;
`;

const ContentNumber = styled.div`
  height: 15px;
  color: #959ca4;

  /* Detail/3xs/Medium */
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px; /* 150% */
  letter-spacing: -0.2px;
`;

const ContentTitle = styled(NoOverflowDiv)`
  height: 18px;
  width: 206px;
  color: #4f5357;

  /* Detail/2xs/Semibold */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px; /* 150% */
  letter-spacing: -0.24px;
`;

const ProgressWrapper = styled.div`
  width: 242px;
  margin: 0 20px 16px 20px;
`;

const ProgressBarFull = styled.div`
  height: 4px;
  width: 100%;
  background-color: #dde0e4;
  border-radius: 2px;
`;

const ProgressBar = styled.div`
  height: 100%;
  width: 20%;
  background-color: #5e52ff;
  border-radius: 2px;
`;

const ProgressRate = styled.div`
  height: 12px;
  width: 242px;
  color: #959ca4;
  padding-top: 2px;

  /* Detail/8 */
  font-family: Pretendard;
  font-size: 8px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px; /* 150% */
  letter-spacing: -0.16px;
`;

const NotCompletedWrapper = styled.div`
  width: 1200px;
  height: 338px;
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
  height: 278px;
  display: flex;
  gap: 24px;
`;

const Collection = () => {
  return (
    <Container>
      <CollectionImage />
      <CollectionTitle>
        컬렉션의제목은컬렉션의제목은컬렉션의제목은
      </CollectionTitle>
      <ContentWrapper>
        <ThumbNail />
        <Content>
          <ContentNumber>4 회차</ContentNumber>
          <ContentTitle>브런치 포스터 -와이어프레임을 활용하는 법</ContentTitle>
        </Content>
      </ContentWrapper>
      <ProgressWrapper>
        <ProgressBarFull>
          <ProgressBar />
        </ProgressBarFull>
        <ProgressRate>4 / 20회차 (20%)</ProgressRate>
      </ProgressWrapper>
    </Container>
  );
};

const NotCompleted = () => {
  return (
    <NotCompletedWrapper>
      <TitleWrapper>
        <Title>이어서 학습하기</Title>
        <PageButton>
          <Button src={Prev} alt="prev" />
          <Button src={Next} alt="next" />
        </PageButton>
      </TitleWrapper>
      <CollectionList>
        <Collection />
        <Collection />
        <Collection />
        <Collection />
      </CollectionList>
    </NotCompletedWrapper>
  );
};

export default NotCompleted;
