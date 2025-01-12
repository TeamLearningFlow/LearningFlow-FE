import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import invisibleicon from '../assets/invisibleicon.svg';

const InputWrapper = styled.div<{
  isFocused: boolean; //
  isValid: boolean;
}>`
  display: flex;
  width: 440px;
  height: 55px;
  position: relative;
  align-items: center;
  border: 0.696px solid
    ${(props) =>
      props.isFocused
        ? '#5E52FF' // 포커스 시
        : props.isValid
          ? '#181818' // 기본 테두리
          : '#181818'};
  background-color: ${(props) => (props.isValid ? '#F5F5FF' : '#FFFFFF')};
  border-radius: 6.962px;
  padding: 12px;
  margin-bottom: 10px;
  box-shadow: ${(props) =>
    props.isFocused
      ? '2px 2px 2px 0px rgba(94, 82, 255, 0.30), -2px -2px 2px 0px rgba(94, 82, 255, 0.30)'
      : 'none'}; // 포커스 시 그림자

  img {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`;

const Input = styled.input<{ isValid: boolean }>`
  flex: 1;
  border: none;
  outline: none;
  font-size: 15px;
  padding-right: 40px;
  margin-left: 15px;
  color: #1f1f1f;
  background-color: ${(props) => (props.isValid ? '#F5F5FF' : '#FFFFFF')};

  &::placeholder {
    color: #afb8c1;
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

/** const ErrorMessage = styled.p`
  width: 440px;
  font-size: 15px;
  font-weight: 400;
  color: #ec2d30;
  margin: 4px 0 16px;
`; **/

const InputPw: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isFocused, setFocused] = useState(false);
  const [isValid, setValid] = useState(false); // 엔터 후 활성화 상태 관리

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setValid(true); // 엔터를 누르면 활성화 상태로 변경
      setFocused(false); // 포커스 상태 해제
    }
  };

  /** 비밀번호 유효성 검사
  const isPasswordValid =
    password.length >= 8 && // 최소 8자
    password.length <= 16 && // 최대 16자
    /[A-Z]/.test(password) && // 대문자 포함
    /[a-z]/.test(password) && // 소문자 포함
    /[!@#$%^&*]/.test(password); // 특수문자 포함 **/

  return (
    <div>
      <Label htmlFor="password">비밀번호</Label>
      <InputWrapper isFocused={isFocused} isValid={isValid}>
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          isValid={isValid}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setFocused(true)} // 포커스 시
          onBlur={() => setFocused(false)} // 포커스 해제 시
          onKeyPress={handleKeyPress} // 엔터 키 입력 시
        />
        <IconWrapper>
          <Image src={invisibleicon} alt="invisibleicon" />
        </IconWrapper>
      </InputWrapper>
    </div>
  );
};

export default InputPw;
