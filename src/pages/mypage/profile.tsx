import React, { useState, useEffect } from 'react';
import Header from '@/components/header';
import Profile from '@/components/mypage/profile';

import LoginProtected from '../../components/loginProtected';

const MyPageProfile = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return (
    <LoginProtected>
      <Header />
      <Profile />
    </LoginProtected>
  );
};

export default MyPageProfile;
