import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styled from 'styled-components';
import Image from 'next/image';
import Tooltip from '/public/emailTooltip.svg';
import X from '/public/X_red.svg';
import InvisibleIcon from '/publics/invisibleicon.svg';
import VisibleIcon from '/public/visibleicon.svg';
import CheckIcon from '/public/checkIconG.svg';
import CheckIconB from '/public/checkIconB.svg';

import EmailChangeModal from '../../components/modal/emailChangeModal';
import PasswordChangeCheckModal from '../../components/modal/passwordChangeCheckModal';
import PasswordChangeModal from '../../components/modal/passwordChangeModal';

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
  isEmpty: boolean;
}>`
  display: flex;
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  border: 0.9px solid
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
  font-size: 14px;
  font-weight: 400;
  color: ${(props) =>
    props.isEmpty ? '#1f1f1f' : props.isInvalid ? '#ec2d30' : '#1f1f1f'};
  border: none;
  outline: none;

  &::placeholder {
    color: #afb8c1;
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 6px;
  gap: 4px;
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
    top: 4px;
  }
`;

const TooltipBox = styled.div`
  visibility: hidden;
  width: auto;
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
  white-space: nowrap;
`;

const ValidationRow = styled.div<{ valid: boolean; isEmpty: boolean }>`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${({ valid, isEmpty }) =>
    isEmpty ? '#959CA4' : valid ? '#165BFA' : '#ec2d30'};
  gap: 4px;
  margin-bottom: 16px;
  margin-top: 8px;
`;

interface BasicInfoProps {
  email: string;
  socialType: string;
  isEditingPassword: boolean;
}

