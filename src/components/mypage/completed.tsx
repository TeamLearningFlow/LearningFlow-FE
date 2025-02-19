import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Prev from '/public/previous_myPage.svg';
import Prev_disabled from '/public/previous_disabled_myPage.svg';
import Next from '/public/next_myPage.svg';
import Next_disabled from '/public/next_disabled_myPage.svg';
import CompletedBoardingPass from './completedCollection';
import EmptyCompleted from '../../components/mypage/emptyCompleted';
import { CompletedCollectionData } from '@/types/types';
import { motion, AnimatePresence } from 'framer-motion';

const CompletedWrapper = styled.div`
  width: 1200px;
  height: 393px;

  /* 반응형 설정 */
  @media (max-width: 1024px) {
    width: 1000px;
  }

  @media (max-width: 768px) {
    width: calc(100vw - 20px); /* 모바일 화면 */
    padding: 0 10px;
  }

  @media (max-width: 480px) {
    width: calc(100vw - 10px); /* 폰 화면 */
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  margin-bottom: 24px;
`;

const Title = styled.div`
  height: 36px;
  width: 148px;
  color: #000;
  white-space: nowrap;

  /* Body/xl/SemiBold */
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 36px; /* 150% */
  letter-spacing: -0.48px;
`;

const PageButton = styled.div`
  display: flex;
  width: 54px;
  height: 18px;
  align-items: center;
  gap: 20px;
`;

const Button = styled.button`
  cursor: pointer;
  background: transparent;
  border: none;
`;

const CollectionList = styled.div`
  height: 333px;
  // width: 100%;
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(4, 1fr);

  /* 반응형 설정 */
  @media (max-width: 1024px) {
    padding: 0 20px;
    gap: 15px;
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    padding: 0 30px; /* 모바일 화면 */
    gap: 20px;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr); /* 폰 화면 */
    place-items: center;
  }
`;

const CollectionWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

interface CompletedProps {
  completedCollections: CompletedCollectionData[];
}

const Completed: React.FC<CompletedProps> = ({ completedCollections }) => {
  const [itemsShown, setItemsShown] = useState<number>(4);
  const [hoverStates, setHoverStates] = useState<boolean[]>(
    Array(4).fill(false),
  );
  const [currentPage, setCurrentPage] = useState<number>(0); // 현재 페이지 상태

  useEffect(() => {
    const updateItemsShown = () => {
      let newItemsShown = 4;
      if (window.innerWidth <= 480) {
        newItemsShown = 1;
      } else if (window.innerWidth <= 768) {
        newItemsShown = 2;
      } else if (window.innerWidth <= 1024) {
        newItemsShown = 3;
      }

      setItemsShown(newItemsShown);
      setHoverStates(Array(newItemsShown).fill(false)); // 아이템 개수 변경 시 hover 상태 초기화
      setCurrentPage(0); // 화면 크기 변경 시 첫 페이지로 리셋
    };

    updateItemsShown();
    window.addEventListener('resize', updateItemsShown);
    return () => window.removeEventListener('resize', updateItemsShown);
  }, []);

  const totalPages = Math.ceil(completedCollections.length / itemsShown);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = currentPage * itemsShown;
  const visibleCollections = completedCollections.slice(
    startIndex,
    startIndex + itemsShown,
  );

  const handleMouseEnter = (index: number) => {
    const newHoverStates = [...hoverStates];
    newHoverStates[index] = true;
    setHoverStates(newHoverStates);
  };

  const handleMouseLeave = (index: number) => {
    const newHoverStates = [...hoverStates];
    newHoverStates[index] = false;
    setHoverStates(newHoverStates);
  };

  return (
    <CompletedWrapper>
      <TitleWrapper>
        <Title>완료한 학습 컬렉션</Title>
        <PageButton>
          <Button onClick={handlePrevPage} disabled={currentPage === 0}>
            <Image src={currentPage === 0 ? Prev_disabled : Prev} alt="prev" />
          </Button>
          <Button
            onClick={handleNextPage}
            disabled={currentPage >= totalPages - 1}
          >
            <Image
              src={currentPage >= totalPages - 1 ? Next_disabled : Next}
              alt="next"
            />
          </Button>
        </PageButton>
      </TitleWrapper>

      <CollectionWrapper>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage} // 페이지 변경 시 새로운 애니메이션 적용
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              display: 'flex',
              gap: '24px',
            }}
          >
            {visibleCollections.length > 0 ? (
              visibleCollections.map((collection, index) => (
                <motion.div
                  key={collection.collectionId}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                  layout
                >
                  <CompletedBoardingPass
                    collection={collection}
                    showHoverCollection={hoverStates[index]}
                  />
                </motion.div>
              ))
            ) : (
              <EmptyCompleted />
            )}
          </motion.div>
        </AnimatePresence>
      </CollectionWrapper>
    </CompletedWrapper>
  );
};

export default Completed;
