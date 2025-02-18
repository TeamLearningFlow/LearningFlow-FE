import React, { useEffect, useState } from 'react';
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
import TistoryLine from '/public/platformicon/tistory_ic.svg';
import { SearchResult } from './searchResult';
import { useRouter } from 'next/router';

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
  cursor: pointer;
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
  padding: 10px 20px;
  position: absolute;
  top: 281px;
  left: 1px;
  gap: 10px;
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
  min-width: 45px; // 값 임의 지정함
  max-width: 61px;
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
  height: 100%;
  // flex-shrink: 0;
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
  width?: string;
}>`
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize || '10px'};
  font-weight: 350;
  line-height: ${(props) => props.lineHeight || '15px'};
  letter-spacing: ${(props) => props.letterSpacing || '-0.2px'};
  width: ${(props) => props.width};

  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

const PlatformIcon = (source: string) => {
  switch (source) {
    case 'youtube':
      return (
        <ThumbnailWrapper>
          <Image src={YoutubeLine} alt="youtubeline" width={26} height={26} />
        </ThumbnailWrapper>
      );
    case 'naverBlog':
      return (
        <ThumbnailWrapper>
          <Image src={NaverblogLine} alt="blogline" width={26} height={26} />
        </ThumbnailWrapper>
      );
    case 'tistory':
      return (
        <ThumbnailWrapper>
          <Image src={TistoryLine} alt="velogline" width={26} height={26} />
        </ThumbnailWrapper>
      );
    case 'velog':
      return (
        <ThumbnailWrapper>
          <Image src={VelogLine} alt="velogline" width={26} height={26} />
        </ThumbnailWrapper>
      );
    default:
      return null;
  }
};

const PlatformSet = ({ data }: { data: SearchResult }) => {
  const platformSources = [
    ...new Set(data.resource.map((episode) => episode?.resourceSource)),
  ];

  const areArraysEqual = (arr1: string[], arr2: string[]) => {
    return (
      arr1.length === arr2.length &&
      new Set(arr1).size === new Set([...arr1, ...arr2]).size
    );
  };

  if (
    areArraysEqual(platformSources, [
      'youtube',
      'tistory',
      'naverBlog',
      'velog',
    ])
  ) {
    return (
      <ThumbnailWrapper>
        <Thumbnail left={0} zIndex={3}>
          <Image src={YoutubeIcon} alt="youtube" width={26} height={26} />
        </Thumbnail>
        <Thumbnail left={18} zIndex={2}>
          <Image src={TistoryIcon} alt="tistory" width={26} height={26} />
        </Thumbnail>
        <Thumbnail left={35} zIndex={1}>
          <Image src={NaverblogIcon} alt="naverblog" width={26} height={26} />
        </Thumbnail>
        <Thumbnail left={53} zIndex={0}>
          <Image src={VelogIcon} alt="velog" width={26} height={26} />
        </Thumbnail>
      </ThumbnailWrapper>
    );
  }
  if (areArraysEqual(platformSources, ['youtube', 'tistory', 'naverBlog'])) {
    return (
      <ThumbnailWrapper>
        <Thumbnail left={0} zIndex={3}>
          <Image src={YoutubeIcon} alt="youtube" width={26} height={26} />
        </Thumbnail>
        <Thumbnail left={18} zIndex={2}>
          <Image src={TistoryIcon} alt="tistory" width={26} height={26} />
        </Thumbnail>
        <Thumbnail left={35} zIndex={1}>
          <Image src={NaverblogIcon} alt="naverblog" width={26} height={26} />
        </Thumbnail>
      </ThumbnailWrapper>
    );
  }
  if (areArraysEqual(platformSources, ['youtube', 'tistory', 'velog'])) {
    return (
      <ThumbnailWrapper>
        <Thumbnail left={0} zIndex={3}>
          <Image src={YoutubeIcon} alt="youtube" width={26} height={26} />
        </Thumbnail>
        <Thumbnail left={18} zIndex={2}>
          <Image src={TistoryIcon} alt="tistory" width={26} height={26} />
        </Thumbnail>
        <Thumbnail left={35} zIndex={1}>
          <Image src={VelogIcon} alt="velog" width={26} height={26} />
        </Thumbnail>
      </ThumbnailWrapper>
    );
  }
  if (areArraysEqual(platformSources, ['youtube', 'naverBlog', 'velog'])) {
    return (
      <ThumbnailWrapper>
        <Thumbnail left={0} zIndex={3}>
          <Image src={YoutubeIcon} alt="youtube" width={26} height={26} />
        </Thumbnail>
        <Thumbnail left={18} zIndex={2}>
          <Image src={NaverblogIcon} alt="naverblog" width={26} height={26} />
        </Thumbnail>
        <Thumbnail left={35} zIndex={1}>
          <Image src={VelogIcon} alt="velog" width={26} height={26} />
        </Thumbnail>
      </ThumbnailWrapper>
    );
  }
  if (areArraysEqual(platformSources, ['tistory', 'naverBlog', 'velog'])) {
    return (
      <ThumbnailWrapper>
        <Thumbnail left={0} zIndex={3}>
          <Image src={TistoryIcon} alt="tistory" width={26} height={26} />
        </Thumbnail>
        <Thumbnail left={18} zIndex={2}>
          <Image src={NaverblogIcon} alt="naverblog" width={26} height={26} />
        </Thumbnail>
        <Thumbnail left={35} zIndex={1}>
          <Image src={VelogIcon} alt="velog" width={26} height={26} />
        </Thumbnail>
      </ThumbnailWrapper>
    );
  }
  if (areArraysEqual(platformSources, ['youtube', 'tistory'])) {
    return (
      <ThumbnailWrapper>
        <Thumbnail left={0} zIndex={3}>
          <Image src={YoutubeIcon} alt="youtube" width={26} height={26} />
        </Thumbnail>
        <Thumbnail left={18} zIndex={2}>
          <Image src={TistoryIcon} alt="tistory" width={26} height={26} />
        </Thumbnail>
      </ThumbnailWrapper>
    );
  }
  if (areArraysEqual(platformSources, ['youtube', 'naverBlog'])) {
    return (
      <ThumbnailWrapper>
        <Thumbnail left={0} zIndex={3}>
          <Image src={YoutubeIcon} alt="youtube" width={26} height={26} />
        </Thumbnail>
        <Thumbnail left={18} zIndex={2}>
          <Image src={NaverblogIcon} alt="naverblog" width={26} height={26} />
        </Thumbnail>
      </ThumbnailWrapper>
    );
  }
  if (areArraysEqual(platformSources, ['youtube', 'velog'])) {
    return (
      <ThumbnailWrapper>
        <Thumbnail left={0} zIndex={3}>
          <Image src={YoutubeIcon} alt="youtube" width={26} height={26} />
        </Thumbnail>
        <Thumbnail left={18} zIndex={2}>
          <Image src={VelogIcon} alt="velog" width={26} height={26} />
        </Thumbnail>
      </ThumbnailWrapper>
    );
  }
  if (areArraysEqual(platformSources, ['tistory', 'naverBlog'])) {
    return (
      <ThumbnailWrapper>
        <Thumbnail left={0} zIndex={3}>
          <Image src={TistoryIcon} alt="tistory" width={26} height={26} />
        </Thumbnail>
        <Thumbnail left={18} zIndex={2}>
          <Image src={NaverblogIcon} alt="naverblog" width={26} height={26} />
        </Thumbnail>
      </ThumbnailWrapper>
    );
  }
  if (areArraysEqual(platformSources, ['tistory', 'velog'])) {
    return (
      <ThumbnailWrapper>
        <Thumbnail left={0} zIndex={3}>
          <Image src={TistoryIcon} alt="tistory" width={26} height={26} />
        </Thumbnail>
        <Thumbnail left={18} zIndex={2}>
          <Image src={VelogIcon} alt="velog" width={26} height={26} />
        </Thumbnail>
      </ThumbnailWrapper>
    );
  }
  if (areArraysEqual(platformSources, ['naverBlog', 'velog'])) {
    return (
      <ThumbnailWrapper>
        <Thumbnail left={0} zIndex={3}>
          <Image src={NaverblogIcon} alt="naverblog" width={26} height={26} />
        </Thumbnail>
        <Thumbnail left={18} zIndex={2}>
          <Image src={VelogIcon} alt="velog" width={26} height={26} />
        </Thumbnail>
      </ThumbnailWrapper>
    );
  }
  if (areArraysEqual(platformSources, ['tistory'])) {
    return (
      <ThumbnailWrapper>
        <Thumbnail left={0} zIndex={3}>
          <Image src={TistoryIcon} alt="velog" width={26} height={26} />
        </Thumbnail>
      </ThumbnailWrapper>
    );
  }
  if (areArraysEqual(platformSources, ['naverBlog'])) {
    return (
      <ThumbnailWrapper>
        <Thumbnail left={0} zIndex={3}>
          <Image src={NaverblogIcon} alt="naverblog" width={26} height={26} />
        </Thumbnail>
      </ThumbnailWrapper>
    );
  }
  if (areArraysEqual(platformSources, ['velog'])) {
    return (
      <ThumbnailWrapper>
        <Thumbnail left={0} zIndex={3}>
          <Image src={VelogIcon} alt="velog" width={26} height={26} />
        </Thumbnail>
      </ThumbnailWrapper>
    );
  }
  if (areArraysEqual(platformSources, ['youtube'])) {
    return (
      <ThumbnailWrapper>
        <Thumbnail left={0} zIndex={3}>
          <Image src={YoutubeIcon} alt="youtube" width={26} height={26} />
        </Thumbnail>
      </ThumbnailWrapper>
    );
  }
};

const CollectionAmount = ({ data }: { data: SearchResult }) => {
  console.log('data 확인:', data);
  return (
    <CollectionDetail>
      {data.textCount !== 0 && <Detail>아티클</Detail>}
      {data.textCount !== 0 && <Number>{data.textCount}</Number>}
      {data.videoCount !== 0 && <Detail marginLeft={'5px'}>영상</Detail>}
      {data.videoCount !== 0 && <Number>{data.videoCount}</Number>}
    </CollectionDetail>
  );
};

const HoverCollection = ({
  data,
  status,
}: {
  data: SearchResult;
  status: string;
}) => {
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
            <Number status="학습완료">총 {data.amount}회차</Number>
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
            <CollectionAmount data={data} />
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
            <PlatformSet data={data} />
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
            <CollectionAmount data={data} />
          </CollectionHeader>
          <CollectionWrapper>
            {data.resource.slice(0, 3).map((item, index) => (
              <ContentWrapper key={index}>
                {PlatformIcon(item?.resourceSource)}
                <Content>
                  <Label color={'#BBB6FF'}>{item?.episodeNumber}회차</Label>
                  <Label color={'#fff'} width={'206px'}>
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

const BoardingPassBottom = ({
  data,
  status,
}: {
  data: SearchResult;
  status?: string;
}) => {
  const [departureLabel, setDepartureLabel] = useState('');
  const [arrivalLabel, setArrivalLabel] = useState('');

  const setDifficultyLabel = () => {
    const equals = (a: number[], b: number[]) =>
      a.length === b.length && a.every((v, i) => v === b[i]);

    const level = data.difficulties.sort();

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

  useEffect(() => {
    setDifficultyLabel();
  }, []);

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
          <ColumnFlexDiv>
            <DepartureArrival>Departure</DepartureArrival>
            <Level>{departureLabel}</Level>
          </ColumnFlexDiv>
          <ColumnFlexDiv>
            <Step>{data.runtime} 시간</Step>
            <PlaneWrapper>
              <PlaneLine></PlaneLine>
              <Image src={Plane} alt="plane" style={{ margin: '0 5px' }} />
              <PlaneLine></PlaneLine>
            </PlaneWrapper>
          </ColumnFlexDiv>
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
  data: SearchResult;
  showHoverCollection?: boolean;
}) => {
  const router = useRouter();

  return (
    <Container onClick={() => router.push(`/collection/${data.collectionId}`)}>
      <Image src={BoardingPassContainer} alt="boarding pass" />
      <BoardingPassImage src={CollectionImage} alt="collection image" />
      <StatusTag status=""></StatusTag>
      <Body>
        <TagWrapper>
          <Category interestField={data.interestField}>
            {interestFieldMap[data.interestField]}
          </Category>
          <Keyword>{data.keywords[0]}</Keyword>
          <Keyword>{data.keywords[1]}</Keyword>
        </TagWrapper>
        <Title>{data.title}</Title>
        <Author>{data.creator}</Author>
      </Body>
      <BoardingPassBottom data={data} status="" />
      {showHoverCollection && <HoverCollection data={data} status="" />}
    </Container>
  );
};

export default BoardingPass;
