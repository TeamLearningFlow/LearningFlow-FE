import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import BoardingPassContainer from '/public/M_Background.svg';
import CollectionImage from '/public/boardingpassM.svg';
import BookmarkIcon from '/public/bookmark_M.svg';
import BookmarkFilledIcon from '/public/bookmarkFilled.svg';
import HoverBackgroundTop from '/public/hover-backgroundTopM.svg';
import HoverBackground from '/public/hover-backgroundM.svg';
import Plane from '/public/plane_M.svg';
import circle from '/public/circle.svg';
import Calendar from '/public/calendarIcon.svg';

import NaverblogIcon from '/public/platformicon/naverblog_nostroke_ic_M.svg';
import TistoryIcon from '/public/platformicon/tistory_nostroke_ic_M.svg';
import VelogIcon from '/public/platformicon/velog_nostroke_ic_M.svg';
import YoutubeIcon from '/public/platformicon/youtube_nostroke_ic_M.svg';
import VelogLine from '/public/platformicon/velog_ic_M.svg';
import NaverblogLine from '/public/platformicon/naverblog_ic_M.svg';
import TistoryLine from '/public/platformicon/tistory_ic_M.svg';
import YoutubeLine from '/public/platformicon/youtube_ic_M.svg';
import OnStudying from '/public/onstudying.svg';
import CompletedStamp from '/public/completedStampS.svg';
import { RecommendedCollection } from './homeCollection';
import { useRouter } from 'next/router';
import axios from 'axios';

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

const BoardingPassImageWrapper = styled.div`
  position: absolute;
  top: 1px;
  left: 1px;
  width: 384px;
  height: 215px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
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
    props.status === 'IN_PROGRESS' || props.status === 'COMPLETED'
      ? 'inline-flex'
      : 'none'};
  padding: 2px 8px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: ${(props) =>
    props.status === 'IN_PROGRESS' ? '#5e52ff' : '#F5F5F5'};
  color: ${(props) => (props.status === 'IN_PROGRESS' ? '#fff' : '#4F5357')};

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

const Bookmark = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
  width: 54px;
  height: 54px;
  background: transparent;
  border: none;
`;

const Body = styled.div`
  background: #fff;
  height: 122px;
  margin: 18px 20px;
  position: absolute;
  top: 225px;
  left: 2px;
  cursor: pointer;
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
  cursor: pointer;
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

const RuntimeWrapper = styled(ColumnFlexDiv)`
  gap: 4px;
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

const ProgressBar = styled.div<{ percentage: number }>`
  height: 100%;
  width: ${(props) => props.percentage}%;
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
  cursor: pointer;
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
  cursor: default;
`;

const CollectionHeader = styled(RowFlexDiv)`
  align-items: center;
  position: absolute;
  left: 20px;
  top: 80px;
  width: 320px;
  height: 36px;
`;

const Thumbnail = styled.div<{ left: number; zIndex: number }>`
  width: 36px;
  height: 36px;
  border-radius: 13px;
  position: absolute;
  left: ${(props) => props.left}px;
  z-index: ${(props) => props.zIndex};
  // top: -5px;
`;

const ThumbnailWrapper = styled.div`
  position: relative;
  height: 36px;
  // margin-left: 10px;
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

const LineWrapper = styled.span<{ status?: string; left?: string }>`
  display: flex;
  align-items: center;
  position: absolute;
  left: ${(props) =>
    props.status === '학습완료' ? '130px' : props.left || '96px'};
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CollectionWrapper = styled(ColumnFlexDiv)`
  position: absolute;
  left: 20px;
  top: 123px;
  width: 328px;
  height: 168px;
  gap: 18px;
`;

const ContentWrapper = styled(RowFlexDiv)`
  align-items: center;
  width: 328px;
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
  fontWeight?: number;
  letterSpacing?: string;
  lineHeight?: string;
  marginTop?: string;
  width?: string;
}>`
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize || '12px'};
  font-weight: ${(props) => props.fontWeight || 350};
  line-height: ${(props) => props.lineHeight || '17px'};
  letter-spacing: ${(props) => props.letterSpacing || '-0.2px'};
  margin-top: ${(props) => props.marginTop || '0px'};
  width: ${(props) => props.width};

  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CompletedStampIcon = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  margin-left: 225px;
  margin-top: -19px;
