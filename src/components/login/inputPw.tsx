import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { LoginContext } from '../context/LoginContext';
import Image from 'next/image';
import invisibleicon from '/public/invisibleicon.svg';
import visibleicon from '/public/visibleicon.svg';
import X from '/public/X_red.svg';

const Label = styled.label`
  display: block;
  margin-top: 22px;
  margin-bottom: 9px;
  font-size: 14px;
  color: #181818;
`;

const InputWrapper = styled.div<{
  isValid: boolean;
  isFocused: boolean;
  isError: boolean;
  isEmpty: boolean;
}>`
  display: flex;
  width: 100%;
  height: 50px;
  position: relative;
  align-items: center;

  border: 0.696px solid
    ${(props) =>
      props.isError
        ? '#ec2d30' // 오류 시 빨간 테두리
        : props.isEmpty
          ? props.isFocused
            ? '#5e52ff' // 입력이 없을 때 포커스 시 보라색 테두리
            : '#323538' // 기본 테두리
          : props.isValid
            ? '#323538' // 유효할 때 기본 테두리
            : props.isFocused
              ? '#5e52ff' // 포커스 시 보라색 테두리
              : '#323538'}; // 기본 테두리

  border-radius: 6.962px;

  background-color: ${(props) =>
    props.isValid && !props.isEmpty ? '#f5f5ff' : '#fff'};

  box-shadow: ${(props) =>
    props.isEmpty
      ? props.isFocused
        ? '2px 2px 2px 0px rgba(94, 82, 255, 0.30), -2px -2px 2px 0px rgba(94, 82, 255, 0.30)'
        : 'none'
      : props.isValid || props.isError
        ? 'none'
        : props.isFocused
          ? '2px 2px 2px 0px rgba(94, 82, 255, 0.30), -2px -2px 2px 0px rgba(94, 82, 255, 0.30)'
          : 'none'};

  padding: 12px;
  margin-bottom: 6px;
  overflow: hidden;

  img {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    padding: 5px;
    font-size: 13px;
  }
`;

const Input = styled.input<{ isError: boolean }>`
  flex: 1;
  border: none;
  outline: none;
  font-size: 15px;
  padding-right: 40px;
  margin-left: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  color: ${(props) => (props.isError ? '#ec2d30' : '#1f1f1f')};

  background-color: transparent;

  &::placeholder {
    color: #afb8c1;
  }

  @media (max-width: 768px) {
    font-size: 13px;
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

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`;

const XImg = styled(Image)`
  margin-top: -2px;
`;

const PasswordErrorMsg = styled.span`
  margin-left: 4px;
  font-size: 14px;
  color: #ec2d30;
`;

const InputPw: React.FC = () => {
  const [showPwChecked, setShowPwChecked] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isValidPassword, setIsValidPassword] = useState<boolean>(false);

  const context = useContext(LoginContext);
  if (!context) throw new Error('LoginContext를 찾을 수 없습니다.');

  const { password } = context.state;
  const { setPassword, setIsPasswordChecked } = context.actions;

  const handlePwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsPasswordChecked(false);

    const isValid = validatePassword(newPassword);
    setIsValidPassword(isValid);
    if (isValid) {
      setIsPasswordChecked(true);
    }
  };

  const handleShowPwChecked = () => {
    setShowPwChecked(!showPwChecked);
  };

  const validatePassword = (value: string) => {
    return (
      /[A-Z]/.test(value) && // 대문자 포함
      /[a-z]/.test(value) && // 소문자 포함
      /[!@#$%^&*()_+]/.test(value) && // 특수문자 포함
      /[0-9]/.test(value) && // 숫자 포함
      value.length >= 8 &&
      value.length <= 16 && // 길이 체크
      !/\s/.test(value) // 공백 체크
    );
  };

  const isError = password !== '' && !isValidPassword;
  const isEmpty = password === '';

  return (
    <div>
      <Label htmlFor="password">비밀번호</Label>
      <InputWrapper
        isFocused={isFocused}
        isValid={isValidPassword}
        isError={isError}
        isEmpty={isEmpty}
      >
        <Input
          type={showPwChecked ? 'text' : 'password'}
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handlePwChange}
          isError={isError}
        />
        <IconWrapper onClick={handleShowPwChecked}>
          <Image
            src={showPwChecked ? visibleicon : invisibleicon}
            alt="비밀번호 보이기/숨기기 아이콘"
          />
        </IconWrapper>
      </InputWrapper>
      {isError && (
        <ErrorContainer>
          <XImg src={X} alt="X" />
          <PasswordErrorMsg>
            비밀번호는 8~16자, 대/소문자, 특수문자, 숫자가 포함되어야 합니다
          </PasswordErrorMsg>
        </ErrorContainer>
      )}
    </div>
  );
};

export default InputPw;
