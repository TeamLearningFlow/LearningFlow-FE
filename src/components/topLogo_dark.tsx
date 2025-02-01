import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import LogoDark from '../assets/logo_dark.png';

const HeaderWrapper = styled.header`
display: flex;
align-items: center;
justify-content: flex-start;
width: 100%;
height: 60px;
padding: 0 1.5%;
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
        <Image src={LogoDark} alt="header logo" width={130} height={20} />
      </LogoWrapper>
    </HeaderWrapper>
  );
};

export default DarkTopLogo;
