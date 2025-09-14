// エディター変更をチェックする関数
export function checkEditorChange(
  initialValue: string,
  currentValue: string,
  wantcode: string[],
  onStepComplete?: () => void
): void {
  if (wantcode.includes('EDITOR_CHANGE') && initialValue !== currentValue) {
    onStepComplete?.();
  }
}