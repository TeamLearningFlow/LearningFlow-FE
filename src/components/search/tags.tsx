import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import CloseIcon from '../../assets/close.svg';

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
  return (
    <TagContainer>
      {tags.map((tag) => (
        <Tag key={`${tag.type}-${tag.label}`}>
          {tag.label}
          <button onClick={() => onRemove(tag.type, tag.label)}>
            <Image src={CloseIcon} alt="closeicon" width={14} height={14} />
          </button>
        </Tag>
      ))}
    </TagContainer>
  );
};

export default Tags;
