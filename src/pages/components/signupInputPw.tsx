import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import invisibleicon from '../assets/invisibleicon.svg';
import { ValidationCheck } from './validation';

const InputWrapper = styled.div<{ isFocused: boolean }>`
  display: flex;
  height: 50px;
  position: relative;
  align-items: center;
  border: 0.696px solid #323538;
  border-radius: 6.962px;
  padding: 12px;
  margin-bottom: 6px;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
  box-shadow: ${(props) => (props.isFocused ? '0 0 5px #5E52ff' : 'none')};

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
  const [passwordValidation, setPasswordValidation] = useState({
    hasUpperCase: false,
    hasSpecialChar: false,
    isLengthValid: false,
  });

  const handleFocus = () => setIsFocused(true);

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordValidation({
      hasUpperCase: /[A-Z]/.test(value) && /[a-z]/.test(value),
      hasSpecialChar: /[!@#$%^&*()_+]/.test(value),
      isLengthValid: value.length >= 8 && value.length <= 16,
    });
  };

  const PasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  // 부모 컴포넌트로 유효성 전달
  useEffect(() => {
    const isValid =
      passwordValidation.hasUpperCase &&
      passwordValidation.hasSpecialChar &&
      passwordValidation.isLengthValid;
    setIsPasswordValid(isValid);
  }, [passwordValidation, setIsPasswordValid]);

  return (
    <div>
      <Label htmlFor="password">비밀번호</Label>
      <InputWrapper isFocused={isFocused}>
        <Input
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder="영문, 숫자, 특수문자 포함 8~16자"
          onFocus={handleFocus}
          onChange={(e) => handlePasswordChange(e.target.value)}
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
