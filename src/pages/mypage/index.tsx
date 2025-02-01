import React, { useState } from 'react';
import Header from '@/components/searchHeader';
import CategoryList from '@/components/search/categoryList';
import BoardingPass from '@/components/search/boardingPass';
import Filters from '@/components/search/filters';
import Pagination from '@/components/search/pagination';
import BoardingPassList from '@/components/search/boardingPassList';

import ProfileBanner from '@/components/mypage/profileBanner';
import Tab from '@/components/mypage/mypageTabMenu';

const MyPage = () => {
  const [searchActive, setSearchActive] = useState(false); // 검색창 활성화 상태

  // 헤더 상태 업데이트 전달
  const handleSearchStateChange = (active: boolean) => {
    setSearchActive(active);
  };

  return (
    <>
      <Header onSearchStateChange={handleSearchStateChange} />
      {searchActive ? (
        <div>
          <CategoryList />
          <Filters />
          <BoardingPassList>
            {Array.from({ length: 8 }).map((_, index) => (
              <BoardingPass key={index} showHoverCollection={true} />
            ))}
          </BoardingPassList>
          <Pagination />
        </div>
      ) : (
        <>
          <ProfileBanner />
          <Tab />
        </>
      )}
    </>
  );
};

export default MyPage;
