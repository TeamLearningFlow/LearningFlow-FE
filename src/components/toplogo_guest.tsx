import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import LogoDark from '../assets/logo_dark.png';
import Guest from '../assets/Guest.png';

const LogoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  align-items: center;
`;

const LogoImage = styled(Image)`
  margin-left: 32px;

  cursor: pointer;
`;

const GuestImage = styled(Image)`
  display: flex;
  justify-content: end;
  width: 48px;
  height: 48px;

  padding: 6px;
  margin-right: 32px;

  cursor: pointer;
`;

const TopLogoGuest: React.FC = () => {
  return (
    <>
      <LogoContainer>
        <LogoImage src={LogoDark} alt="Dark Logo" width={180} height={26.3} />
        <GuestImage src={Guest} alt="게스트 이미지" />
      </LogoContainer>
    </>
  );
};

export default TopLogoGuest;
