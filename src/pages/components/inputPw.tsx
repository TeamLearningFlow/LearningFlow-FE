import React, { useState, useRef, useContext } from 'react';
import styled from 'styled-components';
import { LoginContext } from '../context/LoginContext';
import Image from 'next/image';
import invisibleicon from '../assets/invisibleicon.svg';

const Label = styled.label`
  display: block;
  margin-top: 22px;
  margin-bottom: 9px;
  font-size: 14px;
  color: #181818;
`;

const InputWrapper = styled.div<{
  isFocused: boolean;
  isValid: boolean;
  isChecked: boolean;
  isError: boolean;
}>`
  display: flex;
  width: 420px;
  height: 50px;
  position: relative;
  align-items: center;

  border: 0.696px solid
    ${(props) => {
      // if (props.isError) {
      //   return '#ec2d30'; // 에러일 때 빨간색
      // }
      if (props.isFocused) {
        return props.isValid ? '#5e52ff' : '#ec2d30'; // 포커스 시 유효성에 따라 색상
      }
      // if (props.isChecked) {
      //   return props.isValid ? '#181818' : '#ec2d30'; // 유효성 검사 결과에 따라 색상
      // }
      return '#323538'; // 기본 색상
    }};
  border-radius: 6.962px;
  background-color: ${(props) => {
    if (props.isChecked) {
      // 유효성 검사가 실행되었을 때
      return props.isValid ? '#F5F5FF' : '#FFFFFF';
    } else {
      // 유효성 검사가 실행되지 않은 초기 상태
      return '#FFFFFF';
    }
  }};
  box-shadow: ${(props) =>
    props.isFocused
      ? '2px 2px 2px 0px rgba(94, 82, 255, 0.30), -2px -2px 2px 0px rgba(94, 82, 255, 0.30)'
      : 'none'}; // 포커스 시 그림자

  padding: 12px;
  margin-bottom: 6px;

  img {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`;

const Input = styled.input<{ isValid: boolean; isChecked: boolean }>`
  flex: 1;
  border: none;
  outline: none;
  font-size: 15px;
  padding-right: 40px;
  margin-left: 15px;

  color: #1f1f1f;
  background-color: ${(props) => {
    if (props.isChecked) {
      // 유효성 검사가 실행되었을 때
      return props.isValid ? '#F5F5FF' : '#FFFFFF';
    } else {
      // 유효성 검사가 실행되지 않은 초기 상태
      return '#FFFFFF';
    }
  }};

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

const LoginErrorMsg = styled.span`
  font-size: 14px;
  color: #ec2d30;
  margin-bottom: 15px;
`;

const InputPw: React.FC = () => {
  const [showPwChecked, setShowPwChecked] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isValidPassword, setIsValidPassword] = useState<boolean>(true);
  // const [formErrorMsg, setFormErrorMsg] = useState<string>('');
  // const [isChecked, setIsChecked] = useState<boolean>(false); // 유효성 검사 실행 여부 상태
  const [isError, setIsError] = useState<boolean>(false);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const context = useContext(LoginContext);
  if (!context) throw new Error('LoginContext를 찾을 수 없습니다.');

  const { password, isPasswordChecked, isFormValid, formErrorMsg } =
    context.state;
  const { setPassword, setIsPasswordChecked } = context.actions;

  const handlePwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleShowPwChecked = () => {
    setShowPwChecked(!showPwChecked);
  };

  const validatePassword = (password: string): boolean => {
    return password == '' ? false : true;
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      const isValid = validatePassword(password);
      setIsValidPassword(isValid);
      setIsPasswordChecked(true);

      if (!isValid) {
        // setFormErrorMsg('이메일 또는 비밀번호를 확인해주세요.');
        setIsError(true); // 에러 상태 설정
      }
    }
  };

  return (
    <div>
      <Label htmlFor="password">비밀번호</Label>
      <InputWrapper
        isFocused={isFocused} /* || password !== ''*/
        onBlur={() => setIsFocused(false)}
        isValid={isValidPassword}
        isChecked={isPasswordChecked}
        isError={isError}
      >
        <Input
          type={showPwChecked ? 'text' : 'password'}
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onFocus={() => setIsFocused(true)}
          onChange={handlePwChange}
          onKeyDown={handleKeyPress}
          isFocused={isFocused}
          isValid={isValidPassword}
          isChecked={isPasswordChecked}
          isError={isError}
          onBlur={() => setIsFocused(false)}
          ref={passwordRef}
        />
        <IconWrapper onClick={handleShowPwChecked}>
          <Image src={invisibleicon} alt="invisibleicon" />
        </IconWrapper>
      </InputWrapper>
      {!isFormValid && (
        <>
          <LoginErrorMsg>{formErrorMsg}</LoginErrorMsg>
        </>
      )}
    </div>
  );
};

export default InputPw;
