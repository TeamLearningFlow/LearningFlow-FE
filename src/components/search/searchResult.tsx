import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BoardingPassList from './boardingPassList';
import BoardingPass from './boardingPass';

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
    return <p>검색 결과가 없습니다.</p>;
  }

  return (
    <>
      <BoardingPassList>
        {result.map((item, index) => (
          <BoardingPass key={index} data={item} showHoverCollection={true} />
        ))}
      </BoardingPassList>
    </>
  );
};

export default SearchResult;
