import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/searchHeader';
import Banner from '../components/search/searchBanner';
import CategoryList from '../components/search/categoryList';
import Filters from '../components/search/filters';
import Footer from '@/components/homeFooter';
import { useRouter } from 'next/router';
import axios from 'axios';
import SearchResult from '@/components/search/searchResult';

const SearchWrapper = styled.div`
  background-color: #fafafc;
  width: 100%;
`;

const SearchPage: React.FC = () => {
  /* const [searchActive, setSearchActive] = useState(false); // 검색창 활성화 상태

  // 헤더 상태 업데이트 전달
  const handleSearchStateChange = (active: boolean) => {
    setSearchActive(active);
  }; */

  const router = useRouter();
  const { query } = router;
  const [searchResult, setSearchResult] = useState<[]>([]);

  useEffect(() => {
    if (!query?.keyword && !query?.interestFields) {
      fetchAllResults();
      return;
    }
    fetchSearchResults();
  }, [query?.keyword, query?.interestFields]);

  const fetchSearchResults = async () => {
    try {
      const response = await axios.get(`http://onboarding.p-e.kr:8080/search`, {
        params: {
          keyword: query?.keyword || '',
          interestFields: query?.interestFields || '',
        },
      });
      const data = await response.data.result;
      setSearchResult(data.searchResults);
    } catch (error) {
      console.error('검색 오류:', error);
    }
  };

  const fetchAllResults = async () => {
    try {
      const response = await axios.get(`http://onboarding.p-e.kr:8080/search`);
      const data = await response.data.result;
      setSearchResult(data.searchResults);
    } catch (error) {
      console.error('전체 데이터 로드 오류:', error);
    }
  };

  return (
    <SearchWrapper>
      <Header />
      <Banner />
      <div>
        <CategoryList />
        <Filters />
        <SearchResult result={searchResult} />
        <Footer />
      </div>
    </SearchWrapper>
  );
};

export default SearchPage;
