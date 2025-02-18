import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
    ClassIndex,
    StartIndex,
    EndIndex,
  } from './classIndex';
import NowPlaying from './nowPlaying';
import NextClassIndex from './nextClassIndex';
import IndexLine from './indexLine';
import { CollectionData } from '@/pages/collection/[collectionId]';
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

interface CollectionListProps {
  collection: CollectionData;
}


const CollectionList: React.FC<CollectionListProps> = ({ collection }) => {
  const { resource } = collection;
  const [classRound, setClassRound] = useState(1);
  const [allProgressed, setAllProgressed] = useState(false);
  const { progressByEpisode } = useContext(ProgressContext);

  // mergedResource: 각 에피소드에 대해, 전역 progress가 있으면 반영하고 없으면 기존값 사용
  const mergedResource = resource.map((episode: any) => {
    // 먼저 전역 상태에서 progress를 가져옴
    const globalProgress = progressByEpisode[episode.episodeId];
    // 없다면 localStorage에서 가져옴
    const localProgress = localStorage.getItem(
      `progress-${episode.episodeId}`,
    );
    const progress =
      globalProgress !== undefined
        ? globalProgress
        : localProgress !== null
          ? Number(localProgress)
          : (episode.progress ?? 0);

    return {
      ...episode,
      progress,
      completed: progress >= 80, // 진도율이 80 이상이면 completed를 true로 설정
    };
  });

  useEffect(() => {
    if (mergedResource.length === 0) return;

    // 진행된 강의(progress > 0) 중에서 가장 마지막 episode 찾기
    const lastPlayedClass = mergedResource
      .filter((classData) => classData.progress > 0)
      .reduce(
        (maxEpisode, classData) =>
          Math.max(maxEpisode, classData.episodeNumber),
        1,
      );

    // 모든 강의 중에서 가장 마지막 episode 찾기
    const maxEpisodeNumber = Math.max(
      ...mergedResource.map((classData) => classData.episodeNumber),
    );

    // 진행된 강의의 마지막 episode가 전체 episode 중 마지막이면 +1 적용
    if (lastPlayedClass === maxEpisodeNumber) {
      setClassRound(maxEpisodeNumber + 1);
    } else {
      setClassRound(lastPlayedClass);
    }

    const isAllProgressed = mergedResource.every(
      (classData) => classData.progress >= 80,
    );
    setAllProgressed(isAllProgressed); // 모든 강의가 진도율 80 이상일 때, 상태 업데이트
  }, [mergedResource]);

  useEffect(() => {
    if (mergedResource && mergedResource.length > 0) {
      console.log(
        "각 에피소드 progress 및 completed (업데이트 후):",
        mergedResource.map((episode: any) => ({
          episodeNumber: episode.episodeNumber,
          progress: episode.progress,
          completed: episode.completed,
        }))
      );
      // 원본 collectionData의 resource도 업데이트하고 싶을 때
      // setCollection(prev => prev ? { ...prev, resource: mergedResource } : prev);
    }
  }, [mergedResource]);
  

  return (
    <CollectionListWrapper>
      <LineWrapper>
        <IndexLine classRound={classRound} />
      </LineWrapper>
      <ListWrapper>
        <StartIndex />
        <ListContainer>
          {mergedResource.map((classData: any) => {
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