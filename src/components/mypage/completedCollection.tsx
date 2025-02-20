import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { CompletedCollectionData } from '@/types/types';

import BoardingPassContainer from '/public/S_Background.svg';
import CollectionImage from '/public/boardingpassS.svg';
import BookmarkIcon from '/public/bookmark.svg';
import HoverBackgroundTop from '/public/hover-backgroundTopS.svg';
import HoverBackground from '/public/hover-background.svg';
import Plane from '/public/plane_S.svg';
import circle from '/public/circle.svg';
import Calendar from '/public/calendarIcon.svg';
import BookmarkFilledIcon from '/public/bookmarkFilled.svg';

import CompletedFront from '/public/completedFront.svg';
import CompletedStamp from '/public/completedStampL.svg';
import CompletedStampS from '/public/completedStampS.svg';

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

const BoardingPassImageWrapper = styled.div`
  position: absolute;
  top: 1px;
  left: 1px;
  width: 282px;
  height: 158px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
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

const Category = styled(Tag)<{ interestField: string }>`
  background-color: ${({ interestField }) => {
    switch (interestField) {
      case 'APP_DEVELOPMENT':
        return '#E5F6FE';
      case 'WEB_DEVELOPMENT':
        return '#EAF2FE';
      case 'PROGRAMMING_LANGUAGE':
        return '#DEFAFF';
      case 'DEEP_LEARNING':
        return '#FEECEC';
      case 'STATISTICS':
        return '#FDE8F0';
      case 'DATA_ANALYSIS':
        return '#FEEEE5';
      case 'UI_UX':
        return '#F5F5FF';
      case 'PLANNING':
        return '#FFF5D6';
      case 'BUSINESS_PRODUCTIVITY':
        return '#E3FFF7';
      case 'FOREIGN_LANGUAGE':
        return '#F9EDFF';
      case 'CAREER':
        return '#F2FFF6';
      default:
        return 'gray';
    }
  }};

  color: ${({ interestField }) => {
    switch (interestField) {
      case 'APP_DEVELOPMENT':
        return '#00AEFF';
      case 'WEB_DEVELOPMENT':
        return '#0066FF';
      case 'PROGRAMMING_LANGUAGE':
        return '#00BDDE';
      case 'DEEP_LEARNING':
        return '#FF4242';
      case 'STATISTICS':
        return '#F04588';
      case 'DATA_ANALYSIS':
        return '#FF5E00';
      case 'UI_UX':
        return '#5E52FF';
      case 'PLANNING':
        return '#FFAA00';
      case 'BUSINESS_PRODUCTIVITY':
        return '#12C79A';
      case 'FOREIGN_LANGUAGE':
        return '#CB59FF';
      case 'CAREER':
        return '#00BF40';
      default:
        return 'gray';
    }
  }};
`;

const interestFieldMap: Record<string, string> = {
  APP_DEVELOPMENT: '앱개발',
  WEB_DEVELOPMENT: '웹개발',
  PROGRAMMING_LANGUAGE: '컴퓨터언어',
  DEEP_LEARNING: '딥러닝',
  STATISTICS: '통계',
  DATA_ANALYSIS: '데이터분석',
  UI_UX: 'UX/UI',
  PLANNING: '기획',
  BUSINESS_PRODUCTIVITY: '업무생산성',
  FOREIGN_LANGUAGE: '외국어',
  CAREER: '취업',
};

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
  white-space: nowrap;

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

const CompletedStampIcon = styled(Image)`
  position: relative;
  width: 90px;
  height: 90px;
  margin-left: 160px;
  margin-top: -27px;
`;

const Circle = styled.span`
  height: 34px;
  width: 18px;
  background: #fff;
  position: absolute;
  top: 142px;
  z-index: 10;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
`;

const LeftCircle = styled(Circle)`
  border-radius: 0px 17px 17px 0px;
  left: 0;
  border-right: 1px solid #d9d9d9;
  border-left: 1px solid #fff;
`;

const RightCircle = styled(Circle)`
  border-radius: 17px 0px 0px 17px;

  right: 0;
  border-left: 1px solid #d9d9d9;
  border-right: 1px solid #fff;
