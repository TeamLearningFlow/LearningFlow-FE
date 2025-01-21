import React from 'react';
import styled from 'styled-components';
import TopLogo from './components/toplogo_dark';
import EmailIcon from './assets/mailIcon.png';
import Image from 'next/image';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 18vh;
`;

const TitleContainer = styled.div`
  text-align: center;
  font-size: 24px;
  font-weight: 600;
`;

const IconContainer = styled.div`
  display: flex;
  margin: 35px;
`;

const Textwrapper = styled.div`
  white-space: pre-line;
  text-align: center;
  font-size: 15px;
  margin-bottom: 35px;
`;

const GoBackButton = styled.button`
  display: flex;
  height: 45px;
  padding: 18px 8px;
  justify-content: center;
  align-items: center;
  width: 27vw;
  background-color:rgba(94, 82, 255, 1);
  border: none;
  border-radius: 5px;
  font-family: Roboto;
  font-size: 15px;
  font-style: normal;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
`


const EmailAuthPage: React.FC = () => {
  return (
    <>
      <TopLogo />
      <PageContainer>
        <TitleContainer>인증 메일을 보내드렸어요.</TitleContainer>
        <IconContainer>
          <Image src={EmailIcon} alt="Email Icon" width={250} height={150} />
        </IconContainer>
        <Textwrapper>
          {`메일함을 확인해주세요.\n가입하신 이메일을 인증해주시면,\n온보딩의 서비스를 마음껏 이용하실 수 있어요.`}
        </Textwrapper>
        <GoBackButton>이전 페이지로 돌아가기</GoBackButton>
      </PageContainer>
    </>
  );
};

export default EmailAuthPage;