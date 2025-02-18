import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import BoardingPassContainer from '/public/S_Background.svg';
import CollectionImage from '/public/boardingpassS.svg';
import BookmarkIcon from '/public/bookmark.svg';
import HoverBackgroundTop from '/public/hover-backgroundTopS.svg';
import HoverBackground from '/public/hover-background.svg';
import Plane from '/public/plane_S.svg';
import Circle from '/public/circle.svg';
import Calendar from '/public/calendarIcon.svg';

import NaverblogIcon from '/public/platformicon/naverblog_nostroke_ic.svg';
import TistoryIcon from '/public/platformicon/tistory_nostroke_ic.svg';
import VelogIcon from '/public/platformicon/velog_nostroke_ic.svg';
import YoutubeIcon from '/public/platformicon/youtube_nostroke_ic.svg';
import VelogLine from '/public/platformicon/velog_ic.svg';
import NaverblogLine from '/public/platformicon/naverblog_ic.svg';
import YoutubeLine from '/public/platformicon/youtube_ic.svg';
import OnStudying from '/public/onstudying.svg';
import CompletedStamp from '/public/completedStamp.svg';

const ColumnFlexDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const RowFlexDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const RowFlexSpan = styled.span`
  display: flex;
  flex-direction: row;
`;

const Container = styled(ColumnFlexDiv)`
  height: 335px;
  width: 284px;
  position: relative;
  background: transparent;
  overflow: hidden;
`;

const BoardingPassImage = styled(Image)`
  position: absolute;
  top: 1px;
  left: 1px;
`;

const StatusTag = styled.span<{ status?: string }>`
  position: absolute;
  top: 16px;
  left: 16px;
  height: 22px;
  display: ${(props) =>
    props.status === '학습중' || props.status === '학습완료'
      ? 'inline-flex'
      : 'none'};
  padding: 2px 8px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: ${(props) => (props.status === '학습중' ? '#5e52ff' : '#F5F5F5')};
  color: ${(props) => (props.status === '학습중' ? '#fff' : '#4F5357')};

  /* 100 */
  box-shadow: 0.74px 0.74px 1.47px 0px rgba(0, 0, 0, 0.25);

  text-align: center;

  /* Detail/2xs/Semibold */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 18px */
  letter-spacing: -0.24px;

  ${Container}:hover & {
    display: none;
  }
`;

const Bookmark = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
  width: 35px;
  height: 35px;
`;

const Body = styled.div`
  background: #fff;
  height: 122px;
  margin: 18px 20px;
  position: absolute;
  top: 158.303px;
  left: 2px;
`;

const TagWrapper = styled(RowFlexSpan)`
  gap: 4px;
`;

const Tag = styled.span`
  padding: 2px 7px;
  border-radius: 4px;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px; /* 150% */
`;

const Category = styled(Tag)`
  background-color: #f5f5ff;
  color: #5e52ff;
`;

const Keyword = styled(Tag)`
  background-color: #f5f5f5;
  color: #4f5357;
`;

const Title = styled.div`
  color: #181818;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 125% */
  letter-spacing: -0.32px;
  margin-top: 6px;
  margin-bottom: 3px;
`;

const Author = styled.div`
  color: #7c8389;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 150% */
  letter-spacing: -0.24px;
`;

const Bottom = styled(RowFlexDiv)`
  width: 282px;
  justify-content: space-between;
  border-top: dashed 1px #dde0e4;
  border-radius: 0px 0px 16px 16px;
  background: #f5f5ff;
  height: 53px;
  padding: 10px 15px;
  position: absolute;
  top: 281px;
  left: 1px;
  gap: 10px;
`;

const Departure = styled(ColumnFlexDiv)`
  margin-right: 10px;
`;

const Arrival = styled(ColumnFlexDiv)`
  margin-left: 10px;
`;

const DepartureArrival = styled.span`
  color: #7c8389;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px; /* 150% */
  letter-spacing: -0.2px;
