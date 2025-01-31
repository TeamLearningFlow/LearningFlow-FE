import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import FooterIcon from '../assets/footerIcon.svg';

const FooterWrapper = styled.div`
  width: 100%;
  height: 180px;
  padding: 0 10%;
  background-color: rgba(50, 53, 56, 1);
  display: flex;
  align-items: center;
  justify-content: center;

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

const TextWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  gap: 8px;
`;

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  gap: 20px;
`;

const SloganWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  margin-bottom: 8px;

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
  font-size: 14px;
  cursor: pointer;

  &:hover {
    text-decoration: underline; /* hover 시 밑줄 효과 */
  }

  @media (max-width: 560px) {
    font-size: 10px;
  }
`;

const FooterIconWrapper = styled.div`
  position: relative;
  margin-top: 10px;
  width: 150px;
  height: 25px;

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
      <TextWrapper>
        <SloganWrapper>당신의 학습 여정을 함께하다</SloganWrapper>
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
            문의하기
          </StyledLink>
        </MenuWrapper>
        <FooterIconWrapper>
          <Image 
          src={FooterIcon} 
          alt="Footer Icon" 
          fill style={{ objectFit: 'contain' }} />
        </FooterIconWrapper>
        <StyledLink href="/register/contracts" target="_blank" rel="noopener noreferrer">
          인스타그램
        </StyledLink>
      </TextWrapper>
    </FooterWrapper>
  );
};

export default Footer;
