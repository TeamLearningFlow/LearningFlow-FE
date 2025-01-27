import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import CheckIcon from '../assets/checkIcon.svg';

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  // width: 65%;
  // margin-left: 3%;
  padding: 1.5% 0 1.5% 0;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
  color: rgba(50, 53, 56, 1);
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
  color: white;
  gap: 3px;
  cursor: pointer;
`;

const IconBox = styled.div``;

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
          <Image src={CheckIcon} alt="Check Icon" width={18} height={18} />
        </IconBox>
        수강완료
      </ButtonWrapper>
    </TitleWrapper>
  );
};

export default ClassTitle;
