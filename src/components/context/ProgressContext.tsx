import React, { createContext, useState } from 'react';

export interface ProgressContextType {
  progressByEpisode: Record<number, number>;
  updateProgress: (episodeId: number, progress: number) => void;
}

export const ProgressContext = createContext<ProgressContextType>({
  progressByEpisode: {},
  updateProgress: () => {},
});

interface ProgressProviderProps {
  children: React.ReactNode;
}

export const ProgressProvider: React.FC<ProgressProviderProps> = ({
  children,
}) => {
  const [progressByEpisode, setProgressByEpisode] = useState<
    Record<number, number>
  >({});

  const updateProgress = (episodeId: number, progress: number) => {
    setProgressByEpisode((prev) => {
      if (prev[episodeId] === progress) {
        return prev; // 값이 동일하면 업데이트하지 않음
      }
      const newState = { ...prev, [episodeId]: progress };
      console.log(`ProgressContext - 업데이트된 진도 상태:`, newState);
      return newState;
    });
  };

  return (
    <ProgressContext.Provider value={{ progressByEpisode, updateProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};
