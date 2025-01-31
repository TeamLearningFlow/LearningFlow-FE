import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head'; // 뷰포트 설정
import { createGlobalStyle } from 'styled-components';
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
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <LoginProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </LoginProvider>
    </>
  );
}

export default MyApp;
