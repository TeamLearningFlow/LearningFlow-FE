import React, { useState } from 'react';
import styled from 'styled-components';
import { EmailCheckLabel } from '../register/validation';

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
  hasBlurred: boolean;
}>`
  display: flex;
  height: 50px;
  position: relative;
  align-items: center;
  border: 0.696px solid #323538;
  border-radius: 6.962px;
  padding: 12px;
  transition: box-shadow 0.3s ease;
  box-shadow: ${(props) => {
    if (props.isFocused && !props.hasBlurred && !props.isError) {
      return '2px 2px 2px 0px rgba(94, 82, 255, 0.30), -2px -2px 2px 0px rgba(94, 82, 255, 0.30)';
    }
    return 'none';
  }};
  border-color: ${(props) => (props.isError ? '#ec2d30' : '#323538')};
  background-color: ${(props) =>
    props.isError ? '#fff' : props.hasBlurred ? '#f5f5ff' : '#fff'};
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
  color: ${(props) => (props.isError ? 'rgba(236, 45, 48, 1)' : 'black')};

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
  const [isEmailChecked, setIsEmailChecked] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [hasBlurred, setHasBlurred] = useState<boolean>(false);
  const [isError, setIsError] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmailState(newEmail);
    setEmail(newEmail);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/;
    return emailRegex.test(email);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
  };

  return (
    <div>
      <Label htmlFor="email">이메일</Label>
      <InputWrapper
        isFocused={isFocused}
        isError={!isValidEmail && isEmailChecked}
        hasBlurred={hasBlurred}
      >
        <Input
          type="email"
          placeholder="이메일 주소를 적어주세요"
          value={email}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleEmailChange}
          onKeyDown={handleKeyPress}
          isError={isError}
        />
      </InputWrapper>

      {isEmailChecked && !isValidEmail && <EmailCheckLabel />}
    </div>
  );
};

export default SignupInputEmail;