`;

const Gradient = styled.div`
  width: 328px;
  height: 64px;
  position: absolute;
  bottom: 0;
  left: 0;
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

const Circle = styled.span`
  height: 48px;
  width: 25px;
  background: #fff;
  position: absolute;
  top: 193px;
  z-index: 10;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
`;

const LeftCircle = styled(Circle)`
  border-radius: 0px 24px 24px 0px;
  left: 0;
  border-right: 1px solid #d9d9d9;
  border-left: 1px solid #fff;
`;

const RightCircle = styled(Circle)`
  border-radius: 24px 0px 0px 24px;
  right: 0;
  border-left: 1px solid #d9d9d9;
  border-right: 1px solid #fff;
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

const LearningStatusMap: Record<string, string> = {
  IN_PROGRESS: '학습중',
  COMPLETED: '학습완료',
};

const PlatformIcon = (source: string) => {
  switch (source) {
    case 'youtube':
      return (
        <ThumbnailWrapper>
          <Image src={YoutubeLine} alt="youtubeline" width={36} height={36} />
        </ThumbnailWrapper>
      );
    case 'naverBlog':
      return (
        <ThumbnailWrapper>
          <Image src={NaverblogLine} alt="blogline" width={36} height={36} />
        </ThumbnailWrapper>
      );
    case 'tistory':
      return (
        <ThumbnailWrapper>
          <Image src={TistoryLine} alt="velogline" width={36} height={36} />
        </ThumbnailWrapper>
      );
    case 'velog':
      return (
        <ThumbnailWrapper>
          <Image src={VelogLine} alt="velogline" width={36} height={36} />
        </ThumbnailWrapper>
      );
    default:
      return null;
  }
};

const PlatformSet = ({ data }: { data: RecommendedCollection }) => {
  const areArraysEqual = (arr1: string[], arr2: string[]) => {
    return (
      arr1.length === arr2.length &&
      new Set(arr1).size === new Set([...arr1, ...arr2]).size
    );
  };

  if (
    areArraysEqual(data?.resourceSourceTypes, [
      'youtube',
      'tistory',
      'naverBlog',
      'velog',
    ])
  ) {
    return (
      <ThumbnailWrapper>
        <Thumbnail left={0} zIndex={3}>
          <Image src={YoutubeIcon} alt="youtube" width={36} height={36} />
        </Thumbnail>
        <Thumbnail left={18} zIndex={2}>
          <Image src={TistoryIcon} alt="tistory" width={36} height={36} />
        </Thumbnail>
        <Thumbnail left={35} zIndex={1}>
          <Image src={NaverblogIcon} alt="naverblog" width={36} height={36} />
        </Thumbnail>
        <Thumbnail left={53} zIndex={0}>
          <Image src={VelogIcon} alt="velog" width={36} height={36} />
        </Thumbnail>
      </ThumbnailWrapper>
    );
  }
  if (
    areArraysEqual(data?.resourceSourceTypes, [
      'youtube',
      'tistory',
      'naverBlog',
    ])
  ) {
    return (
      <ThumbnailWrapper>
        <Thumbnail left={0} zIndex={3}>
          <Image src={YoutubeIcon} alt="youtube" width={36} height={36} />
        </Thumbnail>
        <Thumbnail left={18} zIndex={2}>
          <Image src={TistoryIcon} alt="tistory" width={36} height={36} />
        </Thumbnail>
        <Thumbnail left={35} zIndex={1}>
          <Image src={NaverblogIcon} alt="naverblog" width={36} height={36} />
        </Thumbnail>
      </ThumbnailWrapper>
    );
  }
  if (
    areArraysEqual(data?.resourceSourceTypes, ['youtube', 'tistory', 'velog'])
  ) {
    return (
      <ThumbnailWrapper>
        <Thumbnail left={0} zIndex={3}>
          <Image src={YoutubeIcon} alt="youtube" width={36} height={36} />
        </Thumbnail>
        <Thumbnail left={18} zIndex={2}>
          <Image src={TistoryIcon} alt="tistory" width={36} height={36} />
        </Thumbnail>
        <Thumbnail left={35} zIndex={1}>
          <Image src={VelogIcon} alt="velog" width={36} height={36} />
        </Thumbnail>
      </ThumbnailWrapper>
    );
  }
  if (
    areArraysEqual(data?.resourceSourceTypes, ['youtube', 'naverBlog', 'velog'])
  ) {
    return (
      <ThumbnailWrapper>
        <Thumbnail left={0} zIndex={3}>
          <Image src={YoutubeIcon} alt="youtube" width={36} height={36} />
        </Thumbnail>
        <Thumbnail left={18} zIndex={2}>
          <Image src={NaverblogIcon} alt="naverblog" width={36} height={36} />
        </Thumbnail>
        <Thumbnail left={35} zIndex={1}>
          <Image src={VelogIcon} alt="velog" width={36} height={36} />
        </Thumbnail>
      </ThumbnailWrapper>
    );
  }
  if (
    areArraysEqual(data?.resourceSourceTypes, ['tistory', 'naverBlog', 'velog'])
  ) {
    return (
      <ThumbnailWrapper>
        <Thumbnail left={0} zIndex={3}>
          <Image src={TistoryIcon} alt="tistory" width={36} height={36} />
        </Thumbnail>
        <Thumbnail left={18} zIndex={2}>
          <Image src={NaverblogIcon} alt="naverblog" width={36} height={36} />
        </Thumbnail>
        <Thumbnail left={35} zIndex={1}>
          <Image src={VelogIcon} alt="velog" width={36} height={36} />
        </Thumbnail>
      </ThumbnailWrapper>
    );
  }
  if (areArraysEqual(data?.resourceSourceTypes, ['youtube', 'tistory'])) {
    return (
      <ThumbnailWrapper>
        <Thumbnail left={0} zIndex={3}>
          <Image src={YoutubeIcon} alt="youtube" width={36} height={36} />
        </Thumbnail>
        <Thumbnail left={18} zIndex={2}>
          <Image src={TistoryIcon} alt="tistory" width={36} height={36} />
        </Thumbnail>
      </ThumbnailWrapper>
    );
  }
  if (areArraysEqual(data?.resourceSourceTypes, ['youtube', 'naverBlog'])) {
    return (
      <ThumbnailWrapper>
        <Thumbnail left={0} zIndex={3}>
          <Image src={YoutubeIcon} alt="youtube" width={36} height={36} />
        </Thumbnail>
        <Thumbnail left={18} zIndex={2}>
          <Image src={NaverblogIcon} alt="naverblog" width={36} height={36} />
        </Thumbnail>
      </ThumbnailWrapper>
    );
  }
  if (areArraysEqual(data?.resourceSourceTypes, ['youtube', 'velog'])) {
    return (
      <ThumbnailWrapper>
        <Thumbnail left={0} zIndex={3}>
          <Image src={YoutubeIcon} alt="youtube" width={36} height={36} />
        </Thumbnail>
        <Thumbnail left={18} zIndex={2}>
          <Image src={VelogIcon} alt="velog" width={36} height={36} />
        </Thumbnail>
      </ThumbnailWrapper>
    );
  }
  if (areArraysEqual(data?.resourceSourceTypes, ['tistory', 'naverBlog'])) {
    return (
      <ThumbnailWrapper>
        <Thumbnail left={0} zIndex={3}>
          <Image src={TistoryIcon} alt="tistory" width={36} height={36} />
        </Thumbnail>
        <Thumbnail left={18} zIndex={2}>
          <Image src={NaverblogIcon} alt="naverblog" width={36} height={36} />
        </Thumbnail>
      </ThumbnailWrapper>
    );
  }
  if (areArraysEqual(data?.resourceSourceTypes, ['tistory', 'velog'])) {
    return (
      <ThumbnailWrapper>
        <Thumbnail left={0} zIndex={3}>
          <Image src={TistoryIcon} alt="tistory" width={36} height={36} />
        </Thumbnail>
        <Thumbnail left={18} zIndex={2}>
          <Image src={VelogIcon} alt="velog" width={36} height={36} />
        </Thumbnail>
      </ThumbnailWrapper>
    );
  }
  if (areArraysEqual(data?.resourceSourceTypes, ['naverBlog', 'velog'])) {
    return (
      <ThumbnailWrapper>
        <Thumbnail left={0} zIndex={3}>
          <Image src={NaverblogIcon} alt="naverblog" width={36} height={36} />
        </Thumbnail>
        <Thumbnail left={18} zIndex={2}>
          <Image src={VelogIcon} alt="velog" width={36} height={36} />
        </Thumbnail>
      </ThumbnailWrapper>
    );
  }
  if (areArraysEqual(data?.resourceSourceTypes, ['tistory'])) {
    return (
      <ThumbnailWrapper>
        <Thumbnail left={0} zIndex={3}>
          <Image src={TistoryIcon} alt="velog" width={36} height={36} />
        </Thumbnail>
      </ThumbnailWrapper>
    );
  }
  if (areArraysEqual(data?.resourceSourceTypes, ['naverBlog'])) {
    return (
      <ThumbnailWrapper>
        <Thumbnail left={0} zIndex={3}>
          <Image src={NaverblogIcon} alt="naverblog" width={36} height={36} />
        </Thumbnail>
      </ThumbnailWrapper>
    );
  }
  if (areArraysEqual(data?.resourceSourceTypes, ['velog'])) {
    return (
      <ThumbnailWrapper>
        <Thumbnail left={0} zIndex={3}>
          <Image src={VelogIcon} alt="velog" width={36} height={36} />
        </Thumbnail>
      </ThumbnailWrapper>
    );
  }
  if (areArraysEqual(data?.resourceSourceTypes, ['youtube'])) {
    return (
      <ThumbnailWrapper>
        <Thumbnail left={0} zIndex={3}>
          <Image src={YoutubeIcon} alt="youtube" width={36} height={36} />
        </Thumbnail>
      </ThumbnailWrapper>
    );
  }
};

const CollectionAmount = ({ data }: { data: RecommendedCollection }) => {
  return (
    <CollectionDetail>
      {data?.textCount !== 0 && <Detail>아티클</Detail>}
      {data?.textCount !== 0 && <Number>{data?.textCount}</Number>}
      {data?.videoCount !== 0 && <Detail marginLeft={'5px'}>영상</Detail>}
      {data?.videoCount !== 0 && <Number>{data?.videoCount}</Number>}
    </CollectionDetail>
  );
};

const DashedLine = ({ width, path }: { width?: number; path?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height="2"
    viewBox={`0 0 ${width} 2`}
    fill="none"
  >
    <path
      d={path}
      stroke="#FAFAFC"
      // strokeWidth="740061"
      strokeDasharray="2.18 2.18"
    />
  </svg>
);

const HeaderLine = ({ data }: { data: RecommendedCollection }) => {
  const areArraysEqual = (arr1: string[], arr2: string[]) => {
    return (
      arr1.length === arr2.length &&
      new Set(arr1).size === new Set([...arr1, ...arr2]).size
    );
  };

  if (data.learningStatus === 'COMPLETED') {
    return (
      <LineWrapper status="학습완료">
        <DashedLine width={95} path="M0 1H95" />
        <Image src={circle} alt="circle" />
      </LineWrapper>
    );
  } else {
    if (
      areArraysEqual(data.resourceSourceTypes, [
        'youtube',
        'tistory',
        'naverBlog',
        'velog',
      ])
    ) {
      return (
        <LineWrapper status="" left={'128px'}>
          <DashedLine width={93} path="M0 1H93" />
          <Image src={circle} alt="circle" />
        </LineWrapper>
      );
    }
    if (
      areArraysEqual(data.resourceSourceTypes, [
        'youtube',
        'tistory',
        'naverBlog',
      ]) ||
      areArraysEqual(data.resourceSourceTypes, [
        'youtube',
        'tistory',
        'velog',
      ]) ||
      areArraysEqual(data.resourceSourceTypes, [
        'youtube',
        'naverBlog',
        'velog',
      ])
    ) {
      return (
        <LineWrapper status="" left={'104px'}>
          <DashedLine width={117} path="M0 1H117" />
          <Image src={circle} alt="circle" />
        </LineWrapper>
      );
    }
    if (
      areArraysEqual(data.resourceSourceTypes, [
        'tistory',
        'naverBlog',
        'velog',
      ])
    ) {
      return (
        <LineWrapper status="" left={'104px'}>
          <DashedLine width={158} path="M0 1H158" />
          <Image src={circle} alt="circle" />
        </LineWrapper>
      );
    }
    if (
      areArraysEqual(data.resourceSourceTypes, ['youtube', 'tistory']) ||
      areArraysEqual(data.resourceSourceTypes, ['youtube', 'naverBlog']) ||
      areArraysEqual(data.resourceSourceTypes, ['youtube', 'velog'])
    ) {
      return (
        <LineWrapper status="" left={'80px'}>
          <DashedLine width={141} path="M0 1H141" />
          <Image src={circle} alt="circle" />
        </LineWrapper>
      );
    }

    if (
      areArraysEqual(data.resourceSourceTypes, ['tistory', 'naverBlog']) ||
      areArraysEqual(data.resourceSourceTypes, ['tistory', 'velog']) ||
      areArraysEqual(data.resourceSourceTypes, ['naverBlog', 'velog'])
    ) {
      return (
        <LineWrapper status="" left={'80px'}>
          <DashedLine width={182} path="M0 1H182" />
          <Image src={circle} alt="circle" />
        </LineWrapper>
      );
    }

    if (
      areArraysEqual(data.resourceSourceTypes, ['tistory']) ||
      areArraysEqual(data.resourceSourceTypes, ['naverBlog']) ||
      areArraysEqual(data.resourceSourceTypes, ['velog'])
    ) {
      return (
        <LineWrapper status="" left={'56px'}>
          <DashedLine width={206} path="M0 1H206" />
          <Image src={circle} alt="circle" />
        </LineWrapper>
      );
    }

    if (areArraysEqual(data.resourceSourceTypes, ['youtube'])) {
      return (
        <LineWrapper status="" left={'56px'}>
          <DashedLine width={214} path="M0 1H214" />
          <Image src={circle} alt="circle" />
        </LineWrapper>
      );
    }
  }
};

const BookmarkButton = ({
  collection,
}: {
  collection: RecommendedCollection;
}) => {
  const [isBookmarked, setIsBookmarked] = useState(collection.liked);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleBookmark = async (e: React.MouseEvent) => {
    // 클릭 이벤트 전파 차단 (북마크 버튼에서만 동작)
    e.stopPropagation();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('로그인이 필요합니다!'); // 모달로 변경 필요
      router.push('/login');
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `https://onboarding.p-e.kr/collections/${collection.collectionId}/likes`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.isSuccess) {
        setIsBookmarked(!isBookmarked);
      }
    } catch (error) {
      console.error('북마크 처리 중 오류가 발생했습니다: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Bookmark onClick={handleBookmark} disabled={loading} data-bookmark="true">
      {isBookmarked ? (
        <Image src={BookmarkFilledIcon} alt="bookmark" width={36} height={36} />
      ) : (
        <Image src={BookmarkIcon} alt="bookmark" width={36} height={36} />
      )}
    </Bookmark>
  );
};

