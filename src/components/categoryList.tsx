import React, { useState } from 'react';
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
  padding: 20px 0 0 10%;
  gap: 20px;
  height: 110px;
  background-color: #ffffff;
  border-bottom: 1px solid #dde0e4;
`;

const CategoryItemWrapper = styled.div<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px;
  width: 70px;
  height: 70px;
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
  margin-top: 4px;
  font-size: 10.9px;
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

const CategoryList = () => {
  const [activeCategories, setActiveCategories] = useState<number[]>([]); // 활성화된 카테고리 ID 추적

  const categories = [
    { id: 1, image: AllIcon, text: '전체' },
    { id: 2, image: AppIcon, text: '앱개발' },
    { id: 3, image: WebIcon, text: '웹개발' },
    { id: 4, image: ComputerIcon, text: '컴퓨터언어' },
    { id: 5, image: DeepLearningIcon, text: '딥러닝' },
    { id: 6, image: StatisticsIcon, text: '통계' },
    { id: 7, image: DataIcon, text: '데이터분석' },
    { id: 8, image: UXUIIcon, text: 'UX/UI' },
    { id: 9, image: PlanIcon, text: '기획' },
    { id: 10, image: WorkIcon, text: '업무생산성' },
    { id: 11, image: LanguageIcon, text: '외국어' },
    { id: 12, image: JobIcon, text: '취업' },
  ];

  const handleClick = (id: number) => {
    setActiveCategories((prev) =>
      prev.includes(id)
        ? prev.filter((categoryId) => categoryId !== id)
        : [...prev, id],
    ); // 카테고리 클릭 시 활성화 또는 비활성화
  };

  return (
    <CategoryListWrapper>
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          image={category.image}
          text={category.text}
          active={activeCategories.includes(category.id)} // 활성화 상태 확인
          onClick={() => handleClick(category.id)} // 클릭 이벤트 설정
        />
      ))}
    </CategoryListWrapper>
  );
};

export default CategoryList;
