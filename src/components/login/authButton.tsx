import React from 'react';
import styled from 'styled-components';

const Button = styled.button<{ disabled?: boolean }>`
  display: flex;
  height: 50px;
  padding: 18px 8px;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${({ disabled }) =>
    disabled ? 'rgba(118, 118, 128, 0.12)' : 'rgba(94, 82, 255, 1)'};
  border: none;
  border-radius: 6.962px;
  font-family: Roboto;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const AuthButton = ({
  text,
  disabled,
  onClick,
}: {
  text: string;
  disabled?: boolean;
  onClick: () => void;
}) => {
  return (
    <Button disabled={disabled} onClick={onClick}>
      {text}
    </Button>
  );
};

export default AuthButton;
