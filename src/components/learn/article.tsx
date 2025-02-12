import React, { useState, useEffect, useRef } from 'react';
import axios, { AxiosError } from 'axios';
import styled from 'styled-components';

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

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const Article: React.FC<{ episodeId?: number }> = ({ episodeId }) => {
  const [contentUrl, setContentUrl] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<any>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const isTestMode = true;

  useEffect(() => {
    if (!episodeId) return;
    
    const fetchContent = async () => {
      try {
        let url = '';
        const token = localStorage.getItem('token');
        const headers = token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };

        if (episodeId === 1) {
          const response = await axios.get(`http://onboarding.p-e.kr:8080/resources/${episodeId}/youtube`, { headers });
          url = response.data.url.replace("youtube.com", "youtube-nocookie.com");
        } else if (episodeId === 2) {
          const response = await axios.get(`http://onboarding.p-e.kr:8080/resources/${episodeId}/blog/content`, { headers });
          url = response.data.episodeContents;
        } else {
          console.error("유효하지 않은 episodeId");
          return;
        }

        setContentUrl(url);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error("API 오류:", error.response?.data);
        } else {
          console.error("알 수 없는 오류:", error);
        }
      }
    };
    
    if (isTestMode) {
      setContentUrl(
        episodeId === 1
          ? "https://www.youtube.com/embed/ekr2nIex040"
          : "https://blog.naver.com/stjjamrabbit/223165753698"
      );
      return;
    }

    fetchContent();
  }, [episodeId]);

  useEffect(() => {
    if (!contentUrl?.includes("youtube")) return;

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.body.appendChild(script);

    window.onYouTubeIframeAPIReady = () => {
      if (iframeRef.current) {
        playerRef.current = new window.YT.Player(iframeRef.current, {
          events: {
            onStateChange: (event: any) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                progressInterval.current = setInterval(() => {
                  if (playerRef.current) {
                    const currentTime = playerRef.current.getCurrentTime();
                    const duration = playerRef.current.getDuration();
                    if (duration > 0) {
                      saveProgress("VIDEO", currentTime / duration);
                    }
                  }
                }, 5000);
              } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
                if (progressInterval.current) clearInterval(progressInterval.current);
              }
            },
          },
        });
      }
    };

    return () => {
      document.body.removeChild(script);
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [contentUrl]);

  const saveProgress = async (resourceType: "VIDEO" | "TEXT", progress: number) => {
    try {
      await axios.post(
        `http://onboarding.p-e.kr:8080/resources/${episodeId}/save-progress`,
        { resourceType, progress },
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("진도 저장 실패:", error);
    }
  };

  useEffect(() => {
    if (!contentUrl || contentUrl.includes("youtube")) return;
    
    const handleScroll = () => {
      const articleWrapper = document.getElementById("articleWrapper");
      if (!articleWrapper) return;

      const scrollTop = articleWrapper.scrollTop;
      const scrollHeight = articleWrapper.scrollHeight - articleWrapper.clientHeight;
      if (scrollHeight > 0) {
        saveProgress("TEXT", scrollTop / scrollHeight);
      }
    };

    const articleWrapper = document.getElementById("articleWrapper");
    articleWrapper?.addEventListener("scroll", handleScroll);
    return () => articleWrapper?.removeEventListener("scroll", handleScroll);
  }, [contentUrl]);

  return (
    <ArticleWrapper id="articleWrapper">
      {contentUrl ? (
        <Iframe id="player" src={contentUrl} frameBorder="0" allowFullScreen referrerPolicy="no-referrer-when-downgrade" ref={iframeRef} />
      ) : (
        <p>로딩 중...</p>
      )}
    </ArticleWrapper>
  );
};

export default Article;
