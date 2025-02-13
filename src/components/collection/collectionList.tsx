import React from 'react';
import styled from 'styled-components';
import {
    ClassIndex,
    StartIndex,
    EndIndex,
  } from './classIndex';
import NowPlaying from './nowPlaying';
import NextClassIndex from './nextClassIndex';
import IndexLine from './indexLine';


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
  classes: 
  { episodeName: string; 
    url: string; 
    resourceSource: "youtube" | "naverBlog" | "tistory" | "velog";
    episodeNumber: number;
    progress: number; }[];
}

  const CollectionList: React.FC<CollectionListProps> = ({ classes }) => {

  return (
    <CollectionListWrapper>
      <LineWrapper>
        <IndexLine />
      </LineWrapper>
      <ListWrapper>
        <StartIndex />
        <ListContainer>
        {classes.map((classData) => {
            // 각 강의의 개별 progress를 기준으로 컴포넌트 선택
            if (classData.progress === 0) {
              return <NextClassIndex key={classData.episodeNumber} classData={classData} />;
            } else if (classData.progress >= 0.8) {
              return <ClassIndex key={classData.episodeNumber} classData={classData} />;
            } else {
              return <NowPlaying key={classData.episodeNumber} classData={classData} />;
            }
          })}
        </ListContainer>
        <EndIndex />
      </ListWrapper>
    </CollectionListWrapper>
  );
};
  
  export default CollectionList;