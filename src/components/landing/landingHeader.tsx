import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import LogoDark from '/public/logo_dark.png';

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

const TopLogoGuest: React.FC = () => {
  return (
    <>
      <LogoContainer>
        <LogoImage src={LogoDark} alt="Dark Logo" width={180} height={26.3} />
      </LogoContainer>
    </>
  );
};

export default TopLogoGuest;
