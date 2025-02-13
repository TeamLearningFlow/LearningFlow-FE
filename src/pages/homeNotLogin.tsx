import React from 'react';
import NotLoginHeader from '../components/notLoginHeader';
import HomeTop from '../components/home/homeTop';
import HomeMiddle from '../components/home/homeMiddle';
import HomeCollection from '../components/home/homeBottom';
import Footer from '../components/homeFooter';

const HomeNotLogin: React.FC = () => {
  return (
    <>
      <NotLoginHeader />
      <HomeTop />
      <HomeMiddle />
      <HomeCollection />
      <Footer />
    </>
  );
};

export default HomeNotLogin;
