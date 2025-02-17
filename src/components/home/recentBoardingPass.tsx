import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import BoardingPassContainer from '../../assets/S_Background.svg';
import CollectionImage from '../../assets/boardingpassS.svg';
import Plane from '../../assets/plane_S.svg';
import { RecentLearning } from './recentCollection';

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

const RuntimeWrapper = styled(ColumnFlexDiv)`
  gap: 2.95px;
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

const PlaneLine = styled.span<{ width: number }>`
  width: ${(props) => props.width}px;
  height: 0.25px;
  background: #5e52ff;
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

const BoardingPassBottom = ({
  collectionInfo,
}: {
  collectionInfo: RecentLearning;
}) => {
  const [departureLabel, setDepartureLabel] = useState('');
  const [arrivalLabel, setArrivalLabel] = useState('');
  const [lineWidth, setLineWidth] = useState(0);

  const equals = (a: number[], b: number[]) =>
    a?.length === b.length && a.every((v, i) => v === b[i]);

  const level = collectionInfo?.difficulties.sort();

  const setDifficultyLabel = () => {
    if (equals(level, [1])) {
      setDepartureLabel('입문자');
      setArrivalLabel('초급자');
      return;
    }
    if (equals(level, [2])) {
      setDepartureLabel('초급자');
      setArrivalLabel('중급자');
      return;
    }
    if (equals(level, [3])) {
      setDepartureLabel('중급자');
      setArrivalLabel('마스터');
      return;
    }
    if (equals(level, [1, 2])) {
      setDepartureLabel('입문·초급자');
      setArrivalLabel('중급자');
      return;
    }
    if (equals(level, [2, 3])) {
      setDepartureLabel('초급·중급자');
      setArrivalLabel('마스터');
      return;
    }
    if (equals(level, [1, 2, 3])) {
      setDepartureLabel('입문·초급·중급자');
      setArrivalLabel('마스터');
      return;
    }
  };

  const setPlaneLineWidth = () => {
    if (equals(level, [1]) || equals(level, [2]) || equals(level, [3])) {
      setLineWidth(61);
      return;
    }

    if (equals(level, [1, 2]) || equals(level, [2, 3])) {
      setLineWidth(52.5);
      return;
    }

    if (equals(level, [1, 2, 3])) {
      setLineWidth(37.5);
      return;
    }
  };

  useEffect(() => {
    setDifficultyLabel();
    setPlaneLineWidth();
  }, []);

  return (
    <Bottom>
      <Departure>
        <DepartureArrival>Departure</DepartureArrival>
        <Level>{departureLabel}</Level>
      </Departure>
      <RuntimeWrapper>
        <Step>{collectionInfo?.runtime} 시간</Step>
        <PlaneWrapper>
          <PlaneLine width={lineWidth} />
          <Image src={Plane} alt="plane" style={{ margin: '0 5px' }} />
          <PlaneLine width={lineWidth} />
        </PlaneWrapper>
      </RuntimeWrapper>
      <Arrival>
        <DepartureArrival>Arrival</DepartureArrival>
        <Level>{arrivalLabel}</Level>
      </Arrival>
    </Bottom>
  );
};

const RecentBoardingPass = ({
  collectionInfo,
}: {
  collectionInfo: RecentLearning;
}) => {
  return (
    <Container>
      <Image src={BoardingPassContainer} alt="boarding pass" />
      <BoardingPassImage src={CollectionImage} alt="collection image" />
      <Body>
        <TagWrapper>
          <Category interestField={collectionInfo?.interestField}>
            {interestFieldMap[collectionInfo?.interestField]}
          </Category>
          <Keyword>{collectionInfo?.keywords[0]}</Keyword>
          <Keyword>{collectionInfo?.keywords[1]}</Keyword>
        </TagWrapper>
        <Title>{collectionInfo?.title}</Title>
        <Author>{collectionInfo?.creator}</Author>
      </Body>
      <BoardingPassBottom collectionInfo={collectionInfo} />
    </Container>
  );
};

export default RecentBoardingPass;
