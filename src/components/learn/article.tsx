import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const YoutubeArticle: React.FC<{ episodeId?: number }> = ({ episodeId }) => {
  const [progress, setProgress] = useState<number>(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<any>(null); // YouTube Player 인스턴스 저장
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isTestMode = true;

  // 유튜브 iframe 로드 후 API 연동
  useEffect(() => {
    if (!episodeId) return;

    const contentUrl = isTestMode
      ? 'https://www.youtube-nocookie.com/embed/LclObYwGj90?enablejsapi=1'
      : `https://www.youtube.com/embed/${episodeId}?enablejsapi=1`;

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
  }, [episodeId]);

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

  // 진도율 주기적으로 추적 (1초마다)
  const startTrackingProgress = () => {
    stopTrackingProgress(); // 기존 인터벌 클리어

    intervalRef.current = setInterval(() => {
      if (playerRef.current) {
        const currentTime = playerRef.current.getCurrentTime();
        const duration = playerRef.current.getDuration();
        if (duration > 0) {
          const progressValue = Math.round((currentTime / duration));
          setProgress(progressValue);
          console.log(`진도율 업데이트: ${progressValue}%`);
        }
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
  background: #b5b5b5;
  box-shadow: 1.077px 1.435px 6.459px 0px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;
