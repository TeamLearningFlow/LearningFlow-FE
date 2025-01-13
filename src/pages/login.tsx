import React /**{ useContext, useState } **/ from 'react';
import styled from 'styled-components';
import InputEmail from './components/inputEmail';
import InputPw from './components/inputPw';
import LeftUI from './components/leftUI';
import Divider from './components/divider';
import GoogleAuthButton from './components/googleAuthButton';
import AuthButton from './components/authButton';
import TopLogo from './components/topLogo';
import { LoginProvider } from './context/LoginContext';

// test
// const Test = styled.div`
//   width: 100%;
//   height: 100%;
//   overflow: hidden;
// `;

// const PageContainer = styled.div`
//   display: flex;
//   // max-width: 1440px;
//   // margin: 0 auto;
//   // width: 100%;
//   height: 100vh;
//   background-color: #ffffff;
// `;

// const PageContainer = styled.div`
//   display: flex;
//   position: absolute;
//   top: 0;
//   left: 100vw;
// `;
const PageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  overflow: hidden; /* 스크롤 방지 */
`;
// height: 100vh; /* 화면 전체 높이 */

// const RightSection = styled.div`
//   position: absolute; /* 절대 위치 지정 */
//   top: 0;
//   right: 0;
//   width: 46vw; /* 화면 너비의 46% 사용 */
//   height: 100vh; /* 화면 전체 높이 사용 */
//   // padding-top: 50px;

//   display: flex;
//   flex-direction: column;
// `;

const LeftSection = styled.div`
  width: 60vw;
`;
const RightSection = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 43vw;
  height: 100%;
`;
// min-height: 100%;
// display: flex;

const FormContainer = styled.div`
  width: 460px;
  // padding: 105px;
  padding: 85px;
  padding-top: 60px;
  padding-bottom: 0px;
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
  margin-top: 12px;
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
  /** const [passwordValid, setPasswordValid] = useState(false); // 비밀번호 유효 상태
  const [passwordError, setPasswordError] = useState(false); // 비밀번호 오류 상태 

  const handleLogin = () => {};

 const handlePasswordEnter = (isValid: boolean) => {
    if (isValid) {
      setPasswordError(false); // 조건 충족 시 오류 초기화
    }
  }; **/

  return (
    <>
      {/* <Test> */}
      <LoginProvider>
        <LeftSection>
          <TopLogo />
          <LeftUI />
        </LeftSection>
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
      </LoginProvider>
      {/* </Test> */}
    </>
  );
};

export default LoginPage;
