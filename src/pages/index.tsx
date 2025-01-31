import Link from 'next/link';
import React from 'react';

const App = () => {
  return (
    <div>
      <p>
        <Link href="/login"></Link>
        <Link href="/register"></Link>
        <Link href="/search"></Link>
        <Link href="/home"></Link>
        <Link href="/emailAuth"></Link>
        <Link href="/landing"></Link>
        <Link href="/form"></Link>
        <Link href="/contracts"></Link>
        <Link href="/colllection"></Link>
      </p>
    </div>
  );
};

export default App;
