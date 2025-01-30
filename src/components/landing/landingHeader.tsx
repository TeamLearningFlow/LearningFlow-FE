import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import LogoDark from '../../assets/logo_dark.png';
import Guest from '../../assets/Guest.svg';

const LogoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 75px;
  align-items: center;
  padding: 0 30px;
`;

const LogoImage = styled(Image)`
  cursor: pointer;
`;

const GuestImage = styled(Image)`
  display: flex;
  justify-content: end;
  width: 40px;
  height: 40px;
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
