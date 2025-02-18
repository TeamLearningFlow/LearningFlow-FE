import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const VerifyEmail: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const { emailResetCode } = router.query; // URL에서 token 추출

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const validateToken = async () => {
      if (!emailResetCode) return; // 토큰이 없는 경우 작업 중단

      const token = localStorage.getItem('token');

      if (!token) {
        alert('로그인이 필요한 서비스입니다.');
        router.push('/login');
        return;
      }

      try {
        const response = await axios.get(
          `https://onboarding-kappa.vercel.app/user/change-email?emailResetCode=${emailResetCode}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        // 유효성 확인 후 페이지 이동
        if (response.data.isSuccess) {
          console.log('토큰 유효');

          // 로컬 스토리지에 토큰 저장
          localStorage.setItem('emailResetCode', emailResetCode as string);
          console.log('토큰 저장 완료');

          router.push('/mypage/profile'); // 개인 정보 페이지로 이동
        } else {
          console.log('토큰 무효');
          router.push('/homePage'); // 홈 페이지로 이동
        }
      } catch (err) {
        console.error('토큰 검증 오류:', err);
        router.push('/homePage'); // 오류 발생 시 홈 페이지로 이동
      }
    };

    validateToken();
  }, [emailResetCode, router]);

  if (!isClient) {
    return null;
  }

  return null;
};

export default VerifyEmail;
