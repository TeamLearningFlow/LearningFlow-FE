import React, { useState } from 'react';
import styled from 'styled-components';
import TopLogo from '../assets/logo_dark.png';
import EmailAuthPage from './emailAuth';

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const PageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  padding: 40px 100px;
  gap: 24px;
  border: 1px solid red;
`;

const TitleContainer = styled.div`
  font-size: 24px;
  font-weight: 600;
`;

const Textwrapper = styled.div`
  font-size: 16px;
`;

const NextButton = styled.button`
  display: flex;
  height: 50px;
  padding: 18px 8px;
  justify-content: center;
  align-items: center;
  width: 27vw;
  background-color: rgba(94, 82, 255, 1);
  border: none;
  border-radius: 5px;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
`;

const FirstContractContainer = styled.div`

`
const SecondContractContainer = styled.div`

`

const ContractsPage: React.FC = () => {
  const [showContracts, setShowContracts] = useState(false);

  const handleShowContracts = () => {
    setShowContracts(true);
  };

  return (
    <>
      {!showContracts ? (
        <PageWrapper>
          <TopLogo />
          <PageContainer>
            <TitleContainer>개인정보 수집 · 이용 동의</TitleContainer>
            <Textwrapper>
            온보딩은 「신용정보의 이용 및 보호에 관한 법률」, 「개인정보 보호법」 등 
            관련 법규에 따라 회원님께 아래와 같은 '수집·이용 목적, 수집·이용 항목, 보유 및 이용기간, 
            거부 권리 및 불이익'에 관한 사항을 안내 드리고 개인정보 수집·이용 동의를 받고자 합니다.
            </Textwrapper>
            <FirstContractContainer>
                <p style={{fontSize: '16px', fontWeight: 'bold'}}>1. 제공에 관한 사항</p>
            </FirstContractContainer>
            <SecondContractContainer>
                <p style={{fontSize: '16px', fontWeight: 'bold'}}>2. 수집 · 이용 및 항목</p>
            </SecondContractContainer>
            <NextButton onClick={handleShowContracts}>다음 단계로 넘어가기</NextButton>
          </PageContainer>
        </PageWrapper>
      ) : (
        <EmailAuthPage />
      )}
    </>
  );
};

export default ContractsPage;