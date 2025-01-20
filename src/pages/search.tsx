import React from 'react';
import Header from './components/searchHeader';
import CategoryList from './components/categoryList';

const SearchPage: React.FC = () => {
  return (
    <>
      <Header />
      <CategoryList />
    </>
  );
};

export default SearchPage;
