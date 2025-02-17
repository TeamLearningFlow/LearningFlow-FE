import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';
import LoginAuthModal from '../modal/loginModal';
import CurrentPlayButton from '/public/currentPlayButton.svg';
import HoverPlayButton from '/public/hoverPlayButton.svg';
import ActiveRadio from '/public/activeRadio.svg';
import YoutubeHoverIcon from '/public/platformicon/youtube_ic.svg';
import BlogHoverIcon from '/public/platformicon/naverblog_ic.svg';
import VelogHoverIcon from '/public/platformicon/velog_ic.svg';
import TistoryHoverIcon from '/public/platformicon/tistory_ic.svg';
import YoutubeActiveIcon from '/public/platformicon/youtube_active_ic.svg';
import BlogActiveIcon from '/public/platformicon/naverblog_active_ic.svg';
import VelogActiveIcon from '/public/platformicon/velog_active_ic.svg';
import TistoryActiveIcon from '/public/platformicon/tistory_active_ic.svg';
import { CollectionData } from '@/pages/collection/[collectionId]';

interface ClassIndexProps {
  classData: CollectionData['resource'][0];
  collection: CollectionData;
}

const NowPlaying: React.FC<ClassIndexProps> = ({ classData, collection }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleClick = async () => {
    const episodeId = classData.episodeId;

    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      // resourceSource에 따라 API 경로 설정
      const resourceType =
        classData.resourceSource === 'youtube' ? 'youtube' : 'blog';
      const apiUrl = `http://onboarding.p-e.kr:8080/resources/${episodeId}/${resourceType}`;

      // API 요청
      const response = await axios.get(apiUrl, { headers });

      if (response.status === 200) {
        const data = response.data;
        console.log('API 응답 데이터:', data);
        const episodeDataWithName = {
          ...data,
          episodeName: classData.episodeName,
        };
        router.push({
          pathname: `/learn/${episodeId}`,
          query: {
            episodeData: JSON.stringify(episodeDataWithName),
            collectionData: JSON.stringify(collection),
          },
        });
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setIsLoginModalOpen(true);
        } else {
          console.error(
            '강의 불러오기 실패:',
            error.response?.data || error.message,
          );
        }
      } else if (error instanceof Error) {
        console.error('강의 불러오기 실패:', error.message);
      } else {
        console.error('알 수 없는 오류 발생:', error);
      }
    }
  };

  const getPlatformIcon = () => {
    const activeIcons = {
      youtube: YoutubeActiveIcon,
      naverBlog: BlogActiveIcon,
      tistory: TistoryActiveIcon,
      velog: VelogActiveIcon,
    };

    const hoverIcons = {
      youtube: YoutubeHoverIcon,
      naverBlog: BlogHoverIcon,
      tistory: TistoryHoverIcon,
      velog: VelogHoverIcon,
    };

    const platform = classData.resourceSource as keyof typeof activeIcons;
    const icon = isHovered ? hoverIcons[platform] : activeIcons[platform];

    return icon ? (
      <Image src={icon} alt={platform} fill style={{ objectFit: 'contain' }} />
    ) : null;
  };

  return (
    <>
      <ComponentWrapper>
        <RadioWrapper>
          <IndexIcon>
            <Image
              src={ActiveRadio}
              alt="Active-icon"
              fill
              style={{ objectFit: 'contain' }}
            />
          </IndexIcon>
        </RadioWrapper>
        <IndexWrapper
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <PlatformIcon>{getPlatformIcon()}</PlatformIcon>
          <IndexContainer>
            <OrderBox>{classData.episodeNumber}회차</OrderBox>
            <TitleBox>{classData.episodeName}</TitleBox>
          </IndexContainer>
          <ButtonWrapper onClick={handleClick}>
            <Image
              src={isHovered ? HoverPlayButton : CurrentPlayButton}
              alt="Current Play Button"
              fill
              style={{ objectFit: 'contain' }}
            />
          </ButtonWrapper>
        </IndexWrapper>
      </ComponentWrapper>

      {/* 로그인 모달 */}
      {isLoginModalOpen && (
        <LoginAuthModal
          onClose={() => setIsLoginModalOpen(false)}
          onContinue={() => router.push('/login')}
        />
      )}
    </>
  );
};

export default NowPlaying;

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

const IndexIcon = styled.div`
  display: flex;
  width: 55px;
  height: 55px;
  position: relative;

  @media (max-width: 850px) {
    width: 37px;
    height: 37px;
  }

  @media (max-width: 560px) {
    width: 25px;
    height: 25px;
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

const OrderBox = styled.div`
  display: flex;
  font-size: 15px;
  margin-bottom: 8px;
  color: rgba(94, 82, 255, 1);

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
    background: rgba(94, 82, 255, 1);
    color: rgba(255, 255, 255, 1);

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

    & ${IndexContainer} ${OrderBox} {
      color: rgba(232, 232, 255, 1);
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
