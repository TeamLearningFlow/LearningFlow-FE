import React from 'react';
import Header from './components/searchHeader';
import CategoryList from './components/categoryList';
import BoardingPass from './components/boardingPass';

const SearchPage: React.FC = () => {
  return (
    <>
      <Header />
      <CategoryList />
      <BoardingPass />
    </>
  );
};

export default SearchPage;
