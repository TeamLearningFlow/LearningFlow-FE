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
import { useQuery } from '@tanstack/react-query';
import SkeletonList from '@/components/skeleton/skeletonList_boardingPass_S';

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
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // query에 page가 없으면 기본값 1로 설정
    if (!query.page) {
      router.replace({
        pathname: '/search',
        query: { ...query, page: '1' },
      });
    }

    if (
      !query?.keyword &&
      !query?.interestFields &&
      !query?.difficulties &&
      !query?.amounts &&
      !query?.preferMediaType &&
      !query?.page
    ) {
      fetchAllResults();
    } else {
      fetchSearchResults();
    }
  }, [JSON.stringify(query)]);

  useEffect(() => {
    // page가 아닌 다른 query가 변경되면 page를 1로 리셋
    const { page, ...otherQueries } = query; // page를 제외한 query만 추출

    router.replace(
      {
        pathname: '/search',
        query: { ...otherQueries, page: '1' }, // 다른 query 유지, page만 1로 설정
      },
      undefined,
      { shallow: true },
    );
  }, [
    query.keyword,
    query.interestFields,
    query.difficulties,
    query.amounts,
    query.preferMediaType,
  ]);

  const fetchSearchResults = async () => {
    try {
      // query 객체에서 빈 값이 아닌 항목만 params로 생성
      const params = Object.fromEntries(
        Object.entries({
          keyword: query?.keyword,
          interestFields: query?.interestFields,
          difficulties: query?.difficulties,
          amounts: query?.amounts,
          preferMediaType: query?.preferMediaType,
          page: query?.page,
        }).filter(([_, value]) => value), // 빈 값('') 또는 undefined는 필터링
      );

      const response = await axios.get(`http://onboarding.p-e.kr:8080/search`, {
        params,
      });
      const data = await response.data.result;
      setSearchResult(data.searchResults);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
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

  const { isLoading } = useQuery({
    queryKey: ['searchResults'], // 캐싱 키
    queryFn: fetchSearchResults,
  });

  return (
    <SearchWrapper>
      <Header />
      <Banner />
      <div>
        <CategoryList />
        <Filters />
        {isLoading ? (
          <SkeletonList />
        ) : (
          <SearchResult
            result={searchResult}
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
        <Footer />
      </div>
    </SearchWrapper>
  );
};

export default SearchPage;
