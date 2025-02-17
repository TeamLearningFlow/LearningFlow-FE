import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logovertical from '/public/logo_vertical.svg';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const LoadingWrapper = styled.div`
  display: flex;
  width: 300px;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

const LoadingLabel = styled.div`
  color: #4f5357;

  /* Body/xs/Medium */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px; /* 150% */
  letter-spacing: -0.28px;
`;

// LoadingBar 컴포넌트
const bounceAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
    background-color: #DDE0E4;
  }
  50% {
    transform: translateY(-8px);
    background-color: #5E52FF;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Dot = styled.div<{ delay: string }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #dde0e4;
  animation: ${bounceAnimation} 1.6s infinite ease-in-out;
  animation-delay: ${(props) => props.delay};
`;

const LoadingBar = () => {
  return (
    <LoaderContainer>
      {Array.from({ length: 6 }).map((_, index) => (
        <Dot key={index} delay={`${index * 0.2}s`} />
      ))}
    </LoaderContainer>
  );
};

const GoogleRedirectionPage = () => {
  const [isClient, setIsClient] = useState(false); // 클라이언트 환경 여부 결정

  const router = useRouter();

  const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const SECRET_KEY = process.env.NEXT_PUBLIC_GOOGLE_SECRET_KEY;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 인가 코드
      const params = new URLSearchParams(window.location.search);
      const authorizationCode = params.get('code');

      if (authorizationCode) {
        getToken(authorizationCode).then((res) => {
          console.log(res.access_token);
          router.push('/');
        });
      }
    }
  }, []);

  // access Token 요청
  const getToken = async (authorizationCode: string) => {
    try {
      const response = await fetch(
        `https://oauth2.googleapis.com/token?grant_type=authorization_code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&client_secret=${SECRET_KEY}&code=${authorizationCode}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
        },
      );
      return response.json();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <Container>
      <LoadingWrapper>
        <Image src={logovertical} alt="logo" width={300} height={130} />
        <LoadingBar />
        <LoadingLabel>구글 계정을 온보딩에 연결 중이에요...</LoadingLabel>
      </LoadingWrapper>
    </Container>
  );
};

export default GoogleRedirectionPage;
