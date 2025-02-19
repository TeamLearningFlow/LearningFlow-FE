import React, { useState, useEffect, useRef } from 'react';
import axios, { AxiosError } from 'axios';
import styled from 'styled-components';

const ArticleWrapper = styled.div`
  display: flex;
  // align-items: center;
  justify-content: center;
  width: 100%;
  // height: 91%;
  height: 54.4vh;
  border-radius: 11.483px;
  background: #b5b5b5;
  box-shadow: 1.077px 1.435px 6.459px 0px rgba(0, 0, 0, 0.1);

  // overflow: hidden;
  overflow: auto;
  // overflow-y: scroll;
`;

const ImgBox = styled.div`
  padding-top: 500px;
`;

const StyledImg = styled.img`
  width: 100%;
  // height: 100%;
  height: auto;
  border: none;

  margin-top: -500px;
  // margin-top: 300vh;
  z-index: 999;
`;

// png 사용
const BlogArticle: React.FC<{ episodeId?: number }> = ({ episodeId }) => {
  const [contentUrl, setContentUrl] = useState<string | null>('');
  const [progress, setProgress] = useState<number>(0);
  const [learningCompleted, setLearningCompleted] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement>(null); // 이미지 참조
  const articleWrapperRef = useRef<HTMLDivElement>(null); // ArticleWrapper 참조
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!episodeId) {
      setContentUrl(null);
      return;
    }

    const fetchContent = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('토큰: ', token);
        console.log('episodeId:', episodeId);

        // 블로그 API 호출
        const blogResponse = await axios.get(
          `http://onboarding.p-e.kr:8080/resources/${episodeId}/blog`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log('blogResponse:', blogResponse);

        if (blogResponse.status !== 200) {
          console.error('블로그 API 응답 오류:', blogResponse);
          return;
        }

        // /content 호출하여 PNG 이미지 URL 얻기
        const contentResponse = await axios.get(
          `http://onboarding.p-e.kr:8080/resources/${episodeId}/blog/content`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log('contentResponse:', contentResponse);

        if (contentResponse.status === 200 && contentResponse.data) {
          setContentUrl(contentResponse.data.result);
        } else {
          console.error('콘텐츠 API 응답 오류:', contentResponse);
        }
        // }
      } catch (error) {
        const err = error as AxiosError;
        console.error('콘텐츠 로딩 오류:', err.response ? err.response : err);
      }
    };

    fetchContent();
  }, [episodeId]);

  const saveProgress = async (scrolled: number) => {
    const token = localStorage.getItem('token');

    if (!episodeId) return;

    try {
      await axios.post(
        `http://onboarding.p-e.kr:8080/resources/${episodeId}/save-progress`,
        // { resourceType: 'TEXT', progress: scrolled },
        { resourceType: 'TEXT', progress: 0 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
    } catch (error) {
      console.error('진도 저장 오류:', error);
    }
  };

  const updateCompletionStatus = async () => {
    if (!episodeId || learningCompleted) return;

    const token = localStorage.getItem('token');
    console.log('토큰: ', token);

    try {
      const response = await axios.post(
        `http://onboarding.p-e.kr:8080/resources/${episodeId}/update-complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status === 200) {
        console.log('수강 완료 상태 업데이트:', response.data);
        setLearningCompleted(true);
      }
    } catch (error) {
      console.error('수강 완료 업데이트 오류:', error);
    }
  };

  const handleScroll = () => {
    if (!articleWrapperRef.current) return;

    try {
      const { scrollTop, clientHeight, scrollHeight } =
        articleWrapperRef.current;

      // 현재 스크롤된 부분의 비율을 계산
      const scrolled = Math.round(
        (scrollTop / (scrollHeight - clientHeight)) * 100,
      );

      if (scrolled !== progress) {
        setProgress(scrolled); // 진도율 업데이트
        saveProgress(scrolled);
        console.log('scrollTop: ', scrollTop);
        console.log('clientHeight: ', clientHeight);
        console.log('scrollHeight: ', scrollHeight);
        console.log(`진도율: ${scrolled}%`);

        // debounce로 서버 저장을 지연시킴
        if (debounceTimer.current) {
          clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(() => {
          saveProgress(scrolled);
          console.log(`진도율: ${scrolled}%`);
        }, 500);

        // 진도율이 80% 이상일 경우 학습 완료 처리
        if (scrolled >= 80 && !learningCompleted) {
          console.log('학습완료');
          updateCompletionStatus();
        }
      }
    } catch (err) {
      console.warn(
        '스크롤 이벤트 접근 불가 (CORS 정책으로 인해 차단될 가능성 있음)',
      );
    }
  };

  // 컴포넌트 렌더링 상태 확인
  useEffect(() => {
    console.log('contentUrl:', contentUrl);
    console.log('progress:', progress);
    console.log('learningCompleted:', learningCompleted);
    console.log({ episodeId });
  }, [contentUrl, progress, learningCompleted, episodeId]);

  // 이미지 존재확인
  useEffect(() => {
    console.log('imgRef:', imgRef.current);
  }, [contentUrl]);

  return (
    <>
      <ArticleWrapper ref={articleWrapperRef} onScroll={handleScroll}>
        {contentUrl ? (
          <>
            <ImgBox>
              <StyledImg
                ref={imgRef}
                src={contentUrl}
                alt="content"
                onError={() => console.error('이미지 로드 실패')}
              />
            </ImgBox>
          </>
        ) : (
          <ImgBox></ImgBox>
        )}
      </ArticleWrapper>
    </>
  );
};

export default BlogArticle;
