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
  padding: ${(props) => (props.hasTags ? '18px 10%' : '18px 10%')};
  gap: 8px;
  height: ${(props) =>
    props.hasTags ? '109px' : '70px'}; /* 태그 생성 시 버튼 위치 조정 */
  background-color: #ffffff;
  border-bottom: 1px solid #dde0e4;
`;

const SectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: 480px) {
    justify-content: flex-start;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const OptionWrapper = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 480px) {
    display: none;
  }
`;

const MobileOptionWrapper = styled(OptionWrapper)`
  display: none;

  @media (max-width: 480px) {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    margin-top: 9px;
    gap: 6px;
  }
`;

const Option = styled.div<{ active: boolean }>`
  font-size: 16px;
  font-weight: 600;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
  color: ${(props) => (props.active ? '#000' : '#DDE0E4')};
  cursor: pointer;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

type TagData = {
  type: string;
  label: string;
};

const Filters = () => {
  const [levelTags, setLevelTags] = useState<string[]>([]); // 난이도 태그
  const [amountTags, setAmountTags] = useState<string[]>([]); // 분량 태그
  const [preferTags, setPreferTags] = useState<string[]>([]); // 매체 선호도 태그

  const [activeSort, setActiveSort] = useState('최신순'); // 최신, 인기순 필터

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
      <SectionContainer>
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

        <OptionWrapper>
          <Option
            active={activeSort === '최신순'}
            onClick={() => setActiveSort('최신순')}
          >
            최신순
          </Option>
          <Option
            active={activeSort === '인기순'}
            onClick={() => setActiveSort('인기순')}
          >
            인기순
          </Option>
        </OptionWrapper>
      </SectionContainer>
      <Tags tags={allTags} onRemove={removeTag} />

      {/* 반응형 */}
      <MobileOptionWrapper>
        <Option
          active={activeSort === '최신순'}
          onClick={() => setActiveSort('최신순')}
        >
          최신순
        </Option>
        <Option
          active={activeSort === '인기순'}
          onClick={() => setActiveSort('인기순')}
        >
          인기순
        </Option>
      </MobileOptionWrapper>
    </FiltersContainer>
  );
};

export default Filters;
