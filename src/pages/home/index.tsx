import React, { useState } from 'react';
// import styled from 'styled-components';
import Header from '../../components/searchHeader';
import CategoryList from '@/components/search/categoryList';
import BoardingPass from '@/components/search/boardingPass';
import Filters from '@/components/search/filters';
import Pagination from '@/components/search/pagination';
import BoardingPassList from '@/components/search/boardingPassList';

import Banner from '../../components/home/homeBanner';
import Footer from '../../components/homeFooter';
import HomeCollection from '../../components/home/homeCollection';
import RecentCollection from '../../components/home/recentCollection';
// import HomeModal from '../../pages/modal/homeModal';

/*const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #ffffff;
`;

const Main = styled.div`
  text-align: center;
  padding: 20px;
`;
*/

const Home: React.FC = () => {
  /*const [isModalOpen, setIsModalOpen] = useState(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };*/

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
          <Banner />
          <RecentCollection />
          <HomeCollection />
          {/*<Wrapper>
        {isModalOpen && <HomeModal onClose={handleCloseModal} />}
        {!isModalOpen && <Main></Main>}
        </Wrapper> 
        */}
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
