import React from 'react';
import styled from 'styled-components';
import { IoCheckmark } from 'react-icons/io5';
import { HiXMark } from 'react-icons/hi2';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ValidationWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const RedWrapper = styled(Wrapper)`
  color: rgba(236, 45, 48, 1);
  margin-bottom: 8px;
`;

const ValidationBox = styled(Wrapper)<{ isValid: boolean | null }>`
  color: ${(props) =>
    props.isValid === null ? '#000000' : props.isValid ? '#165bfa' : '#ec2d30'};
  margin-bottom: 8px;
`;

const ValidationLabel = styled.span`
  font-size: 12px;
  margin-left: 6px;
  margin-right: 16px;
`;

interface ValidationCheckProps {
  passwordValidation: {
    hasUpperCase: boolean | null;
    hasLowerCase: boolean | null;
    hasSpecialChar: boolean | null;
    hasNumber: boolean | null;
    isLengthValid: boolean | null;
    hasNoSpaces: boolean | null;
  };
}

const ValidationCheck: React.FC<ValidationCheckProps> = ({
  passwordValidation,
}) => {
  const validation = passwordValidation || {
    hasUpperCase: null,
    hasLowerCase: null,
    hasSpecialChar: null,
    hasNumber: null,
    isLengthValid: null,
    hasNoSpaces: null,
  };

  return (
    <ValidationWrapper>
      <ValidationBox
        isValid={validation.hasUpperCase && validation.hasLowerCase}
      >
        <IoCheckmark />
        <ValidationLabel>대소문자 포함</ValidationLabel>
      </ValidationBox>
      <ValidationBox
        isValid={validation.hasSpecialChar && validation.hasNumber}
      >
        <IoCheckmark />
        <ValidationLabel>특수문자/숫자 포함</ValidationLabel>
      </ValidationBox>
      <ValidationBox isValid={validation.isLengthValid}>
        <IoCheckmark />
        <ValidationLabel>8자 이상 16자 이하</ValidationLabel>
      </ValidationBox>
    </ValidationWrapper>
  );
};

const PasswordCheckLabel = () => {
  return (
    <RedWrapper>
      <HiXMark />
      <ValidationLabel>비밀번호가 일치하지 않습니다</ValidationLabel>
    </RedWrapper>
  );
};

const EmailCheckLabel = () => {
  return (
    <RedWrapper>
      <HiXMark />
      <ValidationLabel>이메일 형식이 올바르지 않습니다</ValidationLabel>
    </RedWrapper>
  );
};

const WrongAccountLabel = () => {
  return (
    <RedWrapper>
      <div style={{ fontSize: '12px' }}>
        이메일 또는 비밀번호를 확인해주세요
      </div>
    </RedWrapper>
  );
};

export {
  ValidationCheck,
  PasswordCheckLabel,
  EmailCheckLabel,
  WrongAccountLabel,
};
