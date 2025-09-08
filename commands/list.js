import vfs from '../vfs.js';

function getNode(path) {
  let node = vfs['/'];
  if (path) {
    const parts = path.split('/').filter(Boolean).map(p => p.toLowerCase());
    for (const part of parts) {
      const key = Object.keys(node).find(k => k.toLowerCase() === part);
      if (!key) return null;
      node = node[key];
      if (node && node._type === 'file' && node.subfiles) {
        node = { ...node.subfiles, _parent: node };
      }
    }
  }
  return node;
}

export default function list(terminal, state) {
  let node = getNode(state.currentDir);
  if (!node || typeof node !== 'object') {
    state.listResults = null;
    state.lastResultType = null;
    return "Directory not found.";
  }

  let entries;
  // If inside a file with subfiles, only list subfiles
  if (node._parent && node._parent._type === 'file' && node._parent.subfiles) {
    entries = Object.entries(node._parent.subfiles);
  } else {
    // Otherwise, list normal directory contents
    entries = Object.entries(node).filter(([key]) => !key.startsWith('_'));
  }
  state.listResults = entries.map(([key]) => key);
  state.lastResultType = 'list';
  return entries
    .map(([key, value]) => {
      let tag = value && typeof value === 'object' && value._tag ? value._tag : (value && value._type ? value._type.toUpperCase() : 'ITEM');
      return `[${tag}] - ${key}`;
    })
    .join('\n');
}
