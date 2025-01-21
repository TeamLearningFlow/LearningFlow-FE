import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import invisibleicon from '../assets/invisibleicon.svg';
import { ValidationCheck } from './validation';

const InputWrapper = styled.div<{
  isFocused: boolean;
  isInvalid: boolean;
  isValid: boolean;
  hasBlurred: boolean;
  isSubmitted: boolean;
  isEmpty: boolean; // 추가된 속성: input이 비어 있는지 여부
}>`
  display: flex;
  height: 50px;
  position: relative;
  align-items: center;
  border: 0.696px solid
    ${(props) =>
      props.isInvalid && props.isEmpty
        ? '#323538' // 비어있고 유효하지 않으면 기본 색상
        : props.isInvalid
          ? 'rgba(236, 45, 48, 1)' // 유효하지 않으면 빨간색
          : props.isEmpty
            ? '#323538' // 비어 있을 때 기본 색상
            : '#323538'}; // 기본 색상

  border-radius: 6.962px;
  padding: 12px;
  margin-bottom: 6px;
  overflow: hidden;
  transition:
    box-shadow 0.3s ease,
    background-color 0.3s ease;

  box-shadow: ${(props) => {
    // 1. 처음 input 클릭했을 때, 아무 텍스트 입력 안 해도 그림자 효과가 생김
    if (props.isFocused && props.isEmpty) {
      return '2px 2px 2px 0px rgba(94, 82, 255, 0.30), -2px -2px 2px 0px rgba(94, 82, 255, 0.30)';
    }
    // 2. 유효하지 않으면 그림자 없애기
    if (props.isFocused && !props.isValid) {
      return 'none';
    }
    // 3. 텍스트가 유효하면 다시 그림자
    if (props.isFocused && props.isValid && !props.isSubmitted) {
      return '2px 2px 2px 0px rgba(94, 82, 255, 0.30), -2px -2px 2px 0px rgba(94, 82, 255, 0.30)';
    }
    // 4. 유효한 상태로 엔터키를 눌렀을 때 그림자 없어짐
    return 'none';
  }};
  background-color: ${(props) =>
    props.isSubmitted && props.isValid ? '#f5f5ff' : 'transparent'};

  img {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`;

const Input = styled.input<{
  isError: boolean;
  isInvalid: boolean;
  isEmpty: boolean;
}>`
  flex: 1;
  border: none;
  outline: none;
  font-size: 15px;
  padding-right: 40px;
  margin-left: 15px;
  background: transparent;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) =>
    props.isInvalid && props.isEmpty
      ? 'black' // 비어있고 유효하지 않으면 기본 색상
      : props.isInvalid
        ? 'rgba(236, 45, 48, 1)' // 유효하지 않으면 빨간색
        : 'black'}; // 기본 색상

  &::placeholder {
    color: #afb8c1;
  }

  &:focus {
    outline: none;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 18px;
  height: 18px;
  position: absolute;
  right: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  margin-top: 22px;
  font-size: 14px;
  color: #181818;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #5e52ff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #4a46e3;
  }
`;

interface SignupInputPwProps {
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setIsPasswordValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignupInputPw: React.FC<SignupInputPwProps> = ({
  setPassword,
  setIsPasswordValid,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState<{
    hasUpperCase: boolean | null;
    hasSpecialChar: boolean | null;
    hasNumber: boolean | null; // 숫자 유효성 검사 추가
    isLengthValid: boolean | null;
  }>({
    hasUpperCase: null,
    hasSpecialChar: null,
    hasNumber: null,
    isLengthValid: null,
  });

  const [isInvalid, setIsInvalid] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [password, setPasswordState] = useState('');

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handlePasswordChange = (value: string) => {
    setPasswordState(value);
    setPassword(value);

    const newValidation = {
      hasUpperCase: value ? /[A-Z]/.test(value) && /[a-z]/.test(value) : null,
      hasSpecialChar: value ? /[!@#$%^&*()_+]/.test(value) : null,
      hasNumber: value ? /[0-9]/.test(value) : null,
      isLengthValid: value ? value.length >= 8 && value.length <= 16 : null,
    };
    setPasswordValidation(newValidation);

    const invalid =
      !newValidation.hasUpperCase ||
      !newValidation.hasSpecialChar ||
      !newValidation.hasNumber ||
      !newValidation.isLengthValid;
    setIsInvalid(invalid);
    setIsError(invalid);
  };

  const PasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  useEffect(() => {
    const isValidPassword =
      passwordValidation.hasUpperCase &&
      passwordValidation.hasSpecialChar &&
      passwordValidation.hasNumber &&
      passwordValidation.isLengthValid;

    setIsPasswordValid(isValidPassword ?? false);
    setIsValid(isValidPassword ?? false);
  }, [passwordValidation, setIsPasswordValid]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && isValid) {
      setIsSubmitted(true);
    }
  };

  return (
    <div>
      <Label htmlFor="password">비밀번호</Label>
      <InputWrapper
        isFocused={isFocused}
        isInvalid={isInvalid}
        isValid={isValid}
        hasBlurred={!isFocused}
        isSubmitted={isSubmitted}
        isEmpty={password === ''}
      >
        <Input
          isInvalid={isInvalid}
          isEmpty={password === ''}
          isError={isError}
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder="영문, 숫자, 특수문자 포함 8~16자"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => handlePasswordChange(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <IconWrapper onClick={PasswordVisibility}>
          <Image src={invisibleicon} alt="비밀번호 보이기/숨기기 아이콘" />
        </IconWrapper>
      </InputWrapper>
      <ValidationCheck passwordValidation={passwordValidation} />
    </div>
  );
};

export default SignupInputPw;