`;

const HoverCollection = ({
  collection,
}: {
  collection: CompletedCollectionData;
}) => (
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
      <BoardingPassImageWrapper>
        <BoardingPassImage
          src={collection.imageUrl || CollectionImage}
          alt="collection image"
          fill
          style={{
            left: '0',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            objectFit: 'cover',
          }}
        />
      </BoardingPassImageWrapper>
      <LeftCircle />
      <RightCircle />
      <Bookmark>
        <Image
          src={collection.liked ? BookmarkFilledIcon : BookmarkIcon}
          alt="bookmark"
          width={36}
          height={36}
        />
      </Bookmark>
    </HoverBackgroundTopWrapper>
    <Image src={HoverBackground} alt="hover background" />
    <CollectionHeader>
      <Number status={collection.learningStatus}>
        총 {collection.amount}회차
      </Number>
      <LineWrapper status={collection.learningStatus}>
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
        <Image src={circle} alt="circle" />
      </LineWrapper>
      <CollectionDetail>
        <Detail>아티클</Detail>
        <Number>{collection.textCount}</Number>
        <Detail marginLeft={'5px'}>영상</Detail>
        <Number>{collection.videoCount}</Number>
      </CollectionDetail>
    </CollectionHeader>

    <CollectionWrapper>
      <ContentWrapper>
        <Content status={collection.learningStatus}>
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
            {collection.startDate} ~ {collection.completedDate}
          </Label>
        </Content>
      </ContentWrapper>
      <CompletedStampIcon
        src={CompletedStampS}
        alt="completedstamp"
        width={90}
        height={90}
      />
    </CollectionWrapper>
  </HoverWrapper>
);

const BoardingPassBottom = ({
  collection,
}: {
  collection: CompletedCollectionData;
}) => {
  const [departureLabel, setDepartureLabel] = useState<string>('');
  const [arrivalLabel, setArrivalLabel] = useState<string>('');

  // 난이도 변환 함수
  useEffect(() => {
    const setDifficultyLabel = () => {
      const level = [...collection.difficulties].sort();

      if (JSON.stringify(level) === JSON.stringify([1])) {
        setDepartureLabel('입문자');
        setArrivalLabel('초급자');
      } else if (JSON.stringify(level) === JSON.stringify([2])) {
        setDepartureLabel('초급자');
        setArrivalLabel('중급자');
      } else if (JSON.stringify(level) === JSON.stringify([3])) {
        setDepartureLabel('중급자');
        setArrivalLabel('마스터');
      } else if (JSON.stringify(level) === JSON.stringify([1, 2])) {
        setDepartureLabel('입문·초급자');
        setArrivalLabel('중급자');
      } else if (JSON.stringify(level) === JSON.stringify([2, 3])) {
        setDepartureLabel('초급·중급자');
        setArrivalLabel('마스터');
      } else if (JSON.stringify(level) === JSON.stringify([1, 2, 3])) {
        setDepartureLabel('입문·초급·중급자');
        setArrivalLabel('마스터');
      }
    };

    setDifficultyLabel();
  }, [collection.difficulties]);

  return (
    <Bottom>
      <Departure>
        <DepartureArrival>Departure</DepartureArrival>
        <Level>{departureLabel}</Level>
      </Departure>
      <ColumnFlexDiv>
        <Step>{collection.runtime} 시간</Step>
        <PlaneWrapper>
          <PlaneLine></PlaneLine>
          <Image src={Plane} alt="plane" style={{ margin: '0 5px' }} />
          <PlaneLine></PlaneLine>
        </PlaneWrapper>
      </ColumnFlexDiv>
      <Arrival>
        <DepartureArrival>Arrival</DepartureArrival>
        <Level>{arrivalLabel}</Level>
      </Arrival>
    </Bottom>
  );
};

const CompletedCollection = ({
  showHoverCollection,
  collection,
}: {
  showHoverCollection?: boolean;
  collection: CompletedCollectionData;
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/collection/${collection.collectionId}`);
  };

  return (
    <Container onClick={handleClick}>
      <FlipCard isFlipped={showHoverCollection ?? false}>
        <FrontFace>
          <Image src={BoardingPassContainer} alt="boardingpass" />
          <BoardingPassImageWrapper>
            <BoardingPassImage
              src={data.imageUrl || CollectionImage}
              alt="collection image"
              fill
              style={{
                borderTopLeftRadius: '16px',
                borderTopRightRadius: '16px',
                objectFit: 'cover',
              }}
            />
          </BoardingPassImageWrapper>
          <LeftCircle />
          <RightCircle />
          <Body>
            <TagWrapper>
              <Category interestField={collection.interestField}>
                {interestFieldMap[collection.interestField]}
              </Category>
              {collection.keywords.slice(0, 2).map((keyword, index) => (
                <Keyword key={index}>{keyword}</Keyword>
              ))}
            </TagWrapper>
            <Title>{collection.title}</Title>
            <Author>{collection.creator}</Author>
          </Body>
          <BoardingPassBottom collection={collection} />
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
              left: '37px',
            }}
          />
        </FrontFace>

        <BackFace>
          <HoverCollection collection={collection} />
        </BackFace>
      </FlipCard>
    </Container>
  );
};

export default CompletedCollection;
