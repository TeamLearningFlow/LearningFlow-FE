import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { LoginContext } from '../context/LoginContext';

const Button = styled.button<{ disabled?: boolean }>`
  display: flex;
  height: 50px;
  padding: 18px 8px;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${({ disabled }) =>
    disabled ? 'rgba(100, 105, 110, 1)' : 'rgba(94, 82, 255, 1)'};
  border: none;
  border-radius: 6.962px;
  font-family: Roboto;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const AuthButton = ({ text }: { text: string }) => {
  // const [formErrorMsg, setFormErrorMsg] = useState<string>('');
  // const [isValid, setIsValid] = useState<boolean>(false);
  const [isButtonValid, setIsButtonValid] = useState<boolean>(false);

  const context = useContext(LoginContext);
  if (!context) throw new Error('LoginContext를 찾을 수 없습니다.');

  const { email, password, isValidEmail, isEmailChecked, isPasswordChecked } =
    context.state;

  const { setIsPasswordChecked, setIsFormValid, setFormErrorMsg } =
    context.actions;

  // 로그인 버튼 활성화 유무
  const buttonValid = (
    isEmailChecked: boolean,
    isValidEmail: boolean,
    isPasswordChecked: boolean,
  ): boolean => {
    return (
      isEmailChecked === true &&
      isValidEmail === true &&
      isPasswordChecked === true
    );
  };

  // 버튼 활성화 상태 업데이트
  useEffect(() => {
    setIsButtonValid(
      buttonValid(isEmailChecked, isValidEmail, isPasswordChecked),
    );
  }, [isEmailChecked, isValidEmail, isPasswordChecked]);

  // 테스트용 이메일-비밀번호
  const validateForm = (password: string): boolean => {
    if (email === 'a@naver.com' && password === '0000') return true;
    if (email === 'b@naver.com' && password === '1111') return true;
    return false;
  };

  const handleFormLogin = () => {
    const isValid = validateForm(password);
    if (isButtonValid) {
      if (isValid) {
        setFormErrorMsg('');
        setIsFormValid(true);
        alert('로그인 성공');
      } else {
        setFormErrorMsg('이메일 또는 비밀번호를 확인해주세요');
        setIsFormValid(false);
        setIsPasswordChecked(false); // 비밀번호 유효성 검사 실패
        setIsButtonValid(false); // 로그인 버튼 비활성화
        alert('로그인 실패');
      }
    }
  };

  return (
    <Button disabled={!isButtonValid} onClick={handleFormLogin}>
      {text}
    </Button>
  );
};

export default AuthButton;
