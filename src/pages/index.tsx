import Link from 'next/link';
import React from 'react';

const App = () => {
  return (
    <div>
      <p>
        <Link href="/login"></Link>
        <Link href="/mypage"></Link>
        <Link href="/mypage/profile"></Link>
        <Link href="/register"></Link>
        <Link href="/search"></Link>
        <Link href="/home"></Link>
        <Link href="/emailAuth"></Link>
        <Link href="/landing"></Link>
        <Link href="/form"></Link>
        <Link href="/contracts"></Link>
        <Link href="/colllection"></Link>
        <Link href="/learn"></Link>
      </p>
    </div>
  );
};

export default App;
