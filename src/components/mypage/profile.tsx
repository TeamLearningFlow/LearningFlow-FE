import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styled from 'styled-components';
import Image from 'next/image';
import MyProfile from './myprofile';
import BasicInfo from './basicInfo';
import Footer from '../../components/homeFooter';
import NextIcon from '/public/nextIcon.svg';
import NextIconHover from '/public/nextIconHover.svg';

import GoogleDeleteModal from '../../components/modal/googleDeleteModal';
import LocalDeleteModal from '../../components/modal/localDeleteModal';

interface UserData {
  name: string;
  email: string;
  job: string;
  interestFields: string[];
  preferType: string;
  profileImgUrl: string;
  bannerImgUrl: string;
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fafafc;
`;

const ProfileContainer = styled.div`
  flex: 1;
  width: 90%;
  max-width: 1200px;
  background: #fff;
  border-radius: 32px;
  margin: 40px 0 17px 0;
  padding: 24px 32px;
  box-sizing: border-box;
`;

const DeleteAccount = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  align-self: flex-end;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  line-height: 150%; /* 30px */
  letter-spacing: -0.4px;
  margin-right: 10.5%;
  margin-bottom: 120px;
  gap: 8px;
  color: #4f5357;
  transition: all 0.3s ease;

  &:hover {
    color: #1f1f1f;
  }

  img {
    width: 11px;
    height: 22px;
    margin-top: -3px;
    transition: all 0.3s ease;
  }
`;

const Profile = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [socialType, setSocialType] = useState<string | null>(null); // 소셜 타입 가져오기

  const [isGoogleDeleteModalOpen, setIsGoogleDeleteModalOpen] = useState(false);
  const [isLocalDeleteModalOpen, setIsLocalDeleteModalOpen] = useState(false);

  const router = useRouter();
  const { passwordResetCode, emailResetCode } = router.query;
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const fetchUserData = async () => {
    try {
      // 로컬 스토리지에서 토큰 가져오기 (로그인 시에만 접근 가능)
      const token = localStorage.getItem('token');
      const storedSocialType = localStorage.getItem('socialType');
      setSocialType(storedSocialType);

      if (!token) {
        console.error('로그인이 필요한 서비스입니다.');
        return;
      }

      // Authorization 헤더 추가
      const response = await axios.get('https://onboarding.p-e.kr/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Profile Response Data:', response.data);

      setUserData(response.data.result);
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

  useEffect(() => {
    if (!passwordResetCode) return;

    const verifyResetCode = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          alert('로그인이 필요한 서비스입니다.');
          router.replace('/login');
          return;
        }

        const response = await axios.get(
          `https://onboarding.p-e.kr/user/change-password?passwordResetCode=${passwordResetCode}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (response.data.isSuccess) {
          setIsEditingPassword(true); // 편집 상태 활성화
        } else {
          alert('비밀번호 재설정 코드가 유효하지 않습니다.');
          router.replace('/login');
        }
      } catch (error) {
        console.error('비밀번호 코드 검증 실패:', error);
        alert('비밀번호 재설정 코드가 유효하지 않습니다.');
        router.replace('/login');
      }
    };

    verifyResetCode();
  }, [passwordResetCode, router]);

  // 이메일 변경 코드 확인 및 유저 정보 업데이트
  useEffect(() => {
    if (!emailResetCode) return;

    const verifyEmailResetCode = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          alert('로그인이 필요한 서비스입니다.');
          router.replace('/login');
          return;
        }

        const response = await axios.get(
          `https://onboarding.p-e.kr/user/change-email?emailResetCode=${emailResetCode}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (response.data.isSuccess) {
          console.log('이메일 변경 성공');
          fetchUserData();
        } else {
          console.error('이메일 변경 실패');
        }
      } catch (error) {
        console.error('이메일 변경 오류:', error);
      }
    };

    verifyEmailResetCode();
  }, [emailResetCode, router]);

  const handleDeleteAccount = () => {
    if (socialType === 'GOOGLE') {
      setIsGoogleDeleteModalOpen(true);
    } else if (socialType === 'LOCAL') {
      setIsLocalDeleteModalOpen(true);
    }
  };

  const closeGoogleDeleteModal = () => {
    setIsGoogleDeleteModalOpen(false);
  };

  const closeLocalDeleteModal = () => {
    setIsLocalDeleteModalOpen(false);
  };

  if (!userData) {
    return <p>정보 없음</p>;
  }

  return (
    <Container>
      <ProfileContainer>
        <MyProfile
          name={userData.name}
          job={userData.job}
          profileImgUrl={userData.profileImgUrl}
          bannerImgUrl={userData.bannerImgUrl}
          interestFields={userData.interestFields}
          preferType={userData.preferType}
        />
        <BasicInfo
          email={userData.email}
          socialType={socialType ?? ''}
          isEditingPassword={isEditingPassword}
        />
      </ProfileContainer>
      <DeleteAccount
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleDeleteAccount}
      >
        계정 탈퇴
        <Image src={isHovered ? NextIconHover : NextIcon} alt="nexticon" />
      </DeleteAccount>

      {isGoogleDeleteModalOpen && (
        <GoogleDeleteModal onClose={closeGoogleDeleteModal} />
      )}
      {isLocalDeleteModalOpen && (
        <LocalDeleteModal onClose={closeLocalDeleteModal} />
      )}

      <Footer />
    </Container>
  );
};

export default Profile;