const BasicInfo: React.FC<BasicInfoProps> = ({
  email,
  socialType,
  isEditingPassword,
}) => {
  const [currentEmail, setCurrentEmail] = useState(email); // 현재 이메일 상태
  const [isEditingEmail, setIsEditingEmail] = useState(false); // 이메일 편집 여부
  const [originalEmail, setOriginalEmail] = useState(''); // 원래 이메일 값
  const [editedEmail, setEditedEmail] = useState(email); // 수정 중인 이메일 값
  const [isEmailEmpty, setIsEmailEmpty] = useState(true);

  const [error, setError] = useState(''); // 이메일 오류 메시지
  const [isFocused, setIsFocused] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const [isEditing, setIsEditing] = useState(isEditingPassword);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isCurrentPasswordFocused, setIsCurrentPasswordFocused] =
    useState(false);
  const [isNewPasswordFocused, setIsNewPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);

  const [isCurrentPasswordValid, setIsCurrentPasswordValid] = useState(false);
  const [isPasswordChecked, setIsPasswordChecked] = useState(false);
  const [isNewPasswordChecked, setIsNewPasswordChecked] = useState(false);
  const [isConfirmPasswordChecked, setIsConfirmPasswordChecked] =
    useState(false);
  const [isNewPasswordInvalid, setIsNewPasswordInvalid] = useState(false);
  const [isConfirmPasswordInvalid, setIsConfirmPasswordInvalid] =
    useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false); // 이메일 변경 모달
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isPasswordChangeModalOpen, setIsPasswordChangeModalOpen] =
    useState(false);

  // console.log('소셜 타입:', socialType);
  const isGoogleLogin = socialType === 'GOOGLE';

  useEffect(() => {
    setIsEditing(isEditingPassword); // prop 변경 시 업데이트
  }, [isEditingPassword]);

  const validateEmail = (value: string) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/;
    return emailRegex.test(value);
  };

  const validatePassword = (value: string) => ({
    hasUpperLowerCase: /[A-Z]/.test(value) && /[a-z]/.test(value), // 대소문자 포함
    hasSpecialOrNumber: /[!@#$%^&*()_+0-9]/.test(value), // 특수문자 또는 숫자 포함
    isLengthValid: value.length >= 8 && value.length <= 16, // 길이 조건
  });

  const validateCurrentPassword = (value: string) => {
    const criteria = validatePassword(value);
    const isValid = Object.values(criteria).every(Boolean);
    setIsCurrentPasswordValid(isValid);
  };

  const passwordCriteria = validatePassword(newPassword);
  const isPasswordValid = Object.values(passwordCriteria).every(Boolean);
  const isConfirmValid = newPassword === confirmPassword;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEditedEmail(newEmail); // 이메일 변경 상태 업데이트

    const isEmpty = newEmail.trim() === ''; // 입력값이 비었는지 확인
    setIsEmailEmpty(isEmpty); // 상태 업데이트

    const isValid = validateEmail(newEmail);
    setIsValid(isValid);
    setIsChecked(true); // 실시간으로 검사 상태 업데이트

    if (!isValid && !isEmpty) {
      setError('올바른 이메일 형식이 아닙니다');
    } else {
      setError('');
    }
  };

  /* const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    setIsPasswordChecked(false);
    setPasswordError('');
    setIsPasswordValid(true);
  }; */

  const sendEmailVerification = async (email: string) => {
    try {
      // 로컬 스토리지에서 토큰 가져오기 (로그인 시에만 접근 가능)
      const token = localStorage.getItem('token');

      if (!token) {
        alert('로그인이 필요한 서비스입니다.');
        return false;
      }

      const response = await axios.post(
        'http://onboarding.p-e.kr:8080/user/send/change-email',
        { email },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.status === 200) {
        console.log('이메일 인증 요청 성공:', response.data);
        return true;
      } else {
        throw new Error('이메일 인증 요청 실패');
      }
    } catch (error) {
      console.error('이메일 인증 요청 실패:', error);
      alert(error);
      return false;
    }
  };

  const handleSaveEmail = async () => {
    if (isGoogleLogin) {
      // alert('구글 로그인 사용자는 이메일을 변경할 수 없습니다');
      return;
    }

    if (!validateEmail(editedEmail)) {
      setError('올바른 이메일 형식이 아닙니다');
      setIsValid(false);
      return;
    }

    const isSent = await sendEmailVerification(editedEmail);

    if (isSent) {
      setIsModalOpen(true);
    } else {
      // alert('이메일 변경 요청 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleConfirmEmailChange = () => {
    setCurrentEmail(editedEmail); // 이메일 변경 적용
    setOriginalEmail(editedEmail);
    setIsEditingEmail(false);
    setIsModalOpen(false);
  };

  useEffect(() => {
    setEditedEmail(originalEmail); // 이메일 변경 즉시 반영
  }, [originalEmail]);

  // 비밀번호 변경 메일 인증 api 연결
  const sendPasswordChangeRequest = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        alert('로그인이 필요한 서비스입니다.');
        return false;
      }

      const response = await axios.post(
        'http://onboarding.p-e.kr:8080/user/send/change-password',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.status === 200) {
        console.log('비밀번호 변경 요청 성공:', response.data);
        return true;
      } else {
        throw new Error('비밀번호 변경 요청 실패');
      }
    } catch (error) {
      console.error('비밀번호 변경 요청 실패:', error);
      return false;
    }
  };

  const handlePasswordChangeRequest = async () => {
    const isSent = await sendPasswordChangeRequest(); // API 호출

    if (isSent) {
      setIsPasswordChangeModalOpen(true);
    } else {
      alert('비밀번호 변경 요청 실패');
    }
  };

  // 이메일 링크 클릭 시 토큰 검증 후 편집상태 활성화
  const router = useRouter();
  const { passwordResetCode } = router.query;

  useEffect(() => {
    if (passwordResetCode) {
      verifyPasswordResetCode(passwordResetCode as string);
    }
  }, [passwordResetCode]);

  const verifyPasswordResetCode = async (code: string) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        alert('로그인이 필요한 서비스입니다.');
        router.push('/login');
        return;
      }

      const response = await axios.get(
        `http://onboarding.p-e.kr:8080/user/change-password?passwordResetCode=${code}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.data.isSuccess) {
        setIsEditing(true); // 비밀번호 편집 상태 활성화
        console.log('비밀번호 변경 페이지로 이동 완료');
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('비밀번호 코드 검증 실패:', error);
      alert('비밀번호 재설정 코드가 유효하지 않습니다.');
      router.push('/login');
    }
  };

  // 변경된 비밀번호 저장 api 연결
  const handleSavePassword = async () => {
    if (!isPasswordValid || !isConfirmValid) {
      alert('비밀번호를 다시 확인 해주세요.');
      return; // 비밀번호가 유효하지 않으면 저장하지 않음
    }
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        alert('로그인이 필요한 서비스입니다.');
        router.push('/login');
        return;
      }

      const response = await axios.post(
        `http://onboarding.p-e.kr:8080/user/change-password?passwordResetCode=${passwordResetCode}`,
        {
          currentPassword,
          newPassword,
        },

        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.data.isSuccess) {
        setIsPasswordModalOpen(true);
      } else {
        alert('비밀번호 변경에 실패하였습니다.');
      }
    } catch (error) {
      console.error('비밀번호 변경 오류:', error);
    }
  };

  const handleCancelEmail = () => {
    setEditedEmail(currentEmail);
    setIsEditingEmail(false);
  };

  const handleCancelPassword = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsEditing(false);
    setIsPasswordChecked(false);
    setIsNewPasswordChecked(false);
    setIsConfirmPasswordChecked(false);
    setIsNewPasswordInvalid(false);
    setIsConfirmPasswordInvalid(false);
  };

  return (
    <Section>
      <SectionTitle>기본정보</SectionTitle>

      <InfoRow>
        <Label>
          이메일
          <TooltipWrapper>
            <Image src={Tooltip} alt="tooltip" width={20} height={20} />
            <TooltipBox>
              {isGoogleLogin
                ? '구글 로그인은 이메일을 변경할 수 없어요'
                : '이메일 변경 후, 재인증이 필요해요'}
            </TooltipBox>
          </TooltipWrapper>
        </Label>
        {isEditingEmail ? (
          <InputContainer>
            <InputWrapper
              isFocused={isFocused}
              isValid={isValid}
              isChecked={isChecked}
              isEmpty={isEmailEmpty}
            >
              <Input
                type="email"
                placeholder="이메일 주소를 입력하세요"
                value={editedEmail}
                onChange={handleInputChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                  if (isEmailEmpty) {
                    setIsChecked(false);
                  }
                  setIsFocused(false);
                }}
                isInvalid={!isValid}
                isEmpty={isEmailEmpty}
              />
            </InputWrapper>
            {!isValid && !isEmailEmpty && (
              <ErrorContainer>
                <Image
                  src={X}
                  alt="Error icon"
                  width={16}
                  height={16}
                  style={{ marginTop: '-2px' }}
                />
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
            <Value>{currentEmail}</Value>
            {!isGoogleLogin && !isEditingPassword && (
              <SetButton
                onClick={() => {
                  setIsEditingEmail(true);
                  setEditedEmail(originalEmail || email);
                }}
              >
                설정
              </SetButton>
            )}
          </>
        )}
      </InfoRow>

      {!isGoogleLogin && (
        <InfoRow>
          <Label>비밀번호</Label>
          {isEditing ? (
            <InputContainer>
              <InputWrapper
                isFocused={isCurrentPasswordFocused}
                isValid={isCurrentPasswordValid}
                isChecked={isPasswordChecked}
                isEmpty={currentPassword === ''}
              >
                <Input
                  type={showCurrentPassword ? 'text' : 'password'}
                  placeholder="현재 비밀번호"
                  value={currentPassword}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                    validateCurrentPassword(e.target.value);
                  }}
                  onFocus={() => setIsCurrentPasswordFocused(true)}
                  onBlur={() => {
                    if (!isCurrentPasswordValid && currentPassword !== '')
                      return;
                    setIsCurrentPasswordFocused(false);
                  }}
                  isInvalid={!isCurrentPasswordValid}
                  isEmpty={currentPassword === ''}
                />
                <Image
                  src={showCurrentPassword ? VisibleIcon : InvisibleIcon}
                  alt="toggle visibility"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  width={20}
                  height={20}
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                />
              </InputWrapper>
              <ValidationRow
                valid={isCurrentPasswordValid}
                isEmpty={currentPassword === ''}
              >
                <Image
                  src={
                    currentPassword === ''
                      ? CheckIcon
                      : isCurrentPasswordValid
                        ? CheckIconB
                        : X
                  }
                  alt={isCurrentPasswordValid ? 'valid' : 'invalid'}
                  width={16}
                  height={16}
                  style={{ marginTop: '-2px' }}
                />
                <span>
                  {isCurrentPasswordValid || currentPassword === ''
                    ? '확인을 위해 현재 비밀번호를 다시 입력해 주세요'
                    : '비밀번호가 일치하지 않습니다'}
                </span>
              </ValidationRow>

              <InputWrapper
                isFocused={isNewPasswordFocused}
                isValid={isPasswordValid}
                isChecked={isNewPasswordChecked}
                isEmpty={newPassword === ''}
              >
                <Input
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="새 비밀번호"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setIsNewPasswordChecked(true);
                    const criteria = validatePassword(e.target.value);
                    const isValid = Object.values(criteria).every(Boolean);
                    setIsNewPasswordInvalid(!isValid);
                  }}
                  onFocus={() => setIsNewPasswordFocused(true)}
                  onBlur={() => {
                    if (!isPasswordValid && newPassword !== '') return;
                    setIsNewPasswordFocused(false);
                  }}
                  isInvalid={isNewPasswordInvalid}
                  isEmpty={newPassword === ''}
                />
                <Image
                  src={showNewPassword ? VisibleIcon : InvisibleIcon}
                  alt="toggle visibility"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  width={20}
                  height={20}
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                />
              </InputWrapper>
              {Object.entries(passwordCriteria).map(([key, valid]) => (
                <ValidationRow
                  key={key}
                  valid={valid}
                  isEmpty={newPassword === ''}
                >
                  <Image
                    src={
                      newPassword === '' ? CheckIcon : valid ? CheckIconB : X
                    }
                    alt={valid ? 'valid' : 'invalid'}
                    width={16}
                    height={16}
                    style={{ marginTop: '-2px' }}
                  />
                  <span>
                    {key === 'hasUpperLowerCase' && '대소문자 포함'}
                    {key === 'hasSpecialOrNumber' && '특수문자/숫자 포함'}
                    {key === 'isLengthValid' && '8자 이상 16자 이하'}
                  </span>
                </ValidationRow>
              ))}

              <InputWrapper
                isFocused={isConfirmPasswordFocused}
                isValid={isConfirmValid}
                isChecked={isConfirmPasswordChecked}
                isEmpty={confirmPassword === ''}
              >
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="새 비밀번호 확인"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setIsConfirmPasswordChecked(true);
                    setIsConfirmPasswordInvalid(e.target.value !== newPassword);
                  }}
                  onFocus={() => setIsConfirmPasswordFocused(true)}
                  onBlur={() => {
                    if (!isConfirmValid && confirmPassword !== '') return;
                    setIsConfirmPasswordFocused(false);
                  }}
                  isInvalid={isConfirmPasswordInvalid}
                  isEmpty={confirmPassword === ''}
                />
                <Image
                  src={showConfirmPassword ? VisibleIcon : InvisibleIcon}
                  alt="toggle visibility"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  width={20}
                  height={20}
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                />
              </InputWrapper>
              <ValidationRow
                valid={isConfirmValid}
                isEmpty={confirmPassword === ''}
              >
                <Image
                  src={
                    confirmPassword === ''
                      ? CheckIcon
                      : isConfirmValid
                        ? CheckIconB
                        : X
                  }
                  alt={isConfirmValid ? 'valid' : 'invalid'}
                  width={16}
                  height={16}
                  style={{ marginTop: '-2px' }}
                />
                <span>
                  {isConfirmValid || confirmPassword === ''
                    ? '확인을 위해 새 비밀번호를 다시 입력해 주세요'
                    : '비밀번호가 일치하지 않습니다'}
                </span>
              </ValidationRow>

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
                <SetButton onClick={handlePasswordChangeRequest}>
                  설정
                </SetButton>
              )}
            </>
          )}
        </InfoRow>
      )}
      {isModalOpen && (
        <EmailChangeModal
          email={editedEmail}
          onConfirm={handleConfirmEmailChange}
        />
      )}

      {isPasswordModalOpen && (
        <PasswordChangeCheckModal
          onConfirm={() => {
            setIsPasswordModalOpen(false);
            setIsEditing(false);
          }}
          onClose={() => setIsPasswordModalOpen(false)}
        />
      )}
      {isPasswordChangeModalOpen && (
        <PasswordChangeModal
          onClose={() => setIsPasswordChangeModalOpen(false)}
        />
      )}
    </Section>
  );
};

export default BasicInfo;
