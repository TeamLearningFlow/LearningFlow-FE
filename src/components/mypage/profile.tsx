import React from 'react';
import styled from 'styled-components';
import MyProfile from './myprofile';
import BasicInfo from './basicInfo';
import Footer from '../../components/homeFooter';

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
  margin: 40px 0 100px 0;
  padding: 24px 32px;
  box-sizing: border-box;
`;

const Profile = () => {
  return (
    <Container>
      <ProfileContainer>
        <MyProfile />
        <BasicInfo />
      </ProfileContainer>
      <Footer />
    </Container>
  );
};

export default Profile;
