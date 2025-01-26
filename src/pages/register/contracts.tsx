import React, { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import TopLogo from '../../components/toplogo_guest';
import selectedicon from '../../assets/selectedicon.svg';
import unselectedicon from '../../assets/unselectedicon.svg';
import EmailAuthPage from './emailAuth';

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
  padding: 50px 100px;
  gap: 48px;
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
  margin: 48px auto; /* 버튼을 가로축에서 중앙 정렬 */
`;

const FirstContractContainer = styled.div``;
const SecondContractContainer = styled.div``;

const FirstTableContainer = styled.div`
  margin-top: 20px;
  overflow-x: auto;
`;

const SecondTableContainer = styled.div`
  margin-top: 20px;
  overflow-x: auto;
  width: 70%;
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
`;

const TableCell = styled.td`
  padding: 16px;
  border: 1px solid rgba(189, 197, 204, 1);
`;

{
  /* const TableCellWithFlex = styled.td`
  display: flex;
  align-items: center;
  padding: 16px;
  border: 1px solid rgba(189, 197, 204, 1);
`; */
}

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 18px;
  height: 18px;
  margin: 0 10px;
`;

const ContractsPage: React.FC = () => {
  const [disagreeChecked, setDisagreeChecked] = useState(false);
  const [agreeChecked, setAgreeChecked] = useState(false);
  const [showContracts, setShowContracts] = useState(false);

  const handleShowContracts = () => {
    setShowContracts(true);
  };

  const handleDisagreeCheck = () => {
    setDisagreeChecked((prev) => !prev);
    if (agreeChecked) setAgreeChecked(false);
  };

  const handleAgreeCheck = () => {
    setAgreeChecked((prev) => !prev);
    if (disagreeChecked) setDisagreeChecked(false);
  };

  return (
    <>
      {!showContracts ? (
        <PageWrapper>
          <TopLogo />
          <PageContainer>
            <TitleContainer>개인정보 수집 · 이용 동의</TitleContainer>
            <Textwrapper>
              온보딩은 「신용정보의 이용 및 보호에 관한 법률」, 「개인정보
              보호법」 등 관련 법규에 따라 회원님께 아래와 같은 '수집·이용 목적,
              수집·이용 항목, 보유 및 이용기간, 거부 권리 및 불이익'에 관한
              사항을 안내 드리고 개인정보 수집·이용 동의를 받고자 합니다.
            </Textwrapper>
            <FirstContractContainer>
              <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                1. 제공에 관한 사항
              </p>
              <FirstTableContainer>
                <StyledTable>
                  <tbody>
                    <tr>
                      <TableHeader headerWidth="30%">
                        수집·이용 목적
                      </TableHeader>
                      <TableCell>
                        온보딩 로그인 및 서비스 이용을 위한 본인 확인
                      </TableCell>
                    </tr>
                    <tr>
                      <TableHeader headerWidth="30%">
                        제공받는 자의 이용 목적
                      </TableHeader>
                      <TableCell>
                        목적 달성 시 까지(단, 관련 법령에 따라 보존할 필요가
                        있는 경우는 해당 보존기간)
                      </TableCell>
                    </tr>
                    <tr>
                      <TableHeader headerWidth="30%">
                        거부 권리 및 불이익
                      </TableHeader>
                      <TableCell>
                        고객님께서는 개인정보 수집·이용 동의를 거부할 권리가
                        있습니다. 다만, 해당 필수동의 거부 시 수집·이용 목적에
                        따른 토스인증서 로그인 및 본인확인 서비스 이용이 제한될
                        수 있습니다.
                      </TableCell>
                    </tr>
                  </tbody>
                </StyledTable>
              </FirstTableContainer>
            </FirstContractContainer>
            <SecondContractContainer>
              <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                2. 수집 · 이용 및 항목
              </p>
              <SecondTableContainer>
                <StyledTable>
                  <tbody>
                    <tr>
                      <TableHeader colSpan={2}>개인정보</TableHeader>
                    </tr>
                    <tr>
                      <TableHeader headerWidth="50%">일반 개인정보</TableHeader>
                      <TableCell>성명, 생년월일, 휴대폰번호</TableCell>
                    </tr>
                    <tr>
                      <TableCell>
                        위{' '}
                        <span
                          style={{
                            fontWeight: 'bold',
                            textDecoration: 'underline',
                          }}
                        >
                          개인정보 수집·이용
                        </span>
                        에 동의하십니까?
                      </TableCell>
                      <TableCell style={{ display: 'flex' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          동의하지 않음
                          <IconWrapper onClick={handleDisagreeCheck}>
                            <Image
                              src={
                                disagreeChecked ? selectedicon : unselectedicon
                              }
                              alt="동의하지 않음 체크박스"
                            />
                          </IconWrapper>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          동의함
                          <IconWrapper onClick={handleAgreeCheck}>
                            <Image
                              src={agreeChecked ? selectedicon : unselectedicon}
                              alt="동의함 체크박스"
                            />
                          </IconWrapper>
                        </div>
                      </TableCell>
                    </tr>
                  </tbody>
                </StyledTable>
              </SecondTableContainer>
            </SecondContractContainer>
          </PageContainer>
          <NextButton onClick={handleShowContracts}>
            다음 단계로 넘어가기
          </NextButton>
        </PageWrapper>
      ) : (
        <EmailAuthPage />
      )}
    </>
  );
};

export default ContractsPage;
