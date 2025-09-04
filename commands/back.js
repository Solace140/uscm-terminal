export default function back(terminal, state) {
  if (!state.currentDir) return "Already at root.";
  const parts = state.currentDir.split('/').filter(Boolean);
  parts.pop();
  state.currentDir = parts.join('/');
  return `Moved back. Current directory: /${state.currentDir || ''}`;
}