import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { SkeletonArticle } from '@/components/skeleton/skeleton_learnComponents';

// Youtube api 전역 객체 선언
declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT: typeof YT;
  }
}

interface YoutubeArticleProps {
  videoId?: string;
  onProgressChange?: (progress: number) => void;
  isCompleted: boolean;
}

const YoutubeArticle: React.FC<YoutubeArticleProps> = ({
  videoId,
  onProgressChange = () => {},
  isCompleted,
}) => {
  // const [progress, setProgress] = useState<number>(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<YT.Player | null>(null); // YouTube Player 인스턴스 저장
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isTestMode = false;
  const router = useRouter();
  const { episodeId } = router.query;

  const previousProgressRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      stopTrackingProgress();
      if (
        playerRef.current &&
        typeof playerRef.current.destroy === 'function'
      ) {
        playerRef.current.destroy();
      }
    };
  }, []);

  // videoId 변경 시 플레이어 재설정 및 iframe src 업데이트
  useEffect(() => {
    if (!videoId) return;

    // 이전 플레이어 인스턴스 제거
    if (playerRef.current && typeof playerRef.current.destroy === 'function') {
      playerRef.current.destroy();
      playerRef.current = null;
    }

    const contentUrl = isTestMode
      ? 'https://www.youtube-nocookie.com/embed/LclObYwGj90?enablejsapi=1'
      : `${videoId}?enablejsapi=1`;

    if (iframeRef.current) {
      iframeRef.current.src = contentUrl;
      console.log('Iframe src set:', contentUrl);
    }

    // YouTube IFrame API 스크립트 로드 및 플레이어 초기화
    if (!window.YT || !window.YT.Player) {
      window.onYouTubeIframeAPIReady = () => {
        initializePlayer();
      };
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
    } else {
      setTimeout(() => {
        initializePlayer();
      }, 0);
    }

    // videoId 변경 시 기존 인터벌 정리
    stopTrackingProgress();
  }, [videoId]);

  // YouTube Player 초기화
  const initializePlayer = () => {
    if (!iframeRef.current) return;

    playerRef.current = new window.YT.Player(iframeRef.current, {
      events: {
        onReady: onPlayerReady,
        onStateChange: handlePlayerStateChange,
      },
    });
  };

  // 사용하지 않는 매개변수는 _를 붙여 표시
  const onPlayerReady = (_event: YT.PlayerEvent) => {
    console.log('Player ready');
    const savedProgress = localStorage.getItem(`progress-${episodeId}`);
    if (savedProgress && playerRef.current) {
      const pollInterval = setInterval(() => {
        if (!playerRef.current) return; // null이면 조기 종료
        const duration = playerRef.current.getDuration();
        if (duration && duration > 0) {
          clearInterval(pollInterval);
          const progressPercent = Number(savedProgress);
          const savedTime = (progressPercent / 100) * duration;
          console.log(`저장된 위치로 이동: ${savedTime}초`);
          if (playerRef.current) {
            playerRef.current.seekTo(savedTime, true);
          }
        }
      }, 500);
    }
  };
  
  
  

  // 플레이어 상태 변경 감지: 진도율 추적 시작
  const handlePlayerStateChange = (event: YT.OnStateChangeEvent) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      console.log('영상 재생 시작 - 진도율 추적 준비중');
      // duration이 준비될 때까지 폴링
      const pollInterval = setInterval(() => {
        if (!playerRef.current) return;
        const duration = playerRef.current.getDuration();
        console.log('영상 총 길이:', duration);
        if (duration > 0) {
          clearInterval(pollInterval);
          startTrackingProgress();
        }
      }, 500);
    } else {
      stopTrackingProgress();
    }
  };

  // 진도율 저장 API 호출
  const saveProgress = async (progressValue: number) => {
    if (!episodeId) return;
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.post(
        `https://onboarding.p-e.kr/resources/${episodeId}/save-progress`,
        {
          resourceType: 'VIDEO',
          // progress 필드에 계산된 progressValue(백분율)를 전달합니다.
          progress: progressValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('진도 저장 응답:', response.data);
    } catch (error) {
      console.error('진도 저장 에러:', error);
    }
  };

  // 진도율 추적 시작 (1초마다 재생 시간(초) 및 진도율(%) 업데이트)
  const startTrackingProgress = () => {
    stopTrackingProgress();
    intervalRef.current = setInterval(() => {
      // 수강완료 상태(버튼 누름)이면 업데이트를 중단
      if (isCompleted) {
        return;
      }
      if (
        playerRef.current &&
        typeof playerRef.current.getCurrentTime === 'function' &&
        typeof playerRef.current.getDuration === 'function'
      ) {
        const currentTime = playerRef.current.getCurrentTime();
        const duration = playerRef.current.getDuration();
        if (duration > 0) {
          const progressValue = Math.round((currentTime / duration) * 100);
          if (previousProgressRef.current !== progressValue) {
            previousProgressRef.current = progressValue;
            onProgressChange(progressValue);
            console.log(`진도율 업데이트: ${progressValue}%`);
            saveProgress(progressValue);
          }
        }
      } else {
        console.log('플레이어가 준비되지 않음');
      }
    }, 1000);
  };
  

  // 진도율 추적 중지
  const stopTrackingProgress = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <>
      <ArticleWrapper>
        <Iframe
          key={videoId}
          ref={iframeRef}
          src=""
          frameBorder="0"
          allowFullScreen
        />
      </ArticleWrapper>
    </>
  );
};

export default YoutubeArticle;

const ArticleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 91%;
  border-radius: 11.483px;
  background: #b5b5b5;
  box-shadow: 1.077px 1.435px 6.459px 0px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;
