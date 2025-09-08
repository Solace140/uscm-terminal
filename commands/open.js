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

async function getFileContent(entry) {
  if (entry.contentFile) {
    try {
      const response = await fetch(entry.contentFile);
      if (!response.ok) return 'Error: Unable to read file.';
      const text = await response.text();
      // Try to parse as JSON for images/text split
      try {
        const obj = JSON.parse(text);
        if (typeof obj === 'object' && (obj.images || obj.text)) {
          // If text is an array, join it for display
          if (Array.isArray(obj.text)) {
            obj.text = obj.text.join('\n');
          }
          return obj;
        }
      } catch {}
      // Fallback: treat as plain text
      return text;
    } catch {
      return 'Error: Unable to read file.';
    }
  }
  // If entry.content is an array, join it
  if (Array.isArray(entry.content)) {
    return entry.content.join('\n');
  }
  return entry.content || '';
}

export default async function open(terminal, state, args) {

  let name = args[0];
  if (!name) return "Usage: open <name>";

  // Special case: open / or open '' returns to root
  if (name === '/' || name === '') {
    state.currentDir = '';
    const rootNode = vfs['/'];
    let subfilesText = 'Root directories:';
    subfilesText += '\n' + Object.keys(rootNode).map(sub => `- ${sub}`).join('\n');
    subfilesText += '\n(Open a directory with: open <name>)';
    return subfilesText;
  }

  // Support opening by number from the last used result set
  if (/^\d+$/.test(name)) {
    const idx = parseInt(name, 10) - 1;
    if (state.lastResultType === 'query' && state.queryResults && state.queryResults[idx]) {
      name = state.queryResults[idx];
      state.currentDir = '';
    } else if (state.lastResultType === 'list' && state.listResults && state.listResults[idx]) {
      name = state.listResults[idx];
    } else {
      return "Invalid selection number.";
    }
  }

  // If name contains a slash, treat as path from root
  let currentPath = state.currentDir || '';
  let pathParts = name.split('/').filter(Boolean);
  let node = getNode(currentPath);
  let entry = null;
  if (name.includes('/')) {
    // Absolute or relative path
    node = vfs['/'];
    for (let i = 0; i < pathParts.length; i++) {
      const part = pathParts[i].toLowerCase();
      const key = Object.keys(node).find(k => k.toLowerCase() === part && !k.startsWith('_'));
      if (!key) return "Not found.";
      entry = node[key];
      if (i === pathParts.length - 1) break;
      if (entry._type === 'dir') {
        node = entry;
      } else if (entry._type === 'file' && entry.subfiles) {
        node = entry.subfiles;
      } else {
        return "Not found.";
      }
    }
  } else {
    // Single name in current directory
    const nameLower = name.toLowerCase();
    const key = Object.keys(node).find(k => k.toLowerCase() === nameLower && !k.startsWith('_'));
    if (!key) return "Not found.";
    entry = node[key];
  }

  if (!entry) return "Not found.";

  // Directory or file with subfiles: navigate in
  if ((entry._type === 'dir') || (entry._type === 'file' && entry.subfiles && Object.keys(entry.subfiles).length > 0)) {
    // Set currentDir to the full path
    if (name.includes('/')) {
      state.currentDir = pathParts.join('/');
    } else {
      state.currentDir = currentPath ? currentPath.replace(/\/$/, '') + '/' + name : name;
    }
    let output = null;
    let subfilesText = '';
    if (entry._type === 'file') {
      output = await getFileContent(entry);
    }
    if (entry.subfiles && Object.keys(entry.subfiles).length > 0) {
      subfilesText += '\nSub-files available:';
      subfilesText += '\n' + Object.keys(entry.subfiles).map(sub => `- ${sub}`).join('\n');
      subfilesText += '\n(Open a sub-file with: open <filename>)';
    }
    if (output && typeof output === 'object' && (output.images || output.text)) {
      // Return object for main.js to handle
      return { images: output.images, text: (output.text || '') + subfilesText };
    } else if (output) {
      return (output + subfilesText);
    } else if (subfilesText) {
      return subfilesText;
    } else {
      return `Entered directory: ${name}`;
    }
  }

  // File without subfiles: display content
  if (entry._type === 'file') {
    const output = await getFileContent(entry);
    if (output && typeof output === 'object' && (output.images || output.text)) {
      return output;
    }
    return output;
  }

  return "Not found.";
}
