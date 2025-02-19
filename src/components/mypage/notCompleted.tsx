import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Prev from '/public/previous_myPage.svg';
import Prev_disabled from '/public/previous_disabled_myPage.svg';
import Next from '/public/next_myPage.svg';
import Next_disabled from '/public/next_disabled_myPage.svg';
import EmptyLearned from '../../components/mypage/emptyLearned';
import naverBlog from '/public/platformicon/naverblog_active_ic.svg';
import tistory from '/public/platformicon/tistory_active_ic.svg';
import velog from '/public/platformicon/velog_active_ic.svg';
import youtube from '/public/platformicon/youtube_active_ic.svg';
import circle from '/public/circle.svg';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';

const NoOverflowDiv = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Container = styled.div`
  display: flex;
  width: 282px;
  height: 278px;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 16px;
  border: 0.5px solid #dde0e4;
  cursor: pointer;
`;

const CollectionImage = styled.div`
  height: 158px;
  width: 100%;
  border-radius: 16px 16px 0px 0px;
  // background: url(<path-to-image>) lightgray 50% / cover no-repeat;
  background: 'lightgray'; // 임의 지정
`;

const CollectionTitle = styled(NoOverflowDiv)`
  height: 18px;
  width: 242px;
  color: #181818;
  margin: 18px 20px 11px 20px;

  /* Body/xs/Semibold */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px; /* 150% */
  letter-spacing: -0.28px;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 242px;
  height: 31px;
  align-items: center;
  gap: 6px;
  margin: 0 20px 8px 20px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: -2px;
  flex: 1 0 0;
`;

const ContentNumber = styled.div`
  height: 15px;
  color: #959ca4;

  /* Detail/3xs/Medium */
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px; /* 150% */
  letter-spacing: -0.2px;
`;

const ContentTitle = styled(NoOverflowDiv)`
  height: 18px;
  width: 206px;
  color: #4f5357;

  /* Detail/2xs/Semibold */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px; /* 150% */
  letter-spacing: -0.24px;
`;

const ProgressWrapper = styled.div`
  width: 242px;
  margin: 0 20px 16px 20px;
`;

const ProgressBarFull = styled.div`
  height: 4px;
  width: 100%;
  background-color: #dde0e4;
  border-radius: 2px;
`;

const ProgressBar = styled.div<{ width: string }>`
  height: 100%;
  width: ${({ width }) => width || '0%'};
  background-color: #5e52ff;
  border-radius: 2px;
`;

const ProgressRate = styled.div`
  height: 12px;
  width: 242px;
  color: #959ca4;
  padding-top: 2px;

  /* Detail/8 */
  font-family: Pretendard;
  font-size: 8px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px; /* 150% */
  letter-spacing: -0.16px;
`;

const NotCompletedWrapper = styled.div`
  width: 1200px;
  height: 338px;

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
  height: 278px;
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

interface EpisodeData {
  resourceId: number;
  collectionId: number;
  collectionTitle: string;
  resourceSource: string;
  episodeNumber: number;
  episodeName: string;
  progressRatio: string;
  currentProgress: number;
  totalProgress: number;
}

const imageMap: Record<string, string> = {
  naverBlog,
  tistory,
  velog,
  youtube,
};

const CollectionItem: React.FC<{ episode: EpisodeData }> = ({ episode }) => {
  const router = useRouter();

  return (
    <Container
      onClick={() => router.push(`/collection/${episode.collectionId}`)}
    >
      <CollectionImage />
      <CollectionTitle>{episode.collectionTitle}</CollectionTitle>
      <ContentWrapper>
        <Image
          src={
            episode.resourceSource ? imageMap[episode.resourceSource] : circle
          }
          alt={episode.resourceSource}
          width={32}
          height={32}
        />
        <Content>
          <ContentNumber>{episode.episodeNumber} 회차</ContentNumber>
          <ContentTitle>{episode.episodeName}</ContentTitle>
        </Content>
      </ContentWrapper>
      <ProgressWrapper>
        <ProgressBarFull>
          <ProgressBar width={episode.progressRatio} />
        </ProgressBarFull>
        <ProgressRate>{episode.progressRatio}</ProgressRate>
      </ProgressWrapper>
    </Container>
  );
};

const NotCompleted: React.FC<{ episodes: EpisodeData[] }> = ({ episodes }) => {
  const [itemsShown, setItemsShown] = useState<number>(4);
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
      setCurrentPage(0); // 화면 크기 변경 시 첫 페이지로 리셋
    };

    updateItemsShown(); // 초기 설정
    window.addEventListener('resize', updateItemsShown);
    return () => window.removeEventListener('resize', updateItemsShown);
  }, []);

  const totalPages = Math.ceil(episodes.length / itemsShown);

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
  const visibleCollections = episodes.slice(
    startIndex,
    startIndex + itemsShown,
  );

  const validEpisodes = episodes.filter(
    (episode) =>
      episode.episodeNumber >= 1 &&
      episode.episodeNumber <= 20 &&
      [7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].includes(
        episode.collectionId,
      ),
  );

  return (
    <NotCompletedWrapper>
      <TitleWrapper>
        <Title>이어서 학습하기</Title>
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
            {validEpisodes.length > 0 ? (
              validEpisodes.slice(0, itemsShown).map((episode) => (
                <motion.div key={episode.resourceId} layout>
                  <CollectionItem episode={episode} />
                </motion.div>
              ))
            ) : (
              <EmptyLearned />
            )}
          </motion.div>
        </AnimatePresence>
      </CollectionWrapper>
    </NotCompletedWrapper>
  );
};

export default NotCompleted;
