import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  display: flex;
  width: 440px;
  height: 55px;
  position: relative;
  align-items: center;
  border: 0.696px solid #323538;
  border-radius: 6.962px;
  padding: 12px;
  margin-bottom: 25px;
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

const Label = styled.label`
  display: block;
  margin-bottom: 12px;
  font-size: 14px;
  color: #181818;
`;

const InputEmail: React.FC = () => {
  return (
    <div>
      <Label htmlFor="email">이메일</Label>
      <InputWrapper>
        <Input type="email" placeholder="이메일 주소를 적어주세요." />
      </InputWrapper>
    </div>
  );
};

export default InputEmail;
