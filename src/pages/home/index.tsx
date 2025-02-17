import React, { useEffect, useContext } from 'react';
import { LoginContext } from '../context/LoginContext';
import { useRouter } from 'next/router';

const HomePage: React.FC = () => {
  const context = useContext(LoginContext);
  const router = useRouter();

  if (!context) {
    throw new Error('LoginContext를 찾을 수 없습니다.');
  }

  const { isLoggedIn } = context.state; // 로그인 상태

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/homeLogin'); // 로그인 상태일 때
    } else {
      router.push('/homeNotLogin'); // 비로그인 상태일 때
    }
  }, [isLoggedIn, router]);
  return <></>;
};

export default HomePage;
