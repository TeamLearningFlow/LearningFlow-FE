import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

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
  // width: 456px;
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const Button = styled.button`
  background: #5e52ff;
  color: #fff;
  border: none;
  padding: 6px 16px;
  justify-content: center;
  align-items: center;
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 27px */
  letter-spacing: -0.36px;
  border-radius: 8px;
  cursor: pointer;
`;

interface PasswordChangeCheckProps {
  onClose: () => void;
  onConfirm?: () => void;
}

const PasswordChangeCheck: React.FC<PasswordChangeCheckProps> = ({
  onClose,
  onConfirm,
}) => {
  const router = useRouter();

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    onClose();
    router.push('/login');
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalTitle>비밀번호 변경 완료</ModalTitle>
        <ModalMessage>
          비밀번호가 변경되었습니다.
          <br /> 보안을 위해 다시 로그인해 주세요.
        </ModalMessage>
        <ButtonContainer>
          <Button onClick={handleConfirm}>확인</Button>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default PasswordChangeCheck;
