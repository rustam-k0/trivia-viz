import React, { createContext, useContext } from 'react';
import { useTriviaData } from '../hooks/useTriviaData';
import Loading from '../components/UI/Loading';
import ErrorState from '../components/UI/ErrorState';

type TriviaContextType = ReturnType<typeof useTriviaData>;

const TriviaContext = createContext<TriviaContextType | undefined>(undefined);

export const TriviaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const triviaData = useTriviaData();

  if (triviaData.isLoading) {
    return <Loading />;
  }

  if (triviaData.error) {
    return <ErrorState message={triviaData.error} />;
  }

  return <TriviaContext.Provider value={triviaData}>{children}</TriviaContext.Provider>;
};

export const useTrivia = () => {
  const context = useContext(TriviaContext);
  if (context === undefined) {
    throw new Error('useTrivia must be used within a TriviaProvider');
  }
  return context;
};