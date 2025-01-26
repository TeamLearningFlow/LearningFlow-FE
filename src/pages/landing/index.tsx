import React, { useState } from 'react';
import Page1 from './page1';
import Page2 from './page2';
import Page3 from './page3';
import styled from 'styled-components';
import TopLogo from '../../components/landingHeader';

const PageIndicator = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 80px;
`;

const Indicator = styled.div<{ active: boolean }>`
  width: 130px;
  height: 4px;
  border-radius: 100px;
  background-color: ${(props) => (props.active ? '#5e52ff' : '#dde0e4')};
`;

const LandingPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <TopLogo />
      {currentPage === 1 && <Page1 onNext={() => setCurrentPage(2)} />}{' '}
      {/* 페이지 1 */}
      {currentPage === 2 && (
        <Page2
          onPrev={() => setCurrentPage(1)}
          onNext={() => setCurrentPage(3)}
        />
      )}
      {currentPage === 3 && <Page3 onPrev={() => setCurrentPage(2)} />}
      {/* 인디케이터 */}
      <PageIndicator>
        <Indicator active={currentPage >= 1} />
        <Indicator active={currentPage >= 2} />
        <Indicator active={currentPage === 3} />
      </PageIndicator>
    </>
  );
};

export default LandingPage;
