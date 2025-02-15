import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const ChangePasswordRedirect = () => {
  const router = useRouter();
  const { passwordResetCode } = router.query;

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
          `http://onboarding.p-e.kr:8080/user/change-password?passwordResetCode=${passwordResetCode}`,
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

  return null; // UI가 필요 없으므로 렌더링 X
};

export default ChangePasswordRedirect;
