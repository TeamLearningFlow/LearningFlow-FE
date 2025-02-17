import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const PageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  padding: 100px 100px;
  gap: 35px;

  @media (max-width: 850px) {
    padding: 100px 100px;
  }

  @media (max-width: 560px) {
    padding: 55px 40px;
  }
`;

const TitleContainer = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 15px;

  @media (max-width: 560px) {
    font-size: 19px;
    margin-bottom: 0px;
  }
`;

const Textwrapper = styled.div`
  font-size: 14px;
  color: rgba(100, 105, 110, 1);
  line-height: 1.7em;
  white-space: pre-wrap;

  @media (max-width: 560px) {
    font-size: 11px;
  }
`;

{
  /* const BackButton = styled.button`
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
  margin: 48px auto;
`; */
}

const ContractContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ContractTitle = styled.div`
  font-size: 18px;
  font-weight: bold;

  @media (max-width: 560px) {
    font-size: 15px;
  }
`;

const Contracts: React.FC = () => {
  {
    /* const handleBackToRegister = () => {
    router.push('/register');
  }; */
  }

  return (
    <>
      <PageWrapper>
        <PageContainer>
          <TitleContainer>이용약관</TitleContainer>
          <ContractContainer>
            <ContractTitle>제1조(목적)</ContractTitle>
            <Textwrapper>
              이 약관은 [Onboarding] (이하 &quot;플랫폼&quot;)에서 제공하는 모든
              서비스의 이용과 관련하여 플랫폼과 사용자 간의 권리, 의무,
              책임사항을 규정합니다.
            </Textwrapper>
          </ContractContainer>

          <ContractContainer>
            <ContractTitle>제2조(약관의 효력 및 변경)</ContractTitle>
            <Textwrapper>
              1. 본 약관은 플랫폼에 게시함으로써 효력이 발생합니다.
              <br />
              2. 플랫폼은 합리적인 사유가 발생할 경우 관련 법령을 위배하지 않는
              범위 내에서 약관을 변경할 수 있습니다. 변경된 약관은 시행 전에
              공지되며, 사용자가 동의하지 않을 경우 서비스 이용을 중단할 수
              있습니다.
            </Textwrapper>
          </ContractContainer>

          <ContractContainer>
            <ContractTitle>제3조(이용계약의 체결)</ContractTitle>
            <Textwrapper>
              1. 사용자는 플랫폼이 정한 절차에 따라 회원가입을 신청하고,
              플랫폼이 이를 승인함으로써 계약이 체결됩니다.
              <br />
              2. 회원가입 시 사용자는 정확하고 사실에 기반한 정보를 제공해야
              하며, 허위 정보 제공으로 인해 발생하는 문제는 사용자 책임입니다.
            </Textwrapper>
          </ContractContainer>

          <ContractContainer>
            <ContractTitle>제4조(서비스의 제공 및 변경)</ContractTitle>
            <Textwrapper>
              1. 플랫폼은 아래와 같은 서비스를 제공합니다:
              <br />
              <span style={{ paddingRight: '5px' }}></span> · 학습 자료 제공
              <br />
              <span style={{ paddingRight: '5px' }}></span> · 학습 진도 관리 및
              이용 분석
              <br />
              2. 플랫폼은 서비스의 내용, 운영 정책 등을 변경할 수 있으며, 이
              경우 사용자에게 사전 공지합니다.
            </Textwrapper>
          </ContractContainer>

          <ContractContainer>
            <ContractTitle>제5조(사용자의 의무)</ContractTitle>
            <Textwrapper>
              1. 사용자는 플랫폼 내에서 다음 행위를 하지 않아야 합니다:
              <br />
              <span style={{ paddingRight: '5px' }}></span> · 타인의 계정을
              도용하거나 부정 사용
              <br />
              <span style={{ paddingRight: '5px' }}></span> · 불법적이거나
              부적절한 콘텐츠 게시
              <br />
              2. 사용자는 플랫폼이 제공하는 콘텐츠를 허가 없이 복제, 배포,
              변경할 수 없습니다.
            </Textwrapper>
          </ContractContainer>

          <ContractContainer>
            <ContractTitle>제6조(개인정보 보호)</ContractTitle>
            <Textwrapper>
              사용자의 개인정보는 [개인정보처리방침]에 따라 보호됩니다.
            </Textwrapper>
          </ContractContainer>

          <ContractContainer>
            <ContractTitle>제7조(책임 제한)</ContractTitle>
            <Textwrapper>
              플랫폼은 다음에 대해 책임을 지지 않습니다.
              <br />
              1. 사용자가 제공한 정보의 부정확성
              <br />
              2. 플랫폼 외부 링크 및 제3자의 행위
              <br />
              3. 불가항력적 사유로 인한 서비스 중단
            </Textwrapper>
          </ContractContainer>

          <ContractContainer>
            <ContractTitle>제8조(분쟁 해결)</ContractTitle>
            <Textwrapper>
              본 약관과 관련하여 분쟁이 발생할 경우 [소재지]의 관할 법원을 전속
              관할로 합니다.
            </Textwrapper>
          </ContractContainer>
        </PageContainer>
        {/* <BackButton onClick={handleBackToRegister}>뒤로가기</BackButton> */}
      </PageWrapper>
    </>
  );
};

export default Contracts;
