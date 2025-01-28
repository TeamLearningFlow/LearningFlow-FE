import Link from 'next/link';
import React from 'react';

const App = () => {
  return (
    <div>
      <p>
        <Link href="/login"></Link>
        <Link href="/mypage"></Link>
        <Link href="/mypage/profile"></Link>
      </p>
    </div>
  );
};

export default App;
