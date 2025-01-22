import React from 'react';
import styled from 'styled-components';
import InputEmail from '../../components/inputEmail';
import InputPw from '../../components/inputPw';
import LeftUI from '../../components/leftUI';
import Divider from '../../components/divider';
import GoogleAuthButton from '../../components/googleAuthButton';
import AuthButton from '../../components/authButton';
import TopLogo from '../../components/topLogo';
import { LoginProvider } from '../context/LoginContext';

const PageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
  overflow: hidden;
`;

const LeftSection = styled.div`
  width: 54vw;
  display: flex;
`;

const RightSection = styled.div`
  width: 46vw;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const FormContainer = styled.div`
  position: absolute;
  width: 30vw;
  max-width: 420px;
  border-radius: 8px;
  background-color: #ffffff;
  box-sizing: border-box;
`;

const Title = styled.h1`
  width: 100%;
  font-size: 29px;
  font-weight: 600;
  letter-spacing: -0.64px;
  margin-bottom: 28px;
  text-align: center;
  color: #181818;
`;

const CheckboxContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 32px;

  label {
    font-size: 13px;
    font-weight: 400;
    letter-spacing: -0.28px;
    color: #181818;
    display: flex;
    align-items: center;
    position: relative;

    input {
      margin-right: 6px;
      cursor: pointer;
    }
  }

  a {
    font-size: 13px;
    color: #7c8389;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const SignupText = styled.p`
  width: 100%;
  text-align: center;
  font-size: 15px;
  font-weight: 400;
  letter-spacing: -0.36px;
  color: #bbc0c5;
  margin-bottom: 32px;

  a {
    color: #181818;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: -0.36px;
    text-decoration: none;
    margin-left: 6px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const LoginPage: React.FC = () => {
  return (
    <>
      <LoginProvider>
        <PageContainer>
          <LeftSection>
            <TopLogo />
            <LeftUI />
          </LeftSection>
          <RightSection>
            <FormContainer>
              <Title>로그인</Title>
              <InputEmail />
              <InputPw />
              <CheckboxContainer>
                <label>
                  <input type="checkbox" /> 로그인 유지
                </label>
                <div>
                  <a href="/forgot-id">아이디(이메일) 찾기</a> |{' '}
                  <a href="/forgot-password">비밀번호 찾기</a>
                </div>
              </CheckboxContainer>
              <SignupText>
                온보딩이 처음이신가요? <a href="/signup">회원가입</a>
              </SignupText>
              <AuthButton disabled={true} text="로그인" />
              <Divider />
              <GoogleAuthButton text="Google 계정으로 로그인" />
            </FormContainer>
          </RightSection>
        </PageContainer>
      </LoginProvider>
    </>
  );
};

export default LoginPage;
