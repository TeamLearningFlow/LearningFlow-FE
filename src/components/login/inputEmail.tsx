import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { LoginContext } from '../context/LoginContext';
import Image from 'next/image';
import X from '../../assets/X_red.svg';

const Label = styled.label`
  display: block;
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
  border-radius: 6.962px;

  border: 0.696px solid #323538;
  border-color: ${(props) =>
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

  overflow: hidden;
  padding: 12px;
  margin-bottom: 7px;

  @media (max-width: 768px) {
    padding: 5px;
    font-size: 13px;
  }
`;

const Input = styled.input<{
  isError: boolean;
}>`
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
  background: transparent;

  &::placeholder {
    color: #afb8c1;
  }

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`;

const XImg = styled(Image)`
  margin-top: -2px;
`;

const EmailErrorMsg = styled.span`
  margin-left: 4px;
  font-size: 14px;
  color: #ec2d30;
`;

const InputEmail: React.FC = () => {
  // const [errorMessage, setErrorMessage] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  // const [isChecked, setIsChecked] = useState<boolean>(false); // 유효성 검사 실행 여부 상태

  const context = useContext(LoginContext);
  if (!context) throw new Error('LoginContext를 찾을 수 없습니다.');

  const { email, isValidEmail } = context.state;
  const { setEmail, setIsValidEmail, setIsEmailChecked } = context.actions;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsEmailChecked(false);

    const isValid = validateEmail(newEmail);
    setIsValidEmail(isValid);
    if (isValid) {
      setIsEmailChecked(true);
    }
  };

  const validateEmail = (email: string): boolean => {
    // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // 비표준 TLD도 허용
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/;
    return emailRegex.test(email);
  };

  const isError = email !== '' && !isValidEmail;
  const isEmpty = email === '';

  return (
    <div>
      <Label htmlFor="email">이메일</Label>
      <InputWrapper
        isFocused={isFocused}
        isValid={isValidEmail}
        isError={isError}
        isEmpty={isEmpty}
      >
        <Input
          type="email"
          placeholder="이메일 주소를 적어주세요"
          value={email}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleEmailChange}
          isError={isError}
        />
      </InputWrapper>
      {isError && (
        <ErrorContainer>
          <XImg src={X} alt="X" />
          <EmailErrorMsg>이메일 형식이 올바르지 않습니다</EmailErrorMsg>
        </ErrorContainer>
      )}
    </div>
  );
};

export default InputEmail;
