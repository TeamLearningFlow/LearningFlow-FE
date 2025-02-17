import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import RecentBoardingPass from './recentBoardingPass';
import { useRouter } from 'next/router';
import plane from '/public/plane_today.svg';
import naverblogChecked from '/public/platformicon/naver blog_checked_ic.svg';
import naverblog from '/public/platformicon/naverblog_ic.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 0 63px 0;

  @media (max-width: 480px) {
    padding: 50px 0 58px 0;
  }
`;

const LabelWrapper = styled.div`
  height: 84px;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 27px;

  @media (max-width: 480px) {
    width: 309px;
    height: 181px;
    gap: 13px;
    margin-bottom: 6px;
  }
`;

const Label = styled.div`
  font-feature-settings:
    'liga' off,
    'clig' off;

  font-family: Pretendard;
  font-style: normal;
  line-height: 150%;
  letter-spacing: -0.48px;
`;

const GrayLabel = styled(Label)`
  color: #959ca4;

  /* Body/xl/Medium */
  font-size: 24px;
  font-weight: 500;
  letter-spacing: -0.48px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const BlackLabel = styled(Label)`
  color: #1f1f1f;

  /* Headings/2xl */
  font-size: 32px;
  font-weight: 600;
  letter-spacing: -0.64px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const MobileBreak = styled.br`
  display: none;

  @media (max-width: 480px) {
    display: inline;
  }
`;

const CollectionWrapper = styled.div`
  width: 716px;
  height: 395px;
  margin-bottom: 36px;
  padding: 30px;
  display: flex;
  flex-direction: row;
  gap: 36px;
  border-radius: 16px;
  background: #fff;
  box-shadow:
    0px 4px 4px 0px rgba(0, 0, 0, 0.04),
    0px 4px 13.3px 0px rgba(202, 198, 255, 0.27);

  @media (max-width: 768px) {
    width: 730px;
  }

  @media (max-width: 480px) {
    width: 390px;
    height: 760px;
    padding: 31px 26px;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    box-shadow:
      0px 4px 4px 0px rgba(0, 0, 0, 0.04),
      0px 4px 4px 0px rgba(0, 0, 0, 0.04);
  }
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
`;

const TitleLabel = styled.div`
  color: #64696e;
  padding-bottom: 4px;

  /* Body/xs/Medium */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21px */
  letter-spacing: -0.28px;
`;

const ProgressWrapper = styled.div`
  width: 338px;
  position: relative;
`;

const ProgressBarFull = styled.div`
  height: 8px;
  width: 100%;
  background-color: #dde0e4;
  border-radius: 17.515px;
`;

const ProgressBar = styled.div<{ percent: number }>`
  height: 100%;
  width: ${(props) => props.percent}%;
  background-color: #5e52ff;
  border-radius: 17.515px;
`;

const ProgressRate = styled.span`
  height: 15px;
  width: 242px;
  color: #959ca4;
  padding-top: 3.5px;

  /* Detail/3xs/regular */
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 15px */
  letter-spacing: -0.2px;
`;

const ProgressLabel = styled.span`
  height: 18px;
  color: #959ca4;
  position: absolute;
  bottom: 0;
  right: 0;
  white-space: nowrap;

  /* Detail/2xs/Medium */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 18px */
  letter-spacing: -0.24px;
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
  height: 64px;
  align-items: center;
  padding: 8px;
  gap: 12px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentNumber = styled.div`
  color: #666;

  /* Detail/2xs/Medium */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 18px */
  letter-spacing: -0.24px;
`;

const ContentTitle = styled.div`
  color: #000;
  width: 262px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  /* Body/xs/Medium */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21px */
  letter-spacing: -0.28px;
`;

const TodayContentWrapper = styled.div`
  display: flex;
  border-radius: 8px;
  border: 1px solid #5e52ff;
  background: #fff;
  box-shadow: 0px 4px 4px 0px #f3f2ff;
  position: relative;
`;

const TodayContentMark = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 21px;
  background: #5e52ff;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -10px;
  right: -10px;

  /* Detail/3xs/Semibold */
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 15px */
`;

const TodayContentLabel = styled.div`
  color: #7a71f5;
  display: flex;
  gap: 4px;
  position: absolute;
  top: 4px;
  right: 38px;

  /* Detail/8_M */
  font-family: Pretendard;
  font-size: 8px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 12px */
  letter-spacing: -0.16px;
