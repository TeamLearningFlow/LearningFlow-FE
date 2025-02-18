import React,{useEffect} from 'react';
import styled from 'styled-components';
import { CompletedClass, CurrentClass, NextClass } from './learnClassIndex';
import { CollectionData } from '@/pages/collection/[collectionId]';

const ComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-height: 200px;
  overflow-y: scroll;
  margin-top: 10px;

  &::-webkit-scrollbar {
    width: 8px; /* 스크롤바의 너비 */

    @media (max-width: 850px) {
      width: 8px;
    }

    @media (max-width: 560px) {
      width: 5px;
    }
  }

  &::-webkit-scrollbar-track {
    background: #f0f0f0; /* 스크롤 트랙 색상 */
    border-radius: 10px; /* 트랙 모서리 둥글게 */
  }

  &::-webkit-scrollbar-thumb {
    background: #888; /* 스크롤바 색상 */
    border-radius: 10px; /* 스크롤바 모서리 둥글게 */
  }

  @media (max-width: 850px) {
    max-height: 200px;
    margin-bottom: 20px;
  }

  @media (max-width: 560px) {
    max-height: 150px;
    margin-bottom: 10px;
  }
`;

interface ResourceData {
  episodeId: string;
  episodeName: string;
  url: string;
  resourceSource: string;
  episodeNumber: number;
  progress: number;
}

interface ClassListProps {
  resource: ResourceData[];
  currentEpisode: number;
  collectionData: CollectionData;
}

const ClassList: React.FC<ClassListProps> = ({resource, collectionData}) => {
  
  return (
    <ComponentWrapper>
      {resource.map((classItem) => {
        if (classItem.progress >= 80) {
          return <CompletedClass key={classItem.episodeNumber} resourceItem={classItem} collectionData={collectionData} />;
        } else if (classItem.progress > 0) {
          return <CurrentClass key={classItem.episodeNumber} {...classItem} collectionData={collectionData} />;
        } else {
          return <NextClass key={classItem.episodeNumber} {...classItem} collectionData={collectionData} />;
        }
      })}
    </ComponentWrapper> 
  );
};

export default ClassList;
