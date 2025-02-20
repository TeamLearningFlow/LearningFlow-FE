import React, { useState, useEffect, useRef } from 'react';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { SkeletonArticle } from '@/components/skeleton/skeleton_learnComponents';

const ArticleWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 54.4vh;
  border-radius: 11.483px;
  background: #b5b5b5;
  box-shadow: 1.077px 1.435px 6.459px 0px rgba(0, 0, 0, 0.1);

  overflow: auto;
`;

const ImgBox = styled.div`
  padding-top: 500px;
`;

const StyledImg = styled.img`
  width: 100%;
  height: auto;
  border: none;

  margin-top: -500px;
  z-index: 999;
`;

interface blogArticleProps {
  blogId?: string;
  onProgressChange?: (progress: number) => void;
  isCompleted: boolean;
}

const BlogArticle: React.FC<blogArticleProps> = ({
  blogId,
  onProgressChange = () => {},
}) => {
  const [contentUrl, setContentUrl] = useState<string | null>('');
  const imgRef = useRef<HTMLImageElement>(null); // 이미지 참조
  const articleWrapperRef = useRef<HTMLDivElement>(null); // ArticleWrapper 참조
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { episodeId } = router.query;

  const [savedProgress, setSavedProgress] = useState<number>(0); // 저장된 진도율 상태
  const [savedLearningCompleted, setSavedLearningCompleted] =
    useState<boolean>(false); // 저장된 수강완료 상태

  useEffect(() => {
    if (!blogId) {
      setContentUrl(null);
      return;
    }

    const fetchContent = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('토큰: ', token);
        console.log('blogId:', blogId);

        // 블로그 API 호출
        const blogResponse = await axios.get(
          `https://onboarding.p-e.kr/resources/${episodeId}/blog`,
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
          `https://onboarding.p-e.kr/resources/${episodeId}/blog/content`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log('contentResponse:', contentResponse);

        if (contentResponse.status === 200 && contentResponse.data) {
          setLoading(false);
          setContentUrl(contentResponse.data.result);
        } else {
          console.error('콘텐츠 API 응답 오류:', contentResponse);
        }
      } catch (error) {
        const err = error as AxiosError;
        console.error('콘텐츠 로딩 오류:', err.response ? err.response : err);
      }
    };

    fetchContent();
  }, [episodeId, blogId]);

  const saveProgress = async (scrolled: number) => {
    if (!episodeId) return;
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `https://onboarding.p-e.kr/resources/${episodeId}/save-progress`,
        { resourceType: 'TEXT', progress: scrolled },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('진도 저장 응답: ', response.data);
      localStorage.setItem(`progress-${episodeId}`, scrolled.toString()); // 진도율 저장
    } catch (error) {
      console.error('진도 저장 오류:', error);
    }
  };

  const handleScroll = () => {
    if (!articleWrapperRef.current || savedLearningCompleted) return; // 완료된 경우 실행 X

    try {
      const { scrollTop, clientHeight, scrollHeight } =
        articleWrapperRef.current;

      // 현재 스크롤된 부분의 비율을 계산
      const scrolled = Math.round(
        (scrollTop / (scrollHeight - clientHeight)) * 100,
      );

      if (scrolled > 0) {
        console.log(`블로그 진도율1: ${scrolled}%`);

        debounceTimer.current = setTimeout(() => {
          saveProgress(scrolled);
          onProgressChange(scrolled);
          console.log(`블로그 진도율2: ${scrolled}%`);
        }, 500);

        if (scrolled >= 80) {
          console.log('학습완료');
        }
      }
    } catch (err) {
      console.warn(
        '스크롤 이벤트 접근 불가 (CORS 정책으로 인해 차단될 가능성 있음)',
      );
    }
  };
  const resetScrollPosition = () => {
    if (articleWrapperRef.current) {
      articleWrapperRef.current.scrollTop = 0; // 스크롤 위치 초기화
    }
  };
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    const getProgress = async () => {
      if (!episodeId) return;
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `https://onboarding.p-e.kr/resources/${episodeId}/blog`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.status === 200) {
          const progress = response.data.result.progress || 0; // 진도율이 없으면 0
          setSavedProgress(progress);
          console.log('진도율 가져옴:', progress);
          const episodeInfo = response.data.result.episodeInformationList.find(
            (episode: { episodeId: number; isCompleted: boolean }) =>
              episode.episodeId === Number(episodeId),
          );

          if (episodeInfo) {
            setSavedLearningCompleted(episodeInfo.isCompleted);
            console.log('완료 상태 가져옴:', episodeInfo.isCompleted);
          }

          // 진도율이 로드된 후 바로 스크롤 위치를 설정
          if (articleWrapperRef.current && progress !== null) {
            const { scrollHeight, clientHeight } = articleWrapperRef.current;
            const newScrollTop =
              (progress / 100) * (scrollHeight - clientHeight);
            articleWrapperRef.current.scrollTop = newScrollTop;
            console.log(`초기 스크롤 위치 설정: ${newScrollTop}px`);
          }
        } else {
          console.error('진도율 가져옴 오류: ', response);
          return;
        }
      } catch (error) {
        const err = error as AxiosError;
        console.error(
          '진도율 불러오기 오류: ',
          err.response ? err.response : err,
        );
      }
    };

    getProgress();
    resetScrollPosition();

    const wrapper = articleWrapperRef.current;
    if (wrapper) {
      wrapper.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (wrapper) {
        wrapper.removeEventListener('scroll', handleScroll);
      }
    };
  }, [episodeId]);

  // 컴포넌트 렌더링 상태 확인
  useEffect(() => {
    console.log('contentUrl:', contentUrl);
    console.log('learningCompleted:', savedLearningCompleted);
    console.log({ blogId });
    console.log({ episodeId });
  }, [contentUrl, savedLearningCompleted, blogId, episodeId]);

  useEffect(() => {
    if (imgRef.current && !loading) {
      setLoading(false); // 이미지 로드 완료
    }
  }, [contentUrl]);

  return (
    <>
      {loading ? (
        <SkeletonArticle />
      ) : (
        <ArticleWrapper ref={articleWrapperRef} onScroll={handleScroll}>
          {contentUrl ? (
            <>
              <ImgBox>
                <StyledImg
                  ref={imgRef}
                  src={contentUrl}
                  alt="content"
                  onLoad={() => setLoading(false)}
                  onError={() => {
                    console.error('이미지 로드 실패');
                    setLoading(false);
                  }}
                />
              </ImgBox>
            </>
          ) : (
            <ImgBox></ImgBox>
          )}
        </ArticleWrapper>
      )}
    </>
  );
};

export default BlogArticle;
