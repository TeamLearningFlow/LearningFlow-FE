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
  font-family: Pretendard;
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
  font-family: Pretendard;
  font-size: 14px;
  color: #181818;
`;

const InputBox: React.FC = () => {
  return (
    <div>
      <div>
        <Label htmlFor="email">이메일</Label>
        <InputWrapper>
          <Input type="email" placeholder="이메일 주소를 적어주세요." />
        </InputWrapper>
      </div>
      <div>
        <Label htmlFor="password">비밀번호</Label>
        <InputWrapper>
          <Input type="password" placeholder="" />
          <IconWrapper>
            <Image src={invisibleicon} alt="invisibleicon" />
          </IconWrapper>
        </InputWrapper>
      </div>
      <div>
        <Label htmlFor="password-check">비밀번호 확인</Label>
        <InputWrapper>
          <Input type="password" placeholder="" />
          <IconWrapper>
            <Image src={invisibleicon} alt="invisibleicon" />
          </IconWrapper>
        </InputWrapper>
      </div>
    </div>
  );
};

export default InputBox;
