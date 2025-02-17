import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import prevpage from '/public/prevPage.svg';
import prevpage_disabled from '/public/prevPage_disabled.svg';
import nextpage from '/public/nextPage.svg';
import nextpage_disabled from '/public/nextPage_disabled.svg';
import { useRouter } from 'next/router';

const PageButtonWrapper = styled.div`
  margin-bottom: 32px;
  gap: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageButton = styled.button<{ isClicked?: boolean; disabled: boolean }>`
  height: 32px;
  width: 32px;
  background-color: ${(props) => (props.isClicked ? '#5E52FF' : '#FAFAFC')};
  color: ${(props) =>
    props.disabled ? '#DDE0E4' : props.isClicked ? '#fff' : '#4F5357'};
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

const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
}: {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const router = useRouter();
  const { query } = router;

  const pushQuery = (queryValue: number | null) => {
    router.push({
      pathname: '/search',
      query: {
        ...query,
        page: queryValue ? queryValue : null,
      },
    });
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
        <MovingPageButton
          onClick={() => {
            handlePrevPage();
            pushQuery(currentPage - 1);
          }}
          disabled={currentPage === 1}
        >
          <Image src={prevpageicon} alt={prevpageAltText} />
        </MovingPageButton>

        {Array.from({ length: pagesPerView }, (_, index) => (
          <PageButton
            key={startPage + index}
            onClick={() => {
              setCurrentPage(startPage + index);
              pushQuery(startPage + index);
              window.scrollTo(0, 0);
            }}
            isClicked={currentPage === startPage + index}
            disabled={startPage + index > totalPages}
          >
            {startPage + index}
          </PageButton>
        ))}

        <MovingPageButton
          onClick={() => {
            handleNextPage();
            pushQuery(currentPage + 1);
          }}
          disabled={currentPage === totalPages}
        >
          <Image src={nextpageicon} alt={nextpageAltText} />
        </MovingPageButton>
      </PageButtonWrapper>
    </>
  );
};

export default Pagination;
