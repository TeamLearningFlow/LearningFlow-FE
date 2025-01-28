import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import AllIcon from '../assets/allIcon.svg';
import AppIcon from '../assets/appIcon.svg';
import WebIcon from '../assets/webIcon.svg';
import ComputerIcon from '../assets/computerIcon.svg';
import DeepLearningIcon from '../assets/deepLearningIcon.svg';
import StatisticsIcon from '../assets/statisticsIcon.svg';
import DataIcon from '../assets/dataIcon.svg';
import UXUIIcon from '../assets/uxuiIcon.svg';
import PlanIcon from '../assets/planIcon.svg';
import WorkIcon from '../assets/workIcon.svg';
import LanguageIcon from '../assets/languageIcon.svg';
import JobIcon from '../assets/jobIcon.svg';

const CategoryListWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 5px;
  background-color: #ffffff;
`;

const CategoryItemWrapper = styled.div<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px;
  width: 60px;
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

const IconWrapper = styled.div`
  align-items: center;
  width: 25px;
  height: 25px;
  margin-top: 6px;
  position: relative;
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
  text,
  active,
  onClick,
}: {
  image: string;
  text: string;
  active?: boolean;
  onClick: () => void;
}) => {
  return (
    <CategoryItemWrapper active={active} onClick={onClick}>
      <IconWrapper>
        <Image
          src={image}
          alt={`${text} 아이콘`}
          width={25}
          height={25}
          style={{ objectFit: 'contain' }}
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
    { id: 1, image: AppIcon, text: '앱개발' },
    { id: 2, image: WebIcon, text: '웹개발' },
    { id: 3, image: ComputerIcon, text: '컴퓨터언어' },
    { id: 4, image: DeepLearningIcon, text: '딥러닝' },
    { id: 5, image: StatisticsIcon, text: '통계' },
    { id: 6, image: DataIcon, text: '데이터분석' },
    { id: 7, image: UXUIIcon, text: 'UX/UI' },
    { id: 8, image: PlanIcon, text: '기획' },
    { id: 9, image: WorkIcon, text: '업무생산성' },
    { id: 10, image: LanguageIcon, text: '외국어' },
    { id: 11, image: JobIcon, text: '취업' },
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
          text={category.text}
          active={selectedCategories.includes(category.text)} // 활성화 상태 확인
          onClick={() => handleClick(category.text)} // 클릭 이벤트 설정
        />
      ))}
    </CategoryListWrapper>
  );
};

export default ProfileCategoryList;
