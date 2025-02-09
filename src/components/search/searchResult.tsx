import React from 'react';
import BoardingPassList from './boardingPassList';
import BoardingPass from './boardingPass';
import Pagination from './pagination';
import NoResult from './noResult';

export type SearchResult = {
  interestField: string;
  keywords: string[];
  title: string;
  creator: string;
  difficulties: number[];
  runtime: string; // number로 할 수도 있음
  amount: number;
  textCount: number;
  videoCount: number;
  resource: {
    episodeNumber: number;
    episodeName: string;
    resourceSource: string;
    url: string;
  }[];
};

const SearchResult = ({ result }: { result: SearchResult[] }) => {
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
      <Pagination />
    </>
  );
};

export default SearchResult;
