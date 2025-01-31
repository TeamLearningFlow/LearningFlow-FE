import React, { useState } from 'react';
import Header from '../components/searchHeader';
import CategoryList from '../components/categoryList';
import BoardingPass from '../components/boardingPass';
import Filters from '../components/filters';
import Pagination from '@/components/pagination';

const SearchPage: React.FC = () => {
  const [searchActive, setSearchActive] = useState(false); // 검색창 활성화 상태

  // 헤더 상태 업데이트 전달
  const handleSearchStateChange = (active: boolean) => {
    setSearchActive(active);
  };

  return (
    <>
      <Header onSearchStateChange={handleSearchStateChange} />
      {searchActive && (
        <div>
          <CategoryList />
          <Filters />
          <BoardingPass showHoverCollection={true} />
          <Pagination />
        </div>
      )}
    </>
  );
};

export default SearchPage;
