import React, { useEffect, useState } from 'react';
import Header from '../components/searchHeader';
import Banner from '../components/search/searchBanner';
import CategoryList from '../components/search/categoryList';
import Filters from '../components/search/filters';
import Pagination from '@/components/search/pagination';
import Footer from '@/components/homeFooter';
import { useRouter } from 'next/router';
import axios from 'axios';
import SearchResult from '@/components/search/searchResult';

const SearchPage: React.FC = () => {
  /* const [searchActive, setSearchActive] = useState(false); // 검색창 활성화 상태

  // 헤더 상태 업데이트 전달
  const handleSearchStateChange = (active: boolean) => {
    setSearchActive(active);
  }; */

  const router = useRouter();
  const { keyword } = router.query;
  const [searchResult, setSearchResult] = useState<[]>([]);

  useEffect(() => {
    if (keyword) {
      fetchSearchResults(keyword as string);
    }
  }, [keyword]);

  const fetchSearchResults = async (searchValue: string) => {
    try {
      const response = await axios.get(
        `http://onboarding.p-e.kr:8080/search?keyword=${encodeURIComponent(searchValue)}`,
      );
      const data = await response.data.result;
      setSearchResult(data.searchResults);
    } catch (error) {
      console.error('검색 오류:', error);
    }
  };

  return (
    <>
      <Header />
      <Banner />
      <div>
        <CategoryList />
        <Filters />
        <SearchResult result={searchResult} />
        <Pagination />
        <Footer />
      </div>
    </>
  );
};

export default SearchPage;
