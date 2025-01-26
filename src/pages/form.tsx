import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const RegisterCompletePage: React.FC = () => {
  const router = useRouter();
  const { token } = router.query; // URL에서 token 추출

  useEffect(() => {
    const validateToken = async () => {
      if (!token) return; // 토큰이 없는 경우 작업 하지 않음

      try {
        const response = await axios.post(
          `http://54.180.118.227:8080/register/complete?token=${token}`,
        );

        // 토큰 유효성 검사
        if (response.data.isSuccess) {
          router.push('/landing'); // 토큰 유효할 때 랜딩 페이지로 이동
        } else {
          router.push('/signup'); // 유효하지 않으면 회원가입 페이지로 이동
        }
      } catch (err) {
        console.error('토큰 오류: ', err);
        router.push('/signup'); // 오류 발생 시 회원가입 페이지로 이동
      }
    };

    validateToken();
  }, [token, router]);

  return null;
};

export default RegisterCompletePage;
