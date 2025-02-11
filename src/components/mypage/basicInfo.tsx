import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Image from 'next/image';
import Tooltip from '../../assets/emailTooltip.svg';
import X from '../../assets/X_red.svg';
import InvisibleIcon from '../../assets/invisibleicon.svg';
import VisibleIcon from '../../assets/visibleicon.svg';

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: 600;
  color: #000;
  margin-bottom: 23px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: start;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    flex-direction: column;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const Label = styled.div`
  width: 120px;
  font-size: 17px;
  font-weight: 400;
  line-height: 30px; /* 150% */
  letter-spacing: -0.4px;
  color: #000;
`;

const Value = styled.div`
  flex: 1;
  font-size: 17px;
  font-weight: 600;
  line-height: 30px; /* 150% */
  letter-spacing: -0.4px;
  color: #000;
`;

const InputContainer = styled.div`
  width: 100%;
`;

const InputWrapper = styled.div<{
  isFocused: boolean;
  isValid: boolean;
  isChecked: boolean;
}>`
  display: flex;
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  border: 0.9px solid
    ${({ isFocused, isValid, isChecked }) => {
      if (isFocused) return isValid ? '#5e52ff' : '#ec2d30'; // 포커스 시 테두리
      if (isChecked) return isValid ? '#323538' : '#ec2d30'; // 유효성 검사 후 테두리
      return '#323538'; // 기본 테두리
    }};
  box-shadow: ${({ isFocused, isValid }) =>
    isFocused && isValid
      ? '1px 1px 1px 0px rgba(94, 82, 255, 0.30), -1px -1px 1px 0px rgba(94, 82, 255, 0.30)'
      : 'none'};
`;

const Input = styled.input<{ isValid: boolean }>`
  flex: 1;
  font-size: 14px;
  font-weight: 400;
  color: ${({ isValid }) => (isValid ? '#1f1f1f' : '#ec2d30')};
  border: none;
  outline: none;
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  gap: 6px;
  color: #ec2d30;
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-size: 14px;
  font-weight: 400;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
`;

const SetButton = styled.button`
  padding: 6px 12px;
  border: 0.5px solid #bdc5cc;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #1f1f1f;

  &:hover {
    background: rgba(118, 118, 128, 0.12);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 5px;
  position: relative;
  justify-content: flex-end;
  margin-top: 8px;
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 6px 12px;
  border: 0.5px solid #bdc5cc;
  border-radius: 6px;
  background-color: ${({ primary }) => (primary ? '#5e52ff' : '#ffffff')};
  color: ${({ primary }) => (primary ? '#ffffff' : '#000')};
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: ${({ primary }) =>
      primary ? '#3c31c8' : 'rgba(118, 118, 128, 0.12)'};
  }
`;

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
  align-items: center;
  margin-left: 5px;

  &:hover div {
    visibility: visible;
    opacity: 1;
  }

  img {
    position: relative;
    top: 3px;
  }
`;

const TooltipBox = styled.div`
  visibility: hidden;
  width: 180px;
  background-color: #4f5357;
  color: #ffffff;
  font-size: 12px;
  text-align: center;
  padding: 0px 8px;
  border-radius: 4px;
  position: absolute;
  bottom: -26px;
  left: 0px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 10;
