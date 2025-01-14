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
  width: 100vw;
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

const FormGroup = styled.div``;

const SignupPage: React.FC = () => {
  const [password, setPassword] = useState('');

  return (
    <>
      <PageContainer>
        <LeftSection>
          <TopLogo />
          <LeftUI />
        </LeftSection>
        <RightSection>
          <FormContainer>
            <h2 style={{ textAlign: 'center', fontSize: '25px' }}>회원가입</h2>
            <InputEmail />
            <InputPw setPassword={setPassword} />
            <ValidationCheck />
            {/* 비밀번호 확인을 위한 InputPwCheck 컴포넌트 */}
            <InputPwCheck password={password} />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: '22px 0',
              }}
            >
              <input type="checkbox" />
              <span style={{ fontSize: '13px', marginLeft: '6px' }}>
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
