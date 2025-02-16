import React, { useState, useEffect, useContext, useRef } from 'react';
import { LearnContext } from '../../../pages/context/LearnContext';
import axios from 'axios';
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

// iframe 사용
// const Article: React.FC<{ episodeId?: string }> = ({ episodeId }) => {
//   const isTestMode = true; // 테스트용
//   const [contentUrl, setContentUrl] = useState<string | null>('');
//   const [memo, setMemo] = useState<string | null>(null); // 백에 있길래 일단 추가
//   const [progress, setProgress] = useState<number>(0);
//   const [learningCompleted, setLearningCompleted] = useState<boolean>(false);
//   const iframeRef = useRef<HTMLIFrameElement>(null);

//   useEffect(() => {
//     if (!episodeId) {
//       setContentUrl(null);
//       return;
//     }

//     const fetchContent = async () => {
//       try {
//         if (isTestMode) {
//           console.warn('테스트 모드 활성화 - Mock 데이터 사용');
//           // setContentUrl('https://suinchoi.tistory.com/66');
//           // setContentUrl('https://blog.naver.com/clstat/222508865056');
//           setContentUrl(
//             `https://velog.io/@sukyeongs/Database-%ED%8A%B8%EB%9E%9C%EC%9E%AD%EC%85%98Transaction%EC%9D%B4%EB%9E%80`,
//           );
//           setMemo('테스트용 메모');
//           return;
//         }

//         const token = localStorage.getItem('token');
//         if (!token) {
//           alert('로그인이 필요합니다.');
//           console.log('토큰이 없습니다.');
//           return;
//         }

//         // 유튜브 API 호출

//         // 블로그 API 호출
//         const blogResponse = await axios.get(
//           `http://onboarding.p-e.kr:8080/resources/${episodeId}/blog`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               'Content-Type': 'application/json',
//             },
//           },
//         );
//         console.log('api 응답:', blogResponse);

//         if (blogResponse.status === 200) {
//           const data = blogResponse.data;
//           // console.log('응답 데이터:', data);
//           setContentUrl(data.episodeContents);
//         }
//       } catch (error) {
//         console.error('콘텐츠 로딩 오류:', error);
//       }
//     };

//     fetchContent();
//   }, [episodeId]);

//   const saveProgress = useRef(
//     debounce(async (scrollTop: number) => {
//       if (!episodeId) return;
//       try {
//         console.log(`진도 저장: ${scrollTop}px`);
//         await axios.post(
//           `http://onboarding.p-e.kr:8080/resources/${episodeId}/save-progress`,
//           { resourceType: 'TEXT', progress: scrollTop },
//         );
//       } catch (error) {
//         console.error('진도 저장 오류:', error);
//       }
//     }, 500), // 500ms 동안 여러 번 호출돼도 마지막 요청만 실행됨
//   ).current;

//   const updateCompletionStatus = async () => {
//     if (!episodeId || learningCompleted) return;

//     const token = localStorage.getItem('token');

//     try {
//       const response = await axios.post(
//         `http://onboarding.p-e.kr:8080/resources/${episodeId}/update-complete`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         },
//       );
//       if (response.status === 200) {
//         console.log('수강 완료 상태 업데이트:', response.data);
//         setLearningCompleted(true);
//       }
//     } catch (error) {
//       console.error('수강 완료 업데이트 오류:', error);
//     }
//   };

//   const handleScroll = () => {
//     if (!iframeRef.current) return;

//     try {
//       const iframeDocument = iframeRef.current.contentDocument;
//       if (!iframeDocument) return;

//       const scrollTop = iframeDocument.documentElement.scrollTop;
//       const scrollHeight = iframeDocument.documentElement.scrollHeight;
//       const clientHeight = iframeDocument.documentElement.clientHeight;

//       const scrolled = Math.round(
//         (scrollTop / (scrollHeight - clientHeight)) * 100,
//       );

//       if (scrolled !== progress) {
//         // 기존 progress와 다를 때만 업데이트 (불필요한 리렌더링 방지)
//         setProgress(scrolled);
//         saveProgress(scrollTop); // 스크롤 위치(px)를 API에 저장
//         console.log(`진도율: ${scrolled}%`);

//         if (scrolled >= 80 && !learningCompleted) {
//           updateCompletionStatus();
//           console.log('학습완료');
//         }
//       }
//     } catch (err) {
//       console.warn(
//         '스크롤 이벤트 접근 불가 (CORS 정책으로 인해 차단될 가능성 있음)',
//       );
//     }
//   };

//   // iframe이 로드된 후 스크롤 이벤트를 감지하도록 설정
//   const handleIframeLoad = () => {
//     if (!iframeRef.current) return;

