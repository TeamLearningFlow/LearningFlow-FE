import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import CloseIcon from '../../assets/close.svg';
import { useRouter } from 'next/router';
import {
  difficultyOptions,
  amountOptions,
  mediaOptions,
} from './filterOptions';

const TagContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;
`;

const Tag = styled.div`
  background: #f5f5ff;
  color: #5e52ff;
  height: 33px;
  border-radius: 100px;
  padding: 0 14px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 500;
  line-height: 21px;
  white-space: nowrap;

  & > button {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
`;

type TagData = {
  type: string; // 버튼 유형
  label: string; // 태그 이름
};

type TagsProps = {
  tags: TagData[];
  onRemove: (type: string, label: string) => void; // 태그 삭제
};

const Tags: React.FC<TagsProps> = ({ tags, onRemove }) => {
  const router = useRouter();
  const { query } = router;

  const levelTags: string[] = []; // 난이도 태그
  const amountTags: string[] = []; // 분량 태그
  const preferTags: string = ''; // 매체 선호도 태그

  const checkedLevelIds = levelTags
    .map((label) => {
      const foundOption = difficultyOptions.find(
        (option) => option.label === label,
      );
      return foundOption ? foundOption.id : null;
    })
    .filter((id): id is number => id !== null);

  const checkedAmountValues = amountTags
    .map((label) => {
      const foundOption = amountOptions.find(
        (option) => option.label === label,
      );
      return foundOption ? foundOption.queryValue : null;
    })
    .filter((queryValue): queryValue is string => queryValue !== null);

  const foundOption = mediaOptions.find(
    (option) => option.label === preferTags,
  );
  const selectedMediaType = foundOption ? foundOption.id : null;

  const handleQuery = (type: string) => {
    if (type === '난이도') {
      handleDifficultiesQuery();
    } else if (type === '분량') {
      handleAmountsQuery();
    } else if (type === '매체 선호도') {
      handlePreferMediaTypeQuery();
    }
  };
  const handleDifficultiesQuery = () => {
    router.push({
      pathname: '/search',
      query: {
        ...query,
        difficulties:
          checkedLevelIds?.length > 0 ? checkedLevelIds?.join(',') : null,
      },
    });
  };

  const handleAmountsQuery = () => {
    router.push({
      pathname: '/search',
      query: {
        ...query,
        amounts:
          checkedAmountValues?.length > 0
            ? checkedAmountValues?.join(',')
            : undefined,
      },
    });
  };

  const handlePreferMediaTypeQuery = () => {
    router.push({
      pathname: '/search',
      query: {
        ...query,
        preferMediaType: selectedMediaType ? selectedMediaType : null,
      },
    });
  };

  return (
    <TagContainer>
      {tags.map((tag) => (
        <Tag key={`${tag.type}-${tag.label}`}>
          {tag.label}
          <button
            onClick={() => {
              onRemove(tag.type, tag.label);
              handleQuery(tag.type);
            }}
          >
            <Image src={CloseIcon} alt="closeicon" width={14} height={14} />
          </button>
        </Tag>
      ))}
    </TagContainer>
  );
};

export default Tags;