const HoverCollection = ({ data }: { data: RecommendedCollection }) => {
  return (
    <HoverWrapper>
      <HoverBackgroundTopWrapper>
        <Image src={HoverBackgroundTop} alt="hoverbackgroundtop" />
        <BookmarkButton collection={data} />
      </HoverBackgroundTopWrapper>
      {data.learningStatus === 'COMPLETED' ? ( // 수정필요
        <>
          <Image
            src={HoverBackground}
            alt="hover background"
            style={{ top: '57px', position: 'absolute' }}
          />
          <CollectionHeader>
            <Number status="학습완료">총 {data.amount}회차</Number>
            <HeaderLine data={data} />
            <CollectionAmount data={data} />
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
                    style={{ marginTop: '3px' }}
                  >
                    학습기간
                  </Label>
                </TextWrapper>
                <Label
                  color={'#fff'}
                  fontSize="14px"
                  lineHeight="18px"
                  letterSpacing="-0.24px"
                  fontWeight={500}
                >
                  {data.startDate[0]}.{data.startDate[1]}.{data.startDate[2]} ~
                  {data.completedDate[0]}.{data.completedDate[1]}.
                  {data.completedDate[2]}
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
            <PlatformSet data={data} />
            <HeaderLine data={data} />
            <CollectionAmount data={data} />
          </CollectionHeader>

          <CollectionWrapper>
            {data?.resource.slice(0, 3).map((item, index) => (
              <ContentWrapper key={index}>
                {PlatformIcon(item?.resourceSource)}
                <Content>
                  <Label color={'#BBB6FF'}>{item?.episodeNumber}회차</Label>
                  <Label color={'#fff'} width={'275px'}>
                    {item?.episodeName}
                  </Label>
                </Content>
              </ContentWrapper>
            ))}
            <Gradient />
          </CollectionWrapper>
        </>
      )}
    </HoverWrapper>
  );
};

