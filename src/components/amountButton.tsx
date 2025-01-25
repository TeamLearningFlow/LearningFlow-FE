import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import ChevronDown from '../assets/chevronDown.svg';

// 타입 정의
type Option = {
  label: string;
  description: string;
};

// filters.tsx에 전달
type DropdownProps = {
  onTagChange: (label: string | null) => void;
};

const DropdownContainer = styled.div<{ hasTags: boolean }>`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button<{ isOpen: boolean; hasTags: boolean }>`
  background: #ffffff;
  border: ${(props) =>
    props.hasTags || props.isOpen ? '1px solid #5E52FF' : '1px solid #dde0e4'};
  border-radius: 6px;
  height: 33px;
  width: 70px;
  font-size: 13px;
  font-weight: 500;
  line-height: 21px; /* 150% */
  letter-spacing: -0.28px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #1f1f1f;

  &:focus {
    outline: none;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  margin-top: 4px;
  background: #ffffff;
  border: 1px solid #dde0e4;
  border-radius: 8px;
  padding: 12px;
  list-style: none;
  width: 128px;
  z-index: 100;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 150% */
  letter-spacing: -0.32px;
`;

const DropdownItem = styled.li`
  padding: 7px 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
    border-radius: 8px;
  }

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: -1px;
  }
`;

const Checkbox = styled.input`
  accent-color: #5e52ff;
  margin-top: -24px;
`;

const AmountButton: React.FC<DropdownProps> = ({ onTagChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Option | null>(null);

  const options: Option[] = [
    { label: '짧아요', description: '1 - 5 회차' },
    { label: '적당해요', description: '5 - 10 회차' },
    { label: '많아요', description: '11 회차 이상' },
  ];

  const toggleOption = (option: Option) => {
    if (selectedOptions?.label === option.label) {
      setSelectedOptions(null); // 같은 옵션 클릭 시 선택 해제
    } else {
      setSelectedOptions(option); // 옵션 선택
    }
  };

  useEffect(() => {
    onTagChange(selectedOptions ? selectedOptions.label : null); // 부모로 선택값 전달
  }, [selectedOptions, onTagChange]);

  return (
    <DropdownContainer hasTags={!!selectedOptions}>
      <DropdownButton
        isOpen={isOpen}
        hasTags={!!selectedOptions}
        onClick={() => setIsOpen(!isOpen)}
      >
        분량
        <Image src={ChevronDown} alt="chevrondown" />
      </DropdownButton>
      {isOpen && (
        <DropdownMenu>
          {options.map((option, index) => (
            <DropdownItem key={index}>
              <Checkbox
                type="checkbox"
                checked={selectedOptions?.label === option.label}
                onChange={() => toggleOption(option)}
              />
              <div>
                <div>{option.label}</div>
                <div style={{ fontSize: '12px', color: '#959CA4' }}>
                  {option.description}
                </div>
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

export default AmountButton;
