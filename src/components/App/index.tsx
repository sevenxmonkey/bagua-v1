import React from 'react';
import './App.scss';
import { DataStoreProvider, useDataStore } from '../../context/DataStoreContext';

const App: React.FC = () => {
  return (
    <DataStoreProvider>
      <div className="container">
        <HexagramApp />
      </div>
    </DataStoreProvider>
  );
};

const HexagramApp: React.FC = () => {
  const { stepOneResult, stepTwoResult, stepThreeResult, uiState, generateRandomNumber, getMainHexagram, getChangingHexagram, resetState } = useDataStore();

  const getStepMessage = () => {
    if (uiState.currentStep === 'generatingHexagrams') {
      return '起卦';
    } else if (uiState.currentStep === 'gettingMainHexagram') {
      return '主卦';
    } else {
      return '变卦';
    }
  }

  const getActionMessage = () => {
    if (uiState.currentStep === 'generatingHexagrams') {
      if (stepOneResult?.randomNumbers?.length === 6) {
        return '得主卦';
      } else {
        return '摇卦';
      }
    } else if (uiState.currentStep === 'gettingMainHexagram') {
      return '得变卦';
    } else {
      return '重新算一卦';
    }
  }

  const onAction = () => {
    if (uiState.currentStep === 'generatingHexagrams' && stepOneResult?.randomNumbers?.length !== 6) {
      generateRandomNumber();
    } else if (uiState.currentStep === 'generatingHexagrams' && stepOneResult?.randomNumbers?.length === 6) {
      getMainHexagram();
    } else if (uiState.currentStep === 'gettingMainHexagram') {
      getChangingHexagram();
    } else {
      resetState();
    }
  }

  return (
    <div>
      <p>算卦 - {getStepMessage()}</p>
      <div>
        <p>当前6爻: {stepOneResult?.randomNumbers?.length ? stepOneResult.randomNumbers.concat(Array(6 - stepOneResult.randomNumbers.length).fill('_')).join(', ') : '_, _, _, _, _, _'}</p>
      </div>
      {['gettingMainHexagram', 'gettingChangingHexagram'].includes(uiState.currentStep) && stepTwoResult && (
        <div>
          <p>主卦: {stepTwoResult.mainHexagram} ({stepTwoResult.mainHexagramCode})</p>
        </div>
      )}
      {uiState.currentStep === 'gettingChangingHexagram' && stepThreeResult && (
        <div>
          <p>变卦: {stepThreeResult.changingHexagram} ({stepThreeResult.changingHexagramCode})</p>
        </div>
      )}
      <button onClick={onAction}>
        {getActionMessage()}
      </button>
    </div>
  );
};

export default App;