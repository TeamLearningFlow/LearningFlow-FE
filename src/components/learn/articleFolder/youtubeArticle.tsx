import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const YoutubeArticle: React.FC<{ episodeId?: number }> = ({ episodeId }) => {
  const [progress, setProgress] = useState<number>(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isTestMode = true;

  // iframe으로 유튜브 영상 불러오기
  useEffect(() => {
    if (!episodeId) return;

    const contentUrl = isTestMode
      ? 'https://www.youtube-nocookie.com/embed/LclObYwGj90?enablejsapi=1&origin=http://localhost'
      : `https://www.youtube.com/embed/${episodeId}?enablejsapi=1&origin=http://localhost`;

    if (iframeRef.current) {
      iframeRef.current.src = contentUrl;
      console.log('Iframe src set:', contentUrl); // iframe이 제대로 로드되는지 확인
    }
  }, [episodeId, isTestMode]);

  // 메시지 리스너로 진도율 추적
  useEffect(() => {
    const handlePostMessage = (event: MessageEvent) => {
      console.log('Message received:', event); // 메시지 수신 확인

      if (event.origin !== 'https://www.youtube.com') return;

      const data = JSON.parse(event.data);
      console.log('Data received:', data); // 데이터를 제대로 받았는지 확인

      if (data.event === 'onStateChange') {
        const { data: playerState } = data;
        if (playerState === 1) {
          // 영상이 재생 중일 때 진도율 추적
          trackProgress();
        }
      }

      if (data.event === 'onProgress') {
        const { seconds, duration } = data.info;
        const played = Math.round((seconds / duration) * 100);
        setProgress(played);
        console.log(`진도율: ${played}%`); // 진도율 출력
      }
    };

    // ESLint 오류 방지용 확인
    useEffect(() => {
      console.log(`현재 진행률: ${progress}%`);
    }, [progress]);

    window.addEventListener('message', handlePostMessage);
    console.log('Message listener added');

    return () => {
      window.removeEventListener('message', handlePostMessage);
      console.log('Message listener removed');
    };
  }, []);

  // 진도율 추적 함수
  const trackProgress = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const player = iframe.contentWindow;

      // getCurrentTime 호출
      player?.postMessage(
        JSON.stringify({ event: 'command', func: 'getCurrentTime' }),
        '*',
      );
      console.log('getCurrentTime sent');

      // getDuration 호출
      player?.postMessage(
        JSON.stringify({ event: 'command', func: 'getDuration' }),
        '*',
      );
      console.log('getDuration sent');
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
