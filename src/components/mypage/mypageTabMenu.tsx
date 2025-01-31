import React, { useState } from 'react';
import styled from 'styled-components';
import NotCompleted from './notCompleted';
import Completed from '../mypage/completed';
import Bookmarked from '../mypage/bookmarked';

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
`;

const TabContent = styled.div<{ shown: boolean }>`
  display: flex;
  width: 1200px;
  flex-direction: column;
  align-items: flex-start;
  display: ${(props) => (props.shown ? 'flex' : 'none')};
  gap: 54px;
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
          {/* 길이 조정 필요 */}
          <Line width={'80px'} selected={isSelected} />
        </Menu>
        <Menu>
          <MenuName selected={!isSelected} onClick={selectMenuHandler}>
            북마크
          </MenuName>
          <Line width={'57px'} selected={!isSelected} />
        </Menu>
      </TabMenu>
      <TabContents>
        <TabContent shown={isSelected}>
          <NotCompleted />
          <Completed />
        </TabContent>
        <TabContent shown={!isSelected}>
          <Bookmarked />
        </TabContent>
      </TabContents>
    </Container>
  );
};

export default Tab;
