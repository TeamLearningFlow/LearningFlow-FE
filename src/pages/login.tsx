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
  padding-top: 50px;
  display: flex;
  flex-direction: column;
`;

const FormContainer = styled.div`
  width: 460px;
  padding: 105px;
  border-radius: 8px;
  background-color: #ffffff;
`;

const Title = styled.h1`
  width: 440px;
  font-size: 32px;
  font-weight: 600;
  letter-spacing: -0.64px;
  margin-bottom: 32px;
  text-align: center;
  color: #181818;
`;

const CheckboxContainer = styled.div`
  width: 440px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;

  label {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: -0.28px;
    color: #181818;
    display: flex;
    align-items: center;
    position: relative;

    input {
      transform: scale(1.2); /* 체크박스 크기 1.2배 확대 */
      margin-right: 6px;
      cursor: pointer;
    }
  }

  a {
    font-size: 14px;
    color: #7c8389;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const SignupText = styled.p`
  width: 440px;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: -0.36px;
  color: #bbc0c5;
  margin-bottom: 32px;

  a {
    color: #181818;
    font-size: 16px;
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
      <TopLogo />
      <LeftUI />
      <PageContainer>
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
    </>
  );
};

export default LoginPage;
