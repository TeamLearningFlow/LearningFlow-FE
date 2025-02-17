import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Image from 'next/image';
import CheckedYoutube from '/public/platformicon/youtube_checked_ic.svg';
import CheckedBlog from '/public/platformicon/naver blog_checked_ic.svg';
import CheckedTistory from '/public/platformicon/tistory_checked_ic.svg';
import CheckedVelog from '/public/platformicon/velog_checked_ic.svg';
import YoutubeActiveIcon from '/public/platformicon/youtube_active_ic.svg';
import BlogActiveIcon from '/public/platformicon/naverblog_active_ic.svg';
import VelogActiveIcon from '/public/platformicon/velog_active_ic.svg';
import TistoryActiveIcon from '/public/platformicon/tistory_active_ic.svg';
import Youtube from '/public/platformicon/youtube_nostroke_ic.svg';
import Blog from '/public/platformicon/naverblog_nostroke_ic.svg';
import Tistory from '/public/platformicon/tistory_nostroke_ic.svg';
import Velog from '/public/platformicon/velog_nostroke_ic.svg';


interface ResourceData {
  episodeId: number; // 강의의 고유 ID
  episodeName: string; // 강의 이름
  url: string; // 강의 URL
  resourceSource: "youtube" | "naverBlog" | "tistory" | "velog"; // 리소스 출처
  episodeNumber: number; // 회차 번호
  // progress: number;
}

interface CollectionData {
  amount: number; // 전체 강의 수
  collectionId: number; // 컬렉션 고유 ID
  completedDate: string | null; // 완료 날짜
  creator: string; // 강의 제작자
  difficulties: number[]; // 강의 난이도
  imageUrl: string; // 이미지 URL
  interestField: string; // 관심 분야
  keywords: string[]; // 키워드 목록
  learningStatus: "BEFORE" | "IN_PROGRESS" | "COMPLETED"; // 학습 상태
  liked: boolean; // 좋아요 여부
  likesCount: number; // 좋아요 수
  progressRatePercentage: number | null; // 전체 강의 진행률
  progressRatio: string | null; // 전체 진행 비율
  resource: ResourceData[]; // 강의 목록 (각 강의에 대한 정보)
}


const getPlatformIcon = (
  resourceSource: "youtube" | "naverBlog" | "tistory" | "velog",
  type: "checked" | "active" | "default"
) => {
  const icons = {
    youtube: {
      checked: CheckedYoutube,
      active: YoutubeActiveIcon,
      default: Youtube,
    },
    naverBlog: {
      checked: CheckedBlog,
      active: BlogActiveIcon,
      default: Blog,
    },
    tistory: {
      checked: CheckedTistory,
      active: TistoryActiveIcon,
      default: Tistory,
    },
    velog: {
      checked: CheckedVelog,
      active: VelogActiveIcon,
      default: Velog,
    },
  };

  return icons[resourceSource]?.[type] || Youtube;
};


export const CompletedClass: React.FC<ResourceData & { collectionData: CollectionData }> = ({
  episodeId,
  episodeName,
  resourceSource,
  episodeNumber,
  collectionData,
}) => {
  const router = useRouter();
  const handleClick = async (episodeId: number, resourceSource: "youtube" | "naverBlog" | "tistory" | "velog") => { 
    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
  
      // resourceSource에 따라 API 경로 설정
      const resourceType = resourceSource === "youtube" ? "youtube" : "blog";
      const apiUrl = `http://onboarding.p-e.kr:8080/resources/${episodeId}/${resourceType}`;
  
      // API 요청
      const response = await axios.get(apiUrl, { headers });
  
      if (response.status === 200) {
        const data = response.data;
        router.push({
          pathname: `/learn/${episodeId}`, // 수강페이지로 이동
          query: { 
            episodeData: JSON.stringify(data),
            collectionData: JSON.stringify(collectionData)
           }, // 응답 데이터를 쿼리로 전달
        });
      }
    } catch (error) {
      console.error("강의 불러오기 실패:", error);
    }
  };

  return (
    <IndexWrapper onClick={() => handleClick(episodeId, resourceSource)}>
      <PlatformIcon>
        <Image src={getPlatformIcon(resourceSource, "checked")} alt="platform-icon" fill style={{ objectFit: "contain" }} />
      </PlatformIcon>
      <IndexContainer>
        <OrderBox>{episodeNumber}회차</OrderBox>
        <TitleBox>{episodeName}</TitleBox>
      </IndexContainer>
    </IndexWrapper>
  );
};

