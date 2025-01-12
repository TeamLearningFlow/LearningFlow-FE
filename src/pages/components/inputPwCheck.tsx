import React,{useState} from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import invisibleicon from '../assets/invisibleicon.svg';

const InputWrapper = styled.div<{ isFocused: boolean }>`
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
    props.isFocused ? '0 0 5px #5E52ff' : 'none'};

  img {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`;

const Input = styled.input`
  flex: 1;
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

const InputPwCheck: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  
  const PasswordVisibility = () => setIsPasswordVisible(prev => !prev);

  return (
    <div>
      <Label htmlFor="password">비밀번호 확인</Label>
      <InputWrapper isFocused={isFocused}>
        <Input
          type={isPasswordVisible ? 'text' : 'password'}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <IconWrapper onClick={PasswordVisibility}>
          <Image src={invisibleicon} alt="비밀번호 보이기/숨기기 아이콘" />
        </IconWrapper>
      </InputWrapper>
    </div>
  );
};

export default InputPwCheck;
