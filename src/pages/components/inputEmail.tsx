import React, { useState } from 'react';
import styled from 'styled-components';
import { EmailCheckLabel } from './validation';

const Label = styled.label`
  display: block;
  margin-bottom: 9px;
  margin-top: 28px;
  font-size: 14px;
  color: #181818;
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
  margin-bottom: 23px;
  transition: box-shadow 0.3s ease;
  box-shadow: ${(props) =>
    props.isError ? 'none' : props.isFocused ? '0 0 5px #5E52ff' : 'none'};
  border-color: ${(props) => (props.isError ? '#ec2d30' : '#323538')};
  background-color: ${(props) =>
    props.isError ? '#fff' : props.hasBlurred ? '#f5f5ff' : '#fff'};
  overflow: hidden;

  img {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`;

const Input = styled.input`
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

  &::placeholder {
    color: #afb8c1;
  }

  &:focus {
    outline: none;
  }
`;

interface InputEmailProps {
  setIsEmailValid: React.Dispatch<React.SetStateAction<boolean>>;
}


const InputEmail: React.FC<InputEmailProps> = ({ setIsEmailValid }) => {
  const [email, setEmail] = useState<string>('');
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [isEmailChecked, setIsEmailChecked] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [hasBlurred, setHasBlurred] = useState<boolean>(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/;
    return emailRegex.test(email);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const isValid = validateEmail(email);
      setIsValidEmail(isValid);
      setIsEmailChecked(true);
      setHasBlurred(true);
      setIsEmailValid(isValid); // 부모 컴포넌트로 유효성 전달
    }
  };

  return (
    <div>
      <Label htmlFor="email">이메일</Label>
      <InputWrapper isFocused={isFocused} isError={!isValidEmail && isEmailChecked} hasBlurred={hasBlurred}>
        <Input
          type="email"
          placeholder="이메일 주소를 적어주세요"
          value={email}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleEmailChange}
          onKeyDown={handleKeyPress}
        />
      </InputWrapper>

      {isEmailChecked && !isValidEmail && <EmailCheckLabel />}
    </div>
  );
};

export default InputEmail;
