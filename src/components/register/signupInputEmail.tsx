import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import X from '../../assets/X_red.svg';
// import { EmailCheckLabel } from '../register/validation';

const Label = styled.label`
  display: block;
  margin-bottom: 9px;
  margin-top: 28px;
  font-size: 14px;
  color: #181818;

  @media (max-width: 1024px) {
    margin-top: 13px;
  }
`;

const InputWrapper = styled.div<{
  isFocused: boolean;
  isError: boolean;
  // hasBlurred: boolean;
  isValid: boolean;
  isEmpty: boolean;
}>`
  display: flex;
  height: 50px;
  position: relative;
  align-items: center;
  border: 0.696px solid #323538;
  border-radius: 6.962px;
  margin-bottom: 8px;
  padding: 12px;
  transition: box-shadow 0.3s ease;

  box-shadow: ${(props) =>
    props.isValid || props.isError
      ? 'none' // 유효하거나 오류 상태일 때는 그림자 제거
      : props.isFocused
        ? '2px 2px 2px 0px rgba(94, 82, 255, 0.30), -2px -2px 2px 0px rgba(94, 82, 255, 0.30)'
        : 'none'};

  border-color: ${(props) =>
    props.isError
      ? '#ec2d30' // 오류 시 빨간 테두리
      : props.isValid
        ? '#323538' // 유효할 때 기본 테두리
        : props.isFocused
          ? '#5e52ff' // 포커스 시 보라색 테두리
          : '#323538'}; // 기본 테두리

  background-color: ${(props) =>
    props.isValid && !props.isEmpty ? '#f5f5ff' : '#fff'};
  overflow: hidden;

  img {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    padding: 0;
    font-size: 13px;
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
  padding-right: 40px;
  margin-left: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => (props.isError ? '#ec2d30' : '#1f1f1f')};

  &::placeholder {
    color: #afb8c1;
  }

  &:focus {
    outline: none;
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

const ErrorText = styled.span`
  color: #ec2d30;
  font-size: 14px;
  margin-left: 4px;
`;

interface InputEmailProps {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setIsEmailValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignupInputEmail: React.FC<InputEmailProps> = ({
  setEmail,
  setIsEmailValid,
}) => {
  const [email, setEmailState] = useState<string>('');
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  // const [isEmailChecked, setIsEmailChecked] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  // const [hasBlurred, setHasBlurred] = useState<boolean>(false);
  const [isError, setIsError] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmailState(newEmail);
    setEmail(newEmail);

    const isValid = validateEmail(newEmail);
    setIsValidEmail(isValid);
    setIsEmailValid(isValid);
    setIsError(!isValid && newEmail !== ''); // 입력 값이 있고 유효하지 않을 때만 오류 표시
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/;
    return emailRegex.test(email);
  };

  /* const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const isValid = validateEmail(email);
      setIsError(!isValid);
      setIsValidEmail(isValid);
      setIsEmailChecked(true);
      setHasBlurred(true);
      setIsEmailValid(isValid);

      if (isValid) {
        setIsFocused(false);
      }
    }
  }; */

  return (
    <div>
      <Label htmlFor="email">이메일</Label>
      <InputWrapper
        isFocused={isFocused}
        isError={isError}
        isValid={isValidEmail}
        isEmpty={email === ''}
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
          <ErrorText>이메일 형식이 올바르지 않습니다</ErrorText>
        </ErrorContainer>
      )}
    </div>
  );
};

export default SignupInputEmail;
