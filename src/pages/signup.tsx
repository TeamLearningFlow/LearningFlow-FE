import React from 'react';
import styled from 'styled-components';
import LeftUI from './components/leftUI';
import Divider from './components/divider';
import GoogleAuthButton from './components/googleAuthButton';
import AuthButton from './components/authButton';

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
  margin-top: 180px;
`;

const FormContainer = styled.div`
  width: 460px;
  padding: 40px;
  border-radius: 8px;
  background-color: #ffffff;
`;

const FormGroup = styled.div`
  margin-bottom: 32px;
`;

const SignupPage: React.FC = () => {
  return (
    <>
      <LeftUI />
      <PageContainer>
        <RightSection>
          <FormContainer>
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