export const CurrentClass: React.FC<ResourceData & { collectionData: CollectionData }> = ({
  episodeId,
  episodeName,
  resourceSource,
  episodeNumber,
  collectionData,
}) => {
  const router = useRouter();
  const handleClick = async (episodeId: number, resourceSource: "youtube" | "naverBlog" | "tistory" | "velog") => { 
    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
  
      // resourceSource에 따라 API 경로 설정
      const resourceType = resourceSource === "youtube" ? "youtube" : "blog";
      const apiUrl = `http://onboarding.p-e.kr:8080/resources/${episodeId}/${resourceType}`;
  
      // API 요청
      const response = await axios.get(apiUrl, { headers });
  
      if (response.status === 200) {
        const data = response.data;
        router.push({
          pathname: `/learn/${episodeId}`, // 수강페이지로 이동
          query: { 
            episodeData: JSON.stringify(data),
            collectionData: JSON.stringify(collectionData)
           }, // 응답 데이터를 쿼리로 전달
        });
      }
    } catch (error) {
      console.error("강의 불러오기 실패:", error);
    }
  };

  return (
    <CurrentIndexWrapper onClick={() => handleClick(episodeId, resourceSource)}>
      <CurrentPlatformIcon>
        <Image src={getPlatformIcon(resourceSource, "active")} alt="platform-icon" fill style={{ objectFit: "contain" }} />
      </CurrentPlatformIcon>
      <IndexContainer>
        <CurrentOrderBox>{episodeNumber}회차</CurrentOrderBox>
        <TitleBox>{episodeName}</TitleBox>
      </IndexContainer>
    </CurrentIndexWrapper>
  );
};

export const NextClass: React.FC<ResourceData & { collectionData: CollectionData }> = ({
  episodeId,
  episodeName,
  resourceSource,
  episodeNumber,
  collectionData,
}) => {
  const router = useRouter();
  const handleClick = async (episodeId: number, resourceSource: "youtube" | "naverBlog" | "tistory" | "velog") => { 
    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const resourceType = resourceSource === "youtube" ? "youtube" : "blog";
      const apiUrl = `http://onboarding.p-e.kr:8080/resources/${episodeId}/${resourceType}`;

      const response = await axios.get(apiUrl, { headers });

      if (response.status === 200) {
        const data = response.data;

        // resourceItem 대신 episodeName 사용
        router.push({
          pathname: `/learn/${episodeId}`, 
          query: { 
            episodeData: JSON.stringify({ ...data, episodeName }), // 수정된 부분
            collectionData: JSON.stringify(collectionData)
          },
        });
      }
    } catch (error) {
      console.error("강의 불러오기 실패:", error);
    }
  };


  return (
    <IndexWrapper onClick={() => handleClick(episodeId, resourceSource)}>
      <PlatformIcon>
        <Image src={getPlatformIcon(resourceSource, "default")} alt="platform-icon" fill style={{ objectFit: "contain" }} />
      </PlatformIcon>
      <IndexContainer>
        <OrderBox>{episodeNumber}회차</OrderBox>
        <TitleBox>{episodeName}</TitleBox>
      </IndexContainer>
    </IndexWrapper>
  );
};


const IndexWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 70px;
  min-height: 70px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
  padding: 0 1.7%;
  overflow: hidden;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background 0.5s;

  &:hover {
    background: rgba(245, 245, 245, 1);
  }

  @media (max-width: 560px) {
    margin-bottom: 3px;
    height: 60px;
    min-height: 60px;
  }
`;

const CurrentIndexWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 70px;
  min-height: 70px;
  background-color: rgba(245, 245, 255, 1);
  border-radius: 10px;
  padding: 0 1.7%;
  overflow: hidden;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background 0.5s;

  @media (max-width: 560px) {
    margin-bottom: 3px;
    height: 60px;
    min-height: 60px;
  }
`;

const PlatformIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  width: 50px;
  height: 50px;
  min-width: 40px;
  min-height: 40px;

  @media (max-width: 850px) {
    width: 45px;
    height: 45px;
    min-width: 35px;
    min-height: 35px;
  }

  @media (max-width: 560px) {
    width: 35px;
    height: 35px;
    min-width: 30px;
    min-height: 30px;
  }
`;

const CurrentPlatformIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  width: 50px;
  height: 50px;
  min-width: 40px;
  min-height: 40px;

  @media (max-width: 850px) {
    width: 45px;
    height: 45px;
    min-width: 35px;
    min-height: 35px;
  }

  @media (max-width: 560px) {
    width: 35px;
    height: 35px;
    min-width: 30px;
    min-height: 30px;
  }
`;

const IndexContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-left: 25px;

  @media (max-width: 850px) {

  }

  @media (max-width: 560px) {
    margin-left: 13px;
  }
`;

const OrderBox = styled.div`
  display: flex;
  font-size: 15px;
  margin-bottom: 8px;
  color: rgba(149, 156, 164, 1);

  @media (max-width: 850px) {
    font-size: 12px;
    margin-bottom: 6px;
  }

  @media (max-width: 560px) {
    font-size: 9px;
    margin-bottom: 3px;
  }
`;

const CurrentOrderBox = styled.div`
  display: flex;
  font-size: 15px;
  margin-bottom: 8px;
  color: #5e52ff;

  @media (max-width: 850px) {
    font-size: 12px;
    margin-bottom: 6px;
  }

  @media (max-width: 560px) {
    font-size: 9px;
    margin-bottom: 3px;
  }
`;

const TitleBox = styled.div`
  display: block;
  font-size: 18px;
  font-weight: 600;

  @media (max-width: 850px) {
    font-size: 15px;
  }

  @media (max-width: 560px) {
    font-size: 12px;
    white-space: wrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 180px;
  }
`;

