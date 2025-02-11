import React, { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import LeftIcon from '../../assets/leftIcon.svg';

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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 25px;
  font-weight: 600;
  line-height: 48px; /* 150% */
  letter-spacing: -0.64px;
`;

const SubTitle = styled.p`
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  line-height: 27px; /* 150% */
  letter-spacing: -0.36px;
  color: #64696e;
  margin-top: -10px;
`;

const CategoryListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  gap: 16px;
  padding: 20px 16px;
  align-items: center;
  background-color: #ffffff;
`;

const CategoryItemWrapper = styled.div<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px;
  width: 80px;
  height: 80px;
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
  margin-top: 6px;
  position: relative;
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
  color: ${({ active }) => (active ? '#ffffff' : '#64696E')};
  text-align: center;
  white-space: nowrap;
`;

const NavButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 400px;
  margin-top: 20px;
  margin-bottom: 28px;
`;

const LeftButton = styled.div`
  cursor: pointer;
  &:hover img {
    content: url(${LeftIcon});
  }
`;

const NextButton = styled.button<{ active: boolean }>`
  width: 68px;
  height: 33px;
  font-size: 13px;
  color: #ffffff;
  background-color: ${(props) => (props.active ? '#5e52ff' : '#dde0e4')};
  border: none;
  border-radius: 8px;
  cursor: ${(props) => (props.active ? 'pointer' : 'not-allowed')};
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
      <IconWrapper isHovered={isHovered} active={active}>
        <StyledImage
          src={active ? imageW : image}
          alt={`${text} 아이콘`}
          isHovered={isHovered}
          active={active}
        />
      </IconWrapper>
      <CategoryText active={active}>{text}</CategoryText>
    </CategoryItemWrapper>
  );
};

const Page2: React.FC<{
  nickname: string;
  onPrev: () => void;
  onNext: (interestFields: string[]) => void;
}> = ({ nickname, onPrev, onNext }) => {
  const [activeCategories, setActiveCategories] = useState<number[]>([]); // 활성화된 카테고리 ID 추적

  const categories = [
    {
      id: 1,
      image: WebIcon,
      imageW: WebIconW,
      text: '웹개발',
      value: 'WEB_DEVELOPMENT',
    },
    {
      id: 2,
      image: AppIcon,
      imageW: AppIconW,
      text: '앱개발',
      value: 'APP_DEVELOPMENT',
    },
    {
      id: 3,
      image: ComputerIcon,
      imageW: ComputerIconW,
      text: '컴퓨터언어',
      value: 'PROGRAMMING_LANGUAGE',
    },
    {
      id: 4,
      image: DeepLearningIcon,
      imageW: DeepLearningIconW,
      text: '딥러닝',
      value: 'DEEP_LEARNING',
    },
    {
      id: 5,
      image: DataIcon,
      imageW: DataIconW,
      text: '데이터분석',
      value: 'DATA_ANALYSIS',
    },
    {
      id: 6,
      image: StatisticsIcon,
      imageW: StatisticsIconW,
      text: '통계',
      value: 'STATISTICS',
    },
    {
      id: 7,
      image: UXUIIcon,
      imageW: UXUIIconW,
      text: 'UX/UI',
      value: 'UI_UX',
    },
    {
      id: 8,
      image: PlanIcon,
      imageW: PlanIconW,
      text: '기획',
      value: 'PLANNING',
    },
    {
      id: 9,
      image: LanguageIcon,
      imageW: LanguageIconW,
      text: '외국어',
      value: 'FOREIGN_LANGUAGE',
    },
    { id: 10, image: JobIcon, imageW: JobIconW, text: '취업', value: 'CAREER' },
    {
      id: 11,
      image: WorkIcon,
      imageW: WorkIconW,
      text: '업무생산성',
      value: 'BUSINESS_PRODUCTIVITY',
    },
  ];

  const handleCategoryClick = (id: number) => {
    setActiveCategories(
      (prev) =>
        prev.includes(id)
          ? prev.filter((categoryId) => categoryId !== id) // 선택 해제
          : prev.length < 3
            ? [...prev, id] // 선택 추가 (최대 3개)
            : prev, // 3개 초과 시 무시
    );
  };

  // 부모에게 선택된 카테고리 value 값 전달
  const selectedCategories = activeCategories.map(
    (id) => categories.find((category) => category.id === id)?.value || '',
  );

  const isNextButtonActive = activeCategories.length > 0; // 다음 버튼 활성화 조건

  return (
    <Content>
      <Title>{nickname}님의 관심 분야를 알려주세요</Title>
      <SubTitle>최대 3개 관심분야에 어울리는 컬렉션을 소개해드릴게요</SubTitle>
      <CategoryListWrapper>
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            image={category.image}
            imageW={category.imageW}
            text={category.text}
            active={activeCategories.includes(category.id)}
            onClick={() => handleCategoryClick(category.id)}
          />
        ))}
      </CategoryListWrapper>
      <NavButtons>
        <LeftButton onClick={onPrev}>
          <Image src={LeftIcon} alt="이전" width={23} height={23} />
        </LeftButton>
        <NextButton
          active={isNextButtonActive}
          onClick={() => {
            if (isNextButtonActive) {
              onNext(selectedCategories); // 다음 페이지로 이동
            }
          }}
        >
          다음
        </NextButton>
      </NavButtons>
    </Content>
  );
};

export default Page2;