`;

const Level = styled.span`
  color: #323538;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 18px; /* 150% */
  letter-spacing: -0.24px;
  white-space: nowrap;
`;

const Step = styled.span`
  color: #5e52ff;
  text-align: center;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px; /* 150% */
`;

const PlaneWrapper = styled(RowFlexSpan)`
  justify-content: center;
  align-items: center;
`;

const PlaneLine = styled.span`
  width: 45px;
  height: 0.25px;
  background: #5e52ff;
`;

const ProgressWrapper = styled.div`
  width: 242px;
  height: 33px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex: 1 0 0;
  align-self: stretch;
`;

const ProgressLabel = styled.span`
  color: #5e52ff;
  padding-bottom: 2.95px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;

  /* Detail/3xs/Semibold */
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 15px */
`;

const ProgressBarFull = styled.div`
  height: 4px;
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

  /* Detail/8 */
  font-family: Pretendard;
  font-size: 8px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 12px */
  letter-spacing: -0.16px;
`;

const HoverWrapper = styled.div`
  width: 100%;
  height: 333px;
  position: absolute;
  top: 159.2px;
  left: 1px;
  background: transparent;
  opacity: 0;
  transition: all 0.3s; // 몇 초로 할지 설정

  &:hover {
    opacity: 1;
  }
`;

const HoverBackgroundTopWrapper = styled.div`
  position: absolute;
  top: -158px;
  width: 100%;
  height: 158px;
`;

const CollectionHeader = styled(RowFlexDiv)`
  align-items: center;
  position: absolute;
  left: 20px;
  top: 18px;
  width: 242px;
  height: 26px;
`;

// svg 감싸는 애로 추후 변경 필요
const Thumbnail = styled.div<{ left: number; zIndex: number }>`
  width: 26px;
  height: 26px;
  border-radius: 13px;
  position: absolute;
  left: ${(props) => props.left}px;
  z-index: ${(props) => props.zIndex};
`;

const ThumbnailWrapper = styled.div`
  position: relative;
  height: 26px;
`;

const Detail = styled.span<{ marginLeft?: string }>`
  color: #fff;
  margin-left: ${(props) => props.marginLeft || '0px'};

  /* Detail/8 */
  font-family: Pretendard;
  font-size: 8px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px; /* 150% */
  letter-spacing: -0.16px;
`;

const LineWrapper = styled.span<{ status?: string }>`
  display: flex;
  align-items: center;
  position: absolute;
  left: ${(props) => (props.status === '학습완료' ? '65px' : '109.6px')};
`;

const CollectionDetail = styled(RowFlexSpan)`
  align-items: center;
  position: absolute;
  right: 0;
`;

const Number = styled.span<{ status?: string }>`
  display: flex;

  width: ${(props) => (props.status === '학습완료' ? '44px' : '10px')};
  height: ${(props) => (props.status === '학습완료' ? '15px' : '10px')};
  padding: ${(props) => (props.status === '학습완료' ? '2px 8px' : '1.374px')};
  border-radius: ${(props) =>
    props.status === '학습완료' ? '100px' : '4.81px'};

  justify-content: center;
  align-items: center;
  background: #f5f5ff;
  margin-left: 2px;
  color: #5e52ff;
  text-align: center;

  font-size: 8px;
  font-style: normal;
  font-weight: 500;
  line-height: 12px; /* 150% */
  letter-spacing: -0.16px;
`;

const CollectionWrapper = styled(ColumnFlexDiv)`
  position: absolute;
  left: 20px;
  top: 58px;
  width: 242px;
  height: 109px;
  gap: 8px;
`;

const ContentWrapper = styled(RowFlexDiv)`
  align-items: center;
`;

const Content = styled(ColumnFlexDiv)<{ status?: string }>`
  margin-left: ${(props) => (props.status === '학습완료' ? '0px' : '10px')};
  margin-top: ${(props) => (props.status === '학습완료' ? '-6px' : '0px')};
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1px;
  gap: 4px;
