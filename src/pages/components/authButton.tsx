import React from 'react';
import styled from 'styled-components';

const Button = styled.button<{ disabled?: boolean }>`
  display: flex;
  height: 57px;
  padding: 18px 8px;
  justify-content: center;
  align-items: center;
  width: 440px;
  background-color: ${({ disabled }) =>
    disabled ? 'rgba(100, 105, 110, 1)' : 'rgba(94, 82, 255, 1)'};
  border: none;
  border-radius: 6.962px;
  font-family: Roboto;
  font-size: 20px;
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
  disabled: boolean;
  onClick?: () => void;
}) => {
  return (
    <Button
      disabled={disabled}
      onClick={!disabled ? onClick : undefined} // disabled 상태가 아닐 때 onClick 동작
    >
      {text}
    </Button>
  );
};

export default AuthButton;
