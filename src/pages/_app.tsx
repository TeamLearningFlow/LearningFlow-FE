import React from 'react';
import type { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';
import { LoginProvider } from '../pages/context/LoginContext';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body, html {
    font-family: Pretendard;
    background-color: #fff;
    color: #333;
    overflow-x: hidden;
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      {/* LoginProvider로 컴포넌트 감싸서 상태 관리 */}
      <LoginProvider>
        <Component {...pageProps} />
      </LoginProvider>
    </>
  );
}

export default MyApp;
