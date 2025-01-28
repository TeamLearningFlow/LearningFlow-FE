import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import X from '../assets/X_red.svg';

const InputWrapper = styled.div<{
  isValid: boolean;
  isFocused: boolean;
  isChecked: boolean;
}>`
  display: flex;
  width: 100%;
  height: 50px;
  position: relative;
  align-items: center;
  border: 0.696px solid
    ${(props) => {
      if (props.isFocused) {
        // 포커스 시 유효한 이메일이면 보라색, 아니면 빨간색 테두리
        return props.isValid ? '#5E52FF' : '#ec2d30';
      }
      if (props.isChecked) {
        // 유효성 검사 후 포커스가 없으면 테두리 색을 #181818로 설정
        return props.isValid ? '#181818' : '#ec2d30';
      }
      // 포커스도 없고 유효성 검사 전이면 기본 색상
      return '#323538';
    }};
  border-radius: 6.962px;
  box-shadow: ${(props) => {
    if (props.isFocused && props.isValid) {
      return '2px 2px 2px 0px rgba(94, 82, 255, 0.30), -2px -2px 2px 0px rgba(94, 82, 255, 0.30)';
    }
    return 'none';
  }};

  overflow: hidden;
  padding: 12px;
  margin-bottom: 7px;
`;

const Input = styled.input<{
  isValid: boolean;
  isFocused: boolean;
  isChecked: boolean;
}>`
  flex: 1;
  border: none;
  outline: none;
  font-size: 15px;
  padding-right: 40px;
  margin-left: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ isValid }) => (isValid ? '#1f1f1f' : '#ec2d30')};
  background-color: transparent;

  &::placeholder {
    color: #afb8c1;
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`;

const XImg = styled(Image)`
  margin-top: 1px;
`;

const EmailErrorMsg = styled.span`
  margin-left: 4px;
  font-size: 14px;
  color: #ec2d30;
`;

interface InfoEmailFixProps {
  email: string;
  setEmail: (email: string) => void;
  isValidEmail: boolean;
  setIsValidEmail: (isValid: boolean) => void;
  onEnterPress: () => void; // 엔터 눌렀을 때 호출할 함수
}

const InfoEmailFix: React.FC<InfoEmailFixProps> = ({
  email,
  setEmail,
  isValidEmail,
  setIsValidEmail,
  onEnterPress,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isChecked, setIsChecked] = useState(false); // 엔터 입력 여부 확인

  const validateEmail = (email: string): boolean => {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov|io|ai)$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValidEmail(validateEmail(newEmail));
    setErrorMessage('');
    setIsChecked(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const isValid = validateEmail(email);
      setIsValidEmail(isValid);
      setIsChecked(true);
      setErrorMessage(isValid ? '' : '올바른 이메일 형식이 아닙니다');

      if (isValid) {
        setIsFocused(false);
        onEnterPress(); // 엔터를 눌렀을 때 BasicInfo.tsx로 변경 내용 전달
      }
    }
  };

  return (
    <div>
      <InputWrapper
        isValid={isValidEmail}
        isFocused={isFocused} /*|| email !== ''*/
        onBlur={() => setIsFocused(false)}
        isChecked={isChecked}
      >
        <Input
          type="email"
          placeholder="이메일 주소를 적어주세요"
          value={email}
          onFocus={() => setIsFocused(true)}
          onChange={handleEmailChange}
          onKeyDown={handleKeyPress}
          isValid={isValidEmail}
          isFocused={isFocused}
          onBlur={() => setIsFocused(false)}
          isChecked={isChecked}
        />
      </InputWrapper>
      {!isValidEmail && isChecked && (
        <ErrorContainer>
          <XImg src={X} alt="X" />
          <EmailErrorMsg>{errorMessage}</EmailErrorMsg>
        </ErrorContainer>
      )}
    </div>
  );
};

export default InfoEmailFix;
