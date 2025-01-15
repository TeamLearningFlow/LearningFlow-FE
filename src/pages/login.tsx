import React from 'react';
import styled from 'styled-components';
import InputEmail from './components/inputEmail';
import InputPw from './components/inputPw';
import LeftUI from './components/leftUI';
import Divider from './components/divider';
import GoogleAuthButton from './components/googleAuthButton';
import AuthButton from './components/authButton';
import TopLogo from './components/topLogo';

const PageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: right;
  align-items: center;
  padding-right: 40px;
  margin-top: 400px;
`;

const FormContainer = styled.div`
  position: absolute;
  width: 520px;
  padding: 40px;
  border-radius: 8px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
`;

const LoginPage: React.FC = () => {
  return (
    <>
      <TopLogo />
      <LeftUI />
      <PageContainer>
        <RightSection>
          <FormContainer>
            <InputEmail />
            <InputPw />
            <AuthButton disabled={true} text="로그인" />
            <Divider />
            <GoogleAuthButton text="Google 계정으로 로그인" />
          </FormContainer>
        </RightSection>
      </PageContainer>
    </>
  );
};

export default LoginPage;