`;

const Button = styled.button`
  display: flex;
  width: 390px;
  height: 58px;
  padding: 18px 126px;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 12px;
  background: #5e52ff;
  box-shadow: 3.503px 3.503px 3.941px -0.876px rgba(113, 104, 104, 0.26);

  color: #fff;
  white-space: nowrap;
  text-align: center;
  cursor: pointer;

  /* Body/l/Semibold */
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 33px */
  letter-spacing: -0.44px;
`;

export type RecentLearning = {
  amount: number;
  collectionId: number;
  completedDate: number[];
  startDate: number[];
  creator: string;
  difficulties: number[];
  imageUrl: string;
  interestField: string;
  keywords: string[];
  learningStatus: string;
  liked: boolean;
  likesCount: number;
  progressRatePercentage: number;
  progressRatio: string;
  title: string;
  runtime: number;
  textCount: number;
  videoCount: number;
  resource: {
    episodeNumber: number;
    episodeName: string;
    resourceSource: string;
    url: string;
  }[];
};

const TodayContent = ({ children }: { children: ReactNode }) => {
  return (
    <TodayContentWrapper>
      <TodayContentMark>TODAY</TodayContentMark>
      <TodayContentLabel>
        오늘의 학습을 시작하세요!
        <Image src={plane} alt="" />
      </TodayContentLabel>
      {children}
    </TodayContentWrapper>
  );
};

const RecentCollection = ({
  collectionInfo,
}: {
  collectionInfo: RecentLearning;
}) => {
  const router = useRouter();

  return (
    <>
      <Container>
        <LabelWrapper>
          <GrayLabel>
            어제 여기서 학습을 중지하셨어요 <MobileBreak />
            오늘도 힘내볼까요?
          </GrayLabel>
          <BlackLabel>
            컬렉션 여정 마무리까지 <MobileBreak />
            얼마 남지 않았어요
          </BlackLabel>
        </LabelWrapper>
        <CollectionWrapper>
          <RecentBoardingPass collectionInfo={collectionInfo} />
          <ContentDescription>
            <LearningRate>
              <TitleLabel>
                &lt;{collectionInfo?.title}&gt; 컬렉션 학습률
              </TitleLabel>
              <ProgressWrapper>
                <ProgressBarFull>
                  <ProgressBar
                    percent={collectionInfo?.progressRatePercentage}
                  />
                </ProgressBarFull>
                <ProgressRate>{collectionInfo?.progressRatio}</ProgressRate>
                <ProgressLabel>조금 더 힘을 내요!</ProgressLabel>
              </ProgressWrapper>
            </LearningRate>
            <ContentList>
              <Content>
                <Image src={naverblogChecked} alt="naver blog" />
                <ContentWrapper>
                  <ContentNumber>1회차</ContentNumber>
                  <ContentTitle>
                    콘텐츠명을 입력하세요.콘텐츠명을 입력하세요.
                  </ContentTitle>
                </ContentWrapper>
              </Content>
              <TodayContent>
                <Content>
                  <Image src={naverblog} alt="naver blog" />
                  <ContentWrapper>
                    <ContentNumber>1회차</ContentNumber>
                    <ContentTitle>
                      콘텐츠명을 입력하세요.콘텐츠명을 입력하세요.
                    </ContentTitle>
                  </ContentWrapper>
                </Content>
              </TodayContent>
              <Content>
                <Image src={naverblog} alt="naver blog" />
                <ContentWrapper>
                  <ContentNumber>1회차</ContentNumber>
                  <ContentTitle>
                    콘텐츠명을 입력하세요.콘텐츠명을 입력하세요.
                  </ContentTitle>
                </ContentWrapper>
              </Content>
              <Content>
                <Image src={naverblog} alt="naver blog" />
                <ContentWrapper>
                  <ContentNumber>1회차</ContentNumber>
                  <ContentTitle>
                    콘텐츠명을 입력하세요.콘텐츠명을 입력하세요.
                  </ContentTitle>
                </ContentWrapper>
              </Content>
            </ContentList>
          </ContentDescription>
        </CollectionWrapper>
        <Button
          onClick={() =>
            router.push(`/collection/${collectionInfo.collectionId}`)
          }
        >
          바로 학습할래요
        </Button>
      </Container>
    </>
  );
};

export default RecentCollection;
