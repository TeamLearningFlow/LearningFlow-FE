import React, { useState } from 'react';
import styled from 'styled-components';
import NotCompleted from './notCompleted';
import Completed from '../mypage/completed';
import Liked from './liked';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TabMenu = styled.div`
  display: flex;
  position: absolute;
  top: 425px;
  left: 120px;
  gap: 24px;
  cursor: pointer;

  /* 반응형 설정 */
  @media (max-width: 1024px) {
    top: 397px;
    left: 110px;
  }

  @media (max-width: 768px) {
    left: 80px; /* 모바일 화면 */
  }

  @media (max-width: 480px) {
    top: 337px; /* 폰 화면 */
    left: 45px;
    gap: 19px;
  }
`;

const Menu = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const MenuName = styled.span<{ selected: boolean }>`
  color: ${(props) => (props.selected ? '#5e52ff' : '#DDE0E4')};
  text-align: center;
  transition: 0.8s;

  /* Body/l/Semibold */
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px; /* 127.273% */
  letter-spacing: -0.44px;

  /* 반응형 설정 */
  @media (max-width: 480px) {
    font-size: 18px; /* 폰 화면 */
  }
`;

const Line = styled.span<{ width: string; selected: boolean }>`
  width: ${(props) => props.width};
  height: 2px;
  background: #5e52ff;
  display: ${(props) => (props.selected ? 'block' : 'none')};
  transition: 0.8s;
`;

const TabContents = styled.div`
  width: 1200px;
  margin: 54px 120px 120px 120px;

  /* 반응형 설정 */
  @media (max-width: 1024px) {
    width: 1000px;
    margin: 20px 10px 100px 10px;
  }

  @media (max-width: 768px) {
    width: calc(100vw - 20px); /* 모바일 화면 */
  }

  @media (max-width: 480px) {
    width: calc(100vw - 10px); /* 폰 화면 */
    margin: 10px 5px 0 5px;
  }
`;

const TabContent = styled.div<{ shown: boolean }>`
  display: flex;
  width: 1200px;
  flex-direction: column;
  align-items: flex-start;
  display: ${(props) => (props.shown ? 'flex' : 'none')};
  gap: 54px;

  /* 반응형 설정 */
  @media (max-width: 1024px) {
    width: 1000px;
    margin: 20px 10px 0 10px;
  }

  @media (max-width: 768px) {
    width: calc(100vw - 20px); /* 모바일 화면 */
  }

  @media (max-width: 480px) {
    width: calc(100vw - 10px); /* 폰 화면 */
    margin: 10px 5px 0 5px;
  }
`;

const Tab = () => {
  const [isSelected, setIsSelected] = useState(true);

  const selectMenuHandler = () => {
    if (isSelected == true) {
      setIsSelected(false);
    } else if (isSelected == false) {
      setIsSelected(true);
    }
  };

  return (
    <Container>
      <TabMenu>
        <Menu>
          <MenuName selected={isSelected} onClick={selectMenuHandler}>
            나의 학습방
          </MenuName>
          <Line width={'99px'} selected={isSelected} />
        </Menu>
        <Menu>
          <MenuName selected={!isSelected} onClick={selectMenuHandler}>
            관심 컬렉션
          </MenuName>
          <Line width={'99px'} selected={!isSelected} />
        </Menu>
      </TabMenu>
      <TabContents>
        <TabContent shown={isSelected}>
          <NotCompleted />
          <Completed />
        </TabContent>
        <TabContent shown={!isSelected}>
          <Liked />
        </TabContent>
      </TabContents>
    </Container>
  );
};

export default Tab;
