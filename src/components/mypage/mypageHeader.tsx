import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import LogoDark from '../assets/logo_dark.png';
import Search from '../assets/searchicon.svg';
import Guest from '../assets/Guest.svg';
import Vector from '../assets/Vector.svg';

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  padding: 0 10%;
  background-color: #ffffff;
  border-bottom: 1px solid #dde0e4;

  /* 반응형 설정 */
  @media (max-width: 1024px) {
    padding: 0 10%;
  }

  @media (max-width: 768px) {
    padding: 0 10%; /* 모바일 화면 */
  }

  @media (max-width: 480px) {
    padding: 0 1%; /* 폰 화면 */
  }
`;

const LogoWrapper = styled.div<{ $state: string }>`
  display: flex:
  align-items: center;
  margin-top: 5px;
  flex-shrink: 0;
  margin-right: auto;
`;

const SearchWrapper = styled.div<{ $state: string }>`
  display: flex;
  align-items: center;
  background-color: #f1f1f3;
  border: ${({ $state }) =>
    $state === 'Active' || $state === 'Active-입력'
      ? '0.7px solid #5e52ff'
      : 'none'};
  border-radius: 6px;
  flex-grow: 1;
  min-width: 220px;
  max-width: ${({ $state }) =>
    $state === 'Active' || $state === 'Active-입력' || $state === 'Completed'
      ? '570px'
      : '270px'};
  height: 38px;
  padding: 0 14px;
  margin: ${({ $state }) =>
    $state === 'Active' || $state === 'Active-입력' || $state === 'Completed'
      ? '0 20% 0 5%'
      : '0 1.5%'};
  box-shadow: ${({ $state }) =>
    $state === 'Active' || $state === 'Active-입력'
      ? '2px 2px 2px 0px rgba(94, 82, 255, 0.30), -2px -2px 2px 0px rgba(94, 82, 255, 0.30)'
      : 'none'};

  /* 반응형 설정 */
  @media (max-width: 1024px) {
    max-width: ${({ $state }) =>
      $state === 'Active' || $state === 'Active-입력' || $state === 'Completed'
        ? '450px'
        : '270px'};
    margin: ${({ $state }) =>
      $state === 'Active' || $state === 'Active-입력' || $state === 'Completed'
        ? '0 16% 0 4%'
        : '0 1.5%'};
  }

  @media (max-width: 768px) {
    max-width: ${({ $state }) =>
      $state === 'Active' || $state === 'Active-입력' || $state === 'Completed'
        ? '300px'
        : '220px'};
    margin: ${({ $state }) =>
      $state === 'Active' || $state === 'Active-입력' || $state === 'Completed'
        ? '0 12% 0 3%'
        : '0 1.5%'};
  }

  @media (max-width: 480px) {
    flex-grow: 0;
    max-width: ${({ $state }) =>
      $state === 'Active' || $state === 'Active-입력' || $state === 'Completed'
        ? '100px'
        : '100px'};
    margin: ${({ $state }) =>
      $state === 'Active' || $state === 'Active-입력' || $state === 'Completed'
        ? '0 1% 0 1%'
        : '0 1%'};
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
  line-height: 18px; /* 112.5% */
  letter-spacing: -0.32px;
  text-overflow: ellipsis;
  color: #1f1f1f;

  &::placeholder {
    color: #bbc0c5;
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
  const [searchState, setSearchState] = useState<string>('Inactive'); // 검색 박스 상태
  const [searchValue, setSearchValue] = useState(''); // 입력 값

  const handleFocus = () => {
    setSearchState('Active'); // 검색 박스 활성화
  };

  const handleBlur = () => {
    if (!searchValue.trim()) {
      setSearchState('Inactive'); // 텍스트 없으면 초기화
    } else {
      setSearchState('Completed'); // 텍스트 있으면 비활성화
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    setSearchState(value.trim() ? 'Active-입력' : 'Active'); // 텍스트 입력 여부에 따라 상태 변경
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (!searchValue.trim()) {
        setSearchState('Inactive'); // 텍스트 없으면 초기화
      } else {
        setSearchState('Completed'); // 텍스트 있으면 Completed 상태
      }
    }
  };

  const handleClear = () => {
    setSearchValue(''); // 텍스트 삭제
    setSearchState('Active'); // 텍스트 삭제 시 초기화
  };

  return (
    <HeaderWrapper>
      <LogoWrapper $state={searchState}>
        <Image src={LogoDark} alt="header logo" width={130} height={20} />
      </LogoWrapper>
      <SearchWrapper $state={searchState}>
        <Input
          type="text"
          placeholder="찾고 싶은 컬렉션을 검색해보세요."
          value={searchValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <SearchIcon onClick={handleClear}>
          <Image
            src={
              searchState === 'Active-입력'
                ? Vector // 텍스트 입력 중일 때 Vector 아이콘
                : Search // 입력 완료되거나 초기 상태일 때 Search 아이콘
            }
            alt="icon"
            width={searchState === 'Active-입력' ? 15 : 20}
            height={searchState === 'Active-입력' ? 15 : 20}
          />
        </SearchIcon>
      </SearchWrapper>
      <ProfileIcon>
        <Image src={Guest} alt="profile" width={40} height={40} />
      </ProfileIcon>
    </HeaderWrapper>
  );
};

export default Header;
