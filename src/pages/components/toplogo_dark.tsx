import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import LogoDark from '../assets/logo_dark.png';

// const Container = styled.div`
//   display: flex;
//   position: absolute;
//   width: 700px;
//   height: 674px;
//   left: 0px;
//   top: 0px;
//   background-color: #323538;
// `;

const Box = styled.div`
  height: 100%;
  width: 100%;
  margin-left: 60px;
  border-radius: 10px;
  color: white;
  display: flex;
  align-items: flex-start;
  padding: 20px;
`;

const LogoContainer = styled.div`
  width: 99.5%;
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
`;

const DarkTopLogo: React.FC = () => {
  return (
    // <Container>
    <Box>
      <LogoContainer>
        <Image src={LogoDark} alt="Dark Logo" width={130} height={20} />
      </LogoContainer>
    </Box>
    // </Container>
  );
};

export default DarkTopLogo;
