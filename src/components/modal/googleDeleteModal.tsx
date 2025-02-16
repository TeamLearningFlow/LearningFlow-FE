import React from 'react';
import styled from 'styled-components';
// import { useRouter } from 'next/router';

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
  margin-bottom: 6px;
`;

const ModalMessage = styled.p`
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 30px */
  letter-spacing: -0.4px;
  color: #64696e;
  text-align: left;
  margin-bottom: 36px;
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

const WithdrawButton = styled.button`
  background: #5e52ff;
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
  cursor: pointer;
`;

interface GoogleDeleteModalProps {
  onClose: () => void;
}

const GoogleDeleteModal: React.FC<GoogleDeleteModalProps> = ({ onClose }) => {
  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalTitle>계정을 탈퇴하시겠습니까?</ModalTitle>
        <ModalMessage>
          탈퇴 시, 계정과 관련된 모든 권한과 정보가 삭제됩니다.
        </ModalMessage>
        <ButtonContainer>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <WithdrawButton>탈퇴하기</WithdrawButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default GoogleDeleteModal;
