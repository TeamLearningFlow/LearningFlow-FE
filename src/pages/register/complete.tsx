import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const RegisterCompletePage: React.FC = () => {
  const router = useRouter();
  const { token } = router.query; // URL에서 token 추출

  useEffect(() => {
    const validateToken = async () => {
      if (!token) return; // 토큰이 없는 경우 작업 중단

      try {
        const response = await axios.get(
          `http://54.180.118.227:8080/register/complete?token=${token}`,
        );

        // 유효성 확인 후 페이지 이동
        if (response.data.isSuccess) {
          console.log('토큰 유효');
          router.push('/landing'); // 랜딩 페이지로 이동
        } else {
          console.log('토큰 무효');
          router.push('/signup'); // 회원가입 페이지로 이동
        }
      } catch (err) {
        console.error('토큰 검증 오류:', err);
        router.push('/signup'); // 오류 발생 시 회원가입 페이지로 이동
      }
    };

    validateToken();
  }, [token, router]);

  return null;
};

export default RegisterCompletePage;
