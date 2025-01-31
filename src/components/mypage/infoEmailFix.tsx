import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import X from '../assets/X_red.svg';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 10px;
  align-items: center;
`;

const Input = styled.input<{ hasError?: boolean; isFocused?: boolean }>`
  width: 100%;
  height: 40px;
  padding: 10px;
  border: 0.9px solid
    ${({ hasError, isFocused }) => {
      if (hasError) return '#ec2d30'; // 에러
      if (isFocused) return '#5e52ff'; // 입력 중일 때
      return '#323538'; // 기본 상태
    }};
  border-radius: 6px;
  outline: none;
  color: ${({ hasError }) => (hasError ? '#ec2d30' : '#1f1f1f')};
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-size: 14px;
  font-weight: 400;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
  box-shadow: ${({ isFocused }) =>
    isFocused
      ? '1px 1px 1px 0px rgba(94, 82, 255, 0.30), -1px -1px 1px 0px rgba(94, 82, 255, 0.30)'
      : 'none'};
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #ec2d30;
  font-size: 14px;
  margin-top: 5px;
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
    background-color: ${({ primary }) => (primary ? '#3c31c8' : '#f0f0f0')};
  }
`;

interface InfoEmailFixProps {
  initialEmail: string;
  onSave: (newEmail: string) => void;
  onCancel: () => void;
}

const InfoEmailFix: React.FC<InfoEmailFixProps> = ({
  initialEmail,
  onSave,
  onCancel,
}) => {
  const [email, setEmail] = useState(initialEmail);
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(''); // 입력 중일 때는 오류 메시지 제거
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (validateEmail(email)) {
        setError('');
        setIsFocused(false); // 유효하면 기본 테두리로 변경
      } else {
        setError('올바른 이메일 형식이 아닙니다');
      }
    }
  };

  return (
    <>
      <GridContainer>
        <Input
          type="text"
          value={email}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            setIsFocused(true);
            setError('');
          }}
          onBlur={() => setIsFocused(false)}
          hasError={!!error}
          isFocused={isFocused}
          placeholder="이메일을 입력하세요"
        />
        <Button onClick={onCancel}>취소</Button>
        <Button
          primary
          onClick={() => {
            if (validateEmail(email)) {
              onSave(email);
            } else {
              setError('올바른 이메일 형식이 아닙니다');
            }
          }}
        >
          저장
        </Button>
      </GridContainer>
      {error && (
        <ErrorContainer>
          <Image src={X} alt="error icon" width={16} height={16} />
          <span>{error}</span>
        </ErrorContainer>
      )}
    </>
  );
};

export default InfoEmailFix;
