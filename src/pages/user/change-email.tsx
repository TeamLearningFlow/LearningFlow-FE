import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const VerifyEmail: React.FC = () => {
  const router = useRouter();
  const { emailResetCode } = router.query; // URL에서 token 추출

// 유저 정보 갱신(변경 이메일 적용)
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('로그인이 필요한 서비스입니다.');
        return;
      }

      const response = await axios.get('https://onboarding.p-e.kr/user', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.isSuccess) {
        console.log('유저 정보 갱신 성공:', response.data);
        localStorage.setItem('email', response.data.result.email); // 최신 이메일 반영
      } else {
        console.error('유저 정보 갱신 실패');
      }
    } catch (error) {
      console.error('유저 정보 가져오기 실패:', error);
    }
  };

  useEffect(() => {
    const validateToken = async () => {
      if (!emailResetCode) return; // 토큰이 없는 경우 작업 중단

      const token = localStorage.getItem('token');

      if (!token) {
        alert('로그인이 필요한 서비스입니다.');
        router.replace('/login');
        return;
      }

      try {
        const response = await axios.get(
          `https://onboarding.p-e.kr/user/change-email?emailResetCode=${emailResetCode}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        console.log('Response:', response.data);

        // 유효성 확인 후 페이지 이동
        if (response.data.isSuccess) {
          console.log('토큰 유효, 이메일 변경 성공');

          // 로컬 스토리지에 토큰 저장
          localStorage.setItem('emailResetCode', emailResetCode as string);
          console.log('토큰 저장 완료');

          await fetchUserData(); // 갱신된 이메일 반영한 유저 정보 가져오기
        
          router.replace(`/mypage/profile?emailResetCode=${emailResetCode}`);
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
