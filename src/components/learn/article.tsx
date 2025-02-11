import React, { useState, useEffect } from 'react';
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
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const Article: React.FC<{ episodeId?: string }> = ({ episodeId }) => {
  const isTestMode = true; // 테스트용
  const [contentUrl, setContentUrl] = useState<string | null>('');
  const [memo, setMemo] = useState<string | null>(null); // 백에 있길래 일단 추가

  useEffect(() => {
    if (!episodeId) return;

    const fetchContent = async () => {
      try {
        if (isTestMode) {
          console.warn('테스트 모드 활성화 - Mock 데이터 사용');
          setContentUrl('https://blog.naver.com/stjjamrabbit/223165753698'); // 예제 블로그 링크
          setMemo('이것은 테스트용 메모입니다.');
          return;
        }
        // 실제 API 요청
        // const token = localStorage.getItem('token');
        // if (!token) {
        //   alert('로그인이 필요합니다.');
        //   console.log('토큰이 없습니다.');
        //   return;
        // }

        // 유튜브 URL

        // 블로그 API 호출
        const blogResponse = await axios.get(
          `http://onboarding.p-e.kr:8080/resources/${episodeId}/blog/content`,
          {
            headers: {
              // Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );
        // console.log('api 응답:', blogResponse);

        if (blogResponse.status === 200) {
          const data = blogResponse.data;
          // console.log('응답 데이터:', data);
          setContentUrl(data.episodeContents);
        }
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
