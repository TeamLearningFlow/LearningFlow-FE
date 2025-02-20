import React, { useState, useEffect, useContext } from 'react';
import { LearnContext } from '../context/LearnContext';
import { ProgressContext } from '../context/ProgressContext';
import axios from 'axios';
import styled from 'styled-components';
import Image from 'next/image';
import { FaCheck } from 'react-icons/fa6';
import EffectUp from '/public/buttonEffectUp.svg';
import EffectDown from '/public/buttonEffectDown.svg';
import LearnModal from '../modal/learnModal';
// import { CollectionData } from '@/pages/collection/[collectionId]';

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 55px;

  @media (max-width: 850px) {
  }

  @media (max-width: 560px) {
  }
`;

const TitleBox = styled.div`
  display: block;
  align-items: center;
  justify-content: center;
  font-size: 19px;
  font-weight: 600;
  color: rgba(50, 53, 56, 1);

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 750px;
  z-index: 100;

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
  align-items: center;
  z-index: 20;
`;

const EffectUpWrapper = styled.div<{
  isClicked: boolean;
  isCompleted: boolean;
}>`
  z-index: 20;
  // opacity: 1; /* 항상 보이도록 설정 */
  opacity: ${(props) => (props.isCompleted ? 0 : props.isClicked ? 1 : 0)};
  transition: opacity 1s ease;
  margin-bottom: -10px;
  margin-right: 50px;
`;

const EffectDownWrapper = styled.div<{
  isClicked: boolean;
  isCompleted: boolean;
}>`
  display: flex;
  z-index: 20;
  // opacity: 1; /* 항상 보이도록 설정 */
  opacity: ${(props) => (props.isCompleted ? 0 : props.isClicked ? 1 : 0)};
  transition: opacity 1s ease;
  margin-top: -6px;
  margin-left: 50px;
`;

const ButtonLetter = styled.div`
  margin-top: -2px;
`;

interface ClassTitleProps {
  episodeId: number;
  episodeData: { urlTitle: string; progress?: number };
}

const ClassTitle: React.FC<ClassTitleProps> = ({ episodeId, episodeData }) => {
  const [localIsCompleted, setLocalIsCompleted] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const context = useContext(LearnContext);

  if (!context) throw new Error('LearnContext를 찾을 수 없습니다.');

  const { updateProgress, progressByEpisode } = useContext(ProgressContext);
  // const { isCompleted } = state;
  const { setIsCompleted } = context.actions;

  // // 만약 localStorage에 저장된 진도율이 100이면, 수강 완료 상태로 설정
  // useEffect(() => {
  //   const storedProgress = localStorage.getItem(`progress-${episodeId}`);
  //   if (storedProgress && Number(storedProgress) >= 100) {
  //     setIsCompleted(true);
  //   }
  // }, [episodeId, setIsCompleted]);

  const episodeName = episodeData.urlTitle;

  // // 만약 localStorage에 저장된 진도율이 100이면, 수강 완료 상태로 설정
  // useEffect(() => {
  //   const storedProgress =
  //     Number(localStorage.getItem(`progress-${episodeId}`)) || 0;
  //   setLocalIsCompleted(storedProgress >= 80);
  // }, [episodeId]);

  const handleClick = async () => {
    // 수강 완료 상태라면 모달만
    if (localIsCompleted) {
      setIsModalVisible(true);
      return;
    }

    // 미수강 상태라면 수강 완료 처리 진행 (진도율 100으로 업데이트)
    setIsClicked(true);
    const targetProgress = 100;
    try {
      const token = localStorage.getItem('token');
      const headers = token
        ? {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        : {};
      const response = await axios.post(
        `https://onboarding.p-e.kr/resources/${episodeId}/update-complete`,
        { progress: targetProgress },
        { headers },
      );
      if (response.status === 200) {
        setTimeout(() => {
          // 여기서는 전역 상태 업데이트 대신 localStorage 업데이트 후 로컬 상태를 갱신
          updateProgress(episodeId, targetProgress);
          localStorage.setItem(
            `progress-${episodeId}`,
            targetProgress.toString(),
          );
          setLocalIsCompleted(true);
          console.log('학습 상태 업데이트 성공:', response.data);
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
    // 진도율 0으로 초기화 및 수강 완료 상태 해제
    // setProgress(0);
    updateProgress(episodeId, 0);
    context.actions.setIsCompleted(false);
    localStorage.setItem(`progress-${episodeId}`, '0');
    setLocalIsCompleted(false);
    setIsModalVisible(false);
  };

  // useEffect(() => {
  //   const storedProgress = localStorage.getItem(`progress-${episodeId}`);

  //   if (storedProgress) {
  //     const progress = Number(storedProgress);
  //     updateProgress(episodeId, progress);

  //     if (progress >= 80) {
  //       setLocalIsCompleted(true);
  //     }
  //   }
  // }, [episodeId, setLocalIsCompleted]);
  useEffect(() => {
    const storedProgress = localStorage.getItem(`progress-${episodeId}`);
    const progress = storedProgress
      ? Number(storedProgress)
      : progressByEpisode[episodeId] || 0;

    if (progressByEpisode[episodeId] !== progress) {
      updateProgress(episodeId, progress);
    }

    if (progress >= 80) {
      setLocalIsCompleted(true);
    } else {
      setLocalIsCompleted(false);
    }
  }, [episodeId, progressByEpisode]);

  return (
    <TitleWrapper>
      <TitleBox>{episodeName}</TitleBox>
      <EffectButtonWrapper>
        <EffectUpWrapper isClicked={isClicked} isCompleted={localIsCompleted}>
          <Image src={EffectUp} alt="Button Effect Up" width={35} height={35} />
        </EffectUpWrapper>
        <ButtonWrapper
          isClicked={isClicked}
          isCompleted={localIsCompleted}
          onClick={handleClick}
        >
          <IconBox>
            <FaCheck size="15px" />
          </IconBox>
          <ButtonLetter>수강완료</ButtonLetter>
        </ButtonWrapper>
        <EffectDownWrapper isClicked={isClicked} isCompleted={localIsCompleted}>
          <Image
            src={EffectDown}
            alt="Button Effect Down"
            width={35}
            height={35}
          />
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
