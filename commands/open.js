import vfs from '../vfs.js';

function getNode(currentDir) {
  let node = vfs['/'];
  if (currentDir) {
    const parts = currentDir.split('/').filter(Boolean);
    node = parts.reduce((acc, part) => acc && acc[part], node);
  }
  return node;
}

export default async function open(terminal, state, args) {
  const name = args[0];
  if (!name) return "Usage: open <name>";

  const node = getNode(state.currentDir);

  if (node && typeof node === 'object' && node[name]) {
    if (typeof node[name] === 'object') {
      // It's a directory: navigate into it
      state.currentDir = state.currentDir
        ? state.currentDir.replace(/\/$/, '') + '/' + name
        : name;
      return `Entered directory: ${name}`;
    } else if (typeof node[name] === 'string') {
      // It's a file: fetch and display
      try {
        const response = await fetch(node[name]);
        if (!response.ok) return "Error: Unable to read file.";
        const text = await response.text();
        return text;
      } catch {
        return "Error: Unable to read file.";
      }
    }
  }
  return "Not found.";
}