import React, { createContext, useState, ReactNode } from 'react';

// SignUpContext 생성
interface ISignUpContext {
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

export const SignUpContext = createContext<ISignUpContext | undefined>(undefined);

// SignUpProvider 컴포넌트
interface SignUpProviderProps {
  children: ReactNode;
}

export const SignUpProvider: React.FC<SignUpProviderProps> = ({ children }) => {
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

  const value: ISignUpContext = {
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
    <SignUpContext.Provider value={value}>{children}</SignUpContext.Provider>
  );
};
