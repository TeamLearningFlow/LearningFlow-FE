import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import MyProfile from './myprofile';
import BasicInfo from './basicInfo';
import Footer from '../../components/homeFooter';
import NextIcon from '../../assets/next.svg';

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
  color: #4F5357;

  img {
    width: 10px;
    height: 20px;
    margin-left: 8px;
    margin-top: -3px;
  }
`;

const Profile = () => {
  return (
    <Container>
      <ProfileContainer>
        <MyProfile />
        <BasicInfo />
      </ProfileContainer>
      <DeleteAccount>
        계정 탈퇴
        <Image src={NextIcon} alt="chevron icon" />
      </DeleteAccount>
      <Footer />
    </Container>
  );
};

export default Profile;
