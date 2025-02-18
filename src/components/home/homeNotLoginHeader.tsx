import React from 'react';
import Link from 'next/link';
// import { useRouter } from 'next/router';
import styled from 'styled-components';
import Image from 'next/image';

import LogoDark from '/public/logo_dark.png';
// import Search from '../assets/searchicon.svg';

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  padding: 0 10%;
  background-color: #ffffff;
  border-bottom: 1px solid #dde0e4;

  @media (max-width: 1024px) {
    padding: 0 10%;
  }

  @media (max-width: 768px) {
    padding: 0 10%;
  }

  @media (max-width: 480px) {
    padding: 0 1%;
  }
`;

const LogoWrapper = styled.div`
  align-items: center;
  margin-top: 5px;
  flex-shrink: 0;
  // margin-right: auto;
  display: inline-flex;
`;

/* const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #f1f1f3;
  border: none;
  border-radius: 6px;
  flex-grow: 1;
  min-width: 220px;
  max-width: 270px;
  height: 38px;
  padding: 0 14px;
  margin: 0 1.5%;
  box-shadow: none;

  @media (max-width: 768px) {
    max-width: 220px;

  @media (max-width: 480px) {
    flex-grow: 0;
    max-width: 200px;
    min-width: 50px;
    margin: 0 3%;
    height: 37px;
    padding: 10px;
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
  line-height: 18px;
  letter-spacing: -0.32px;
  text-overflow: ellipsis;
  color: #1f1f1f;

  &::placeholder {
    color: #bbc0c5;
    text-overflow: ellipsis;
  }

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`; */

const LoginButton = styled.button`
  height: 38px;
  // width: 65px;
  background-color: #5e52ff;
  color: #ffffff;
  border: none;
  padding: 10px 13px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  line-height: 10px;
  letter-spacing: -0.36px;
  justify-content: center;
  align-items: center;

  space-between: nowrap;

  @media (max-width: 480px) {
    height: 37px;
    width: 63px;
    font-size: 14px;
    padding: 10px 10px;
  }
`;

const NotLoginHeader: React.FC = () => {
  // const router = useRouter();

  /* // 검색창 클릭 시 검색 페이지로 이동
  const handleSearchClick = () => {
    router.push('/search');
  }; */

  return (
    <HeaderWrapper>
      <LogoWrapper>
        <Link href="/" passHref>
          <Image src={LogoDark} alt="header logo" width={130} height={20} />
        </Link>
      </LogoWrapper>

      {/* <SearchWrapper onClick={handleSearchClick}>
        <Input type="text" placeholder="찾고 싶은 컬렉션을 검색해보세요." />
        <SearchIcon>
          <Image src={Search} alt="icon" width={20} height={20} />
        </SearchIcon>
      </SearchWrapper> */}
      <Link href="/login" passHref>
        <LoginButton>로그인</LoginButton>
      </Link>
    </HeaderWrapper>
  );
};

export default NotLoginHeader;
