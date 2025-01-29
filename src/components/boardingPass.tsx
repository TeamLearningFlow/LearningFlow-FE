import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import BoardingPassContainer from '../assets/S_Background.svg';
import CollectionImage from '../assets/boarding-pass.svg';
import BookmarkIcon from '../assets/bookmark.svg';
import HoverBackground from '../assets/hover-background.svg';
import Plane from '../assets/plane.svg';
import Circle from '../assets/circle.svg';
import NaverblogIcon from '../assets/platformicon/naverblog_nostroke_ic.svg';
import TistoryIcon from '../assets/platformicon/tistory_nostroke_ic.svg';
import VelogIcon from '../assets/platformicon/velog_nostroke_ic.svg';
import YoutubeIcon from '../assets/platformicon/youtube_nostroke_ic.svg';
import VelogLine from '../assets/platformicon/velog_ic.svg';

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
  height: 333px;
  width: 282px;
  position: relative;
  background: transparent;
`;

const BoardingPassImage = styled(Image)`
  position: absolute;
  top: 1px;
  left: 1px;
`;

const Bookmark = styled(Image)`
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

const KeywordWrapper = styled(RowFlexSpan)`
  gap: 4px;
`;

const Keyword = styled.span`
  padding: 2px 7px;
  border-radius: 4px;
  background-color: #f5f5f5;
  color: #4f5357;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px; /* 150% */
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

const HoverWrapper = styled.div`
  width: 100%;
  height: 175px;
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

const LineWrapper = styled.span`
  display: flex;
  align-items: center;
  position: absolute;
  left: 109.6px;
`;

const CollectionDetail = styled(RowFlexSpan)`
  align-items: center;
  position: absolute;
  right: 0;
`;

const Number = styled.span`
  display: flex;
  width: 10px;
  height: 10px;
  padding: 1.374px;
  justify-content: center;
  align-items: center;
  border-radius: 4.81px;
  background: #f5f5ff;
  margin-left: 2px;
  color: #5e52ff;
  text-align: center;

  /* Detail/8_M */
  font-family: Pretendard;
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

const Content = styled(ColumnFlexDiv)`
  margin-left: 10px;
`;

const Label = styled.span`
  color: ${(props) => props.color};

  /* Detail/3xs/regular */
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 15px; /* 150% */
  letter-spacing: -0.2px;
`;

const Gradient = styled.div`
  width: 100%;
  height: 46px;
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

const HoverCollection = () => {
  return (
    <HoverWrapper>
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
            <Image src={NaverblogIcon} alt="naverblog" width={26} height={26} />
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
            <Label color={'#fff'}>1회차 콘텐츠의 제목을 입력해주세요.</Label>
          </Content>
        </ContentWrapper>
        <ContentWrapper>
          <ThumbnailWrapper>
            <Image src={VelogLine} alt="velogline" width={26} height={26} />
          </ThumbnailWrapper>
          <Content>
            <Label color={'#BBB6FF'}>2회차</Label>
            <Label color={'#fff'}>2회차 콘텐츠의 제목을 입력해주세요.</Label>
          </Content>
        </ContentWrapper>
        <ContentWrapper>
          <ThumbnailWrapper>
            <Image src={VelogLine} alt="velogline" width={26} height={26} />
          </ThumbnailWrapper>
          <Content>
            <Label color={'#BBB6FF'}>3회차</Label>
            <Label color={'#fff'}>3회차 콘텐츠의 제목을 입력해주세요.</Label>
          </Content>
        </ContentWrapper>
      </CollectionWrapper>
      <Gradient />
    </HoverWrapper>
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
      <Bookmark src={BookmarkIcon} alt="bookmark" />
      <Body>
        <KeywordWrapper>
          <Keyword>키워드1</Keyword>
          <Keyword>키워드2</Keyword>
          <Keyword>키워드3</Keyword>
        </KeywordWrapper>
        <Title>
          컬렉션의 <br></br>제목을 입력해주세요
        </Title>
        <Author>컬렉션 제작자명</Author>
      </Body>
      <Bottom>
        <Departure>
          <DepartureArrival>Departure</DepartureArrival>
          <Level>분야 난이도</Level>
        </Departure>
        <ColumnFlexDiv>
          <Step>n 회차</Step>
          <PlaneWrapper>
            <PlaneLine></PlaneLine>
            <Image src={Plane} alt="plane" style={{ margin: '0 5px' }} />
            <PlaneLine></PlaneLine>
          </PlaneWrapper>
        </ColumnFlexDiv>
        <Arrival>
          <DepartureArrival>Arrival</DepartureArrival>
          <Level>분야 난이도</Level>
        </Arrival>
      </Bottom>
      {showHoverCollection && <HoverCollection />}
    </Container>
  );
};

export default BoardingPass;
