import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import googlelogo from '../assets/googleLogo.svg';

const Button = styled.button`
  display: flex;
  height: 50px;
  padding: 18px 8px;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: rgba(255, 255, 255, 1);
  border: 1px solid rgba(189, 197, 204, 1);
  border-radius: 6.962px;
  font-family: Roboto;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  color: rgba(50, 53, 56, 1);
  cursor: pointer;

  &:hover {
    background-color: rgba(245, 245, 245, 1);
  }
`;

const GoogleLogo = styled(Image)`
  margin-right: 10px;
  width: 20px;
  height: 20px;
`;

const GoogleAuthButton = ({ text }: { text: string }) => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;

  const handleGoogleLogin = () => {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email profile`;
    window.location.href = googleAuthUrl;
  };

  return (
    <Button onClick={handleGoogleLogin}>
      <GoogleLogo src={googlelogo} alt="google logo" />
      {text}
    </Button>
  );
};

export default GoogleAuthButton;
