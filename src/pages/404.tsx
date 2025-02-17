import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import errorImage from '/public/404.svg';
import { useRouter } from 'next/router';
import Footer from '@/components/homeFooter';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 310px 0;
`;

const Error = styled.div`
  margin-bottom: 32px;
`;

const ErrorLabel = styled.div`
  color: #323538;
  text-align: center;

  /* Body/2xl/Semibold */
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 48px */
  letter-spacing: -0.64px;
`;

const ErrorText = styled.div`
  color: #959ca4;
  text-align: center;

  /* Body/l/regular */
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 33px */
  letter-spacing: -0.44px;
`;

const Button = styled.button`
  display: flex;
  width: 390px;
  height: 58px;
  padding: 18px 126px;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 12px;
  background: var(--onboarding-primary-purple-09-primary, #5e52ff);
  box-shadow: 3.503px 3.503px 3.941px -0.876px rgba(113, 104, 104, 0.26);
  color: #fff;
  cursor: pointer;

  /* Body/l/Semibold */
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 33px */
  letter-spacing: -0.44px;
`;

const NotFound: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <ErrorContainer>
        <Image src={errorImage} alt="404 error" />
        <Error>
          <ErrorLabel>404 ERROR</ErrorLabel>
          <ErrorText>
            존재하지 않는 주소를 입력하셨거나,<br></br> 요청하신 페이지의 주소가
            변경, 삭제되어 찾을 수 없습니다.
          </ErrorText>
        </Error>
        <Button onClick={() => router.push('/home')}>홈으로</Button>
      </ErrorContainer>
      <Footer />
    </>
  );
};

export default NotFound;
