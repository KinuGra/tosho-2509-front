import { exampleTopic } from '../topix/topix';

interface StepProgress {
  topicId: number;
  stepId: number;
  lastUpdated: string;
  wantcode: string[];
}

export function updateStepProgress(is_complete: boolean): void {
  // ステップ 1: 最新の学習進捗を取得
  const storedProgress = localStorage.getItem('stepProgress');
  let currentProgress: StepProgress;

  if (!storedProgress) {
    const currentStep = exampleTopic.steps.find(step => step.order === 1);
    currentProgress = { 
      topicId: 1, 
      stepId: 1, 
      lastUpdated: new Date().toISOString(),
      wantcode: currentStep?.wantcode || []
    };
  } else {
    currentProgress = JSON.parse(storedProgress);
  }

  // ステップ 2: 進捗を更新
  if (is_complete) {
    currentProgress.stepId++;
    
    if (exampleTopic.id === currentProgress.topicId && currentProgress.stepId > exampleTopic.steps.length) {
      currentProgress.stepId = 1;
    }
  }

  // ステップ 3: ローカルストレージに保存
  const currentStep = exampleTopic.steps.find(step => step.order === currentProgress.stepId);
  const updatedProgress: StepProgress = {
    topicId: currentProgress.topicId,
    stepId: currentProgress.stepId,
    lastUpdated: new Date().toISOString(),
    wantcode: currentStep?.wantcode || []
  };

  localStorage.setItem('stepProgress', JSON.stringify(updatedProgress));
}