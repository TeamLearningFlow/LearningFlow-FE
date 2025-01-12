import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Image from 'next/image';
import invisibleicon from '../assets/invisibleicon.svg';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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

const InputPw: React.FC<{ setPassword: React.Dispatch<React.SetStateAction<string>> }> = ({ setPassword }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleFocus = () => setIsFocused(true);

  const PasswordVisibility = () => setIsPasswordVisible(prev => !prev);

  const schema = yup.object().shape({
    password: yup
      .string()
      .min(8, '8자 이상 16자 이하')
      .max(16, '8자 이상 16자 이하')
      .matches(/[a-zA-Z]/, '영문자 포함')
      .matches(/\d/, '숫자 포함')
      .matches(/[!@#$%^&*()_+]/, '특수문자 포함')
      .required('비밀번호를 반드시 입력해주세요.'),
  });

  const { register, formState: { errors, isValid }, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  return (
    <div>
      <Label htmlFor="password">비밀번호</Label>
      <InputWrapper isFocused={isFocused}>
        <Input
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder="영문, 숫자, 특수문자 포함 8~16자"
          onFocus={handleFocus}
          {...register('password')}
          onChange={(e) => setPassword(e.target.value)}
        />
        <IconWrapper onClick={PasswordVisibility}>
          <Image src={invisibleicon} alt="비밀번호 보이기/숨기기 아이콘" />
        </IconWrapper>
      </InputWrapper>
    </div>
  );
};

export default InputPw;
