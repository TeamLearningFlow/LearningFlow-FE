import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head'; // 뷰포트 설정
import { createGlobalStyle } from 'styled-components';
import { LoginProvider } from '../components/context/LoginContext';
import { LearnProvider } from '../components/context/LearnContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    max-width: 100vw;
  }

  body {
    font-family: Pretendard;
    background-color: #fff;
    color: #333;
  }

  #__next {
    width: 100%;
    max-width: 100vw;
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
      <QueryClientProvider client={queryClient}>
        <LoginProvider>
          <LearnProvider>
            <GlobalStyle />
            <Component {...pageProps} />
          </LearnProvider>
        </LoginProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
