import React, { useState, useEffect } from 'react';
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

const Help: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  {
    /* const handleBackToRegister = () => {
    router.push('/register');
  }; */
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <PageWrapper>
        <PageContainer>
          <TitleContainer>도움말</TitleContainer>

          <ContractContainer>
            <ContractTitle>1. 회원가입 및 로그인</ContractTitle>
            <Textwrapper>
              Q: 회원가입은 어떻게 하나요?
              <br />
              A: [홈페이지] 상단의 &quot;회원가입&quot; 버튼을 클릭한 후, 필수
              정보를 입력하고 &quot;등록&quot; 버튼을 누르면 가입이 완료됩니다.
              <br />
              <br />
              Q: 회원가입 시에 등록한 정보를 변경하고 싶은데 어떻게 하나요?
              <br />
              A: [마이페이지]의 &quot;프로필 수정&quot; 버튼을 눌러 정보를
              변경할 수 있습니다.
            </Textwrapper>
          </ContractContainer>

          <ContractContainer>
            <ContractTitle>2. 학습 콘텐츠</ContractTitle>
            <Textwrapper>
              Q: 강의를 시작하려면 어떻게 해야 하나요?
              <br />
              A: 로그인 후, &quot;탐색 페이지&quot;에서 원하는 강의를 검색하고
              컬렉션을 클릭한 후 재생 버튼을 누르면 강의가 시작됩니다.
              <br />
              <br />
              Q: 진도율은 어디에서 확인할 수 있나요?
              <br />
              A: [마이페이지]에 접속하면 현재 진행 중인 컬렉션의 학습률을 확인할
              수 있으며, 완료한 강의도 확인할 수 있습니다.
              <br />
              <br />
              Q: 수강 완료 버튼은 무엇인가요?
              <br />
              A: 강제로 해당 회차의 콘텐츠를 **진도율 100%**로 설정할 수 있는
              버튼입니다. 오류가 발생했거나 이미 시청한 콘텐츠라면 &quot;수강
              완료&quot; 버튼을 클릭하세요!
            </Textwrapper>
          </ContractContainer>

          <ContractContainer>
            <ContractTitle>3. 기술 지원</ContractTitle>
            <Textwrapper>
              Q: 강의가 재생되지 않아요.
              <br />
              A: 다음 해결 방법을 시도해 보세요.
              <br />
              <span style={{ paddingRight: '5px' }}></span> 1. 인터넷 연결 상태
              확인
              <br />
              <span style={{ paddingRight: '5px' }}></span> 2. 브라우저 재시작
              <br />
              <span style={{ paddingRight: '5px' }}></span> 3. 브라우저 최신
              버전 업데이트
              <br />
              <span style={{ paddingRight: '5px' }}></span> 4. 다른 브라우저에서
              실행
            </Textwrapper>
          </ContractContainer>
        </PageContainer>
      </PageWrapper>
    </>
  );
};

export default Help;
