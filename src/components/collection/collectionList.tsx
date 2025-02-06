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
  classes: { episodeName: string; url: string; resourceSource: string; episodeNumber: number }[];
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
          {classes.map((classData) => (
            <ClassIndex key={classData.episodeNumber} classData={classData} />
          ))}
        </ListContainer>
        <EndIndex />
      </ListWrapper>
    </CollectionListWrapper>
  );
};
  
  export default CollectionList;