`;

const Label = styled.span<{
  color: string;
  fontSize?: string;
  letterSpacing?: string;
  lineHeight?: string;
}>`
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize || '10px'};
  font-weight: 350;
  line-height: ${(props) => props.lineHeight || '15px'};
  letter-spacing: ${(props) => props.letterSpacing || '-0.2px'};

  align-items: center;
`;

const CompletedStampIcon = styled.div`
  position: relative;
  width: 85px;
  height: 85px;
  margin-left: 160px;
  margin-top: -15px;
`;

const Gradient = styled.div`
  width: 100%;
  height: 40px;
  border-radius: 0px 0px 16px 16px;
  position: absolute;
  bottom: 0px;
  fill: var(
    --collection_linear,
    linear-gradient(
      0deg,
      rgba(94, 82, 255, 0.44) 0%,
      rgba(53, 43, 193, 0.44) 100%
    )
  );
  backdrop-filter: blur(0.9571801424026489px);
`;

const HoverCollection = ({ status }: { status: string }) => {
  return (
    <HoverWrapper>
      <HoverBackgroundTopWrapper>
        <Image src={HoverBackgroundTop} alt="hoverbackgroundtop" />
        <Bookmark>
          <Image src={BookmarkIcon} alt="bookmark" width={36} height={36} />
        </Bookmark>
      </HoverBackgroundTopWrapper>
      {status === '학습완료' ? (
        <>
          <Image src={HoverBackground} alt="hover background" />
          <CollectionHeader>
            <Number status="학습완료">총 8회차</Number>
            <LineWrapper status="학습완료">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="95"
                height="2"
                viewBox="0 0 95 2"
                fill="none"
              >
                <path
                  d="M0 1H95"
                  stroke="#FAFAFC"
                  strokeWidth="0.740061"
                  strokeDasharray="1.61 1.61"
                />
              </svg>
              <Image src={Circle} alt="circle" />
            </LineWrapper>
            <CollectionDetail>
              <Detail>아티클</Detail>
              <Number>2</Number>
              <Detail marginLeft={'5px'}>영상</Detail>
              <Number>6</Number>
            </CollectionDetail>
          </CollectionHeader>

          <CollectionWrapper>
            <ContentWrapper>
              <Content status="학습완료">
                <TextWrapper>
                  <Image
                    src={Calendar}
                    alt="calendarIcon"
                    width={14}
                    height={14}
                  />
                  <Label
                    color={'#DCD9FF'}
                    fontSize="12px"
                    lineHeight="18px"
                    letterSpacing="-0.24px"
                  >
                    학습기간
                  </Label>
                </TextWrapper>
                <Label
                  color={'#fff'}
                  fontSize="12px"
                  lineHeight="18px"
                  letterSpacing="-0.24px"
                >
                  2025.XX.XX ~ 2025.XX.XX
                </Label>
              </Content>
            </ContentWrapper>
            <CompletedStampIcon>
              <Image
                src={CompletedStamp}
                alt="completedstamp"
                width={90}
                height={90}
              />
            </CompletedStampIcon>
          </CollectionWrapper>
        </>
      ) : (
        <>
          <Image src={HoverBackground} alt="hover background" />
          <CollectionHeader>
            <ThumbnailWrapper>
              <Thumbnail left={0} zIndex={3}>
                <Image src={YoutubeIcon} alt="youtube" width={26} height={26} />
              </Thumbnail>
              <Thumbnail left={18} zIndex={2}>
                <Image src={VelogIcon} alt="velog" width={26} height={26} />
              </Thumbnail>
              <Thumbnail left={35} zIndex={1}>
                <Image src={TistoryIcon} alt="tistory" width={26} height={26} />
              </Thumbnail>
              <Thumbnail left={53} zIndex={0}>
                <Image
                  src={NaverblogIcon}
                  alt="naverblog"
                  width={26}
                  height={26}
                />
              </Thumbnail>
            </ThumbnailWrapper>
            <Detail style={{ position: 'absolute', left: '83px' }}>+4</Detail>
            <LineWrapper>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="49"
                height="2"
                viewBox="0 0 49 2"
                fill="none"
              >
                <path
                  d="M0.597656 1H48.7016"
                  stroke="#FAFAFC"
                  strokeWidth="0.740061"
                  strokeDasharray="1.61 1.61"
                />
              </svg>
              <Image src={Circle} alt="circle" />
            </LineWrapper>
            <CollectionDetail>
              <Detail>아티클</Detail>
              <Number>2</Number>
              <Detail marginLeft={'5px'}>영상</Detail>
              <Number>6</Number>
            </CollectionDetail>
          </CollectionHeader>

          <CollectionWrapper>
            <ContentWrapper>
              <ThumbnailWrapper>
                <Image src={VelogLine} alt="velogline" width={26} height={26} />
              </ThumbnailWrapper>
              <Content>
                <Label color={'#BBB6FF'}>1회차</Label>
                <Label color={'#fff'}>
                  1회차 콘텐츠의 제목을 입력해주세요.
                </Label>
              </Content>
            </ContentWrapper>
            <ContentWrapper>
              <ThumbnailWrapper>
                <Image
                  src={NaverblogLine}
                  alt="blogline"
                  width={26}
                  height={26}
                />
              </ThumbnailWrapper>
              <Content>
                <Label color={'#BBB6FF'}>2회차</Label>
                <Label color={'#fff'}>
                  2회차 콘텐츠의 제목을 입력해주세요.
                </Label>
              </Content>
            </ContentWrapper>
            <ContentWrapper>
              <ThumbnailWrapper>
                <Image
                  src={YoutubeLine}
                  alt="youtubeline"
                  width={26}
                  height={26}
                />
              </ThumbnailWrapper>
              <Content>
                <Label color={'#BBB6FF'}>3회차</Label>
                <Label color={'#fff'}>
                  3회차 콘텐츠의 제목을 입력해주세요.
                </Label>
              </Content>
            </ContentWrapper>
            <Gradient />
          </CollectionWrapper>
        </>
      )}
    </HoverWrapper>
  );
};

const BoardingPassBottom = ({ status }: { status?: string }) => {
  return (
    <Bottom>
      {status == '학습중' ? (
        <ProgressWrapper>
          <ProgressLabel>
            <Image src={OnStudying} alt=""></Image>학습중
          </ProgressLabel>
          <ProgressBarFull>
            <ProgressBar />
          </ProgressBarFull>
          <ProgressRate>4 / 20회차 (20%)</ProgressRate>
        </ProgressWrapper>
      ) : (
        <>
          <Departure>
            <DepartureArrival>Departure</DepartureArrival>
            <Level>입문자</Level>
          </Departure>
          <ColumnFlexDiv>
            <Step>n 시간</Step>
            <PlaneWrapper>
              <PlaneLine></PlaneLine>
              <Image src={Plane} alt="plane" style={{ margin: '0 5px' }} />
              <PlaneLine></PlaneLine>
            </PlaneWrapper>
          </ColumnFlexDiv>
          <Arrival>
            <DepartureArrival>Arrival</DepartureArrival>
            <Level>초급자</Level>
          </Arrival>
        </>
      )}
    </Bottom>
  );
};

const BoardingPass = ({
  showHoverCollection,
}: {
  showHoverCollection?: boolean;
}) => {
  return (
    <Container>
      <Image src={BoardingPassContainer} alt="boarding pass" />
      <BoardingPassImage src={CollectionImage} alt="collection image" />
      <StatusTag status=""></StatusTag>
      <Body>
        <TagWrapper>
          <Category>관심분야</Category>
          <Keyword>키워드1</Keyword>
          <Keyword>키워드2</Keyword>
        </TagWrapper>
        <Title>
          컬렉션의 <br></br>제목을 입력해주세요
        </Title>
        <Author>컬렉션 제작자명</Author>
      </Body>
      <BoardingPassBottom status="" />
      {showHoverCollection && <HoverCollection status="" />}
    </Container>
  );
};

export default BoardingPass;
