import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import BoardingPassContainer from '../../assets/M_Background.svg';
import CollectionImage from '../../assets/boardingpassM.svg';
import BookmarkIcon from '../../assets/bookmark.svg';
import HoverBackgroundTop from '../../assets/hover-backgroundTopM.svg';
import HoverBackground from '../../assets/hover-backgroundM.svg';
import Plane from '../../assets/plane.svg';
import Circle from '../../assets/circle.svg';
import Calendar from '../../assets/calendarIcon.svg';

import NaverblogIcon from '../../assets/platformicon/naverblog_nostroke_ic.svg';
import TistoryIcon from '../../assets/platformicon/tistory_nostroke_ic.svg';
import VelogIcon from '../../assets/platformicon/velog_nostroke_ic.svg';
import YoutubeIcon from '../../assets/platformicon/youtube_nostroke_ic.svg';
import VelogLine from '../../assets/platformicon/velog_ic.svg';
import NaverblogLine from '../../assets/platformicon/naverblog_ic.svg';
import YoutubeLine from '../../assets/platformicon/youtube_ic.svg';
import OnStudying from '../../assets/onstudying.svg';
import CompletedStamp from '../../assets/completedStamp.svg';

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
  height: 452px;
  width: 386px;
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
  top: 20px;
  left: 24px;
  height: 24px;
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
  right: -80px;
  cursor: pointer;
  width: 35px;
  height: 35px;
`;

const Body = styled.div`
  background: #fff;
  height: 122px;
  margin: 18px 20px;
  position: absolute;
  top: 225px;
  left: 2px;
`;

const TagWrapper = styled(RowFlexSpan)`
  gap: 4px;
`;

const Tag = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-family: Pretendard;
  font-size: 12px;
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
  align-self: stretch;
  font-size: 20px;
  font-weight: 600;
  line-height: 30px; /* 125% */
  letter-spacing: -0.32px;
  margin-top: 10px;
  margin-bottom: 8px;
`;

const Author = styled.div`
  color: #7c8389;
  font-size: 16px;
  font-weight: 500;
  line-height: 18px; /* 150% */
  letter-spacing: -0.32px;
`;

const Bottom = styled(RowFlexDiv)`
  width: 384px;
  justify-content: space-between;
  // border-top: dashed 1px #dde0e4;
  border-radius: 0px 0px 16px 16px;
  background: transparent;
  height: 53px;
  padding: 10px 20px;
  position: absolute;
  top: 391px;
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
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 17px; /* 150% */
  letter-spacing: -0.2px;
`;

const Level = styled.span`
  color: #323538;
  font-size: 14px;
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
  width: 100px;
  height: 0.25px;
  background: #5e52ff;
`;

const ProgressWrapper = styled.div`
  width: 242px;
  height: 37px;
  margin-top: -3px;
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

  font-size: 12px;
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

  font-size: 10px;
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
  top: 80px;
  width: 320px;
  height: 36px;
`;

// svg 감싸는 애로 추후 변경 필요
const Thumbnail = styled.div<{ left: number; zIndex: number }>`
  width: 36px;
  height: 36px;
  border-radius: 13px;
  position: absolute;
  left: ${(props) => props.left}px;
  z-index: ${(props) => props.zIndex};
  top: -5px;
`;

const ThumbnailWrapper = styled.div`
  position: relative;
  height: 26px;
  margin-left: 10px;
`;

const Detail = styled.span<{ marginLeft?: string }>`
  color: #fff;
  margin-left: ${(props) => props.marginLeft || '0px'};

  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 15px; /* 150% */
  letter-spacing: -0.2px;
`;

const LineWrapper = styled.span<{ status?: string }>`
  display: flex;
  align-items: center;
  position: absolute;
  left: ${(props) => (props.status === '학습완료' ? '120px' : '130px')};
`;

const CollectionDetail = styled(RowFlexSpan)`
  align-items: center;
  position: absolute;
  right: 0;
`;

const Number = styled.span<{ status?: string }>`
  display: flex;

  width: ${(props) => (props.status === '학습완료' ? '50px' : '10px')};
  height: ${(props) => (props.status === '학습완료' ? '16px' : '10px')};
  padding: ${(props) => (props.status === '학습완료' ? '2px 8px' : '1.374px')};
  border-radius: ${(props) =>
    props.status === '학습완료' ? '100px' : '4.81px'};

  justify-content: center;
  align-items: center;
  background: #f5f5ff;
  margin-left: ${(props) => (props.status === '학습완료' ? '35px' : '2px')};
  color: #5e52ff;
  text-align: center;

  font-size: ${(props) => (props.status === '학습완료' ? '10px' : '8px')};
  font-style: normal;
  font-weight: 500;
  line-height: 12px; /* 150% */
  letter-spacing: -0.16px;
`;

const CollectionWrapper = styled(ColumnFlexDiv)`
  position: absolute;
  left: 20px;
  top: 123px;
  width: 242px;
  height: 109px;
  gap: 8px;
`;

const ContentWrapper = styled(RowFlexDiv)`
  align-items: center;
  width: 384px;
`;

