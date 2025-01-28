import React, { createContext, useState, ReactNode } from 'react';

// LoginContext 생성
interface ILoginContext {
  state: {
    email: string;
    isValidEmail: boolean;
    password: string;
    isFormValid: boolean;
    isEmailChecked: boolean;
    isPasswordChecked: boolean;
    formErrorMsg: string;
  };
  actions: {
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setIsValidEmail: React.Dispatch<React.SetStateAction<boolean>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    setIsFormValid: React.Dispatch<React.SetStateAction<boolean>>;
    setIsEmailChecked: React.Dispatch<React.SetStateAction<boolean>>;
    setIsPasswordChecked: React.Dispatch<React.SetStateAction<boolean>>;
    setFormErrorMsg: React.Dispatch<React.SetStateAction<string>>;
  };
}

export const LoginContext = createContext<ILoginContext | undefined>(undefined);

// LoginProvider 컴포넌트
interface LoginProviderProps {
  children: ReactNode;
}

export const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
  // inputEmail.tsx에서 사용
  const [email, setEmail] = useState<string>('');
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [isEmailChecked, setIsEmailChecked] = useState<boolean>(false);
  // inputPw.tsx에서 사용
  const [password, setPassword] = useState<string>('');
  const [isPasswordChecked, setIsPasswordChecked] = useState<boolean>(false);
  // authButton.tsx에서 사용
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [formErrorMsg, setFormErrorMsg] = useState<string>('');

  const value: ILoginContext = {
    state: {
      email,
      isValidEmail,
      password,
      isFormValid,
      isEmailChecked,
      isPasswordChecked,
      formErrorMsg,
    },
    actions: {
      setEmail,
      setIsValidEmail,
      setPassword,
      setIsFormValid,
      setIsEmailChecked,
      setIsPasswordChecked,
      setFormErrorMsg,
    },
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};
