import React from 'react';
import Header from '@/components/mypageHeader';
import ProfileBanner from '@/components/profileBanner';
import Tab from '@/components/mypageTabMenu';

const MyPage = () => {
  return (
    <>
      <Header />
      <ProfileBanner />
      <Tab />
    </>
  );
};

export default MyPage;
