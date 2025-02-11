import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ArticleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  // height: 552px;
  height: 91%;
  border-radius: 11.483px;
  background: #b5b5b5;
  box-shadow: 1.077px 1.435px 6.459px 0px rgba(0, 0, 0, 0.1);
  overflow-y: auto; // 블로그 컨텐츠 스크롤 감지 기능
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const Article: React.FC<{ episodeId?: string }> = ({ episodeId }) => {
  // const [contentUrl, setContentUrl] = useState<string>(
  //   'https://www.youtube.com/watch?v=r_cfD_17SJU',
  // );
  // const [contentUrl, setContentUrl] = useState<string | null>(null);

    
  const [loading, setLoading] = useState<boolean>(true);
  const [contentUrl, setContentUrl] = useState<string | null>(
    'https://www.youtube.com/embed/ekr2nIex040'
  );
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<any>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!episodeId) return;
  
    const fetchContent = async () => {
      try {
        const youtubeResponse = await fetch(
          `http://onboarding.p-e.kr:8080/resources/${episodeId}/youtube`
        );
  
        if (youtubeResponse.ok) {
          const youtubeData = await youtubeResponse.json();
          const videoUrl = youtubeData.url.replace("youtube.com", "youtube-nocookie.com"); // 광고 제거
          setContentUrl(`${videoUrl}?enablejsapi=1`);
          return;
        }

        // 블로그 API 호출
        const blogResponse = await fetch(
          `http://onboarding.p-e.kr:8080/resources/${episodeId}/blog`,
        );
        if (!blogResponse.ok) throw new Error('블로그 API 호출 실패');

        // 블로그 HTML 콘텐츠 API 호출
        const blogContentResponse = await fetch(
          `http://onboarding.p-e.kr:8080/resources/${episodeId}/blog/content`,
        );
        if (!blogContentResponse.ok)
          throw new Error('블로그 콘텐츠 API 호출 실패');

        const blogData = await blogContentResponse.text();
        setContentUrl(
          `data:text/html;charset=utf-8,${encodeURIComponent(blogData)}`,
        );
      } catch (error) {
        console.error('콘텐츠 로딩 오류:', error);
      }
    }; 

    fetchContent();
  }, [episodeId]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    document.body.appendChild(script);
  
    window.onYouTubeIframeAPIReady = () => {
      console.log('YouTube API 로드 완료');
      if (contentUrl?.includes('youtube-nocookie.com')) { // youtube-nocookie.com 확인
        trackVideoProgress();
      }
    };
  
    return () => {
      document.body.removeChild(script);
    };
  }, [contentUrl]);
  
  const saveProgress = async (resourceType: 'VIDEO' | 'TEXT', progress: number) => {
    console.log('진도 저장 함수 호출됨!');
    console.log('전달되는 값:', { resourceType, progress });
    try {
      const progressResponse = await axios.post(
        `http://onboarding.p-e.kr:8080/resources/${episodeId}/save-progress`,
        { resourceType, progress },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log('진도 저장 성공:', progressResponse.data);
    } catch (error) {
      console.error('진도 저장 실패:', error);
    }
  };
  
  /** 유튜브 영상 진행률 감지 */
  const trackVideoProgress = () => {
    console.log('🎥 유튜브 영상 감지 시작');
  
    if (!iframeRef.current || !window.YT) {
      console.log('🚨 YT API가 로드되지 않음');
      return;
    }
  
    console.log('YT 객체:', window.YT);
    console.log('iframeRef:', iframeRef.current);
  
    playerRef.current = new window.YT.Player(iframeRef.current, {
      events: {
        onStateChange: (event: any) => {
          console.log('🎬 유튜브 상태 변경 감지:', event.data);
          if (event.data === window.YT.PlayerState.PLAYING) {
            setTimeout(() => { // 5초 후 getCurrentTime() 호출
              progressInterval.current = setInterval(async () => {
                if (playerRef.current) {
                  const currentTime = playerRef.current.getCurrentTime();
                  const duration = playerRef.current.getDuration();
                  if (duration > 0) {
                    const progress = currentTime / duration;
                    console.log('📊 현재 진도율:', progress);
                    saveProgress('VIDEO', progress);
                  }
                }
              }, 5000);
            }, 5000); // 광고 실행 가능성을 줄이기 위해 5초 후 실행
          } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
            console.log('⏸️ 영상 중지됨, 진도율 저장 중단');
            if (progressInterval.current) clearInterval(progressInterval.current);
          }
        },
      },
    });
  };

  /** 블로그 콘텐츠 진행률 감지 */
  useEffect(() => {
    if (!contentUrl?.includes('youtube.com')) {
      const articleWrapper = document.querySelector('#articleWrapper');
      if (!articleWrapper) return;

      const handleScroll = () => {
        const scrollTop = articleWrapper.scrollTop;
        const scrollHeight = articleWrapper.scrollHeight - articleWrapper.clientHeight;
        if (scrollHeight > 0) {
          const progress = scrollTop / scrollHeight;
          saveProgress('TEXT', progress);
        }
      };

      articleWrapper.addEventListener('scroll', handleScroll);
      return () => articleWrapper.removeEventListener('scroll', handleScroll);
    }
  }, [contentUrl]);

  return (
    <>
      <ArticleWrapper id="articleWrapper">
        {contentUrl ? 
        <iframe
        id="player"
        src={contentUrl}
        frameBorder="0"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        style={{ width: '100%', height: '100%' }}
      /> : <p>로딩 중..</p>}
      </ArticleWrapper>
    </>
  );
};

export default Article;
