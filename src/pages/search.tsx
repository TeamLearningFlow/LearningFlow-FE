import React from 'react';
import Header from '../components/searchHeader';
import Banner from '../components/search/searchBanner';
import CategoryList from '../components/search/categoryList';
import BoardingPass from '../components/search/boardingPass';
import Filters from '../components/search/filters';
import Pagination from '@/components/search/pagination';
import BoardingPassList from '@/components/search/boardingPassList';
import Footer from '@/components/homeFooter';

const SearchPage: React.FC = () => {
  /* const [searchActive, setSearchActive] = useState(false); // 검색창 활성화 상태

  // 헤더 상태 업데이트 전달
  const handleSearchStateChange = (active: boolean) => {
    setSearchActive(active);
  }; */

  return (
    <>
      <Header />
      <Banner />
        <div>
          <CategoryList />
          <Filters />
          <BoardingPassList>
            {Array.from({ length: 8 }).map((_, index) => (
              <BoardingPass key={index} showHoverCollection={true} />
            ))}
          </BoardingPassList>
          <Pagination />
          <Footer />
        </div>
    </>
  );
};

export default SearchPage;
