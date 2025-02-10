import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import CheckIcon from '../../assets/checkIcon.svg';

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1.5% 0 1.5% 0;

  @media (max-width: 850px) {
    padding: 2.5% 0 2.5% 0;
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
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 180px;
  }
`;

const ButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 110px;
  height: 40px;
  background-color: rgba(94, 82, 255, 1);
  border-radius: 24.7px;
  border: none;
  font-size: 14px;
  color: white;
  gap: 3px;
  cursor: pointer;

  @media (max-width: 850px) {
    width: 100px;
    height: 32px;
    font-size: 12px;
  }

  @media (max-width: 560px) {
    // width: 60px;
    // height: 20px;
    // font-size: 8px;
    gap: 1px;
  }
`;

const IconBox = styled.div`
  position: relative;
  width: 20px;
  height: 20px;

  @media (max-width: 850px) {
    width: 17px;
    height: 17px;
  }

  @media (max-width: 560px) {
    width: 11px;
    height: 11px;
  }
`;

interface ClassTitleProps {
  title?: string;
}

const ClassTitle: React.FC<ClassTitleProps> = ({
  title = "기획자라면 알고 있어야 할 '웹사이트 유형'",
}) => {
  return (
    <TitleWrapper>
      <TitleBox>{title}</TitleBox>
      <ButtonWrapper>
        <IconBox>
          <Image
            src={CheckIcon}
            alt="Check Icon"
            fill
            style={{ objectFit: 'contain' }}
          />
        </IconBox>
        수강완료
      </ButtonWrapper>
    </TitleWrapper>
  );
};

export default ClassTitle;
