import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '/public/logo_light.png';

const SloganWrapper = styled.div`
  display: flex;
  color: white;
  font-size: 18px;
  font-weight: 600;
  align-items: flex-end; 
  text-align: right;

  @media (max-width: 850px) {
    font-size: 17px;
  }

  @media (max-width: 560px) {
    font-size: 0px;
    margin-top: 10px;
  }
`;

const CaptionWrapper = styled.div`
  display: flex;
  color: white;
  font-size: 16px;
  font-weight: 100;
  margin-top: -50px;
  align-items: flex-end; 
  text-align: right;

  @media (max-width: 850px) {
    font-size: 14px;
  }

  @media (max-width: 560px) {
    font-size: 0px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 12px;
  font-weight: 100;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 850px) {
    font-size: 11px;
  }

  @media (max-width: 560px) {
    font-size: 11px;
  }
`;

const FooterWrapper = styled.div`
  width: 100%;
  height: 280px;
  padding: 50px 110px;
  background-color: rgba(50, 53, 56, 1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 1024px) {
    padding: 0 10%;
  }

  @media (max-width: 850px) {
    padding: 6% 10%;
  }

  @media (max-width: 560px) {
    padding: 12% 10%;
  }
`;

const FooterLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 170px;
`;

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  gap: 20px;
  flex-shrink: 0;
  min-width: 200px; 
  
  @media (max-width: 560px) {
    width: 300px;
    margin-left: -150px;
  }
`;



const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 100%;
`;

const FooterIconWrapper = styled.div`
  position: relative;
  width: 170px;
  height: 40px;

  @media (max-width: 850px) {
    width: 150px;
  }

  @media (max-width: 560px) {
    width: 150px;
  }
`;

const CopyWrapper = styled.div`
  font-size: 10px;
  color:rgba(149, 156, 164, 1);

  @media (max-width: 560px) {
    font-size: 0px;
  }
`

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <FooterLeft>
        <FooterIconWrapper>
          <Image
            src={Logo}
            alt="Footer Logo"
            fill
            style={{ objectFit: 'contain' }}
          />
        </FooterIconWrapper>
        <CopyWrapper>@ 2025 All Rights Reserved</CopyWrapper>
      </FooterLeft>

      <TextWrapper>
        <SloganWrapper>당신의 곁에서 성장의 순간을 함께합니다</SloganWrapper>
        <CaptionWrapper>
          나에게 딱 맞는 학습 경로를 설정하여
          <br />
          학습 컬렉션으로 배움의 여정을 쉽고 빠르게 즐겨봐요
        </CaptionWrapper>
        <MenuWrapper>
          <StyledLink
            href="https://www.instagram.com/onboarding__official?igsh=cDJqdHZwa3F0OXNv&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
          >
            인스타그램
          </StyledLink>
          <StyledLink
            href="/register/privacyContracts"
            target="_blank"
            rel="noopener noreferrer"
          >
            개인정보처리방침
          </StyledLink>
          <StyledLink
            href="/register/contracts"
            target="_blank"
            rel="noopener noreferrer"
          >
            이용약관
          </StyledLink>
          <StyledLink href="/help" target="_blank" rel="noopener noreferrer">
            도움말
          </StyledLink>
        </MenuWrapper>
      </TextWrapper>
    </FooterWrapper>
  );
};

export default Footer;

