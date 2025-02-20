import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const RegisterCompletePage: React.FC = () => {
  const router = useRouter();
  const { emailVerificationCode } = router.query; // URL에서 token 추출

  useEffect(() => {
    const validateToken = async () => {
      if (!emailVerificationCode) return; // 토큰이 없는 경우 작업 중단

      try {
        const response = await axios.get(
          `https://onboarding.p-e.kr/register/complete?emailVerificationCode=${emailVerificationCode}`,
        );

        // 유효성 확인 후 페이지 이동
        if (response.data.isSuccess) {
          console.log('토큰 유효');

          // 로컬 스토리지에 토큰 저장
          localStorage.setItem(
            'emailVerificationCode',
            emailVerificationCode as string,
          );
          console.log('토큰 저장 완료');

          router.push(
            `/landing?emailVerificationCode=${emailVerificationCode}`,
          ); // 랜딩 페이지로 이동(쿼리 붙여서)
        } else {
          console.log('토큰 무효');
          router.push('/register'); // 회원가입 페이지로 이동
        }
      } catch (err) {
        console.error('토큰 검증 오류:', err);
        router.push('/register'); // 오류 발생 시 회원가입 페이지로 이동
      }
    };

    validateToken();
  }, [emailVerificationCode, router]);

  return null;
};

export default RegisterCompletePage;
