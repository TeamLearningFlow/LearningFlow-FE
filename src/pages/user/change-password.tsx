import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const ChangePasswordRedirect = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const { passwordResetCode } = router.query;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!passwordResetCode) return;

    const token = localStorage.getItem('token');

    if (!token) {
      alert('로그인이 필요한 서비스입니다.');
      router.replace('/login');
      return;
    }

    const verifyResetCode = async () => {
      try {
        const response = await axios.get(
          `https://onboarding-kappa.vercel.app/user/change-password?passwordResetCode=${passwordResetCode}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (response.data.isSuccess) {
          router.replace(
            `/mypage/profile?passwordResetCode=${passwordResetCode}`,
          );
        } else {
          alert('비밀번호 재설정 코드가 유효하지 않습니다.');
          router.replace('/login');
        }
      } catch (error) {
        console.error('비밀번호 코드 검증 실패:', error);
        alert('비밀번호 재설정 코드가 유효하지 않습니다.');
        router.replace('/login');
      }
    };

    verifyResetCode();
  }, [passwordResetCode, router]);

  if (!isClient) {
    return null;
  }

  return null;
};

export default ChangePasswordRedirect;
