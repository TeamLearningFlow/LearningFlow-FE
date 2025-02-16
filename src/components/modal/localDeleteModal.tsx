import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useRouter } from 'next/router';
import { LoginContext } from '../../pages/context/LoginContext';

import Image from 'next/image';
import X from '../../assets/X_red.svg';
import InvisibleIcon from '../../assets/invisibleicon.svg';
import VisibleIcon from '../../assets/visibleicon.svg';
import CheckIcon from '../../assets/checkIconG.svg';
import CheckIconB from '../../assets/checkIconB.svg';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  white-space: nowrap;
`;

const ModalContainer = styled.div`
  background: white;
  width: 485px;
  padding: 36px;
  border-radius: 16px;
  text-align: center;
  background: #fff;
  white-space: nowrap;
`;

const ModalTitle = styled.h2`
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 33px */
  letter-spacing: -0.44px;
  color: #1f1f1f;
  text-align: left;
  margin-bottom: 16px;
`;

const ModalMessage = styled.p`
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 30px */
  letter-spacing: -0.4px;
  color: #64696e;
  text-align: left;
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
  color: #181818;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
  text-align: left;
`;

const InputWrapper = styled.div<{
  isFocused: boolean;
  isValid: boolean;
  isChecked: boolean;
  isEmpty: boolean;
}>`
  display: flex;
  width: 100%;
  height: 52px;
  padding: 16px 24px;
  border-radius: 6px;
  border: 1px solid
    ${({ isFocused, isValid, isChecked, isEmpty }) => {
      if (isFocused)
        return isEmpty ? '#5e52ff' : isValid ? '#5e52ff' : '#ec2d30'; // 포커스 시 테두리
      if (isChecked) return isValid ? '#323538' : '#ec2d30'; // 유효성 검사 후 테두리
      return '#323538'; // 기본 테두리
    }};
  box-shadow: ${({ isFocused, isValid, isEmpty }) =>
    isFocused && (isValid || isEmpty)
      ? '1px 1px 1px 0px rgba(94, 82, 255, 0.30), -1px -1px 1px 0px rgba(94, 82, 255, 0.30)'
      : 'none'};
`;

const Input = styled.input<{
  isInvalid: boolean;
  isEmpty: boolean;
}>`
  flex: 1;
  font-size: 15px;
  font-weight: 400;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
  color: ${(props) =>
    props.isEmpty ? '#1f1f1f' : props.isInvalid ? '#ec2d30' : '#1f1f1f'};
  border: none;
  outline: none;

  &::placeholder {
    color: #afb8c1;
  }
`;

const ValidationRow = styled.div<{ valid: boolean; isEmpty: boolean }>`
  display: flex;
  align-items: center;
  font-size: 16.257px;
  font-style: normal;
  font-weight: 400;
  line-height: 24.385px; /* 150% */
  letter-spacing: -0.325px;
  color: ${({ valid, isEmpty }) =>
    isEmpty ? '#959CA4' : valid ? '#165BFA' : '#ec2d30'};
  gap: 4px;
  margin-bottom: 24px;
  margin-top: 6px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 8px;
`;

const CancelButton = styled.button`
  background: #fff;
  color: #1f1f1f;
  border: 0.5px solid #bdc5cc;
  padding: 4px 14px;
  justify-content: center;
  align-items: center;
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 30px */
  letter-spacing: -0.4px;
  border-radius: 6px;
  cursor: pointer;
`;

const WithdrawButton = styled.button<{ disabled?: boolean }>`
  background: ${({ disabled }) => (disabled ? '#DDE0E4' : '#5e52ff')};
  color: #fff;
  border: none;
  padding: 4px 14px;
  justify-content: center;
  align-items: center;
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 30px */
  letter-spacing: -0.4px;
  border-radius: 6px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background 0.3s ease;

  &:hover {
    background: ${({ disabled }) => (disabled ? '#DDE0E4' : '#3C31C8')};
  }
`;

interface LocalDeleteModalProps {
  onClose: () => void;
}

const validatePassword = (value: string) => ({
  hasUpperLowerCase: /[A-Z]/.test(value) && /[a-z]/.test(value), // 대소문자 포함
  hasSpecialOrNumber: /[!@#$%^&*()_+0-9]/.test(value), // 특수문자, 숫자 포함
  isLengthValid: value.length >= 8 && value.length <= 16, // 길이 조건
});

const LocalDeleteModal: React.FC<LocalDeleteModalProps> = ({ onClose }) => {
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const passwordCriteria = validatePassword(password);
  const isPasswordValid = Object.values(passwordCriteria).every(Boolean);

  const router = useRouter();
  const context = useContext(LoginContext);

  if (!context) throw new Error('LoginContext를 찾을 수 없습니다.');

  const { setIsLoggedIn } = context.actions;

  const handleWithdraw = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        alert('로그인이 필요한 서비스입니다.');
        router.push('/login');
        return;
      }

      const response = await axios.delete(
        'http://onboarding.p-e.kr:8080/user/withdraw',
        {
          headers: { Authorization: `Bearer ${token}` },
          data: { password }, // 비밀번호 포함해서 요청
        },
      );

      console.log('Response:', response.data);

      if (response.data.isSuccess) {
        localStorage.removeItem('token'); // 토큰 삭제
        setIsLoggedIn(false);
        alert('회원 탈퇴가 완료되었습니다.');

        router.push('/home'); // 홈 페이지로 이동
      } else {
        alert('비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      console.error('회원 탈퇴 실패:', error);
    }
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalTitle>계정을 탈퇴하겠습니까?</ModalTitle>
        <ModalMessage>
          탈퇴 시, 계정과 관련된 모든 권한과 정보가 삭제됩니다.
        </ModalMessage>
        <Label>비밀번호</Label>
        <InputWrapper
          isFocused={isFocused}
          isValid={isPasswordValid || password === ''}
          isChecked={isChecked}
          isEmpty={password === ''}
        >
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="현재 비밀번호"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setIsChecked(true);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              if (password === '') {
                setIsChecked(false); // 입력이 없으면 기본 테두리 유지
              } else if (!isPasswordValid) {
                return; // 유효하지 않으면 빨간 테두리 유지
              }
              setIsFocused(false);
            }}
            isInvalid={!isPasswordValid}
            isEmpty={password === ''}
          ></Input>
          <Image
            src={showPassword ? VisibleIcon : InvisibleIcon}
            alt="toggle visibility"
            onClick={() => setShowPassword(!showPassword)}
            width={20}
            height={20}
            style={{ cursor: 'pointer', marginLeft: '10px' }}
          />
        </InputWrapper>
        <ValidationRow valid={isPasswordValid} isEmpty={password === ''}>
          <Image
            src={password === '' ? CheckIcon : isPasswordValid ? CheckIconB : X}
            alt={isPasswordValid ? 'valid' : 'invalid'}
            width={16}
            height={16}
            style={{ marginTop: '-2px' }}
          />
          <span>
            {isPasswordValid || password === ''
              ? '본인 확인을 위해 현재 계정의 비밀번호를 입력해주세요.'
              : '비밀번호가 일치하지 않습니다.'}
          </span>
        </ValidationRow>

        <ButtonContainer>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <WithdrawButton disabled={!isPasswordValid} onClick={handleWithdraw}>
            탈퇴하기
          </WithdrawButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default LocalDeleteModal;
