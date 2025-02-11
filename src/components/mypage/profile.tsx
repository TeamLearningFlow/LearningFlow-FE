import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Image from 'next/image';
import MyProfile from './myprofile';
import BasicInfo from './basicInfo';
import Footer from '../../components/homeFooter';
import NextIcon from '../../assets/nextIcon.svg';
import NextIconHover from '../../assets/nextIconHover.svg';

interface UserData {
  name: string;
  email: string;
  job: string;
  interestFields: string[];
  birthDay: string;
  preferType: string;
  profileImgUrl: string;
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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 로컬 스토리지에서 토큰 가져오기 (로그인 시에만 접근 가능)
        const token = localStorage.getItem('authToken');
        if (!token) {
          console.error('로그인 토큰이 없습니다.');
          return;
        }

        // Authorization 헤더 추가
        const response = await axios.get('http://onboarding.p-e.kr:8080/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data.result); // 사용자 정보 result
      } catch (error) {
        console.error('사용자 정보 가져오기 실패: ', error);
      }
    };

    fetchUserData();
  }, []);

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
              interestFields={userData.interestFields}
              preferType={userData.preferType}
            />
            <BasicInfo email={userData.email} birthDay={userData.birthDay} />
      </ProfileContainer>
      <DeleteAccount
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        계정 탈퇴
        <Image src={isHovered ? NextIconHover : NextIcon} alt="nexticon" />
      </DeleteAccount>
      <Footer />
    </Container>
  );
};

export default Profile;
