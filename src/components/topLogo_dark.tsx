import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import LogoDark from '../assets/logo_dark.png';

const HeaderWrapper = styled.header`
display: flex;
align-items: center;
justify-content: flex-start;
width: 100%;
height: 70px;
padding: 0 2%;
background-color: #ffffff;
`;

const LogoWrapper = styled.div`
display: flex:
align-items: center;
margin-top: 6px;
flex-shrink: 0;
margin-right: auto;
`;
 
const DarkTopLogo: React.FC = () => {
  return (
    <HeaderWrapper>
      <LogoWrapper>
        <Image src={LogoDark} alt="header logo" width={160} height={25} />
      </LogoWrapper>
    </HeaderWrapper>
  );
};

export default DarkTopLogo;
