
import vfs from '../vfs.js';

// Recursively search the VFS for files whose name includes the query (case-insensitive)
function searchVFS(node, path, query, results) {
  for (const key in node) {
    if (key.startsWith('_')) continue;
    const value = node[key];
    const currentPath = path ? path + '/' + key : key;
    if (typeof value === 'object') {
      if (value._type === 'file') {
        if (key.toLowerCase().includes(query)) {
          results.push(currentPath);
        }
        // Search subfiles if present
        if (value.subfiles) {
          searchVFS(value.subfiles, currentPath, query, results);
        }
      } else if (value._type === 'dir') {
        searchVFS(value, currentPath, query, results);
      }
    }
  }
}

export default function query(terminal, state, args) {
  const word = args[0];
  if (!word) return 'Usage: query <word>';
  const results = [];
  searchVFS(vfs['/'], '', word.toLowerCase(), results);
  if (results.length === 0) {
    state.queryResults = null;
    state.lastResultType = null;
    return 'No files found.';
  }
  state.queryResults = results;
  state.lastResultType = 'query';
  let output = 'Files containing "' + word + '" in their name:';
  output += '\n' + results.map((p, i) => `${i + 1}. ${p}`).join('\n');
  output += '\n\nOpen a file by typing: open <number> or open <path>';
  return output;
}
