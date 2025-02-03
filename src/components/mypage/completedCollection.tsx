import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import BoardingPassContainer from '../../assets/S_Background.svg';
import CollectionImage from '../../assets/boardingpassS.svg';
import BookmarkIcon from '../../assets/bookmark.svg';
import HoverBackgroundTop from '../../assets/hover-backgroundTopS.svg';
import HoverBackground from '../../assets/hover-background.svg';
import Plane from '../../assets/plane.svg';
import Circle from '../../assets/circle.svg';
import Calendar from '../../assets/calendarIcon.svg';

import CompletedFront from '../../assets/completedFront.svg';
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
  height: 333px;
  width: 282px;
  position: relative;
  background: transparent;
  perspective: 1000px;
`;

const FlipCard = styled.div<{ isFlipped: boolean }>`
  width: 100%;
  height: 333px;
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
  transform: ${({ isFlipped }) =>
    isFlipped ? 'rotateY(180deg)' : 'rotateY(0)'};
  position: relative;
`;

const FrontFace = styled.div`
  width: 100%;
  height: 333px;
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 1;
`;

const BackFace = styled.div`
  width: 100%;
  height: 333px;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  position: absolute;
  top: 0;
  left: 1;
`;

const BoardingPassImage = styled(Image)`
  position: absolute;
  top: 1px;
  left: 1px;
`;

const Bookmark = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
  width: 35px;
  height: 35px;
  z-index: 3;
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

const HoverCollection = () => (
  <HoverWrapper>
    <HoverBackgroundTopWrapper>
      <Image
        src={HoverBackgroundTop}
        alt="hoverbackgroundtop"
        style={{
          position: 'absolute',
          top: '1px',
          width: '100%',
          height: '100%',
          zIndex: 2, // 중간
        }}
      />
      <BoardingPassImage
        src={CollectionImage}
        alt="collection image"
        style={{
          left: '0',
        }}
      />
      <Bookmark>
        <Image src={BookmarkIcon} alt="bookmark" width={36} height={36} />
      </Bookmark>
    </HoverBackgroundTopWrapper>
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
            <Image src={Calendar} alt="calendarIcon" width={14} height={14} />
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
  </HoverWrapper>
);

const BoardingPassBottom = () => {
  return (
    <Bottom>
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
    </Bottom>
  );
};

const CompletedCollection = ({
  showHoverCollection,
}: {
  showHoverCollection?: boolean;
}) => {
  return (
    <Container>
      <FlipCard isFlipped={showHoverCollection ?? false}>
        <FrontFace>
          <Image src={BoardingPassContainer} alt="boardingpass" />
          <BoardingPassImage src={CollectionImage} alt="collectionimage" />
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
          <BoardingPassBottom />
          <Image
            src={CompletedFront}
            alt="completedfront"
            style={{
              position: 'absolute',
              top: '0px',
              left: '1px',
              width: '100%',
              height: '333px',
            }}
          />
          <Image
            src={CompletedStamp}
            alt="completedstamp"
            width={210}
            height={210}
            style={{
              position: 'absolute',
              top: '50px',
              left: '43px',
            }}
          />
        </FrontFace>

        <BackFace>
          <HoverCollection />
        </BackFace>
      </FlipCard>
    </Container>
  );
};

export default CompletedCollection;
