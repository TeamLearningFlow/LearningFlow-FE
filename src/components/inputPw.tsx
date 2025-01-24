import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { LoginContext } from '../pages/context/LoginContext';
import Image from 'next/image';
import invisibleicon from '../assets/invisibleicon.svg'; /*.svg 계속 오류나서 .png로 바꿈*/
import visibleicon from '../assets/visibleicon.svg';

const Label = styled.label`
  display: block;
  margin-top: 22px;
  margin-bottom: 9px;
  font-size: 14px;
  color: #181818;
`;

const InputWrapper = styled.div<{
  isFocused: boolean;
  isValid: boolean;
  isChecked: boolean;
  isError: boolean;
}>`
  display: flex;
  width: 100%;
  height: 50px;
  position: relative;
  align-items: center;

  border: 0.696px solid
    ${(props) => {
      if (props.isError) {
        return '#ec2d30'; // 오류 상태일 때 빨간 테두리
      }
      if (props.isFocused) {
        return props.isValid ? '#5e52ff' : '#ec2d30'; // 포커스 상태
      }
      return '#181818'; // 기본 상태
    }};

  border-radius: 6.962px;

  background-color: ${(props) => {
    if (props.isChecked) {
      // 유효성 검사가 실행되었을 때
      return props.isValid ? '#F5F5FF' : '#FFFFFF';
    }
    // 유효성 검사가 실행되지 않은 초기 상태
    return '#FFFFFF';
  }};
  box-shadow: ${(props) => {
    if (props.isError) {
      return 'none'; // 오류 상태일 때 그림자 제거
    }
    if (props.isFocused && props.isValid) {
      return '2px 2px 2px 0px rgba(94, 82, 255, 0.30), -2px -2px 2px 0px rgba(94, 82, 255, 0.30)';
    }
    return 'none'; // 기본 상태
  }};

  padding: 12px;
  margin-bottom: 6px;
  overflow: hidden;

  img {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`;

const Input = styled.input<{ isValid: boolean; isError: boolean }>`
  flex: 1;
  border: none;
  outline: none;
  font-size: 15px;
  padding-right: 40px;
  margin-left: 15px;
  overflow: hidden;
  text-overflow: ellipsis;

  color: ${(props) =>
    props.isError
      ? '#ec2d30' // 로그인 실패 시 빨간색
      : '#1f1f1f'};

  background-color: transparent;

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

const LoginErrorMsg = styled.span`
  font-size: 14px;
  color: #ec2d30;
  margin-bottom: 15px;
`;

const InputPw: React.FC = () => {
  const [showPwChecked, setShowPwChecked] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const context = useContext(LoginContext);
  if (!context) throw new Error('LoginContext를 찾을 수 없습니다.');

  const { password, isPasswordChecked, formErrorMsg } = context.state;
  const { setPassword, setIsPasswordChecked, setFormErrorMsg } =
    context.actions;

  const handlePwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setIsPasswordChecked(false); // 입력 중에는 유효성 검사 초기화
    setFormErrorMsg(''); // 입력 중에는 오류 메시지 제거
  };

  const handleShowPwChecked = () => {
    setShowPwChecked(!showPwChecked);
  };

  const validatePassword = (password: string): boolean => {
    return password !== ''; // 빈 값이 아니면 유효
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      if (!validatePassword(password)) {
        setFormErrorMsg('이메일 또는 비밀번호를 확인해주세요');
        setIsPasswordChecked(false);
      } else {
        setFormErrorMsg(''); // 오류 메시지 초기화
        setIsPasswordChecked(true); // 성공
        setIsFocused(false); // 포커스 초기회
      }
    }
  };

  return (
    <div>
      <Label htmlFor="password">비밀번호</Label>
      <InputWrapper
        isFocused={isFocused}
        isValid={formErrorMsg === ''} // 오류 메시지 없으면 유효
        isChecked={isPasswordChecked}
        isError={formErrorMsg !== ''} // 오류 메시지 있으면 에러 상태
      >
        <Input
          type={showPwChecked ? 'text' : 'password'}
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onFocus={() => {
            setIsFocused(true);
            setFormErrorMsg(''); // 포커스 시 오류 메시지 제거
          }}
          onChange={handlePwChange}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyPress}
          isValid={formErrorMsg === ''} // 오류 메시지 없으면 유효
          isError={formErrorMsg !== ''} // 오류일 때 글씨 빨간색
        />
        <IconWrapper onClick={handleShowPwChecked}>
          <Image
            src={showPwChecked ? visibleicon : invisibleicon}
            alt="비밀번호 보이기/숨기기 아이콘"
          />
        </IconWrapper>
      </InputWrapper>
      {formErrorMsg && <LoginErrorMsg>{formErrorMsg}</LoginErrorMsg>}
    </div>
  );
};

export default InputPw;
