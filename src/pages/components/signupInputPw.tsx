import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import invisibleicon from '../assets/invisibleicon.svg';
import { ValidationCheck } from './validation';

const InputWrapper = styled.div<{ isFocused: boolean; isInvalid: boolean; isValid: boolean }>`
  display: flex;
  height: 50px;
  position: relative;
  align-items: center;
  border: 0.696px solid
    ${(props) =>
      props.isInvalid
        ? 'rgba(236, 45, 48, 1)'
        : props.isFocused
        ? '#5E52ff'
        : '#323538'};
  border-radius: 6.962px;
  padding: 12px;
  margin-bottom: 6px;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
  box-shadow: ${(props) =>
    props.isInvalid ? 'none' : props.isFocused ? '0 0 5px #5E52ff' : 'none'};
  background-color: ${(props) => (props.isValid ? '#f5f5ff' : 'transparent')};

  img {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`;

const Input = styled.input`
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
    isLengthValid: boolean | null;
  }>({
    hasUpperCase: null,
    hasSpecialChar: null,
    isLengthValid: null,
  });

  const [isInvalid, setIsInvalid] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    const newValidation = {
      hasUpperCase: value ? /[A-Z]/.test(value) && /[a-z]/.test(value) : null,
      hasSpecialChar: value ? /[!@#$%^&*()_+]/.test(value) : null,
      isLengthValid: value ? value.length >= 8 && value.length <= 16 : null,
    };
    setPasswordValidation(newValidation);
    
    const invalid =
      !newValidation.hasUpperCase ||
      !newValidation.hasSpecialChar ||
      !newValidation.isLengthValid;
    setIsInvalid(invalid);
  };

  const PasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  useEffect(() => {
    const isValidPassword =
      passwordValidation.hasUpperCase &&
      passwordValidation.hasSpecialChar &&
      passwordValidation.isLengthValid;

    setIsPasswordValid(isValidPassword ?? false);
    setIsValid(isValidPassword);
  }, [passwordValidation, setIsPasswordValid]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // 엔터키를 눌렀을 때 유효성 검사를 통과한 경우에만 배경색을 변경
      if (isValid) {
      }
    }
  };

  return (
    <div>
      <Label htmlFor="password">비밀번호</Label>
      <InputWrapper isFocused={isFocused} isInvalid={isInvalid} isValid={isValid}>
        <Input
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

