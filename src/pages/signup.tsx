import React, { useState } from 'react';
import styled from 'styled-components';
import LeftUI from './components/leftUI';
import Divider from './components/divider';
import GoogleAuthButton from './components/googleAuthButton';
import SignupAuthButton from './components/signupAuthButton';
import InputEmail from './components/inputEmail';
import SignupInputPw from './components/signupInputPw';
import InputPwCheck from './components/inputPwCheck';
import TopLogo from './components/topLogo_light';
import EmailAuthPage from './emailAuth';

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

const BlankContainer = styled.div``;

const FormGroup = styled.div``;

const SignupPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordCheckValid, setIsPasswordCheckValid] = useState(false);
  const [showEmailAuth, setShowEmailAuth] = useState(false);

  const isFormValid = isEmailValid && isPasswordValid && isPasswordCheckValid;

  const handleShowEmailAuth = () => {
    setShowEmailAuth(true);
  };

  return (
    <>
      {!showEmailAuth ? (
        <PageContainer>
          <LeftSection>
            <TopLogo />
            <LeftUI />
          </LeftSection>
          <RightSection>
            <BlankContainer />
            <FormContainer>
              <h2 style={{ textAlign: 'center', marginTop: '30px' }}>
                회원가입
              </h2>
              <InputEmail setIsEmailValid={setIsEmailValid} />
              <SignupInputPw
                setPassword={setPassword}
                setIsPasswordValid={setIsPasswordValid}
              />
              <InputPwCheck
                password={password}
                setIsPasswordCheckValid={setIsPasswordCheckValid}
              />
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
                <SignupAuthButton
                  text="가입하기"
                  disabled={!isFormValid}
                  onClick={handleShowEmailAuth}
                />
                <Divider />
                <GoogleAuthButton text="Google 계정으로 회원가입" />
              </FormGroup>
            </FormContainer>
          </RightSection>
        </PageContainer>
      ) : (
        <EmailAuthPage />
      )}
    </>
  );
};

export default SignupPage;
