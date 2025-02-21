import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Image from 'next/image';

import LogoDark from '/public/logo_dark.png';
import Search from '/public/searchicon.svg';
import Guest from '/public/Guest.svg';
import UserModal from './modal/userModal';

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

const LogoWrapper = styled.div`
  align-items: center;
  margin-top: 5px;
  flex-shrink: 0;
  margin-right: auto;
  display: inline-flex;
`;

const SearchWrapper = styled.div`
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
    max-width: 100px;
    margin: 0 1%;
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
  cursor: pointer;
`;

const ProfileIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
`;

const ProfileImage = styled(Image)`
  border-radius: 50%;
`;

const ProfileUser = styled.div`
  position: absolute;
  display: flex;
  // width: 100%;
  // width: 30%;
  // justify-content: flex-end;
  margin-right: 10%;
  top: 60px;
  right: 0px;
  margin-top: 7px;

  z-index: 200;

  @media (max-width: 650px) {
    margin-right: 1%;
  }
`;

interface UserData {
  name: string;
  email: string;
  job: string;
  interestFields: string[];
  preferType: string;
  profileImgUrl: string;
  bannerImgUrl: string;
}

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const profileIconRef = useRef<HTMLImageElement | null>(null);
  const [socialType, setSocialType] = useState<string | null>(null); // 소셜 타입 가져오기
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userProfile, setUserProfile] = useState<string | null>(null);

  const router = useRouter();

  const getValidToken = () => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if (token) return token;
    if (refreshToken) {
      console.log('기존 토큰 만료, 리프레시 토큰 사용');
      return refreshToken;
    }

    console.error('토큰 없음, 재로그인 필요');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    router.replace('/login');
    return null;
  };
  const fetchUserData = async () => {
    const validToken = getValidToken();
    if (!validToken) return;

    try {
      // 로컬 스토리지에서 토큰 가져오기 (로그인 시에만 접근 가능)
      // const token = localStorage.getItem('token');
      // const refreshToken = localStorage.getItem('refreshToken');
      // console.log('현재 토큰:', token);
      const storedSocialType = localStorage.getItem('socialType');
      setSocialType(storedSocialType);
      // console.log('소셜 타입:', storedSocialType)

      // if (!token) {
      // console.error('로그인이 필요한 서비스입니다.');
      // return;
      // }

      // Authorization 헤더 추가
      const response = await axios.get('https://onboarding.p-e.kr/user', {
        headers: {
          Authorization: `Bearer ${validToken}`,
          // 'Refresh-Token': `Bearer ${refreshToken}`,
        },
      });

      console.log('Profile Response Data:', response.data);
      setUserData(response.data.result);
      setUserProfile(response.data.result.imageUrl);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.error(
            '토큰이 만료되었거나 잘못되었습니다. 다시 로그인해주세요.',
          );
          localStorage.removeItem('token'); // 만료된 토큰 삭제
        } else {
          console.error(
            '사용자 정보 가져오기 실패:',
            error.response?.data || error.message,
          );
        }
      } else if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // 사용자 아이콘 클릭 시 모달 토글
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  // 검색창 클릭 시 검색 페이지로 이동
  const handleSearchClick = () => {
    router.push('/search');
  };

  // 모달 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        profileIconRef.current &&
        !profileIconRef.current.contains(event.target as Node) // 프로필 아이콘 클릭 여부 체크
      ) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  if (!userData) {
    return <p>정보 없음</p>;
  }

  return (
    <HeaderWrapper>
      <LogoWrapper>
        <Link href="/" passHref>
          <Image src={LogoDark} alt="header logo" width={130} height={20} />
        </Link>
      </LogoWrapper>

      <SearchWrapper onClick={handleSearchClick}>
        <Input type="text" placeholder="찾고 싶은 컬렉션을 검색해보세요." />
        <SearchIcon>
          <Image src={Search} alt="icon" width={20} height={20} />
        </SearchIcon>
      </SearchWrapper>

      <ProfileIcon>
        {userData.profileImgUrl ? (
          <ProfileImage
            src={userData.profileImgUrl}
            alt="profile"
            width={40}
            height={40}
            onClick={toggleModal}
            ref={profileIconRef}
          />
        ) : (
          <ProfileImage
            src={Guest}
            alt="profile"
            width={40}
            height={40}
            onClick={toggleModal}
            ref={profileIconRef}
          />
        )}
      </ProfileIcon>
      {isModalOpen && (
        <ProfileUser ref={modalRef}>
          <UserModal />
        </ProfileUser>
      )}
    </HeaderWrapper>
  );
};

export default Header;
