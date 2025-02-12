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
    remember: boolean;
    isLoggedIn: boolean;
    userName: string;
  };
  actions: {
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setIsValidEmail: React.Dispatch<React.SetStateAction<boolean>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    setIsFormValid: React.Dispatch<React.SetStateAction<boolean>>;
    setIsEmailChecked: React.Dispatch<React.SetStateAction<boolean>>;
    setIsPasswordChecked: React.Dispatch<React.SetStateAction<boolean>>;
    setFormErrorMsg: React.Dispatch<React.SetStateAction<string>>;
    setRemember: React.Dispatch<React.SetStateAction<boolean>>;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    setUserName: React.Dispatch<React.SetStateAction<string>>;
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

  const [remember, setRemember] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>(''); 

  const value: ILoginContext = {
    state: {
      email,
      isValidEmail,
      password,
      isFormValid,
      isEmailChecked,
      isPasswordChecked,
      formErrorMsg,
      remember,
      isLoggedIn,
      userName,
    },
    actions: {
      setEmail,
      setIsValidEmail,
      setPassword,
      setIsFormValid,
      setIsEmailChecked,
      setIsPasswordChecked,
      setFormErrorMsg,
      setRemember,
      setIsLoggedIn,
      setUserName,
    },
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};
