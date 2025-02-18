import React, { useState, useEffect } from 'react';
import Header from '@/components/header';
import Profile from '@/components/mypage/profile';

const MyPageProfile = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
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