//     try {
//       const iframeDocument = iframeRef.current.contentDocument;
//       if (iframeDocument) {
//         iframeDocument.addEventListener('scroll', handleScroll);
//       }
//     } catch (err) {
//       console.warn('Iframe 내 문서에 접근할 수 없습니다. (CORS 문제 가능)');
//     }
//   };

//   // iframe 로드 후 스크롤 감지 이벤트 리스너 추가
//   useEffect(() => {
//     if (!iframeRef.current) return;

//     const iframe = iframeRef.current;
//     iframe.addEventListener('load', handleIframeLoad);

//     return () => {
//       try {
//         const iframeDocument = iframe.contentDocument;
//         if (iframeDocument) {
//           iframeDocument.removeEventListener('scroll', handleScroll);
//         }
//       } catch (err) {
//         console.warn('Iframe cleanup 중 오류 발생 (CORS 문제 가능)');
//       }
//     };
//   }, [contentUrl]);

//   // // iframe 요소 렌더링 확인
//   // useEffect(() => {
//   //   if (iframeRef.current) {
//   //     console.log(iframeRef.current); // iframe이 렌더링된 후에 실행
//   //   }
//   // }, [contentUrl]);

//   return (
//     <>
//       <ArticleWrapper>
//         {contentUrl ? (
//           <>
//             <Iframe
//               ref={iframeRef}
//               src={contentUrl}
//               onLoad={handleIframeLoad}
//               sandbox="allow-scripts allow-same-origin"
//             />
//             {/* <h2>`진도율: ${progress}%`</h2> */}
//           </>
//         ) : (
//           <p>로딩 중..</p>
//         )}
//       </ArticleWrapper>
//     </>
//   );
// };

// export default Article;

// png 사용
const BlogArticle: React.FC<{
  episodeId?: number;
}> = ({ episodeId }) => {
  const isTestMode = false; // 테스트용
  const [contentUrl, setContentUrl] = useState<string | null>('');
  const [progress, setProgress] = useState<number>(0);
  const [learningCompleted, setLearningCompleted] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement>(null); // 이미지 참조
  const articleWrapperRef = useRef<HTMLDivElement>(null); // ArticleWrapper 참조
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const context = useContext(LearnContext);

  const { isCompleted } = context.state;
  const { setIsCompleted } = context.actions;

  useEffect(() => {
    if (!episodeId) {
      setContentUrl(null);
      return;
    }

    // 로컬 스토리지에서 이전 진도율 불러오기
    const savedProgress = localStorage.getItem(`progress_${episodeId}`);
    if (savedProgress) {
      setProgress(Number(savedProgress));
      console.log('이전 수강 위치: ', Number(savedProgress));
    }

    const fetchContent = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('로그인이 필요합니다.');
          console.log('토큰이 없습니다.');
          return;
        }
        console.log('토큰: ', token);
        console.log('episodeId:', episodeId);

        if (isTestMode) {
          console.warn('테스트 모드 활성화 - Mock 데이터 사용');
          setContentUrl(
            `https://learningflow.s3.amazonaws.com/blog_screenshots/f11112d7206890ce2f859b9872f06c7f.png`,
          );
          return;
        }

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
        console.error(
          '콘텐츠 로딩 오류:',
          error.response ? error.response : error,
        );
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
        { resourceType: 'TEXT', progress: 0 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      localStorage.setItem(`progress_${episodeId}`, String(scrolled));
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
        setIsCompleted(true);
      }
    } catch (error) {
      console.error('수강 완료 업데이트 오류:', error);
    }
  };

  const handleScroll = () => {
    if (!articleWrapperRef.current) return;

    try {
      // 이미지의 보이는 영역과 전체 높이를 사용하여 진도율 계산
      const { scrollTop, clientHeight, scrollHeight } =
        articleWrapperRef.current;

      // 현재 스크롤된 부분의 비율을 계산
      const scrolled = Math.round(
        (scrollTop / (scrollHeight - clientHeight)) * 100,
      );

      if (scrolled !== progress) {
        setProgress(scrolled); // 진도율 업데이트
        saveProgress(scrolled);
        // console.log('scrollTop: ', scrollTop);
        // console.log('clientHeight: ', clientHeight);
        // console.log('scrollHeight: ', scrollHeight);
        // console.log(`진도율: ${scrolled}%`);

        // debounce로 서버 저장을 지연시킴
        if (debounceTimer.current) {
          clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(() => {
          saveProgress(scrolled);
          console.log(`진도율: ${scrolled}%`);
        }, 1000);

        // 진도율이 80% 이상일 경우 학습 완료 처리
        if (scrolled >= 80 && !learningCompleted) {
          console.log('학습완료');
          setIsCompleted(true);
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
          <p>로딩 중..</p>
        )}
      </ArticleWrapper>
    </>
  );
};

export default BlogArticle;
