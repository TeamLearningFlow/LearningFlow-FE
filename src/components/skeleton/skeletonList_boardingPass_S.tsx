import React from 'react';
import Skeleton_BoardingPass_S from './skeleton_boardingPass_S';
import BoardingPassList from '../search/boardingPassList';

const SkeletonList = () => {
  return (
    <BoardingPassList>
      {[...Array(8)].map((_, index) => (
        <Skeleton_BoardingPass_S key={index} />
      ))}
    </BoardingPassList>
  );
};

export default SkeletonList;
