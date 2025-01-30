import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import styled from 'styled-components';
import LeftUI from '../../components/leftUI';
import Divider from '../../components/divider';
import GoogleAuthButton from '../../components/googleAuthButton';
import SignupAuthButton from '../../components/register/signupAuthButton';
import SignupInputEmail from '../../components/register/signupInputEmail';
import SignupInputPw from '../../components/register/signupInputPw';
import InputPwCheck from '../../components/register/signupinputPwCheck';
import TopLogo from '../../components/topLogo_light';
import EmailAuthPage from './emailAuth';

const PageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #ffffff;
  overflow: hidden;
  margin-top: -15px;
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
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const BlankContainer = styled.div``;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 15px;
`;

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordCheckValid, setIsPasswordCheckValid] = useState(false);
  const [showEmailAuth, setShowEmailAuth] = useState(false);

  const isFormValid = isEmailValid && isPasswordValid && isPasswordCheckValid;

  const handleShowEmailAuth = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    setShowEmailAuth(true);
    registeraxios();
  };

  const registeraxios = async () => {
    try {
      // const response = await axios.post('http://localhost:8080/register', {
      //   email: email,
      //   password: password,
      // });

      const response = await axios.post(
        'http://onboarding.p-e.kr:8080/register',
        {
          email: email,
          password: password,
        },
      );

      console.log('Response:', response);
      // alert('회원가입 성공');

      if (response.status === 200) {
        // return navigate('/mylogin');
        console.log('이메일 인증 페이지로 이동');
      }
    } catch (err: any) {
      console.log('Error:', err.response?.data || err.message);
      if (err.response?.data?.message) {
        console.log('Error Message:', err.response.data.message);
      } else {
        console.log('회원가입 중 오류 발생');
      }
    }
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
              <SignupInputEmail
                setEmail={setEmail}
                setIsEmailValid={setIsEmailValid}
              />
              <SignupInputPw
                setPassword={setPassword}
                setIsPasswordValid={setIsPasswordValid}
              />
              <InputPwCheck
                password={password}
                setIsPasswordCheckValid={setIsPasswordCheckValid}
              />
              <FormGroup>
                <SignupAuthButton
                  text="가입하기"
                  disabled={!isFormValid}
                  onClick={handleShowEmailAuth}
                />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ fontSize: '10px' }}>
                    가입하면{' '}
                    <Link
                      href="/register/contracts"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span
                        style={{
                          color: 'rgba(24, 24, 24, 1)',
                          textDecoration: 'underline',
                          fontWeight: 'bold',
                        }}
                      >
                        이용약관
                      </span>
                    </Link>{' '}
                    및{' '}
                    <Link
                      href="/register/privacyContracts"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span
                        style={{
                          color: 'rgba(24, 24, 24, 1)',
                          textDecoration: 'underline',
                          fontWeight: 'bold',
                        }}
                      >
                        개인정보 처리방침
                      </span>
                    </Link>
                    에 동의하는 것으로 간주합니다.
                  </span>
                </div>
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

export default RegisterPage;
