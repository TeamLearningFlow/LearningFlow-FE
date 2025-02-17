import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import MessageIcon from '/public/messageIcon.svg';

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
`;

const ModalContainer = styled.div`
  background: #fff;
  padding: 36px;
  border-radius: 16px;
  width: auto;
  text-align: center;
  white-space: nowrap;
`;

const Title = styled.h2`
  text-align: left;
  color: #1f1f1f;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 33px */
  letter-spacing: -0.44px;
  margin-bottom: 16px;
`;

const EmailBox = styled.div`
  display: flex;
  align-items: center;
  background: #f1f1f3;
  padding: 8px 16px;
  border-radius: 4px;
  text-align: left;
  gap: 8px;
  margin-bottom: 16px;
`;

const EmailText = styled.span`
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 27px */
  letter-spacing: -0.36px;
  color: #323538;
`;

const Message = styled.p`
  color: #64696e;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 30px */
  letter-spacing: -0.4px;
  text-align: left;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
`;

const Button = styled.button`
  background: #5e52ff;
  color: #fff;
  border: none;
  padding: 6px 16px;
  border-radius: 8px;
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 27px */
  letter-spacing: -0.36px;
  cursor: pointer;
  white-space: nowrap;
`;

interface EmailChangeModalProps {
  email: string;
  onConfirm: () => void;
}

const EmailChangeModal: React.FC<EmailChangeModalProps> = ({
  email,
  onConfirm,
}) => {
  return (
    <ModalOverlay>
      <ModalContainer>
        <Title>재인증 메일 발송</Title>
        <EmailBox>
          <Image src={MessageIcon} alt="Message Icon" width={20} height={20} />
          <EmailText>{email}</EmailText>
        </EmailBox>
        <Message>
          위 이메일로 재인증 메일을 보내드렸어요. <br />
          메일이 확인되지 않을 경우, 스팸함을 확인해주세요.
        </Message>
        <ButtonContainer>
          <Button onClick={onConfirm}>확인</Button>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default EmailChangeModal;