const BoardingPassBottom = ({ data }: { data: RecommendedCollection }) => {
  const [departureLabel, setDepartureLabel] = useState('');
  const [arrivalLabel, setArrivalLabel] = useState('');
  const [lineWidth, setLineWidth] = useState(0);

  const equals = (a: number[], b: number[]) =>
    a.length === b.length && a.every((v, i) => v === b[i]);

  const level = data?.difficulties.sort() || [];

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
      setLineWidth(83.45);
      return;
    }

    if (equals(level, [1, 2]) || equals(level, [2, 3])) {
      setLineWidth(69.45);
      return;
    }

    if (equals(level, [1, 2, 3])) {
      setLineWidth(48.95);
      return;
    }
  };

  useEffect(() => {
    setDifficultyLabel();
    setPlaneLineWidth();
  }, []);

  return (
    <Bottom>
      {data.learningStatus == 'IN_PROGRESS' ? (
        <ProgressWrapper>
          <ProgressLabel>
            <Image src={OnStudying} alt=""></Image>학습중
          </ProgressLabel>
          <ProgressBarFull>
            <ProgressBar percentage={data.progressRatePercentage} />
          </ProgressBarFull>
          <ProgressRate>{data.progressRatio}</ProgressRate>
        </ProgressWrapper>
      ) : (
        <>
          <ColumnFlexDiv>
            <DepartureArrival>Departure</DepartureArrival>
            <Level>{departureLabel}</Level>
          </ColumnFlexDiv>
          <RuntimeWrapper>
            <Step>{data?.runtime} 시간</Step>
            <PlaneWrapper>
              <PlaneLine width={lineWidth} />
              <Image src={Plane} alt="plane" style={{ margin: '0 8px' }} />
              <PlaneLine width={lineWidth} />
            </PlaneWrapper>
          </RuntimeWrapper>
          <ColumnFlexDiv>
            <DepartureArrival>Arrival</DepartureArrival>
            <Level>{arrivalLabel}</Level>
          </ColumnFlexDiv>
        </>
      )}
    </Bottom>
  );
};

