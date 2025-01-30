import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { LoginContext } from '../../pages/context/LoginContext';
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
  background-color: ${(props) => {
    if (props.isChecked) {
      // 유효성 검사가 실행되었을 때
      return props.isValid ? '#F5F5FF' : '#FFFFFF';
    } else {
      // 유효성 검사가 실행되지 않은 초기 상태
      return '#FFFFFF';
    }
  }};
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
  background-color: ${(props) => {
    if (props.isChecked) {
      // 유효성 검사가 실행되었을 때
      return props.isValid ? '#F5F5FF' : 'transparent';
    } else {
      // 유효성 검사가 실행되지 않은 초기 상태
      return 'transparent';
    }
  }};

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

const InputEmail: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  // const [isChecked, setIsChecked] = useState<boolean>(false); // 유효성 검사 실행 여부 상태

  const context = useContext(LoginContext);
  if (!context) throw new Error('LoginContext를 찾을 수 없습니다.');

  const { email, isValidEmail, isEmailChecked } = context.state;
  const { setEmail, setIsValidEmail, setIsEmailChecked } = context.actions;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsEmailChecked(false); // 입력 중에는 유효성 검사 결과 초기화
  };

  const validateEmail = (email: string): boolean => {
    // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // 비표준 TLD도 허용
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov|io|ai)$/; // 표준 TLD만 허용
    return emailRegex.test(email);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const isValid = validateEmail(email);
      setIsValidEmail(isValid);
      setIsEmailChecked(true); // 유효성 검사 실행 여부를 true로 설정
      setErrorMessage(isValid ? '' : '이메일 형식이 올바르지 않습니다');
      if (isValid) {
        setIsFocused(false); // 유효성 검사 성공 시 포커스 해제
      }
    }
  };

  return (
    <div>
      <Label htmlFor="email">이메일</Label>
      <InputWrapper
        isValid={isValidEmail}
        isFocused={isFocused} /*|| email !== ''*/
        onBlur={() => setIsFocused(false)}
        isChecked={isEmailChecked}
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
          isChecked={isEmailChecked}
        />
      </InputWrapper>
      {!isValidEmail && (
        <>
          <ErrorContainer>
            <XImg src={X} alt="X" />
            <EmailErrorMsg>{errorMessage}</EmailErrorMsg>
          </ErrorContainer>
        </>
      )}
    </div>
  );
};

export default InputEmail;
