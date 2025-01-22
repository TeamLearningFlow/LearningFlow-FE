import React from 'react';
import Header from './components/searchHeader';
import CategoryList from './components/categoryList';
import BoardingPass from './components/boardingPass';
import Filters from './components/filters';

const SearchPage: React.FC = () => {
  return (
    <>
      <Header />
      <CategoryList />
      <Filters />
      <BoardingPass />
    </>
  );
};

export default SearchPage;
