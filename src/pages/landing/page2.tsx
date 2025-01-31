import React, { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import AppIcon from '../../assets/appIcon.svg';
import WebIcon from '../../assets/webIcon.svg';
import ComputerIcon from '../../assets/computerIcon.svg';
import DeepLearningIcon from '../../assets/deepLearningIcon.svg';
import StatisticsIcon from '../../assets/statisticsIcon.svg';
import DataIcon from '../../assets/dataIcon.svg';
import UXUIIcon from '../../assets/uxuiIcon.svg';
import PlanIcon from '../../assets/planIcon.svg';
import WorkIcon from '../../assets/workIcon.svg';
import LanguageIcon from '../../assets/languageIcon.svg';
import JobIcon from '../../assets/jobIcon.svg';
import LeftIcon from '../../assets/leftIcon.svg';

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
  border-radius: 100px;
  cursor: ${(props) => (props.active ? 'pointer' : 'not-allowed')};
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

const Page2: React.FC<{
  onPrev: () => void;
  onNext: (interestFields: string[]) => void;
}> = ({ onPrev, onNext }) => {
  const [activeCategories, setActiveCategories] = useState<number[]>([]); // 활성화된 카테고리 ID 추적

  const categories = [
    { id: 1, image: AppIcon, text: '앱개발', value: 'APP_DEVELOPMENT' },
    { id: 2, image: WebIcon, text: '웹개발', value: 'WEB_DEVELOPMENT' },
    {
      id: 3,
      image: ComputerIcon,
      text: '컴퓨터언어',
      value: 'PROGRAMMING_LANGUAGE',
    },
    { id: 4, image: DeepLearningIcon, text: '딥러닝', value: 'DEEP_LEARNING' },
    { id: 5, image: StatisticsIcon, text: '통계', value: 'STATISTICS' },
    { id: 6, image: DataIcon, text: '데이터분석', value: 'DATA_ANALYSIS' },
    { id: 7, image: UXUIIcon, text: 'UX/UI', value: 'UI_UX' },
    { id: 8, image: PlanIcon, text: '기획', value: 'PLANNING' },
    {
      id: 9,
      image: WorkIcon,
      text: '업무생산성',
      value: 'BUSINESS_PRODUCTIVITY',
    },
    { id: 10, image: LanguageIcon, text: '외국어', value: 'FOREIGN_LANGUAGE' },
    { id: 11, image: JobIcon, text: '취업', value: 'CAREER' },
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
      <Title>00님의 관심 분야를 알려주세요</Title>
      <SubTitle>최대 3개 관심분야에 어울리는 컬렉션을 소개해드릴게요</SubTitle>
      <CategoryListWrapper>
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            image={category.image}
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
