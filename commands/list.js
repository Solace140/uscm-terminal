import vfs from '../vfs.js';

export default function list(terminal, state) {
  let node = vfs['/'];
  if (state.currentDir) {
    const parts = state.currentDir.split('/').filter(Boolean);
    node = parts.reduce((acc, part) => acc && acc[part], node);
  }
  if (node && typeof node === 'object') {
    return Object.keys(node).join('\n');
  }
  return "Directory not found.";
}