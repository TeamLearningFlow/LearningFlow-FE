import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import BoardingPass from './homeBoardingPass';
import { useRouter } from 'next/router';
import plane from '../../assets/plane_today.svg';
import naverblogChecked from '../../assets/platformicon/naver blog_checked_ic.svg';
import naverblog from '../../assets/platformicon/naverblog_ic.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 46px 0 64px 0;
`;

const LabelWrapper = styled.div`
  height: 84px;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  text-align: center;
  margin-bottom: 27px;
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

const GrayLabal = styled(Label)`
  color: #959ca4;

  /* Body/xl/Medium */
  font-size: 24px;
  font-weight: 500;
  letter-spacing: -0.48px;
`;

const BlackLabal = styled(Label)`
  color: #1f1f1f;

  /* Headings/2xl */
  font-size: 32px;
  font-weight: 600;
  letter-spacing: -0.64px;
`;

const CollectionWrapper = styled.div`
  width: 786px;
  height: 395px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  border-radius: 8.757px;
  background: #fff;
  box-shadow:
    0px 4px 4px 0px rgba(0, 0, 0, 0.04),
    0px 4px 13.3px 0px rgba(202, 198, 255, 0.27);
`;

const BoardingPassWrapper = styled.div`
  padding: 31px 43px 31px 44px;
`;
const ContentDescription = styled.div``;

const LearningRate = styled.div`
  display: flex;
  width: 372px;
  height: 92px;
  justify-content: center;
  align-items: baseline;
  flex-direction: column;
`;

const TitleLabel = styled.div`
  color: #64696e;

  /* Body/xs/Medium */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21px */
  letter-spacing: -0.28px;
`;

const ContentList = styled.div`
  display: flex;
  width: 338px;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`;

const Content = styled.div`
  display: flex;
  width: 338px;
  align-items: center;
  padding: 7px 19px 7px 8px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 13px;
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
  width: 250px;
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
  height: 62px;
  align-items: center;
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
  top: -13px;
  right: -3px;

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
  top: 7px;
  right: 61px;

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
  padding: 17px 126px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border: none;
  border-radius: 13.136px;
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

const ProgressWrapper = styled.div`
  width: 328px;
  position: relative;
`;

const ProgressBarFull = styled.div`
  height: 8px;
  width: 100%;
  background-color: #dde0e4;
  border-radius: 17.515px;
`;

const ProgressBar = styled.div`
  height: 100%;
  width: 20%;
  background-color: #5e52ff;
  border-radius: 17.515px;
`;

const ProgressRate = styled.span`
  height: 12px;
  width: 242px;
  color: #959ca4;
  padding-top: 2px;

  /* Detail/3xs/regular */
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 15px */
  letter-spacing: -0.2px;
`;

const ProgressLabel = styled.span`
  height: 18.251px;
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

const RecentCollection: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <Container>
        <LabelWrapper>
          <GrayLabal>
            어제 여기서 학습을 중지하셨어요 오늘도 힘내볼까요?
          </GrayLabal>
          <BlackLabal>컬렉션 여정 마무리까지 얼마 남지 않았어요</BlackLabal>
        </LabelWrapper>
        <CollectionWrapper>
          <BoardingPassWrapper>
            <BoardingPass />
          </BoardingPassWrapper>
          <ContentDescription>
            <LearningRate>
              <TitleLabel>&lt;와이어 프레임 입문&gt; 컬렉션 학습률</TitleLabel>
              <ProgressWrapper>
                <ProgressBarFull>
                  <ProgressBar />
                </ProgressBarFull>
                <ProgressRate>4 / 20회차 (20%)</ProgressRate>
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
        <Button onClick={() => router.push('/search')}>바로 학습할래요</Button>
      </Container>
    </>
  );
};

export default RecentCollection;
