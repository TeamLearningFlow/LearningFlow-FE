import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';
import LogoDark from '/public/logo_dark.png';
import Guest from '/public/Guest.svg';
import UserModal from './modal/userModal';
import { useRouter } from 'next/router';
const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  padding: 0 3%;
  background-color: #FFFFFF;
  border-bottom: 1px solid #DDE0E4;
  @media (max-width: 850px) {
    height: 60px;
    padding: 0 5%;
  }
`;
const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  flex-shrink: 0;
  margin-right: auto;
  cursor: pointer;
`;
const LogoImage = styled(Image)`
  @media (max-width: 850px) {
    width: 150px;
    height: 23px;
  }
`;
const ProfileIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  cursor: pointer;
`;
const ProfileImage = styled(Image)`
  border-radius: 50%;
  @media (max-width: 850px) {
    width: 35px;
    height: 35px;
  }
`;
const ProfileUser = styled.div`
  position: absolute;
  display: flex;
  margin-right: 3.5%;
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
          <LogoImage src={LogoDark} alt="header logo" width={175} height={25} />
        </Link>
      </LogoWrapper>
      <ProfileIcon>
        {userData.profileImgUrl ? (
          <ProfileImage
            src={userData.profileImgUrl}
            alt="profile"
            width={42}
            height={42}
            onClick={toggleModal}
            ref={profileIconRef}
          />
        ) : (
          <ProfileImage
            src={Guest}
            alt="profile"
            width={42}
            height={42}
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