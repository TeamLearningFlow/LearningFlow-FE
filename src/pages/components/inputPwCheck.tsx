import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import invisibleicon from '../assets/invisibleicon.svg';

const InputWrapper = styled.div`
  display: flex;
  height: 55px;
  position: relative;
  align-items: center;
  border: 0.696px solid #323538;
  border-radius: 6.962px;
  padding: 12px;
  margin-bottom: 27px;

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
  return (
    <div>
      <Label htmlFor="password-check">비밀번호 확인</Label>
      <InputWrapper>
        <Input type="password" placeholder="" />
        <IconWrapper>
          <Image src={invisibleicon} alt="invisibleicon" />
        </IconWrapper>
      </InputWrapper>
    </div>
  );
};

export default InputPwCheck;
