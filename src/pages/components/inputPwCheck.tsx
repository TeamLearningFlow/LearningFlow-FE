import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import invisibleicon from '../assets/invisibleicon.svg';
import { PasswordCheckLabel } from './validation';

const InputWrapper = styled.div<{
  isFocused: boolean;
  isError: boolean;
  hasBlurred: boolean;
}>`
  display: flex;
  height: 50px;
  position: relative;
  align-items: center;
  border: 0.696px solid #323538;
  border-radius: 6.962px;
  padding: 12px;
  margin-bottom: 6px;
  transition: box-shadow 0.3s ease;
  box-shadow: ${(props) => {
    if (props.isFocused && !props.hasBlurred && !props.isError) {
      return '2px 2px 2px 0px rgba(94, 82, 255, 0.30), -2px -2px 2px 0px rgba(94, 82, 255, 0.30)';
    }
    return 'none';
  }};
  border-color: ${(props) => (props.isError ? 'rgba(236, 45, 48, 1)' : '#323538')};
  background-color: ${(props) =>
    props.isError ? '#fff' : props.hasBlurred ? '#f5f5ff' : '#fff'};
  overflow: hidden;

  img {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`;

const Input = styled.input<{
  isError: boolean;
}>`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 15px;
  margin-left: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => (props.isError ? 'rgba(236, 45, 48, 1)' : 'black')};

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
  margin-bottom: 9px;
  margin-top: 9px;
  font-size: 14px;
  color: #181818;
`;

const ErrorText = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

interface InputPwCheckProps {
  password: string;
  setIsPasswordCheckValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const InputPwCheck: React.FC<InputPwCheckProps> = ({
  password,
  setIsPasswordCheckValid,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasBlurred, setHasBlurred] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isError, setIsError] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    setHasBlurred(false);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (passwordCheck.trim() !== '') {
      setHasBlurred(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const isPasswordMatch = passwordCheck === password;
      setIsError(!isPasswordMatch);
      setHasBlurred(true);
      setIsPasswordCheckValid(isPasswordMatch);

      if (isPasswordMatch) {
        setIsFocused(false);
      }
    }
  };

  const handlePasswordCheckChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPasswordCheck(e.target.value);
  };

  const PasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  return (
    <div>
      <Label htmlFor="passwordCheck=">비밀번호 확인</Label>
      <InputWrapper
        isFocused={isFocused}
        isError={isError}
        hasBlurred={hasBlurred}
      >
        <Input
          isError={isError}
          type={isPasswordVisible ? 'text' : 'password'}
          value={passwordCheck}
          onChange={handlePasswordCheckChange}
          onKeyDown={handleKeyPress}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="비밀번호를 다시 입력하세요"
        />
        <IconWrapper onClick={PasswordVisibility}>
          <Image src={invisibleicon} alt="비밀번호 보이기/숨기기 아이콘" />
        </IconWrapper>
      </InputWrapper>
      {isError && <PasswordCheckLabel />}
    </div>
  );
};

export default InputPwCheck;
