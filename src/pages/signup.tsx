import React, { useState } from 'react';
import styled from 'styled-components';
import LeftUI from './components/leftUI';
import Divider from './components/divider';
import GoogleAuthButton from './components/googleAuthButton';
import AuthButton from './components/authButton';
import InputEmail from './components/inputEmail';
import SignupInputPw from './components/signupInputPw';
import InputPwCheck from './components/inputPwCheck';
import TopLogo from './components/topLogo';

const PageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
  background-color: #ffffff;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: right;
  align-items: center;
  padding-right: 64px;
  height: 100%;
`;

const FormContainer = styled.div`
  width: 460px;
  height: 100vh;
  padding: 40px;
  border-radius: 8px;
  background-color: #ffffff;
`;

const FormGroup = styled.div`
  margin-bottom: 32px;
`;

const SignupPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordCheckValid, setIsPasswordCheckValid] = useState(false);

  const isFormValid = isEmailValid && isPasswordValid && isPasswordCheckValid;

  return (
    <>
      <TopLogo />
      <LeftUI />
      <PageContainer>
        <RightSection>
          <FormContainer>
            <h2 style={{ textAlign: 'center' }}>회원가입</h2>
            <InputEmail setIsEmailValid={setIsEmailValid} />
            <SignupInputPw setPassword={setPassword} setIsPasswordValid={setIsPasswordValid} />
            <InputPwCheck password={password} setIsPasswordCheckValid={setIsPasswordCheckValid} />
            <div style={{ display: 'flex', alignItems: 'center', margin: '22px 0' }}>
              <input type="checkbox" />
              <span style={{ fontSize: '12px', marginLeft: '6px' }}>
                이벤트, 맞춤 추천, 학습 팁 등을 보내주세요
              </span>
            </div>

            <FormGroup>
              <AuthButton text="가입하기" disabled={!isFormValid} />
              <Divider />
              <GoogleAuthButton text="Google 계정으로 회원가입" />
            </FormGroup>
          </FormContainer>
        </RightSection>
      </PageContainer>
    </>
  );
};

export default SignupPage;
