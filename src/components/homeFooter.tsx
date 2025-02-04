import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../assets/logo_light.png';


const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  gap: 20px;
`;

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
    font-size: 14px;
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
    font-size: 17px;
  }

  @media (max-width: 560px) {
    font-size: 14px;
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

  @media (max-width: 560px) {
    font-size: 10px;
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

  @media (max-width: 1024px) {
    padding: 0 10%;
  }

  @media (max-width: 768px) {
    padding: 0;
  }

  @media (max-width: 560px) {
    padding: 0 2%;
  }
`;

const FooterLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
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
    width: 100px;
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <FooterLeft>
      <FooterIconWrapper>
        <Image src={Logo} alt="Footer Logo" fill style={{ objectFit: 'contain' }} />
      </FooterIconWrapper>
      <p style={{fontSize: '10px', color:'rgba(149, 156, 164, 1)'}}>© 2025 All Rights Reserved</p>
      </FooterLeft>

      <TextWrapper>
        <SloganWrapper>서비스 슬로건</SloganWrapper>
        <CaptionWrapper>
          정리된 학습 컬렉션으로 배움의 여정을 쉽고 빠르게!<br />
          코멘트에 대한 설명을 추가 설명을 적어주세요.
        </CaptionWrapper>
        <MenuWrapper>
          <StyledLink href="/register/contracts" target="_blank" rel="noopener noreferrer">
            개인정보처리방침
          </StyledLink>
          <StyledLink href="/register/contracts" target="_blank" rel="noopener noreferrer">
            이용약관
          </StyledLink>
          <StyledLink href="/register/contracts" target="_blank" rel="noopener noreferrer">
            도움말
          </StyledLink>
          <StyledLink href="/register/contracts" target="_blank" rel="noopener noreferrer">
            인스타그램
          </StyledLink>
        </MenuWrapper>
      </TextWrapper>
    </FooterWrapper>
  );
};

export default Footer;

