import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
// import axios from 'axios';
import prevpage from '../assets/prevPage.svg';
import prevpage_disabled from '../assets/prevpage_disabled.svg';
import nextpage from '../assets/nextPage.svg';
import nextpage_disabled from '../assets/nextPage_disabled.svg';

const PageButtonWrapper = styled.div`
  margin-bottom: 32px;
  gap: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageButton = styled.button<{ isClicked?: boolean }>`
  height: 32px;
  width: 32px;
  background-color: ${(props) => (props.isClicked ? '#5E52FF' : '#FAFAFC')};
  color: ${(props) => (props.isClicked ? '#fff' : '#4F5357')};

  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #dde0e4;
  padding: 5px 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  /* Body/xs/Medium */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px; /* 150% */
  letter-spacing: -0.28px;

  &: hover {
    background-color: ${(props) => (props.isClicked ? '#5E52FF' : '#ECEEF0')};
  }
`;

const MovingPageButton = styled(PageButton)``;

const Pagination: React.FC = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchTotalPageData();
  }, []);

  const fetchTotalPageData = async () => {
    try {
      // const response = await axios.get(`http://localhost:3000/result`);
      // console.log('total page:', response.data.totalPages);
      // setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const pagesPerView = 3; // 한 번에 보여줄 페이지 수

  // 페이지 그룹 중 첫 페이지 구하기
  const startPage =
    Math.floor((currentPage - 1) / pagesPerView) * pagesPerView + 1;

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
    window.scrollTo(0, 0);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    window.scrollTo(0, 0);
  };

  const prevpageicon = currentPage === 1 ? prevpage_disabled : prevpage;
  const prevpageAltText =
    currentPage === 1 ? 'prev page disabled' : 'prev page';
  const nextpageicon =
    currentPage === totalPages ? nextpage_disabled : nextpage;
  const nextpageAltText =
    currentPage === totalPages ? 'next page disabled' : 'next page';

  return (
    <>
      <PageButtonWrapper>
        <MovingPageButton onClick={handlePrevPage} disabled={currentPage === 1}>
          <Image src={prevpageicon} alt={prevpageAltText} />
        </MovingPageButton>

        {Array.from({ length: pagesPerView }, (_, index) => (
          <PageButton
            key={startPage + index}
            onClick={() => {
              setCurrentPage(startPage + index);
            }}
            isClicked={currentPage === startPage + index}
          >
            {startPage + index}
          </PageButton>
        ))}

        <MovingPageButton
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <Image src={nextpageicon} alt={nextpageAltText} />
        </MovingPageButton>
      </PageButtonWrapper>
    </>
  );
};

export default Pagination;
