import React, { useState } from 'react';
import styled from 'styled-components';
import LevelButton from './levelButton';
import AmountButton from '../search/amountButton';
import PreferenceButton from './preferButton';
import Tags from './tags';

const FiltersContainer = styled.div<{ hasTags: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: ${(props) =>
    props.hasTags ? '16px 10%' : '16px 10%'}; /* 초기 상태에서 버튼을 더 위로 */
  gap: 8px;
  height: ${(props) =>
    props.hasTags ? '105px' : '65px'}; /* 태그 생성 시 버튼 위치 조정 */
  background-color: #ffffff;
  border-bottom: 1px solid #dde0e4;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
`;

type TagData = {
  type: string;
  label: string;
};

const Filters = () => {
  const [levelTags, setLevelTags] = useState<string[]>([]); // 난이도 태그
  const [amountTags, setAmountTags] = useState<string[]>([]); // 분량 태그
  const [preferTags, setPreferTags] = useState<string[]>([]); // 매체 선호도 태그

  // 모든 태그를 합쳐서 표시
  const allTags: TagData[] = [
    ...levelTags.map((label) => ({ type: '난이도', label })),
    ...amountTags.map((label) => ({ type: '분량', label })),
    ...preferTags.map((label) => ({ type: '매체 선호도', label })),
  ];

  // 세 상태 중 하나라도 태그가 있으면 hasTags를 true로 설정
  const hasTags =
    levelTags.length > 0 || amountTags.length > 0 || preferTags.length > 0;

  // 태그 삭제 이벤트
  const removeTag = (type: string, label: string) => {
    if (type === '난이도') {
      setLevelTags((prev) => prev.filter((tag) => tag !== label));
    } else if (type === '분량') {
      setAmountTags((prev) => prev.filter((tag) => tag !== label));
    } else if (type === '매체 선호도') {
      setPreferTags((prev) => prev.filter((tag) => tag !== label));
    }
  };

  return (
    <FiltersContainer hasTags={hasTags}>
      <ButtonContainer>
        <LevelButton
          onTagChange={(tags) => setLevelTags(tags)}
          selectedTags={levelTags}
        />
        <AmountButton
          onTagChange={(tags) => setAmountTags(tags)}
          selectedTags={amountTags}
        />
        <PreferenceButton
          onTagChange={(tags) => setPreferTags(tags)}
          selectedTags={preferTags}
        />
      </ButtonContainer>
      <Tags tags={allTags} onRemove={removeTag} />
    </FiltersContainer>
  );
};

export default Filters;
