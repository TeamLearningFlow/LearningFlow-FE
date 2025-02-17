import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import CloseIcon from '/public/close.svg';
import { useRouter } from 'next/router';
import {
  difficultyOptions,
  amountOptions,
  // mediaOptions,
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

  const levelTags = tags
    .filter((tag) => tag.type === '난이도')
    .map((tag) => tag.label);

  const amountTags = tags
    .filter((tag) => tag.type === '분량')
    .map((tag) => tag.label);

  const preferTags = tags
    .filter((tag) => tag.type === '매체 선호도')
    .map((tag) => tag.label);

  const handleQuery = (type: string, label: string) => {
    if (type === '난이도') {
      handleDifficultiesQuery(label);
    } else if (type === '분량') {
      handleAmountsQuery(label);
    } else if (type === '매체 선호도') {
      handlePreferMediaTypeQuery(label);
    }
  };

  const handleDifficultiesQuery = (label: string) => {
    const updatedOptions = levelTags.includes(label)
      ? levelTags.filter((tag) => tag !== label)
      : [...levelTags, label];

    const checkedDifficultyIds = updatedOptions
      .map((label) => {
        const foundOption = difficultyOptions.find(
          (option) => option.label === label,
        );
        return foundOption ? foundOption.id : undefined;
      })
      .filter((id): id is number => id !== null);

    router.push({
      pathname: '/search',
      query: {
        ...query,
        difficulties:
          checkedDifficultyIds?.length > 0
            ? checkedDifficultyIds?.join(',')
            : undefined,
      },
    });
  };

  const handleAmountsQuery = (label: string) => {
    const updatedOptions = amountTags.includes(label)
      ? amountTags.filter((tag) => tag !== label)
      : [...amountTags, label];

    const checkedAmountValues = updatedOptions
      .map((label) => {
        const foundOption = amountOptions.find(
          (option) => option.label === label,
        );
        return foundOption ? foundOption.queryValue : undefined;
      })
      .filter((queryValue): queryValue is string => queryValue !== null);

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

  const handlePreferMediaTypeQuery = (label: string) => {
    const updatedOptions = preferTags.includes(label)
      ? preferTags.filter((tag) => tag !== label)
      : [...preferTags, label];

    router.push({
      pathname: '/search',
      query: {
        ...query,
        preferMediaType: updatedOptions ? updatedOptions : undefined,
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
              handleQuery(tag.type, tag.label);
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
