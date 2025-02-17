import React from 'react';
import { useRouter } from "next/router";
import axios from "axios";
import styled from 'styled-components';
import Image from 'next/image';
import PlayButton from '/public/playButton.svg';
import CompletedIndexIcon from '/public/assets/completedRadio.svg';
import EndIndexIcon from '/public/assets/defaultRadio.svg';
import CheckedYoutube from '/public/assets/platformicon/youtube_checked_ic.svg';
import CheckedBlog from '/public/assets/platformicon/naver blog_checked_ic.svg';
import CheckedTistory from '/public/assets/platformicon/tistory_checked_ic.svg';
import CheckedVelog from '/public/assets/platformicon/velog_checked_ic.svg';
import { CollectionData } from '@/pages/collection/[collectionId]';

interface ClassIndexProps {
  classData: CollectionData['resource'][0];
  collection: CollectionData;
}


const ClassIndex: React.FC<ClassIndexProps> = ({ classData, collection }) => {
  const router = useRouter();

 {/* const handleClick = async () => {
    // episodeId를 임의로 설정
    const episodeId = 54;
  
    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      // episodeId에 대해 API 요청
      const response = await axios.get(
        `http://onboarding.p-e.kr:8080/resources/${episodeId}/youtube`,
        { headers }
      );
      if (response.status === 200) {
        const data = response.data;
        router.push({
          pathname: `/learn/${episodeId}`, // LearnPage로 이동
          query: { data: JSON.stringify(data) }, // 응답 데이터를 쿼리로 전달
        });
      }
    } catch (error) {
      console.error("강의 불러오기 실패:", error);
    }
  };
  */} 

 
  const handleClick = async () => {
    const episodeId = classData.episodeId;
  
  try {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    
    // resourceSource에 따라 API 경로 설정
    const resourceType = classData.resourceSource === "youtube" ? "youtube" : "blog";
    const apiUrl = `http://onboarding.p-e.kr:8080/resources/${episodeId}/${resourceType}`;

    // API 요청
    const response = await axios.get(apiUrl, { headers });

    if (response.status === 200) {
      const data = response.data;
      console.log('API 응답 데이터:', data);
      router.push({
        pathname: `/learn/${episodeId}`, // 수강페이지로 이동
        query: { 
          episodeData: JSON.stringify(data),
          collectionData: JSON.stringify(collection)
         }, // 응답 데이터를 쿼리로 전달

      });

    }
  } catch (error) {
    console.error("강의 불러오기 실패:", error);
  }
};


  const getPlatformIcon = () => {
    switch (classData.resourceSource) {
      case 'youtube':
        return <Image src={CheckedYoutube} alt="YouTube" fill style={{ objectFit: "contain" }} />;
      case 'naverBlog':
        return <Image src={CheckedBlog} alt="Naver Blog" fill style={{ objectFit: "contain" }} />;
      case 'tistory':
        return <Image src={CheckedTistory} alt="Tistory" fill style={{ objectFit: "contain" }} />;
      case 'velog':
        return <Image src={CheckedVelog} alt="Velog" fill style={{ objectFit: "contain" }} />;
      default:
        return null;
    }
  };

  return (
    <ComponentWrapper>
      <RadioWrapper>
        <IndexIcon>
          <Image
            src={CompletedIndexIcon}
            alt="completed-icon"
            fill
            style={{ objectFit: "contain" }}
          />
        </IndexIcon>
      </RadioWrapper>
      <IndexWrapper>
        <PlatformIcon>
          {getPlatformIcon()}
        </PlatformIcon>
        <IndexContainer>
          <OrderBox>{classData.episodeNumber}회차</OrderBox>
          <TitleBox>{classData.episodeName}</TitleBox>
        </IndexContainer>
        <ButtonWrapper onClick={handleClick}>
          <Image
            src={PlayButton}
            alt="Play Button"
            fill
            style={{ objectFit: "contain" }}
          />
        </ButtonWrapper>
      </IndexWrapper>
    </ComponentWrapper>
  );
};


const StartIndex = () => {
  return (
    <StartComponentWrapper>
      <RadioWrapper>
        <IndexIcon>
          <Image
            src={CompletedIndexIcon}
            alt="completed-icon"
            fill
            style={{ objectFit: 'contain' }}
          />
        </IndexIcon>
      </RadioWrapper>

      <StartIndexWrapper>
        <StartIndexContainer>
          Welcome Onboard! 컬렉션 여정을 시작해보세요!
        </StartIndexContainer>
      </StartIndexWrapper>
    </StartComponentWrapper>
  );
};

const EndIndex: React.FC<{allProgressed: boolean}> = ({allProgressed}) => {
  return (
    <EndComponentWrapper>
      <RadioWrapper>
        <IndexIcon>
        <Image
            src={allProgressed ? CompletedIndexIcon : EndIndexIcon}
            alt="End-icon"
            style={{ objectFit: 'contain' }}
          />
        </IndexIcon>
      </RadioWrapper>
      <StartIndexWrapper>
        <EndIndexContainer allProgressed={allProgressed}>
            Congrats! 컬렉션 완주를 축하드려요!
        </EndIndexContainer>
      </StartIndexWrapper>
    </EndComponentWrapper>
  );
};



