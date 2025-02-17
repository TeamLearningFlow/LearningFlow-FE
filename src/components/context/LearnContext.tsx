import React, { createContext, useState, ReactNode } from 'react';

// 인터페이스 정의
interface ILearnContext {
  state: {
    isCompleted: boolean;
  };
  actions: {
    setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

export const LearnContext = createContext<ILearnContext | undefined>(undefined);

// Provider 컴포넌트
interface LearnProviderProps {
  children: ReactNode;
}

export const LearnProvider: React.FC<LearnProviderProps> = ({ children }) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const value: ILearnContext = {
    state: { isCompleted },
    actions: { setIsCompleted },
  };

  return (
    <LearnContext.Provider value={value}>{children}</LearnContext.Provider>
  );
};
