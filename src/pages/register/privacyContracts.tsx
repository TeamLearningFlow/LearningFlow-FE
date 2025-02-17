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
  gap: 48px;

  @media (max-width: 560px) {
    padding: 55px 40px;
    gap: 38px;
  }
`;

const TitleContainer = styled.div`
  font-size: 24px;
  font-weight: 600;

  @media (max-width: 560px) {
    font-size: 19px;
  }
`;

const Textwrapper = styled.div`
  font-size: 14px;
  color: rgba(100, 105, 110, 1);
  line-height: 1.7em;

  @media (max-width: 560px) {
    font-size: 11px;
  }
`;

const ContractTitle = styled.div`
  font-size: 18px;
  font-weight: bold;

  @media (max-width: 560px) {
    font-size: 15px;
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

const FirstContractContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const SecondContractContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FirstTableContainer = styled.div`
  overflow-x: auto;
`;

const SecondTableContainer = styled.div`
  overflow-x: auto;
  width: 70%;

  @media (max-width: 560px) {
    width: 85%;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  border-spacing: 0;
`;

const TableHeader = styled.th<{ headerWidth?: string }>`
  width: ${({ headerWidth }) => headerWidth || 'auto'};
  padding: 16px;
  border: 1px solid rgba(189, 197, 204, 1);
  text-align: left;

  @media (max-width: 560px) {
    padding: 10px;
    font-size: 11px;
  }
`;

const TableCell = styled.td`
  padding: 18px;
  border: 1px solid rgba(189, 197, 204, 1);

  @media (max-width: 560px) {
    padding: 10px;
    font-size: 11px;
  }
`;

const PrivacyContracts: React.FC = () => {
  {
    /* const handleBackToRegister = () => {
    router.push('/register');
  }; */
  }

  return (
    <>
      <PageWrapper>
        <PageContainer>
          <TitleContainer>개인정보 처리방침</TitleContainer>
          <FirstContractContainer>
            <ContractTitle>
              1. 개인정보 수집 및 이용 목적
            </ContractTitle>
            <Textwrapper>
              ‘Onboarding’은 사용자에게 다양한 학습 콘텐츠를 모아 학습률을
              저장하고 필터링 기능을 제공하는 서비스를 제공합니다. <br />
              이를 위해 다음의 목적으로 개인정보를 수집 및 이용합니다.
            </Textwrapper>
            <FirstTableContainer>
              <StyledTable>
                <tbody>
                  <tr>
                    <TableHeader headerWidth="30%">
                      회원 가입 및 관리
                    </TableHeader>
                    <TableCell>
                      구글 연동 로그인 또는 이메일 로그인 제공
                    </TableCell>
                  </tr>
                  <tr>
                    <TableHeader headerWidth="30%">
                      학습 서비스 제공
                    </TableHeader>
                    <TableCell>
                      콘텐츠 학습 이력 및 학습률 저장, 관심사 기반 콘텐츠 추천
                    </TableCell>
                  </tr>
                  <tr>
                    <TableHeader headerWidth="30%">서비스 개선</TableHeader>
                    <TableCell>사용자 통계 분석 및 신규 기능 개발</TableCell>
                  </tr>
                </tbody>
              </StyledTable>
            </FirstTableContainer>
          </FirstContractContainer>
          <SecondContractContainer>
            <ContractTitle>
              2. 수집하는 개인정보 항목
            </ContractTitle>
            <SecondTableContainer>
              <StyledTable>
                <colgroup>
                  <col style={{ width: '40%' }} />
                  <col style={{ width: '60%' }} />
                </colgroup>
                <tbody>
                  <tr>
                    <TableHeader colSpan={2}>필수항목</TableHeader>
                  </tr>
                  <tr>
                    <TableHeader headerWidth="40%">구글 로그인</TableHeader>
                    <TableCell>이름, 이메일. 프로필 사진</TableCell>
                  </tr>
                  <tr>
                    <TableHeader headerWidth="60%">이메일 로그인</TableHeader>
                    <TableCell>이메일 주소, 비밀번호</TableCell>
                  </tr>
                </tbody>
              </StyledTable>
            </SecondTableContainer>
            <SecondTableContainer>
              <StyledTable>
                <colgroup>
                  <col style={{ width: '40%' }} />
                  <col style={{ width: '60%' }} />
                </colgroup>
                <tbody>
                  <tr>
                    <TableHeader colSpan={2}>
                      선택 항목 및 자동 수집 항목
                    </TableHeader>
                  </tr>
                  <tr>
                    <TableHeader headerWidth="40%">선택 항목</TableHeader>
                    <TableCell>개인 관심사(회원이 직접 입력 시)</TableCell>
                  </tr>
                  <tr>
                    <TableHeader headerWidth="60%">자동 수집 항목</TableHeader>
                    <TableCell>
                      IP 주소, 디바이스 정보(OS, 브라우저 등), 접속 기록, 쿠키
                      정보
                    </TableCell>
                  </tr>
                </tbody>
              </StyledTable>
            </SecondTableContainer>
          </SecondContractContainer>
          <FirstContractContainer>
            <ContractTitle>
              3. 개인정보 보유 및 이용기간
            </ContractTitle>
            <Textwrapper>
              ‘Onboarding’은 서비스 제공을 위해 개인정보를 보유하며, 회원 탈퇴
              요청 시 수집된 정보를 지체 없이 삭제합니다. 단, 관련 법령에 따라
              아래와 같이 정보를 보존할 수 있습니다.
            </Textwrapper>
            <FirstTableContainer>
              <StyledTable>
                <tbody>
                  <tr>
                    <TableHeader headerWidth="30%">회원 가입 정보</TableHeader>
                    <TableCell>회원 탈퇴 후 7일간 보관</TableCell>
                  </tr>
                  <tr>
                    <TableHeader headerWidth="30%">
                      서비스 이용 기록
                    </TableHeader>
                    <TableCell>회원 탈퇴 후 1년간 보관</TableCell>
                  </tr>
                </tbody>
              </StyledTable>
            </FirstTableContainer>
          </FirstContractContainer>
          <FirstContractContainer>
            <ContractTitle>
              4. 개인정보 파기 절차 및 방법
            </ContractTitle>
            <Textwrapper>
              회원은 언제든지 본인의 개인정보를 열람, 수정, 삭제하거나 동의를
              철회할 수 있습니다. 개인정보 관련 요청은 이메일
              (hyxb2n@yonsei.ac.kr)을 통해 처리됩니다.
            </Textwrapper>
            <FirstTableContainer>
              <StyledTable>
                <tbody>
                  <tr>
                    <TableHeader headerWidth="30%">전자적 파일</TableHeader>
                    <TableCell>복구할 수 없는 방식으로 삭제</TableCell>
                  </tr>
                  <tr>
                    <TableHeader headerWidth="30%">서면 자료</TableHeader>
                    <TableCell>분쇄 또는 소각</TableCell>
                  </tr>
                </tbody>
              </StyledTable>
            </FirstTableContainer>
          </FirstContractContainer>

          <FirstContractContainer>
            <ContractTitle>
              5. 회원의 관리
            </ContractTitle>
            <Textwrapper>
              수집한 개인정보는 목적이 달성되거나 보유 기간이 만료되면 즉시
              파기합니다.
            </Textwrapper>
          </FirstContractContainer>

          <FirstContractContainer>
            <ContractTitle>
              6. 개인정보 보호책임자 및 문의
            </ContractTitle>
            <Textwrapper>
              개인정보 처리와 관련된 문의사항은 아래로 연락주시기 바랍니다.
            </Textwrapper>
            <FirstTableContainer>
              <StyledTable>
                <tbody>
                  <tr>
                    <TableHeader headerWidth="30%">이름</TableHeader>
                    <TableCell>황혜빈</TableCell>
                  </tr>
                  <tr>
                    <TableHeader headerWidth="30%">소속</TableHeader>
                    <TableCell>[Onboarding] onboarding project team</TableCell>
                  </tr>
                  <tr>
                    <TableHeader headerWidth="30%">이메일</TableHeader>
                    <TableCell>hyxb2n@yonsei.ac.kr</TableCell>
                  </tr>
                </tbody>
              </StyledTable>
            </FirstTableContainer>
          </FirstContractContainer>

          <FirstContractContainer>
            <ContractTitle>
              7. 권익침해 구제방법
            </ContractTitle>
            <Textwrapper>
              회원은 개인정보 침해로 인한 분쟁 해결이나 상담이 필요한 경우 다음
              기관에 문의할 수 있습니다.
            </Textwrapper>
            <FirstTableContainer>
              <StyledTable>
                <tbody>
                  <tr>
                    <TableHeader headerWidth="30%">이름</TableHeader>
                    <TableCell>황혜빈</TableCell>
                  </tr>
                  <tr>
                    <TableHeader headerWidth="30%">
                      개인정보분쟁조정위원회
                    </TableHeader>
                    <TableCell>1833-6972 (www.kopico.go.kr)</TableCell>
                  </tr>
                  <tr>
                    <TableHeader headerWidth="30%">
                      개인정보침해신고센터
                    </TableHeader>
                    <TableCell>118 (privacy.kisa.or.kr)</TableCell>
                  </tr>
                </tbody>
              </StyledTable>
            </FirstTableContainer>
          </FirstContractContainer>
          <ContractTitle>
            본 방침은 2024년 2월 20일부터 적용됩니다.
          </ContractTitle>
        </PageContainer>
        {/* <BackButton onClick={handleBackToRegister}>뒤로가기</BackButton> */}
      </PageWrapper>
    </>
  );
};

export default PrivacyContracts;
