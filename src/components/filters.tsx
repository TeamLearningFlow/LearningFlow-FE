import React, { useState, useCallback } from 'react';
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
  const [tags, setTags] = useState<{ key: string; label: string }[]>([]);

  const tagOrder = ['level', 'amount', 'preference']; // 태그 순서

  // 태그 추가 또는 업데이트
  const addTag = useCallback(
    (key: string, label: string | null) => {
      setTags((prev) => {
        if (label) {
          const updatedTags = prev.filter((tag) => tag.key !== key);
          updatedTags.push({ key, label });
          return updatedTags.sort(
            (a, b) => tagOrder.indexOf(a.key) - tagOrder.indexOf(b.key),
          );
        }
        return prev.filter((tag) => tag.key !== key);
      });
    },
    [tagOrder],
  );

  // 태그 삭제
  const removeTag = useCallback((key: string) => {
    setTags((prev) => prev.filter((tag) => tag.key !== key));
  }, []);

  const hasTags = tags.length > 0;

  return (
    <FiltersContainer hasTags={hasTags}>
      <ButtonContainer>
        <LevelButton onTagChange={(label) => addTag('level', label)} />
        <AmountButton onTagChange={(label) => addTag('amount', label)} />
        <PreferButton onTagChange={(label) => addTag('preference', label)} />
      </ButtonContainer>
      {hasTags && <Tags tags={tags} removeTag={removeTag} />}
    </FiltersContainer>
  );
};

export default Filters;
