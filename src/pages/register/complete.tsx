import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const RegisterCompletePage: React.FC = () => {
  const router = useRouter();
  const { emailVerificationCode, oauth2RegistrationCode } = router.query; // URL에서 token 추출

  useEffect(() => {
    const validateToken = async () => {
      if (!emailVerificationCode && !oauth2RegistrationCode) return; // 토큰이 없는 경우 작업 중단

      try {
        let response;
        let queryParam = '';

        if (emailVerificationCode) {
          // 일반 회원가입
          response = await axios.get(
            `https://onboarding.p-e.kr/register/complete?emailVerificationCode=${emailVerificationCode}`,
          );

          if (response.data.isSuccess) {
            localStorage.setItem(
              'emailVerificationCode',
              emailVerificationCode as string,
            );
            queryParam = `emailVerificationCode=${emailVerificationCode}`;
          }
        } else if (oauth2RegistrationCode) {
          // 구글 회원가입
          response = await axios.get(
            `https://onboarding.p-e.kr/oauth2/additional-info?oauth2RegistrationCode=${oauth2RegistrationCode}`,
          );

          if (response.data.isSuccess) {
            localStorage.setItem(
              'oauth2RegistrationCode',
              oauth2RegistrationCode as string,
            );
            queryParam = `oauth2RegistrationCode=${oauth2RegistrationCode}`;
          }
        }

        if (response && response.data.isSuccess) {
          console.log('토큰 유효');
          console.log('토큰 저장 완료');

          // 랜딩 페이지로 이동
          router.push('/landing?${queryParam}');
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
  }, [emailVerificationCode, oauth2RegistrationCode, router]);

  return null;
};

export default RegisterCompletePage;
