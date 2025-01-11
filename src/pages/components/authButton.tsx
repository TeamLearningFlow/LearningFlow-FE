import React from 'react';
import styled from 'styled-components';

const Button = styled.button<{ disabled?: boolean }>`
  display: flex;
  height: 62px;
  padding: 18px 8px;
  justify-content: center;
  align-items: center;
  width: 380px;
  background-color: ${({ disabled }) =>
    disabled ? 'rgba(100, 105, 110, 1)' : 'rgba(94, 82, 255, 1)'};
  border: none;
  border-radius: 6.962px;
  font-family: Roboto;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const AuthButton = ({
  text,
  disabled,
}: {
  text: string;
  disabled: boolean;
}) => {
  return <Button disabled={disabled}>{text}</Button>;
};

export default AuthButton;
