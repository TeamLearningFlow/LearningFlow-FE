import React from 'react';
import type { AppProps } from "next/app";
import { createGlobalStyle } from "styled-components";
import { LoginProvider } from '../pages/context/LoginContext';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Pretendard;
    background-color: #fff;
    color: #333;
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <LoginProvider>
      <GlobalStyle />
      <Component {...pageProps} />
      </LoginProvider>
    </>
  );
}

export default MyApp;
