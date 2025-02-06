import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import AppIcon from '../../assets/categoryIcon/appIcon.svg';
import WebIcon from '../../assets/categoryIcon/webIcon.svg';
import ComputerIcon from '../../assets/categoryIcon/computerIcon.svg';
import DeepLearningIcon from '../../assets/categoryIcon/deepLearningIcon.svg';
import StatisticsIcon from '../../assets/categoryIcon/statisticsIcon.svg';
import DataIcon from '../../assets/categoryIcon/dataIcon.svg';
import UXUIIcon from '../../assets/categoryIcon/uxuiIcon.svg';
import PlanIcon from '../../assets/categoryIcon/planIcon.svg';
import WorkIcon from '../../assets/categoryIcon/workIcon.svg';
import LanguageIcon from '../../assets/categoryIcon/languageIcon.svg';
import JobIcon from '../../assets/categoryIcon/jobIcon.svg';

import AppIconW from '../../assets/categoryIcon/appIcon_w.svg';
import WebIconW from '../../assets/categoryIcon/webIcon_w.svg';
import ComputerIconW from '../../assets/categoryIcon/computerIcon_w.svg';
import DeepLearningIconW from '../../assets/categoryIcon/deepLearningIcon_w.svg';
import StatisticsIconW from '../../assets/categoryIcon/statisticsIcon_w.svg';
import DataIconW from '../../assets/categoryIcon/dataIcon_w.svg';
import UXUIIconW from '../../assets/categoryIcon/uxuiIcon_w.svg';
import PlanIconW from '../../assets/categoryIcon/planIcon_w.svg';
import WorkIconW from '../../assets/categoryIcon/workIcon_w.svg';
import LanguageIconW from '../../assets/categoryIcon/languageIcon_w.svg';
import JobIconW from '../../assets/categoryIcon/jobIcon_w.svg';

const CategoryListWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 5px;
  background-color: #ffffff;
  overflow-x: auto;
  white-space: nowrap;
  padding-bottom: 5px;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #cccccc;
    border-radius: 4px;
  }

  scrollbar-gutter: stable;
`;

const CategoryItemWrapper = styled.div<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px;
  width: 60px;
  min-width: 60px;
  height: 60px;
  background-color: ${({ active }) => (active ? '#5e52ff' : '#fafafc')};
  box-shadow: ${({ active }) =>
    active ? '1.077px 1.077px 2.154px 0px rgba(0, 0, 0, 0.25)' : 'none'};
  border: none;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background-color: ${({ active }) => (active ? '#5e52ff' : '#f5f5ff')};
  }
`;

const IconWrapper = styled.div<{ isHovered: boolean }>`
  align-items: center;
  width: ${({ isHovered }) => (isHovered ? '27px' : '25px')};
  height: ${({ isHovered }) => (isHovered ? '27px' : '25px')};
  margin-top: 6px;
  position: relative;
`;

// 아이콘 크기 변경
const StyledImage = styled(Image)<{ isHovered: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const CategoryText = styled.div<{ active?: boolean }>`
  font-size: 8.5px;
  font-weight: 500;
  line-height: 21px; /* 150% */
  letter-spacing: -0.28px;
  color: ${({ active }) => (active ? '#ffffff' : '#4f5357')};
  text-align: center;
`;

const CategoryItem = ({
  image,
  imageW,
  text,
  active,
  onClick,
}: {
  image: string;
  imageW: string;
  text: string;
  active?: boolean;
  onClick: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <CategoryItemWrapper
      active={active}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <IconWrapper isHovered={isHovered}>
        <StyledImage
          src={active ? imageW : image}
          alt={`${text} 아이콘`}
          isHovered={isHovered}
        />
      </IconWrapper>
      <CategoryText active={active}>{text}</CategoryText>
    </CategoryItemWrapper>
  );
};

const ProfileCategoryList = ({
  selectedCategories,
  onChange,
}: {
  selectedCategories: string[];
  onChange: (newSelected: string[]) => void;
}) => {
  const categories = [
    // { id: 1, image: AllIcon, imageW: AllIconW, text: '전체' },
    { id: 2, image: WebIcon, imageW: WebIconW, text: '웹개발' },
    { id: 3, image: AppIcon, imageW: AppIconW, text: '앱개발' },
    { id: 4, image: ComputerIcon, imageW: ComputerIconW, text: '컴퓨터언어' },
    {
      id: 5,
      image: DeepLearningIcon,
      imageW: DeepLearningIconW,
      text: '딥러닝',
    },
    { id: 6, image: DataIcon, imageW: DataIconW, text: '데이터분석' },
    { id: 7, image: StatisticsIcon, imageW: StatisticsIconW, text: '통계' },
    { id: 8, image: UXUIIcon, imageW: UXUIIconW, text: 'UX/UI' },
    { id: 9, image: PlanIcon, imageW: PlanIconW, text: '기획' },
    { id: 10, image: LanguageIcon, imageW: LanguageIconW, text: '외국어' },
    { id: 11, image: JobIcon, imageW: JobIconW, text: '취업' },
    { id: 12, image: WorkIcon, imageW: WorkIconW, text: '업무생산성' },
  ];

  const handleClick = (categoryText: string) => {
    if (selectedCategories.includes(categoryText)) {
      // 이미 선택된 경우 선택 해제
      const updatedCategories = selectedCategories.filter(
        (text) => text !== categoryText,
      );
      onChange(updatedCategories);
    } else {
      // 새로운 카테고리 최대 3개까지 가능
      if (selectedCategories.length < 3) {
        onChange([...selectedCategories, categoryText]);
      }
    }
  };

  return (
    <CategoryListWrapper>
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          image={category.image}
          imageW={category.imageW}
          text={category.text}
          active={selectedCategories.includes(category.text)} // 활성화 상태 확인
          onClick={() => handleClick(category.text)} // 클릭 이벤트 설정
        />
      ))}
    </CategoryListWrapper>
  );
};

export default ProfileCategoryList;
