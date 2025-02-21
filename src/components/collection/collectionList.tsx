import React, { useContext, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { ClassIndex, StartIndex, EndIndex } from './classIndex';
import NowPlaying from './nowPlaying';
import NextClassIndex from './nextClassIndex';
import IndexLine from './indexLine';
import type { CollectionData } from '@/pages/collection/[collectionId]';
import { ProgressContext } from '@/components/context/ProgressContext';

const CollectionListWrapper = styled.div`
  display: flex;
  width: fit-content;
  margin-top: 20px;
  position: relative;
  height: 100%;
`;

const LineWrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 50px;
  height: calc(100% - 220px);

  @media (max-width: 850px) {
    top: 45px;
    height: calc(100% - 210px);
  }

  @media (max-width: 560px) {
    top: 30px;
    height: calc(100% - 180px);
  }
`;

const ListWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 100px;
  z-index: 2;
`;

const ListContainer = styled.div``;

interface Episode {
  episodeId: number;
  episodeName: string;
  url: string;
  resourceSource: 'youtube' | 'naverBlog' | 'tistory' | 'velog';
  episodeNumber: number;
  today: boolean;
  progress?: number; // progress가 없을 수도
}

interface MergedEpisode extends Episode {
  progress: number;
  completed: boolean;
}

interface CollectionListProps {
  collection: CollectionData;
  // 부모에서 progress 업데이트를 위한 콜백
  onProgressUpdate: (
    updatedEpisodes: {
      episodeNumber: number;
      progress: number;
      completed: boolean;
    }[],
  ) => void;
}

const CollectionList: React.FC<CollectionListProps> = ({
  collection,
  onProgressUpdate,
}) => {
  const { resource } = collection;
  const [classRound, setClassRound] = useState(1);
  const [allProgressed, setAllProgressed] = useState(false);
  const { progressByEpisode } = useContext(ProgressContext);

  // 각 에피소드에 대해 전역 progress와 localStorage를 반영한 mergedResource 생성
  const mergedResource: MergedEpisode[] = resource.map((episode: Episode) => {
    const completedFlag =
    typeof window !== 'undefined'
      ? localStorage.getItem(`completed-${episode.episodeId}`)
      : null;
    
    // 전역 상태(ProgressContext)에서 진도율을 가져옴
    const globalProgress = progressByEpisode[episode.episodeId];
    // 클라이언트(브라우저)에서 localStorage에 저장된 진도율을 가져옴
    const localProgress =
      typeof window !== 'undefined'
        ? localStorage.getItem(`progress-${episode.episodeId}`)
        : null;
    // 우선 순위: 전역 상태 > localStorage > API 원본 (null이면 0으로 처리)
    let progress =
      globalProgress !== undefined
        ? globalProgress
        : localProgress !== null
          ? Number(localProgress)
          : (episode.progress ?? 0);

          let completed = progress >= 80;
          // 수강완료 플래그가 있으면 강제로 progress 100, completed true
          if (completedFlag === 'true') {
            progress = 100;
            completed = true;
          }

    return {
      ...episode,
      progress,
      completed,
    };
  });

  useEffect(() => {
    if (mergedResource.length === 0) return;

    // 진행된 강의(progress > 0) 중에서 가장 마지막 episode 찾기
    const lastPlayedClass = mergedResource
      .filter((classData: MergedEpisode) => classData.progress > 0)
      .reduce(
        (maxEpisode, classData: MergedEpisode) =>
          Math.max(maxEpisode, classData.episodeNumber),
        1,
      );

    // 모든 강의 중에서 가장 마지막 episode 찾기
    const maxEpisodeNumber = Math.max(
      ...mergedResource.map(
        (classData: MergedEpisode) => classData.episodeNumber,
      ),
    );

    // 진행된 강의의 마지막 episode가 전체 episode 중 마지막이면 +1 적용
    if (lastPlayedClass === maxEpisodeNumber) {
      setClassRound(maxEpisodeNumber + 1);
    } else {
      setClassRound(lastPlayedClass);
    }

    const isAllProgressed = mergedResource.every(
      (classData: MergedEpisode) => classData.progress >= 80,
    );
    setAllProgressed(isAllProgressed); // 모든 강의가 진도율 80 이상일 때 상태 업데이트
  }, [mergedResource]);

  const prevProgressDataRef = useRef<
    { episodeNumber: number; progress: number; completed: boolean }[]
  >([]);

  // mergedResource 기반으로 progressData 계산 및 이전과 비교 후 업데이트 호출
  useEffect(() => {
    const progressData = mergedResource.map((episode: MergedEpisode) => ({
      episodeNumber: episode.episodeNumber,
      progress: episode.progress,
      completed: episode.completed,
    }));

    // 간단한 deep 비교 (배열 길이 및 각 항목 비교)
    const isEqual =
      prevProgressDataRef.current.length === progressData.length &&
      progressData.every((pd, index) => {
        const prev = prevProgressDataRef.current[index];
        return (
          prev &&
          prev.episodeNumber === pd.episodeNumber &&
          prev.progress === pd.progress &&
          prev.completed === pd.completed
        );
      });

    if (!isEqual) {
      onProgressUpdate(progressData);
      prevProgressDataRef.current = progressData;
      console.log(
        '각 에피소드 progress 및 completed (업데이트 후):',
        progressData,
      );
    }
  }, [mergedResource, onProgressUpdate]);

  return (
    <CollectionListWrapper>
      <LineWrapper>
        <IndexLine classRound={classRound} />
      </LineWrapper>
      <ListWrapper>
        <StartIndex />
        <ListContainer>
          {mergedResource.map((classData: MergedEpisode) => {
            if (classData.progress === 0) {
              return (
                <NextClassIndex
                  key={classData.episodeNumber}
                  classData={classData}
                  collection={collection}
                />
              );
            } else if (classData.progress >= 80) {
              return (
                <ClassIndex
                  key={classData.episodeNumber}
                  classData={classData}
                  collection={collection}
                />
              );
            } else {
              return (
                <NowPlaying
                  key={classData.episodeNumber}
                  classData={classData}
                  collection={collection}
                />
              );
            }
          })}
        </ListContainer>
        <EndIndex allProgressed={allProgressed} />
      </ListWrapper>
    </CollectionListWrapper>
  );
};

export default CollectionList;
