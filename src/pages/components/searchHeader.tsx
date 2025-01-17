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
  width: 100%;
  max-width: 1440px; /* 최대 너비 */
  height: 60px;
  padding: 2% 10%;
  background-color: #ffffff;
  border-bottom: 1px solid #dde0e4;

  /* 반응형 설정 */
  @media (max-width: 1024px) {
    padding: 2% 9%;
  }

  @media (max-width: 768px) {
    padding: 2% 8%; /* 모바일 화면 */
  }

  @media (max-width: 480px) {
    padding: 2% 3%; /* 폰 화면 */
  }
`;

const LogoWrapper = styled.div`
  display: flex:
  align-items: center;
  margin-top: 5px;
  flex-shrink: 0;
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #f1f1f3;
  border-radius: 6px;
  flex-grow: 1;
  min-width: 220px;
  height: 38px;
  padding: 0 14px;
  margin: 0 9% 0 5%; /* 1440px 기준 비율 */

  /* 반응형 비율 설정 */
  @media (max-width: 1440px) {
    margin: 0 9% 0 5%; /* 1440px 이하일 때 */
    max-width: 580px;
  }

  @media (max-width: 1024px) {
    margin: 0 8% 0 4%; /* 1024px 이하일 때 */
    max-width: 500px;
  }

  @media (max-width: 768px) {
    margin: 0 6% 0 4%; /* 모바일 화면 */
    max-width: 500px;
  }

  @media (max-width: 480px) {
    margin: 0 1% 0 1%; /* 480px 이하 폰 화면 */
    max-width: 180px;
    min-width: 100px;
    padding: 0 12px;
  }
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
  color: #1f1f1f;

  &::placeholder {
    color: #1f1f1f;
  }

  /* 반응형 설정 */
  @media (max-width: 480px) {
    font-size: 11px;
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
