// StepOneResult: 生成6组随机数
export interface StepOneResult {
  randomNumbers: number[]; // 长度为6的数组，表示6组随机数
}

// StepTwoResult: 得到卦名
export interface StepTwoResult {
  mainHexagram: string; // 主卦的名称
  mainHexagramCode: string; // 主卦的编码（例如：乾为天）
}

// StepThreeResult: 得到变卦
export interface StepThreeResult {
  changingHexagram: string; // 变卦的名称
  changingHexagramCode: string; // 变卦的编码（例如：坤为地）
}

// UIState: 表示用户当前的步骤和状态
export interface UIState {
  currentStep: 'generatingHexagrams' | 'gettingMainHexagram' | 'gettingChangingHexagram'; // 当前步骤
  isLoading: boolean; // 是否正在加载
  errorMessage?: string; // 可选的错误信息
}

// DataStoreContextType: 包含所有步骤的结果和UI状态
export interface DataStoreContextType {
  stepOneResult?: StepOneResult;
  stepTwoResult?: StepTwoResult;
  stepThreeResult?: StepThreeResult;
  uiState: UIState;

  generateRandomNumber: () => void;
  getMainHexagram: () => void;
  getChangingHexagram: () => void;

  resetState: () => void;
}