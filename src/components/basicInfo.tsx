import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import X from '../assets/X_red.svg';

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: 600;
  color: #000;
  margin-bottom: 23px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: start;
  margin-bottom: 20px;
`;

const Label = styled.div`
  width: 120px;
  font-size: 17px;
  font-weight: 400;
  line-height: 30px; /* 150% */
  letter-spacing: -0.4px;
  color: #000;
`;

const Value = styled.div`
  flex: 1;
  font-size: 17px;
  font-weight: 600;
  line-height: 30px; /* 150% */
  letter-spacing: -0.4px;
  color: #000;
`;

const InputContainer = styled.div`
  width: 100%;
`;

const InputWrapper = styled.div<{
  isFocused: boolean;
  isValid: boolean;
  isChecked: boolean;
}>`
  display: flex;
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  border: 0.9px solid
    ${({ isFocused, isValid, isChecked }) => {
      if (isFocused) return isValid ? '#5e52ff' : '#ec2d30'; // 포커스 시 테두리
      if (isChecked) return isValid ? '#323538' : '#ec2d30'; // 유효성 검사 후 테두리
      return '#323538'; // 기본 테두리
    }};
  box-shadow: ${({ isFocused, isValid }) =>
    isFocused && isValid
      ? '1px 1px 1px 0px rgba(94, 82, 255, 0.30), -1px -1px 1px 0px rgba(94, 82, 255, 0.30)'
      : 'none'};
`;

const Input = styled.input<{ isValid: boolean }>`
  flex: 1;
  font-size: 14px;
  font-weight: 400;
  color: ${({ isValid }) => (isValid ? '#1f1f1f' : '#ec2d30')};
  border: none;
  outline: none;
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  gap: 6px;
  color: #ec2d30;
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-size: 14px;
  font-weight: 400;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
`;

const SetButton = styled.button`
  padding: 6px 12px;
  border: 0.5px solid #bdc5cc;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: rgba(118, 118, 128, 0.12);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 5px;
  position: relative;
  justify-content: flex-end;
  margin-top: 8px;
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 6px 12px;
  border: 0.5px solid #bdc5cc;
  border-radius: 6px;
  background-color: ${({ primary }) => (primary ? '#5e52ff' : '#ffffff')};
  color: ${({ primary }) => (primary ? '#ffffff' : '#000')};
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: ${({ primary }) =>
      primary ? '#3c31c8' : 'rgba(118, 118, 128, 0.12)'};
  }
`;

const BasicInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [originalEmail, setOriginalEmail] = useState('onboarding@gmail.com');
  const [email, setEmail] = useState(originalEmail);
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const validateEmail = (value: string) => {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov|io|ai)$/;
    return emailRegex.test(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsChecked(false);
    setError('');
    setIsValid(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const isValidEmail = validateEmail(email);
      setIsValid(isValidEmail);
      setIsChecked(true);
      setError(isValidEmail ? '' : '올바른 이메일 형식이 아닙니다');
      if (isValid) {
        setIsFocused(false);
      }
    }
  };

  const handleSave = () => {
    if (validateEmail(email)) {
      setIsEditing(false);
    } else {
      setError('올바른 이메일 형식이 아닙니다');
    }
  };

  const handleCancel = () => {
    setEmail(originalEmail);
    setIsEditing(false);
  };

  return (
    <Section>
      <SectionTitle>기본정보</SectionTitle>

      <InfoRow>
        <Label>이메일</Label>
        {isEditing ? (
          <InputContainer>
            <InputWrapper
              isFocused={isFocused}
              isValid={isValid}
              isChecked={isChecked}
            >
              <Input
                type="email"
                placeholder="이메일 주소를 입력하세요"
                value={email}
                onChange={handleInputChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={handleKeyDown}
                isValid={isValid}
              />
            </InputWrapper>
            {!isValid && (
              <ErrorContainer>
                <Image src={X} alt="Error icon" width={16} height={16} />
                <span>{error}</span>
              </ErrorContainer>
            )}
            <ButtonContainer>
              <Button onClick={handleCancel}>취소</Button>
              <Button primary onClick={handleSave}>
                저장
              </Button>
            </ButtonContainer>
          </InputContainer>
        ) : (
          <>
            <Value>{email}</Value>
            <SetButton onClick={() => setIsEditing(true)}>설정</SetButton>
          </>
        )}
      </InfoRow>

      <InfoRow>
        <Label>비밀번호</Label>
        <Value>**********</Value>
        {!isEditing && <SetButton>설정</SetButton>}
      </InfoRow>
    </Section>
  );
};

export default BasicInfo;
