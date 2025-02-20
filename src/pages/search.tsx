import React, { useContext, useEffect, useState } from 'react';
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
import { LoginContext } from '@/components/context/LoginContext';
import NotLoginHeader from '@/components/notLoginHeader';

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
  const [isClient, setIsClient] = useState(false);
  const context = useContext(LoginContext);

  if (!context) {
    throw new Error('LoginContext를 찾을 수 없습니다.');
  }

  const { isLoggedIn } = context.state; // 로그인 상태

  const { query } = router;
  const [searchResult, setSearchResult] = useState<[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // query에 page 또는 sortType이 없으면 기본값 설정
    if (!query.page || !query.sortType) {
      router.replace({
        pathname: '/search',
        query: {
          ...query,
          page: query.page || '1',
          sortType: query.sortType || '0',
        },
      });
    }

    if (
      !query?.keyword &&
      !query?.interestFields &&
      !query?.difficulties &&
      !query?.amounts &&
      !query?.preferMediaType &&
      !query?.page &&
      !query?.sortType
    ) {
      fetchAllResults();
    } else {
      fetchSearchResults();
    }
  }, [JSON.stringify(query)]);

  useEffect(() => {
    // page가 아닌 다른 query가 변경되면 page를 1로 리셋
    const { page, ...otherQueries } = query; // page를 제외한 query만 추출

    console.log('현재 페이지 값:', page); // ESLint 오류 방지용
    router.replace({
      pathname: '/search',
      query: { ...otherQueries, page: '1' }, // 다른 query 유지, page만 1로 설정
    });
  }, [
    query.keyword,
    query.interestFields,
    query.difficulties,
    query.amounts,
    query.preferMediaType,
    query.sortType,
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
          sortType: query?.sortType,
        }).filter(([, value]) => value), // 빈 값('') 또는 undefined는 필터링
      );

      const token = localStorage.getItem('token');

      // 요청 헤더 설정 (token이 있으면 Authorization 추가)
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await axios.get(`https://onboarding.p-e.kr/search`, {
        params,
        headers, // 조건부 헤더 추가
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
      const token = localStorage.getItem('token');

      // 요청 헤더 설정 (token이 있으면 Authorization 추가)
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await axios.get(`https://onboarding.p-e.kr/search`, {
        headers, // 조건부 헤더 추가
      });
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

  if (!isClient) {
    return null;
  }

  return (
    <SearchWrapper>
      {isLoggedIn ? <Header /> : <NotLoginHeader />}
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
