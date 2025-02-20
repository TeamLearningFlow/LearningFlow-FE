import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const VerifyEmail: React.FC = () => {
  const router = useRouter();
  const { emailResetCode } = router.query; // URL에서 token 추출

  const getValidToken = () => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if (token) return token;
    if (refreshToken) {
      console.warn('기존 토큰 만료, 리프레시 토큰 사용');
      return refreshToken;
    }

    console.error('토큰 없음, 재로그인 필요');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    router.replace('/login');
    return null;
  };

  useEffect(() => {
    const validateToken = async () => {
      if (!emailResetCode) return; // 토큰이 없는 경우 작업 중단

      const validToken = getValidToken();
      if (!validToken) return;

      try {
        const response = await axios.get(
          `https://onboarding.p-e.kr/user/change-email?emailResetCode=${emailResetCode}`,
          {
            headers: {
              Authorization: `Bearer ${validToken}`,
              // 'Refresh-Token': `Bearer ${refreshToken}`,
            },
          },
        );

        console.log('Response:', response.data);

        // 유효성 확인 후 페이지 이동
        if (response.data.isSuccess) {
          console.log('토큰 유효, 이메일 변경 성공');

          // 로컬 스토리지에 토큰 저장
          localStorage.setItem('emailResetCode', emailResetCode as string);
          console.log('토큰 저장 완료');

          router.replace(`/mypage/profile`);
        } else {
          console.log('토큰 무효');
          router.replace('/'); // 홈 페이지로 이동
        }
      } catch (err) {
        console.error('토큰 검증 오류:', err);
        router.replace('/'); // 오류 발생 시 홈 페이지로 이동
      }
    };

    validateToken();
  }, [emailResetCode, router]);

  return null;
};

export default VerifyEmail;
