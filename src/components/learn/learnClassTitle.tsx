import React, { useState, useEffect, useContext } from 'react';
import { LearnContext } from '../../pages/context/LearnContext';
import axios from 'axios';
import styled from 'styled-components';
import Image from 'next/image';
import { FaCheck } from 'react-icons/fa6';
import EffectUp from '../../assets/buttonEffectUp.svg';
import EffectDown from '../../assets/buttonEffectDown.svg';
import LearnModal from '../modal/learnModal';

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 8vh;
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

const ButtonWrapper = styled.button<{
  isClicked: boolean;
  isCompleted: boolean;
}>`
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
  color: ${(props) => (props.isCompleted ? 'rgba(79, 83, 87, 1)' : 'white')};
  gap: 2px;
  cursor: pointer;
  transition: ${(props) =>
    props.isClicked ? 'none' : 'background-color 1s ease, color 1s ease'};

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

const EffectButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 20;
`;

const EffectUpWrapper = styled.div<{
  isClicked: boolean;
  isCompleted: boolean;
}>`
  z-index: 20;
  // opacity: 1; /* 항상 보이도록 설정 */
  // visibility: visible; /* 항상 보이도록 설정 */
  opacity: ${(props) => (props.isClicked ? 1 : 0)};
  transition: opacity 1s ease;
  margin-bottom: -2px;
`;

const EffectDownWrapper = styled.div<{
  isClicked: boolean;
  isCompleted: boolean;
}>`
  display: flex;
  align-self: flex-end;
  z-index: 20;
  // opacity: 1; /* 항상 보이도록 설정 */
  visibility: visible; /* 항상 보이도록 설정 */
  opacity: ${(props) => (props.isClicked ? 1 : 0)};
  transition: opacity 1s ease;
`;

const ButtonLetter = styled.div`
  margin-top: -2px;
`;

interface ClassTitleProps {
  episodeId: number;
  episodeData: { episodeName: string };
}

const ClassTitle: React.FC<ClassTitleProps> = ({ episodeId, episodeData }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const { state, actions } = useContext(LearnContext);
  const { isCompleted } = state;
  const { setIsCompleted } = actions;

  const episodeName = episodeData.episodeName;

  const handleClick = async () => {
    // 만약 이미 수강완료 상태라면 모달만 표시
    if (isCompleted) {
      setIsModalVisible(true);
      return;
    }
    setIsClicked(true);
    try {
      const token = localStorage.getItem('token');
      const headers = token
        ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
        : {};
      const response = await axios.post(
        `http://onboarding.p-e.kr:8080/resources/${episodeId}/update-complete`,
        { progress: 0 },
        { headers }
      );

      if (response.status === 200 && response.data?.result?.isComplete) {
        setTimeout(() => {
          setIsCompleted(true);
          setProgress(100);
          console.log('학습 완료 처리 성공:', response.data);
        }, 700);
      }
    } catch (error) {
      console.error('수강 상태 변경 실패:', error);
    } finally {
      setTimeout(() => {
        setIsClicked(false);
      }, 700);
    }
  };

  const handleRetakeClass = () => {
    setProgress(0);
    setIsCompleted(false);
    setIsModalVisible(false);
  };

  return (
    <TitleWrapper>
      <TitleBox>{episodeName}</TitleBox>
      <EffectButtonWrapper>
      <EffectUpWrapper isClicked={isClicked} isCompleted={isCompleted}>
        <Image src={EffectUp} alt="Button Effect Up" />
      </EffectUpWrapper>
      <ButtonWrapper
        isClicked={isClicked}
        isCompleted={isCompleted}
        onClick={handleClick}
      >
        <IconBox>
          <FaCheck size="15px" />
        </IconBox>
        <ButtonLetter>수강완료</ButtonLetter>
      </ButtonWrapper>
      <EffectDownWrapper isClicked={isClicked} isCompleted={isCompleted}>
        <Image src={EffectDown} alt="Button Effect Down" />
      </EffectDownWrapper>
      </EffectButtonWrapper>

      {isModalVisible && (
        <LearnModal
          onClose={() => setIsModalVisible(false)}
          episodeId={episodeId}
          onRetakeClass={handleRetakeClass}
        />
      )}
    </TitleWrapper>
  );
};

export default ClassTitle;