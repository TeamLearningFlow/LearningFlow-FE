import React from 'react';
import styled from 'styled-components';
import { SkeletonClassIndex, SkeletonTextIndex, SkeletonIndexLine } from './skeleton_classIndex_M';


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


const SkeletonCollectionList: React.FC = () => {
  return (
    <CollectionListWrapper>
      <LineWrapper>
      <SkeletonIndexLine />
      </LineWrapper>
      <ListWrapper>
        <ListContainer>
            <SkeletonTextIndex />
            <SkeletonClassIndex />
            <SkeletonClassIndex />
            <SkeletonClassIndex />
            <SkeletonClassIndex />
            <SkeletonClassIndex />
            <SkeletonClassIndex />
            <SkeletonTextIndex />
        </ListContainer>
      </ListWrapper>
    </CollectionListWrapper>
  );
};
  
  export default SkeletonCollectionList;