import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import invisibleicon from '../assets/invisibleicon.svg';

const InputWrapper = styled.div<{ isFocused: boolean, isError: boolean, hasBlurred: boolean }>`
  display: flex;
  height: 55px;
  position: relative;
  align-items: center;
  border: 0.696px solid #323538;
  border-radius: 6.962px;
  padding: 12px;
  margin-bottom: 10px;
  transition: box-shadow 0.3s ease;
  box-shadow: ${(props) =>
    props.isError ? 'none' : props.isFocused ? '0 0 5px #5E52ff' : 'none'};
  border-color: ${(props) => (props.isError ? 'red' : '#323538')};
  background-color: ${(props) => 
    props.isError ? '#fff' : props.hasBlurred ? '#f5f5ff' : '#fff'};
`;


const Input = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 15px;
  padding-right: 40px;
  margin-left: 15px;

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
  margin-bottom: 12px;
  font-size: 14px;
  color: #181818;
`;

const ErrorText = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const InputPwCheck: React.FC<{ password: string }> = ({ password }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasBlurred, setHasBlurred] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isError, setIsError] = useState(false);
  const [value, setValue] = useState('');

  const handleFocus = () => {
    setIsFocused(true);
    setHasBlurred(false);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (value.trim() !== '') {
      setHasBlurred(true);
    }
  };

  const handlePasswordCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);
    const isPasswordMatch = e.target.value === password;
    setIsError(!isPasswordMatch);
    setHasBlurred(isPasswordMatch);
  };
  

  const PasswordVisibility = () => setIsPasswordVisible(prev => !prev);

  return (
    <div>
      <Label htmlFor="passwordCheck">비밀번호 확인</Label>
      <InputWrapper isFocused={isFocused} isError={isError} hasBlurred={hasBlurred}>
        <Input
          type={isPasswordVisible ? 'text' : 'password'}
          value={passwordCheck}
          onChange={handlePasswordCheckChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="비밀번호를 다시 입력하세요"
        />
        <IconWrapper onClick={PasswordVisibility}>
          <Image src={invisibleicon} alt="비밀번호 보이기/숨기기 아이콘" />
        </IconWrapper>
      </InputWrapper>
      {isError && <ErrorText>비밀번호가 틀렸습니다!</ErrorText>}
    </div>
  );
};

export default InputPwCheck;
