import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Prev from '../../assets/Previous.svg';
import Next from '../../assets/Next.svg';
import CompletedBoardingPass from './completedCollection';
import EmptyCompleted from '../../components/mypage/emptyCompleted';
import { CompletedCollectionData } from '@/types/types';

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

const Button = styled(Image)`
  cursor: pointer;
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

interface CompletedProps {
  completedCollections: CompletedCollectionData[];
}

const Completed: React.FC<CompletedProps> = ({ completedCollections }) => {
  const [itemsShown, setItemsShown] = useState<number>(4);
  const [hoverStates, setHoverStates] = useState<boolean[]>(
    Array(4).fill(false),
  );

  useEffect(() => {
    const updateItemsShown = () => {
      if (window.innerWidth <= 480) {
        setItemsShown(1);
      } else if (window.innerWidth <= 768) {
        setItemsShown(2);
      } else if (window.innerWidth <= 1024) {
        setItemsShown(3);
      } else {
        setItemsShown(4);
      }
      setHoverStates(Array(itemsShown).fill(false)); // 아이템 개수에 맞게 초기화
    };

    updateItemsShown();
    window.addEventListener('resize', updateItemsShown);
    return () => window.removeEventListener('resize', updateItemsShown);
  }, [itemsShown]);

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
          <Button src={Prev} alt="prev" />
          <Button src={Next} alt="next" />
        </PageButton>
      </TitleWrapper>
      <CollectionList>
        {completedCollections.length > 0 ? (
          completedCollections.slice(0, itemsShown).map((collection, index) => (
            <div
              key={collection.collectionId}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <CompletedBoardingPass
                collection={collection}
                showHoverCollection={hoverStates[index]}
              />
            </div>
          ))
        ) : (
          <EmptyCompleted />
        )}
      </CollectionList>
    </CompletedWrapper>
  );
};

export default Completed;
