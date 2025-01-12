import React, { useState } from 'react';
import styled from 'styled-components';
import LeftUI from './components/leftUI';
import Divider from './components/divider';
import GoogleAuthButton from './components/googleAuthButton';
import AuthButton from './components/authButton';
import InputEmail from './components/inputEmail';
import InputPw from './components/inputPw';
import { ValidationCheck } from './components/validation';
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
  height: 100%;
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
  
  return (
    <>
      <TopLogo />
      <LeftUI />
      <PageContainer>
        <RightSection>
          <FormContainer>
            <h2 style={{ textAlign: 'center' }}>회원가입</h2>
            <InputEmail />
            <InputPw setPassword={setPassword} />
            <ValidationCheck />
            {/* 비밀번호 확인을 위한 InputPwCheck 컴포넌트 */}
            <InputPwCheck password={password} />
            <div style={{ display: 'flex', alignItems: 'center', margin: '22px 0' }}>
              <input type="checkbox" />
              <span style={{ fontSize: '12px', marginLeft: '6px' }}>
                이벤트, 맞춤 추천, 학습 팁 등을 보내주세요
              </span>
            </div>

            <FormGroup>
              <AuthButton disabled={true} text="가입하기" />
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
