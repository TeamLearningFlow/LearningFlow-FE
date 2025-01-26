import React from 'react';
import Header from '@/components/searchHeader';
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
