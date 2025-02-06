import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ArticleWrapper = styled.div`
  width: 63vw;
  height: 552px;
  border-radius: 11.483px;
  background: #b5b5b5;
  box-shadow: 1.077px 1.435px 6.459px 0px rgba(0, 0, 0, 0.1);
  // margin-bottom: 20px;

  @media (max-width: 850px) {
    height: 450px;
  }

  @media (max-width: 560px) {
    height: 300px;
  }
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const Article: React.FC<{ episodeId?: string }> = ({ episodeId }) => {
  const [contentUrl, setContentUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!episodeId) return;

    const fetchContent = async () => {
      try {
        // 유튜브 URL
        const youtubeResponse = await fetch(
          `http://onboarding.p-e.kr:8080/resources/${episodeId}/youtube`,
        );
        if (youtubeResponse.ok) {
          const youtubeData = await youtubeResponse.json();
          setContentUrl(youtubeData.url);
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

  return (
    <>
      <ArticleWrapper>
        {contentUrl ? <Iframe src={contentUrl} /> : <p>로딩 중..</p>}
      </ArticleWrapper>
    </>
  );
};

export default Article;
