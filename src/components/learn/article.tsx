import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
 

interface YoutubeArticleProps {
  videoId?: string;
  onProgressChange?: (progress: number) => void;
}


const YoutubeArticle: React.FC<YoutubeArticleProps> = ({
  videoId,
  onProgressChange = () => {},
}) => {
  const [progress, setProgress] = useState<number>(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<any>(null); // YouTube Player 인스턴스 저장
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isTestMode = false;

  // YouTube IFrame API 클린업 처리
  useEffect(() => {
    return () => {
      stopTrackingProgress();
    };
  }, []);

  // 유튜브 iframe 로드 후 API 연동
  useEffect(() => {
    if (!videoId) return;

    const contentUrl = isTestMode
  ? 'https://www.youtube-nocookie.com/embed/LclObYwGj90?enablejsapi=1'
  : videoId.startsWith("http")
    ? (videoId.includes("enablejsapi=1")
        ? videoId
        : videoId.includes('?')
          ? `${videoId}&enablejsapi=1`
          : `${videoId}?enablejsapi=1`)
    : `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;

    if (iframeRef.current) {
      iframeRef.current.src = contentUrl;
      console.log('Iframe src set:', contentUrl);
    }

    // YouTube IFrame API 스크립트 로드
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
    } else {
      initializePlayer();
    }

    window.onYouTubeIframeAPIReady = () => {
      initializePlayer();
    };
  }, [videoId]);

  // YouTube Player 초기화
  const initializePlayer = () => {
    if (!iframeRef.current) return;

    playerRef.current = new window.YT.Player(iframeRef.current, {
      events: {
        onStateChange: handlePlayerStateChange,
      },
    });
  };

  // 플레이어 상태 변경 감지 (재생 시작 시 진도율 추적)
  const handlePlayerStateChange = (event: any) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      console.log('영상 재생 시작 - 진도율 추적 시작');
      startTrackingProgress();
    } else {
      stopTrackingProgress();
    }
  };

  // 진도율 추적
  const startTrackingProgress = () => {
    stopTrackingProgress(); // 기존 인터벌 클리어
  
    intervalRef.current = setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
        const currentTime = playerRef.current.getCurrentTime();
        const duration = playerRef.current.getDuration();
        if (duration > 0) {
          const progressValue = Math.round((currentTime / duration) * 100);
          setProgress(progressValue);
          onProgressChange(progressValue);
          console.log(`진도율 업데이트: ${progressValue}%`);
        }
      } else {
        console.warn('플레이어가 아직 준비되지 않았거나 getCurrentTime이 제공되지 않습니다.');
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
    <ArticleWrapper>
      <Iframe
        ref={iframeRef}
        src=""
        frameBorder="0"
        allowFullScreen
        width="560"
        height="315"
      />
    </ArticleWrapper>
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
  background:rgb(181, 181, 181);
  box-shadow: 1.077px 1.435px 6.459px 0px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;
