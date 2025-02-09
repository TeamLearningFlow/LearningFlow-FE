import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import AllIcon from '../../assets/categoryIcon/allIcon.svg';
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

import AllIconW from '../../assets/categoryIcon/allIcon_w.svg';
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
import { useRouter } from 'next/router';

const CategoryListWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 25px 10% 0 10%;
  gap: 22px;
  height: 141px;
  background-color: #ffffff;
  border-bottom: 1px solid #dde0e4;
  overflow-x: auto;
  white-space: nowrap;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #cccccc;
    border-radius: 4px;
  }
`;

const CategoryItemWrapper = styled.div<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px;
  width: 75px;
  min-width: 75px;
  height: 75px;
  background-color: ${({ active }) => (active ? '#5e52ff' : '#fafafc')};
  box-shadow: ${({ active }) =>
    active ? '1.077px 1.077px 2.154px 0px rgba(0, 0, 0, 0.25)' : 'none'};
  border: ${({ active }) => (active ? 'none' : '1px solid #f5f5ff')};
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background-color: ${({ active }) => (active ? '#5e52ff' : '#f5f5ff')};
  }
`;

const IconWrapper = styled.div<{ isHovered: boolean; active?: boolean }>`
  align-items: center;
  width: ${({ isHovered, active }) => (isHovered || active ? '34px' : '30px')};
  height: ${({ isHovered, active }) => (isHovered || active ? '34px' : '30px')};
  position: relative;
  }
`;

// 아이콘 크기 변경
const StyledImage = styled(Image)<{ isHovered: boolean; active?: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const CategoryText = styled.div<{ active?: boolean }>`
  margin-top: 4px;
  font-size: 10.9px;
  font-weight: 500;
  line-height: 21px; /* 150% */
  letter-spacing: -0.28px;
  color: ${({ active }) => (active ? '#1F1F1F' : '#64696E')};
  text-align: center;
  white-space: nowrap;
`;

const CategoryItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
    <CategoryItemContainer>
      <CategoryItemWrapper
        active={active}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        <IconWrapper isHovered={isHovered} active={active}>
          <StyledImage
            src={active ? imageW : image}
            alt={`${text} 아이콘`}
            isHovered={isHovered}
            active={active}
            // style={{ objectFit: 'contain' }}
          />
        </IconWrapper>
      </CategoryItemWrapper>
      <CategoryText active={active}>{text}</CategoryText>
    </CategoryItemContainer>
  );
};

const CategoryList = () => {
  const router = useRouter();
  const { query } = router;
  const [activeCategories, setActiveCategories] = useState<number | null>(1); // 중복 선택 불가능

  const categories = [
    { id: 1, image: AllIcon, imageW: AllIconW, text: '전체', queryString: '' },
    {
      id: 2,
      image: WebIcon,
      imageW: WebIconW,
      text: '웹개발',
      queryString: 'WEB_DEVELOPMENT',
    },
    {
      id: 3,
      image: AppIcon,
      imageW: AppIconW,
      text: '앱개발',
      queryString: 'APP_DEVELOPMENT',
    },
    {
      id: 4,
      image: ComputerIcon,
      imageW: ComputerIconW,
      text: '컴퓨터언어',
      queryString: 'PROGRAMMING_LANGUAGE',
    },
    {
      id: 5,
      image: DeepLearningIcon,
      imageW: DeepLearningIconW,
      text: '딥러닝',
      queryString: 'DEEP_LEARNING',
    },
    {
      id: 6,
      image: DataIcon,
      imageW: DataIconW,
      text: '데이터분석',
      queryString: 'DATA_ANALYSIS',
    },
    {
      id: 7,
      image: StatisticsIcon,
      imageW: StatisticsIconW,
      text: '통계',
      queryString: 'STATISTICS',
    },
    {
      id: 8,
      image: UXUIIcon,
      imageW: UXUIIconW,
      text: 'UX/UI',
      queryString: 'UI_UX',
    },
    {
      id: 9,
      image: PlanIcon,
      imageW: PlanIconW,
      text: '기획',
      queryString: 'PLANNING',
    },
    {
      id: 10,
      image: LanguageIcon,
      imageW: LanguageIconW,
      text: '외국어',
      queryString: 'FOREIGN_LANGUAGE',
    },
    {
      id: 11,
      image: JobIcon,
      imageW: JobIconW,
      text: '취업',
      queryString: 'CAREER',
    },
    {
      id: 12,
      image: WorkIcon,
      imageW: WorkIconW,
      text: '업무생산성',
      queryString: 'BUSINESS_PRODUCTIVITY',
    },
  ];

  const handleClick = (id: number) => {
    const selectedCategory = categories.find((category) => category.id === id);
    const category = activeCategories === id ? null : id; // 중복 선택 방지
    setActiveCategories(category);

    router.push({
      pathname: '/search',
      query: {
        ...query,
        interestFields: category ? selectedCategory?.queryString : undefined,
      },
    });
  };

  return (
    <CategoryListWrapper>
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          image={category.image}
          imageW={category.imageW}
          text={category.text}
          active={activeCategories === category.id} // 활성화 상태 확인
          onClick={() => handleClick(category.id)} // 클릭 이벤트 설정
        />
      ))}
    </CategoryListWrapper>
  );
};

export default CategoryList;
