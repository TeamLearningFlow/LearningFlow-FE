import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import LogoDark from '../assets/logo_dark.png';
import Search from '../assets/searchicon.svg';
import Profile from '../assets/profile.svg';

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  flex-shrink: 0;
  padding: 28px 127px 28px 120px;
  background-color: #ffffff;
  border-bottom: 1px solid #dde0e4;
`;

const LogoWrapper = styled.div`
  display: flex:
  align-items: center;
  margin-top: 5px;
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #f1f1f3;
  border-radius: 6px;
  flex: 1;
  width: 480px;
  height: 40px;
  margin: 0 180px 0 100px;
  padding: 0 14px;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: none;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 112.5% */
  letter-spacing: -0.32px;
  color: #bbc0c5;

  ::placeholder {
    color: #bbc0c5;
  }
`;

const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <LogoWrapper>
        <Image src={LogoDark} alt="header logo" width={130} height={20} />
      </LogoWrapper>
      <SearchWrapper>
        <Input type="text" placeholder="찾고 싶은 컬렉션을 검색해보세요." />
        <SearchIcon>
          <Image src={Search} alt="searchicon" width={20} height={20} />
        </SearchIcon>
      </SearchWrapper>
      <ProfileIcon>
        <Image src={Profile} alt="profile" width={40} height={40} />
      </ProfileIcon>
    </HeaderWrapper>
  );
};

export default Header;
