import React, { useState } from 'react';
import styled from 'styled-components';
import LevelButton from './levelButton';
import AmountButton from './amountButton';
import PreferButton from './preferButton';
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

const Filters = () => {
  const [levelHasTags, setLevelHasTags] = useState(false);
  const [amountHasTags, setAmountHasTags] = useState(false);
  const [preferHasTags, setPreferHasTags] = useState(false);
  
  // 세 상태 중 하나라도 true면 hasTags true
  const hasTags = levelHasTags || amountHasTags || preferHasTags;
  return (
    <FiltersContainer hasTags={hasTags}>
      <ButtonContainer>
        <LevelButton onTagChange={setLevelHasTags} />
        <AmountButton onTagChange={setAmountHasTags} />
        <PreferButton onTagChange={setPreferHasTags} />
      </ButtonContainer>
      <Tags />
    </FiltersContainer>
  );
};
export default Filters;