const BoardingPass = ({
  data,
  showHoverCollection,
}: {
  data: RecommendedCollection;
  showHoverCollection?: boolean;
}) => {
  const router = useRouter();

  const handleCollectionClick = (e: React.MouseEvent) => {
    // 북마크 버튼을 클릭했을 경우, router.push 방지
    if (e.target instanceof HTMLButtonElement && e.target.dataset.bookmark) {
      e.stopPropagation(); // 이벤트 전파 차단
      return;
    }
    // 북마크 버튼이 아닌 다른 곳 클릭 시 router.push 실행
    router.push(`/collection/${data.collectionId}`);
  };

  return (
    <Container onClick={handleCollectionClick}>
      <Image src={BoardingPassContainer} alt="boardingpass" />
      <BoardingPassImageWrapper>
        <BoardingPassImage
          src={data.imageUrl || CollectionImage}
          alt="collection image"
          fill
          style={{
            left: '0',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
            objectFit: 'cover',
          }}
        />
      </BoardingPassImageWrapper>
      <LeftCircle />
      <RightCircle />
      <StatusTag status={data.learningStatus}>
        {LearningStatusMap[data.learningStatus]}
      </StatusTag>
      <Body>
        <TagWrapper>
          <Category interestField={data?.interestField}>
            {interestFieldMap[data?.interestField]}
          </Category>
          <Keyword>{data?.keywords[0]}</Keyword>
          <Keyword>{data?.keywords[1]}</Keyword>
        </TagWrapper>
        <Title>{data?.title}</Title>
        <Author>{data?.creator}</Author>
      </Body>
      <BoardingPassBottom data={data} />
      {showHoverCollection && <HoverCollection data={data} />}
    </Container>
  );
};

export default BoardingPass;
