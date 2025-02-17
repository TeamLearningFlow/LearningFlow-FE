import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import invisibleicon from '/public/invisibleicon.svg';
import visibleicon from '/public/visibleicon.svg';
import X from '/public/X_red.svg';

const InputWrapper = styled.div<{
  isFocused: boolean;
  isError: boolean;
  // hasBlurred: boolean;
  isValid: boolean;
  isEmpty: boolean;
}>`
  display: flex;
  height: 50px;
  position: relative;
  align-items: center;
  border: 0.696px solid #323538;
  border-radius: 6.962px;
  padding: 12px;
  margin-bottom: 8px;
  transition: box-shadow 0.3s ease;
  box-shadow: ${(props) =>
    props.isError // 오류 시 그림자 제거
      ? 'none'
      : props.isFocused && props.isEmpty
        ? '2px 2px 2px 0px rgba(94, 82, 255, 0.30), -2px -2px 2px 0px rgba(94, 82, 255, 0.30)'
        : 'none'};

  border-color: ${(props) =>
    props.isError
      ? '#ec2d30' // 오류 시 빨간 테두리
      : props.isFocused && props.isEmpty
        ? '#5e52ff' // 비어있고 포커스 된 상태에서 보라색 테두리
        : '#323538'}; // 기본 테두리 색상

  background-color: ${(props) =>
    props.isValid && !props.isEmpty ? '#f5f5ff' : '#fff'};
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
  margin-left: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => (props.isError ? '#ec2d30' : '#1f1f1f')};

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
  margin-bottom: 9px;
  font-size: 14px;
  color: #181818;
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`;

const XImg = styled(Image)`
  margin-top: -2px;
`;

const ErrorText = styled.span`
  color: #ec2d30;
  font-size: 14px;
  margin-left: 4px;
`;

interface InputPwCheckProps {
  password: string;
  setIsPasswordCheckValid: React.Dispatch<React.SetStateAction<boolean>>;
  onPasswordCheckChange: (value: string) => void;
}

const InputPwCheck: React.FC<InputPwCheckProps> = ({
  password,
  setIsPasswordCheckValid,
  onPasswordCheckChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  // const [hasBlurred, setHasBlurred] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isError, setIsError] = useState(false);

  /* const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const isPasswordMatch = passwordCheck === password;
      setIsError(!isPasswordMatch);
      setHasBlurred(true);
      setIsPasswordCheckValid(isPasswordMatch); // 비밀번호 일치 여부를 부모에게 전달
    }
  }; */

  const handlePasswordCheckChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    setPasswordCheck(value);

    const isMatch = value === password;
    setIsError(!isMatch);
    setIsPasswordCheckValid(isMatch);
    onPasswordCheckChange(value);
  };

  const PasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  return (
    <div>
      <Label htmlFor="passwordCheck=">비밀번호 확인</Label>
      <InputWrapper
        isFocused={isFocused}
        isError={isError}
        // hasBlurred={hasBlurred}
        isValid={passwordCheck === password}
        isEmpty={passwordCheck === ''}
      >
        <Input
          type={isPasswordVisible ? 'text' : 'password'}
          value={passwordCheck}
          isError={isError}
          onChange={handlePasswordCheckChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="비밀번호를 다시 입력하세요"
        />
        <IconWrapper onClick={PasswordVisibility}>
          <Image
            src={isPasswordVisible ? visibleicon : invisibleicon}
            alt="비밀번호 보이기/숨기기 아이콘"
          />
        </IconWrapper>
      </InputWrapper>
      {isError && (
        <ErrorContainer>
          <XImg src={X} alt="X" />
          <ErrorText>비밀번호가 일치하지 않습니다</ErrorText>
        </ErrorContainer>
      )}
    </div>
  );
};

export default InputPwCheck;
