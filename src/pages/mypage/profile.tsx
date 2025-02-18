import React, { useState, useEffect } from 'react';
import Header from '@/components/header';
import Profile from '@/components/mypage/profile';

const MyPageProfile = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('토큰이 존재하지 않습니다.');
      // 필요하면 로그인 페이지로 리다이렉트
      // router.replace('/login');
    } else {
      console.log('현재 토큰 유지:', token);
      localStorage.setItem('token', token);
    }
  }, []);

  if (!isClient) {
    return null;
  }
  return (
    <>
      <Header />
      <Profile />
    </>
  );
};

export default MyPageProfile;