export { ClassIndex, StartIndex, EndIndex };


const ComponentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  width: 80vw;
  gap: 30px;
  margin-bottom: 20px;

  @media (max-width: 850px) {
    margin-bottom: 15px;
    gap: 20px;
  }

  @media (max-width: 560px) {
    margin-bottom: 10px;
    gap: 8px;
  }
`;

const StartComponentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  width: 80vw;
  gap: 30px;
  margin-bottom: 20px;

  @media (max-width: 850px) {
    margin-bottom: 15px;
    gap: 20px;
  }

  @media (max-width: 560px) {
    margin-bottom: 10px;
    gap: 8px;
  }
`;

const EndComponentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  width: 80vw;
  gap: 30px;
  margin-bottom: 20px;

  @media (max-width: 850px) {
    gap: 20px;
  }

  @media (max-width: 560px) {
    gap: 8px;
  }
`;

const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  min-height: 100px;

  @media (max-width: 850px) {
    min-height: 70px;
  }

  @media (max-width: 560px) {
    min-height: 40px;
    width: 30px;
  }
`;

const IndexIcon = styled.div`
  display: flex;
  width: 45px;
  height: 45px;
  position: relative;

  @media (max-width: 850px) {
    width: 32px;
    height: 32px;
  }

  @media (max-width: 560px) {
    width: 22px;
    height: 22px;
  }
`;

const ButtonWrapper = styled.div`
  position: relative;
  width: 110px;
  height: 110px;
  min-width: 40px;
  min-height: 40px;

  top: 85px;
  right: -48px;
  transform: translateY(-50%);
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 850px) {
    width: 90px;
    height: 90px;
    top: 75px;
    right: -40px;
  }

  @media (max-width: 560px) {
    width: 50px;
    height: 50px;
    min-width: 40px;
    min-height: 40px;
    top: 37px;
    right: -17px;
  }

  @media (max-width: 370px) {
    width: 50px;
    height: 50px;
    min-width: 40px;
    min-height: 40px;
    top: 38px;
    right: -12px;
  }
`;

const IndexWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 95%;
  height: 100px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
  padding: 0 2.5%;
  overflow: hidden;
  cursor: pointer;
  transition: background 0.5s;

  &:hover {
    background: rgba(245, 245, 255, 1);

    & > ${ButtonWrapper} {
      transform: translate(-10px, -63px);

      @media (max-width: 850px) {
        transform: translate(-7px, -50px);
      }
      @media (max-width: 560px) {
        transform: translate(-4px, -30px);
      }
      @media (max-width: 370px) {
        transform: translate(-6px, -30px);
      }
    }
  }

  @media (max-width: 850px) {
    height: 90px;
  }

  @media (max-width: 560px) {
    height: 50px;
    border-radius: 5px;
  }

  @media (max-width: 370px) {
    height: 45px;
  }
`;

const StartIndexWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 95%;
  height: 100px;

  @media (max-width: 850px) {
    height: 90px;
  }

  @media (max-width: 560px) {
    margin-bottom: 0px;
    height: 60px;
  }
`;

const PlatformIcon = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  min-width: 40px;
  min-height: 40px;

  @media (max-width: 850px) {
    width: 45px;
    height: 45px;
    min-width: 35px;
    min-height: 35px;
  }

  @media (max-width: 560px) {
    width: 30px;
    height: 30px;
    min-width: 25px;
    min-height: 25px;
  }
`;

const StartIndexContainer = styled.div`
  font-size: 18px;
  font-weight: 600;
  color:  rgba(79, 83, 87, 1);

  @media (max-width: 850px) {
    font-size: 16px;
  }

  @media (max-width: 560px) {
    font-size: 10px;
  }
`;

const EndIndexContainer = styled.div<{ allProgressed: boolean }>`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) =>
    props.allProgressed ? 'rgba(79, 83, 87, 1)' : 'rgba(221, 224, 228, 1)'};

  @media (max-width: 850px) {
    font-size: 16px;
  }

  @media (max-width: 560px) {
    font-size: 10px;
  }
`;

const IndexContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-left: 35px;

  @media (max-width: 560px) {
    margin-left: 12px;
  }

  @media (max-width: 370px) {
    margin-left: 9px;
  }
`;

const OrderBox = styled.div`
  display: flex;
  font-size: 15px;
  margin-bottom: 8px;
  color: rgba(149, 156, 164, 1);

  @media (max-width: 850px) {
    font-size: 13px;
    margin-bottom: 7px;
  }

  @media (max-width: 560px) {
    font-size: 8px;
    margin-bottom: 5px;
  }

  @media (max-width: 370px) {
    font-size: 7px;
    margin-bottom: 4px;
  }
`;

const TitleBox = styled.div`
  display: inline-block;
  font-size: 18px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 650px;

  @media (max-width: 850px) {
    font-size: 16px;
    margin-bottom: 7px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 400px;
  }

  @media (max-width: 560px) {
    font-size: 10px;
    margin-bottom: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 180px;
  }

  @media (max-width: 370px) {
    font-size: 9px;
    margin-bottom: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 170px;
  }
`;

