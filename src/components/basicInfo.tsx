import React from 'react';
import styled from 'styled-components';
// import InfoEmailFix from '../components/infoEmailFix';

const Section = styled.div`
  margin-bottom: 10px;
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: 600;
  line-height: 36px; /* 150% */
  letter-spacing: -0.48px;
  color: #000;
  padding: 5px 0 15px 0;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr auto;
  row-gap: 16px;
  column-gap: 20px;
  align-items: center;
`;

const InfoLabel = styled.span`
  font-size: 17px;
  font-weight: 400;
  line-height: 30px; /* 150% */
  letter-spacing: -0.4px;
  color: #000;
`;

const InfoValue = styled.span`
  font-size: 17px;
  font-weight: 600;
  line-height: 30px; /* 150% */
  letter-spacing: -0.4px;
  color: #000;
`;

const SetButton = styled.button<{ primary?: boolean }>`
  border-radius: 6px;
  border: 0.5px solid #bdc5cc;
  background: ${(props) => (props.primary ? '#5e52ff' : '#fff')};
  color: ${(props) => (props.primary ? '#fff' : '#000')};
  padding: 4px 12px;
  font-size: 14px;
  cursor: pointer;
  color: #000;
  width: auto;
  height: 30px;

  &:hover {
    background: ${(props) =>
      props.primary ? '#3C31C8' : 'rgba(118, 118, 128, 0.12)'};
  }
`;

const BasicInfo = () => {
  return (
    <Section>
      <SectionTitle>기본정보</SectionTitle>
      <InfoGrid>
        <InfoLabel>이메일</InfoLabel>
        <InfoValue>onboarding@gmail.com</InfoValue>
        <SetButton>설정</SetButton>
        <InfoLabel>비밀번호</InfoLabel>
        <InfoValue>**********</InfoValue>
        <SetButton>설정</SetButton>
      </InfoGrid>
    </Section>
  );
};

export default BasicInfo;