const Content = styled(ColumnFlexDiv)<{ status?: string }>`
  margin-left: ${(props) => (props.status === '학습완료' ? '6px' : '10px')};
  margin-top: ${(props) => (props.status === '학습완료' ? '-6px' : '0px')};
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2px;
  gap: 4px;
`;

const Label = styled.span<{
  color: string;
  fontSize?: string;
  letterSpacing?: string;
  lineHeight?: string;
  marginTop?: string;
}>`
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize || '12px'};
  font-weight: 350;
  line-height: ${(props) => props.lineHeight || '17px'};
  letter-spacing: ${(props) => props.letterSpacing || '-0.2px'};
  margin-top: ${(props) => props.marginTop || '0px'};

  align-items: center;
`;

const CompletedStampIcon = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  margin-left: 225px;
  margin-top: -2px;
`;

const Gradient = styled.div`
  width: 383px;
  height: 58px;
  border-radius: 0px 0px 20px 20px;
  position: absolute;
  top: 110px;
  left: -19px;
  fill: var(
    --collection_linear,
    linear-gradient(
      0deg,
      rgba(94, 82, 255, 0.44) 0%,
      rgba(53, 43, 193, 0.44) 100%
    )
  );
  backdrop-filter: blur(1.2999999523162842px);
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
          <Image
            src={HoverBackground}
            alt="hover background"
            style={{ top: '57px', position: 'absolute' }}
          />
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
                    width={16}
                    height={16}
                  />
                  <Label
                    color={'#DCD9FF'}
                    fontSize="13px"
                    lineHeight="18px"
                    letterSpacing="-0.24px"
                    style={{ marginTop: "3px",}}
                  >
                    학습기간
                  </Label>
                </TextWrapper>
                <Label
                  color={'#fff'}
                  fontSize="14px"
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
                width={120}
                height={120}
              />
            </CompletedStampIcon>
          </CollectionWrapper>
        </>
      ) : (
        <>
          <Image
            src={HoverBackground}
            alt="hover background"
            style={{ top: '57px', position: 'absolute' }}
          />
          <CollectionHeader>
            <ThumbnailWrapper>
              <Thumbnail left={0} zIndex={3}>
                <Image src={YoutubeIcon} alt="youtube" width={36} height={36} />
              </Thumbnail>
              <Thumbnail left={23} zIndex={2}>
                <Image src={VelogIcon} alt="velog" width={36} height={36} />
              </Thumbnail>
              <Thumbnail left={46} zIndex={1}>
                <Image src={TistoryIcon} alt="tistory" width={36} height={36} />
              </Thumbnail>
              <Thumbnail left={69} zIndex={0}>
                <Image
                  src={NaverblogIcon}
                  alt="naverblog"
                  width={36}
                  height={36}
                />
              </Thumbnail>
            </ThumbnailWrapper>
            {/*<Detail style={{ position: 'absolute', left: '150px' }}>+4</Detail>*/}
            <LineWrapper>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="93"
                height="2"
                viewBox="0 0 93 2"
                fill="none"
              >
                <path
                  d="M0 1H93"
                  stroke="#FAFAFC"
                  strokeDasharray="2.18 2.18"
                />
              </svg>
              <Image src={Circle} alt="circle" />
            </LineWrapper>
            <CollectionDetail>
              <Detail>아티클</Detail>
              <Number>2</Number>
              <Detail marginLeft={'8px'}>영상</Detail>
              <Number>6</Number>
            </CollectionDetail>
          </CollectionHeader>

          <CollectionWrapper>
            <ContentWrapper>
              <ThumbnailWrapper>
                <Image src={VelogLine} alt="velogline" width={36} height={36} />
              </ThumbnailWrapper>
              <Content>
                <Label color={'#BBB6FF'} fontSize="12px" marginTop="11px">
                  1회차
                </Label>
                <Label color={'#fff'} fontSize="14px">
                  1회차 콘텐츠의 제목을 입력해주세요.
                </Label>
              </Content>
            </ContentWrapper>
            <ContentWrapper>
              <ThumbnailWrapper>
                <Image
                  src={NaverblogLine}
                  alt="blogline"
                  width={36}
                  height={36}
                />
              </ThumbnailWrapper>
              <Content>
                <Label color={'#BBB6FF'} fontSize="12px" marginTop="11px">
                  2회차
                </Label>
                <Label color={'#fff'} fontSize="14px">
                  2회차 콘텐츠의 제목을 입력해주세요.
                </Label>
              </Content>
            </ContentWrapper>
            <ContentWrapper>
              <ThumbnailWrapper>
                <Image
                  src={YoutubeLine}
                  alt="youtubeline"
                  width={36}
                  height={36}
                />
              </ThumbnailWrapper>
              <Content>
                <Label color={'#BBB6FF'} fontSize="12px" marginTop="11px">
                  3회차
                </Label>
                <Label color={'#fff'} fontSize="14px">
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
      <Image src={BoardingPassContainer} alt="boardingpass" />
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
