import React, { useState } from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div<{ isFocused: boolean; hasBlurred: boolean }>`
  display: flex;
  width: 100%;
  height: 55px;
  position: relative;
  align-items: center;
  justify-content: center;
  border: 0.696px solid #323538;
  border-radius: 6.962px;
  padding: 12px;
  margin-bottom: 25px;
  transition: box-shadow 0.3s ease;
  box-shadow: ${(props) => (props.isFocused ? '0 0 5px #5E52ff' : 'none')};
  background-color: ${(props) => (props.hasBlurred ? '#f5f5ff' : '#fff')};
`;

const Input = styled.input`
  flex: 1;
  background: transparent;
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

const Label = styled.label`
  display: block;
  margin-bottom: 12px;
  font-size: 14px;
  color: #181818;
`;

const InputEmail: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasBlurred, setHasBlurred] = useState(false);
  const [value, setValue] = useState('');

  const handleFocus = () => {
    setIsFocused(true);
    setHasBlurred(false);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (value.trim() !== '') {
      setHasBlurred(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <Label htmlFor="email">이메일</Label>
      <InputWrapper isFocused={isFocused} hasBlurred={hasBlurred}>
        <Input
          type="email"
          value={value}
          placeholder="이메일 주소를 적어주세요."
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </InputWrapper>
    </div>
  );
};

export default InputEmail;
