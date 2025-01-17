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
  padding: 2% 10%;
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

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #f1f1f3;
  border-radius: 6px;
  flex-grow: 1;
  max-width: 270px;
  height: 38px;
  padding: 0 14px;
  margin: 0 16px;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: none;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 112.5% */
  letter-spacing: -0.32px;
  text-overflow: ellipsis;
  color: #bbc0c5;

  &::placeholder {
    color: #1f1f1f;
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
  flex-shrink: 0;
`;

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <LogoWrapper>
        <Image src={LogoDark} alt="header logo" width={130} height={20} />
      </LogoWrapper>
      <SearchWrapper>
        <Input
          type="text"
          placeholder="검색어 입력 후 밖에 마우스 클릭 또는 엔터"
        />
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
