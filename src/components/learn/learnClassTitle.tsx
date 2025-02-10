import React, {useState} from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { FaCheck } from "react-icons/fa6";
import EffectUp from '../../assets/buttonEffectUp.svg';
import EffectDown from '../../assets/buttonEffectDown.svg';
import LearnModal from '../modal/learnModal';

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1.5% 0 1.5% 0;

  @media (max-width: 850px) {
    padding: 2% 0 2.5% 0;
  }

  @media (max-width: 560px) {
  }
`;

const TitleBox = styled.div`
  display: block;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
  color: rgba(50, 53, 56, 1);

  @media (max-width: 850px) {
    font-size: 18px;
  }

  @media (max-width: 560px) {
    font-size: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 180px;
  }
`;

const ButtonWrapper = styled.button<{ isClicked: boolean, isCompleted: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 110px;
  height: 40px;
  background-color: ${(props) =>
    props.isCompleted
      ? 'rgba(118, 118, 128, 0.12)' // 회색 (완료 후 상태)
      : props.isClicked
      ? 'rgba(255, 118, 2, 1)' // 주황색 (클릭 직후)
      : 'rgba(94, 82, 255, 1)'}; // 기본 색상
  border-radius: 24.7px;
  border: none;
  font-size: 14px;
  color: ${(props) =>
    props.isCompleted
      ? 'rgba(79, 83, 87, 1)'
      : 'white'};
  gap: 2px;
  cursor: pointer;
  transition: ${(props) => (props.isClicked ? 'none' : 'background-color 1s ease, color 1s ease')};


  @media (max-width: 850px) {
    width: 95px;
    height: 34px;
    font-size: 12px;
  }

  @media (max-width: 560px) {
    // width: 60px;
    // height: 20px;
    gap: 5px;
    width: 85px;
    height: 30px;
    font-size: 10px;
  }
`;

const IconBox = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  margin-top: 5px;

  @media (max-width: 850px) {
    width: 17px;
    height: 17px;
  }

  @media (max-width: 560px) {
    width: 11px;
    height: 11px;
  }
`;

const EffectUpWrapper = styled.div<{ isClicked: boolean, isCompleted: boolean }>`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 30.7%;
  right: 41%;
  width: 20px;
  height: 20px;
  gap: 50px;
  z-index: 20;
  opacity: ${(props) => (props.isCompleted ? 0 : props.isClicked ? 1 : 0)};
  transition: opacity 1s ease;

  @media (max-width: 850px) {
    width: 17px;
    height: 17px;
  }

  @media (max-width: 560px) {
    width: 11px;
    height: 11px;
  }
`;

const EffectDownWrapper = styled.div<{ isClicked: boolean, isCompleted: boolean }>`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 24.5%;
  right: 37.5%;
  width: 20px;
  height: 20px;
  gap: 50px;
  z-index: 20;
  opacity: ${(props) => (props.isCompleted ? 0 : props.isClicked ? 1 : 0)};
  transition: opacity 1s ease;

  @media (max-width: 850px) {
    width: 17px;
    height: 17px;
  }

  @media (max-width: 560px) {
    width: 13px;
    height: 13px;
  }
`;

const ButtonLetter = styled.div`
  margin-top: -2px;
`;

interface ClassTitleProps {
  title?: string;
}

const ClassTitle: React.FC<ClassTitleProps> = ({
  title = "기획자라면 알고 있어야 할 '웹사이트 유형'",
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
      setIsCompleted(true);
    }, 1000);
  };

  const handleShowModal = () => {
    if (isCompleted) { // 버튼 회색일 때만 모달을 보여줌
      setIsModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };


  return (
    <TitleWrapper>
      <TitleBox>{title}</TitleBox>
      <EffectUpWrapper isClicked={isClicked} isCompleted={isCompleted}>
        <Image src={EffectUp} alt='Button Effect Up'/>
      </EffectUpWrapper>
      <EffectDownWrapper isClicked={isClicked} isCompleted={isCompleted}>
        <Image src={EffectDown} alt='Button Effect Down'/>
      </EffectDownWrapper>
      <ButtonWrapper
        isClicked={isClicked}
        isCompleted={isCompleted}
        onClick={() => {
          if (isCompleted) {
            handleShowModal(); // isCompleted가 true일 때만 모달을 열도록
          } else {
            handleClick(); // isCompleted가 false일 때는 handleClick 실행
          }
        }}
      >
        <IconBox>
          <FaCheck size="15px"/>
        </IconBox>
        <ButtonLetter>수강완료</ButtonLetter>
      </ButtonWrapper>

      {isModalVisible && <LearnModal onClose={handleCloseModal} />}
    </TitleWrapper>
  );
};

export default ClassTitle;
