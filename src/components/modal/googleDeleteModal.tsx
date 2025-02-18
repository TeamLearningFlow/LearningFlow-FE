import React, { useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useRouter } from 'next/router';
import { LoginContext } from '../context/LoginContext';

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
        'https://onboarding.p-e.kr/user/withdraw',
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      console.log('Response:', response.data);

      if (response.data.isSuccess) {
        localStorage.removeItem('token'); // 토큰 삭제
        setIsLoggedIn(false);
        alert('회원 탈퇴가 완료되었습니다.');

        router.push('/'); // 홈 페이지로 이동
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
        <ModalTitle>계정을 탈퇴하시겠습니까?</ModalTitle>
        <ModalMessage>
          탈퇴 시, 계정과 관련된 모든 권한과 정보가 삭제됩니다.
        </ModalMessage>
        <ButtonContainer>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <WithdrawButton onClick={handleWithdraw}>탈퇴하기</WithdrawButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default GoogleDeleteModal;
