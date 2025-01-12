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
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
  height: 100vh;
  background-color: #ffffff;
`;

const RightSection = styled.div`
  position: absolute; /* 절대 위치 지정 */
  top: 0;
  right: 0;
  width: 46vw; /* 화면 너비의 46% 사용 */
  height: 100vh; /* 화면 전체 높이 사용 */
  padding-top: 100px;
  display: flex;
  flex-direction: column;
`;

const FormContainer = styled.div`
  width: 460px;
  padding: 105px;
  border-radius: 8px;
  background-color: #ffffff;
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
