import Link from 'next/link';
import React from 'react';

const App = () => {
  return (
    <div>
      <p>
        <Link href="/login"></Link>
        <Link href="/register"></Link>
        <Link href="/emailAuth"></Link>
        <Link href="/landing"></Link>
        <Link href="/search"></Link>
        <Link href="/collection"></Link>
        <Link href="/learn"></Link>
        <Link href="/mypage"></Link>
        <Link href="/home"></Link>
        <Link href="/homeNotLogin"></Link>
        <Link href="/form"></Link>
      </p>
    </div>
  );
};

export default App;
