import React, { useRef } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';
import LogoDark from '../assets/logo_dark.png';
import Guest from '../assets/Guest.svg';

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  padding: 0 3%;
  background-color: #ffffff;
  border-bottom: 1px solid #dde0e4;
`;

const LogoWrapper = styled.div`
  display: flex:
  align-items: center;
  margin-top: 5px;
  flex-shrink: 0;
  margin-right: auto;
`;

const ProfileIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
`;

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <LogoWrapper>
        <Link href="/home" passHref>
          <Image src={LogoDark} alt="header logo" width={130} height={20} />
        </Link>
      </LogoWrapper>
      <ProfileIcon>
        <Image src={Guest} alt="profile" width={40} height={40} />
      </ProfileIcon>
    </HeaderWrapper>
  );
};

export default Header;
