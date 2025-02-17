import React from 'react';
import BoardingPassList from './boardingPassList';
import BoardingPass from './boardingPass';
import Pagination from './pagination';
import NoResult from './noResult';

export type SearchResult = {
  collectionId: number;
  imageUrl: string;
  interestField: string;
  keywords: string[];
  title: string;
  creator: string;
  difficulties: number[];
  runtime: number;
  amount: number;
  textCount: number;
  videoCount: number;
  resourceSourceTypes: string[];
  resource: {
    episodeNumber: number;
    episodeName: string;
    resourceSource: string;
    url: string;
  }[];
  likesCount: number;
  progressRatePercentage: number;
  progressRatio: string;
  learningStatus: string;
  startDate: string;
  completedDate: string;
  liked: boolean;
};

const SearchResult = ({
  result,
  totalPages,
  currentPage,
  setCurrentPage,
}: {
  result: SearchResult[];
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  if (result.length === 0) {
    return <NoResult />;
  }

  return (
    <>
      <BoardingPassList>
        {result.map((item, index) => (
          <BoardingPass key={index} data={item} showHoverCollection={true} />
        ))}
      </BoardingPassList>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default SearchResult;
