import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const LoadingWrapper = styled.div`
  display: flex;
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
  const router = useRouter();

  useEffect(() => {
    const fetchAdditionalInfo = async () => {
      // URL에서 토큰값 가져오기
      const params = new URLSearchParams(window.location.search);
      const token = params.get('oauth2RegistrationCode');

      if (!token) {
        console.error('토큰이 없습니다.');
        router.push('/login'); // 토큰이 없으면 로그인 페이지로 이동
        return;
      }

      try {
        const response = await axios.get(
          `http://onboarding.p-e.kr:8080/oauth2/additional-info?oauth2RegistrationCode=${token}`,
          { withCredentials: true },
        );

        console.log('응답 데이터:', response.data);

        // 토큰 유효성 확인
        if (response.data.isSuccess) {
          console.log('토큰 유효');

          // 로컬 스토리지에 토큰 저장
          localStorage.setItem('token', token as string);
          // localStorage.setItem('loginMethod', 'google'); // 구글 로그인 방식 저장
          console.log('토큰 저장 완료');
        } else {
          console.log('토큰 무효');
        }

        // 신규 회원 → landing 페이지로 이동
        if (response.data.result?.requiredFields?.length > 0) {
          router.push(`/landing?token=${token}`);
        } else {
          // 기존 회원 → home 페이지로 이동
          router.push('/homePage');
        }
      } catch (error) {
        console.error('추가 정보 확인 중 오류 발생:', error);
        router.push('/login'); // 오류 발생 시 로그인 페이지로 이동
      }
    };

    fetchAdditionalInfo();
  }, []);

  return (
    <Container>
      <LoadingWrapper>
        <LoadingBar />
        <LoadingLabel>구글 계정을 온보딩에 연결 중이에요...</LoadingLabel>
      </LoadingWrapper>
    </Container>
  );
};

export default GoogleRedirectionPage;
