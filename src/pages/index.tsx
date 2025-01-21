import Link from 'next/link';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './home';
import SignupPage from './signup';
import LoginPage from './login';
import SearchPage from './search';

const App = () => {
  return (
    // <div>
    //   <p>
    //     <Link href="/login"></Link>
    //     <Link href="/signup"></Link>
    //     <Link href="/search"></Link>
    //   </p>
    // </div>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
};

export default App;
