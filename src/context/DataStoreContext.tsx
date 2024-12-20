import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DataStoreContextType, StepOneResult, StepThreeResult, StepTwoResult, UIState } from '../interfaces';

// Create the context with a default value
const DataStoreContext = createContext<DataStoreContextType | undefined>(undefined);

// Create a provider component
export const DataStoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [stepOneResult, setStepOneResult] = useState<StepOneResult | undefined>(undefined);
  const [stepTwoResult, setStepTwoResult] = useState<StepTwoResult | undefined>(undefined);
  const [stepThreeResult, setStepThreeResult] = useState<StepThreeResult | undefined>(undefined);
  const [uiState, setUIState] = useState<UIState>({ currentStep: 'generatingHexagrams', isLoading: false });

  // 生成[6-9]的随机整数
  // 生成一个[6-9]的随机整数并添加到randomNumbers数组中
  const generateRandomNumber = () => {
    const newNumber = Math.floor(Math.random() * 4) + 6;
    setStepOneResult(prevState => {
      const newRandomNumbers = [...(prevState?.randomNumbers ?? []), newNumber];
      return { randomNumbers: newRandomNumbers };
    });
  };

  // 根据6组随机数生成主卦
  const getMainHexagram = () => {
    setUIState(prevState => ({
      ...prevState,
      currentStep: 'gettingMainHexagram'
    }));
    // 这里需要根据你的逻辑来生成主卦
    const mainHexagram = '乾为天'; // test
    const mainHexagramCode = stepOneResult?.randomNumbers.toString() ?? '000000'; // test
    setStepTwoResult({ mainHexagram, mainHexagramCode });
  };

  // 根据6组随机数生成变卦
  const getChangingHexagram = () => {
    setUIState(prevState => ({
      ...prevState,
      currentStep: 'gettingChangingHexagram'
    }));
    // 这里需要根据你的逻辑来生成变卦
    const changingHexagram = '坤为地'; // test
    const changingHexagramCode = stepOneResult?.randomNumbers.toString() ?? '000000'; // test; // test
    setStepThreeResult({ changingHexagram, changingHexagramCode });
  };

  const resetState = () => {
    setStepOneResult(undefined);
    setStepTwoResult(undefined);
    setStepThreeResult(undefined);
    setUIState({ currentStep: 'generatingHexagrams', isLoading: false });
  };

  // 上下文值
  const contextValue: DataStoreContextType = {
    stepOneResult,
    stepTwoResult,
    stepThreeResult,
    uiState,
    generateRandomNumber,
    getMainHexagram,
    getChangingHexagram,
    resetState,
  };

  return (
    <DataStoreContext.Provider value={contextValue}>
      {children}
    </DataStoreContext.Provider>
  );
};

// Create a custom hook to use the DataStoreContext
export const useDataStore = (): DataStoreContextType => {
  const context = useContext(DataStoreContext);
  if (!context) {
    throw new Error('useDataStore must be used within a DataStoreProvider');
  }
  return context;
};