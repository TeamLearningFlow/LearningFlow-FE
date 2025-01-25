import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import CloseIcon from '../assets/close.svg';

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

type TagsProps = {
  tags: { key: string; label: string }[];
  removeTag: (key: string) => void;
};

const Tags: React.FC<TagsProps> = ({ tags, removeTag }) => {
  return (
    <TagContainer>
      {tags.map((tag) => (
        <Tag key={tag.key}>
          {tag.label}
          <button onClick={() => removeTag(tag.key)}>
            <Image src={CloseIcon} alt="close" width={14} height={14} />
          </button>
        </Tag>
      ))}
    </TagContainer>
  );
};

export default Tags;