`;

interface BasicInfoProps {
  email: string;
  // birthDay: string;
}

const BasicInfo = () => {
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [originalEmail, setOriginalEmail] = useState(''); // 이메일
  const [originalPassword, setOriginalPassword] = useState(''); // 비밀번호
  const [email, setEmail] = useState(originalEmail);
  const [password, setPassword] = useState(originalPassword);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPasswordChecked, setIsPasswordChecked] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const validateEmail = (value: string) => {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov|io|ai)$/;
    return emailRegex.test(value);
  };

  const validatePassword = (value: string) => {
    const conditions = {
      hasUpperCase: /[A-Z]/.test(value),
      hasLowerCase: /[a-z]/.test(value),
      hasSpecialChar: /[!@#$%^&*()_+]/.test(value),
      hasNumber: /[0-9]/.test(value),
      isLengthValid: value.length >= 8 && value.length <= 16,
      hasNoSpaces: !/\s/.test(value),
    };
    return Object.values(conditions).every(Boolean);
  };

  // API 호출
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://onboarding.p-e.kr:8080/user');
        const data = response.data;

        // 이메일과 비밀번호 초기값 설정
        setOriginalEmail(data.email);
        setOriginalPassword('********'); // 보안 유지

        setEmail(data.email);
        setPassword('********');
      } catch (error) {
        console.error('사용자 정보 불러오기 실패:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsChecked(false);
    setError('');
    setIsValid(true);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setIsPasswordChecked(false);
    setPasswordError('');
    setIsPasswordValid(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const isValidEmail = validateEmail(email);
      setIsValid(isValidEmail);
      setIsChecked(true);
      setError(isValidEmail ? '' : '올바른 이메일 형식이 아닙니다');
      if (isValid) {
        setIsFocused(false);
      }
    }
  };

  const handlePasswordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const isValidPassword = validatePassword(password);
      setIsPasswordValid(isValidPassword);
      setIsPasswordChecked(true);
      setPasswordError(
        isValidPassword
          ? ''
          : '비밀번호는 8~16자, 대소문자, 특수문자, 숫자가 포함되어야 합니다',
      );
      if (isValidPassword) {
        setIsPasswordFocused(false);
      }
    }
  };

  const handleSaveEmail = () => {
    if (validateEmail(email)) {
      setOriginalEmail(email); // 변경된 이메일 저장
      setIsEditingEmail(false);
    } else {
      setError('올바른 이메일 형식이 아닙니다');
    }
  };

  const handleSavePassword = () => {
    if (validatePassword(password)) {
      setOriginalPassword(password); // 변경된 비밀번호 저장
      setIsEditingPassword(false);
    } else {
      setPasswordError(
        '비밀번호는 8~16자, 대소문자, 특수문자, 숫자가 포함되어야 합니다',
      );
    }
  };

  const handleCancelEmail = () => {
    setEmail(originalEmail);
    setIsEditingEmail(false);
  };

  const handleCancelPassword = () => {
    setPassword(originalPassword);
    setIsEditingPassword(false);
  };

  return (
    <Section>
      <SectionTitle>기본정보</SectionTitle>

      <InfoRow>
        <Label>
          이메일
          <TooltipWrapper>
            <Image src={Tooltip} alt="tooltip" width={20} height={20} />
            <TooltipBox>이메일 변경 후, 재인증이 필요해요</TooltipBox>
          </TooltipWrapper>
        </Label>
        {isEditingEmail ? (
          <InputContainer>
            <InputWrapper
              isFocused={isFocused}
              isValid={isValid}
              isChecked={isChecked}
            >
              <Input
                type="email"
                placeholder="이메일 주소를 입력하세요"
                value={email}
                onChange={handleInputChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={handleKeyDown}
                isValid={isValid}
              />
            </InputWrapper>
            {!isValid && (
              <ErrorContainer>
                <Image src={X} alt="Error icon" width={16} height={16} />
                <span>{error}</span>
              </ErrorContainer>
            )}
            <ButtonContainer>
              <Button onClick={handleCancelEmail}>취소</Button>
              <Button primary onClick={handleSaveEmail}>
                저장
              </Button>
            </ButtonContainer>
          </InputContainer>
        ) : (
          <>
            <Value>{email}</Value>
            {!isEditingPassword && (
              <SetButton onClick={() => setIsEditingEmail(true)}>
                설정
              </SetButton>
            )}
          </>
        )}
      </InfoRow>

      <InfoRow>
        <Label>비밀번호</Label>
        {isEditingPassword ? (
          <InputContainer>
            <InputWrapper
              isFocused={isPasswordFocused}
              isValid={isPasswordValid}
              isChecked={isPasswordChecked}
            >
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={handlePasswordChange}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                onKeyDown={handlePasswordKeyDown}
                isValid={isPasswordValid}
              />
              <Image
                src={showPassword ? VisibleIcon : InvisibleIcon}
                alt="toggle visibility"
                onClick={() => setShowPassword(!showPassword)}
                width={20}
                height={20}
                style={{ cursor: 'pointer', marginLeft: '10px' }}
              />
            </InputWrapper>
            {passwordError && (
              <ErrorContainer>
                <Image src={X} alt="Error icon" width={16} height={16} />
                <span>{passwordError}</span>
              </ErrorContainer>
            )}
            <ButtonContainer>
              <Button onClick={handleCancelPassword}>취소</Button>
              <Button primary onClick={handleSavePassword}>
                저장
              </Button>
            </ButtonContainer>
          </InputContainer>
        ) : (
          <>
            <Value>**********</Value>
            {!isEditingEmail && (
              <SetButton onClick={() => setIsEditingPassword(true)}>
                설정
              </SetButton>
            )}
          </>
        )}
      </InfoRow>
    </Section>
  );
};

export default BasicInfo;
