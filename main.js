const terminal = document.getElementById('terminal');

// Boot sequence lines
const bootLines = [
  "USCM SYSTEM INITIALIZING...",
  "LOADING NODE: USS ALMAYER...",
  "CHECKING SUBSYSTEMS...",
  "SECURITY PROTOCOLS ONLINE",
  "NETWORK INTERFACE ACTIVE",
  "BOOT SEQUENCE COMPLETE",
  " "
];

// List of click sounds
const clickSounds = [
  'https://github.com/Solace140/uscm-terminal/blob/753e72e02bfc6344ade1480b2c11ff605139d72d/sounds/click1.WAV',
  'https://github.com/Solace140/uscm-terminal/blob/753e72e02bfc6344ade1480b2c11ff605139d72d/sounds/click2.WAV',
  'https://github.com/Solace140/uscm-terminal/blob/753e72e02bfc6344ade1480b2c11ff605139d72d/sounds/click3.WAV'
];

function playClick() {
  const src = clickSounds[Math.floor(Math.random() * clickSounds.length)];
  const sound = new Audio(src);
  sound.volume = 0.2;
  sound.play();
}

function playSound(src, vol, ) {
  const sound = new Audio(src)
  sound.volume = vol;
  sound.play();
}

// Typewriter effect
function typeLine(lineOrLines, callback) {
  // Accept string or array
  const lines = Array.isArray(lineOrLines) ? lineOrLines : lineOrLines.split('\n');
  let current = 0;

  function typeNextLine() {
    if (current < lines.length) {
      let i = 0;
      const speed = 50;
      const caret = document.createElement('span');
      caret.className = 'caret';
      terminal.appendChild(caret);

      function typeChar() {
        if (i < lines[current].length) {
          caret.insertAdjacentText("beforebegin", lines[current].charAt(i));
          playClick(); // Play sound for each character
          i++;
          terminal.scrollTop = terminal.scrollHeight;
          setTimeout(typeChar, speed);
        } else {
          terminal.removeChild(caret);
          terminal.appendChild(document.createElement('br'));
          terminal.scrollTop = terminal.scrollHeight;
          current++;
          setTimeout(typeNextLine, 500); // Delay between lines
        }
      }
      typeChar();
    } else {
      if (callback) callback();
    }
  }
  typeNextLine();
}

// Run boot sequence with delay between lines
function runBootSequence(lines, index = 0) {
  const lineDelay = 250; // ms delay between lines
  if (index < lines.length) {
    typeLine(lines[index], () => runBootSequence(lines, index + 1), lineDelay);
  } else {
    newPrompt();
  }
}

// Import commands
import help from './commands/help.js';
import clear from './commands/clear.js';
import list from './commands/list.js';
import open from './commands/open.js';
import back from './commands/back.js';

const commands = {
  help,
  clear,
  list,
  open,
  back
};

const state = {
  currentDir: ''
};

function getCurrentPath(state) {
  // Ensure root is shown as "/"
  if (!state.currentDir || state.currentDir === '' || state.currentDir === '/') return '/';
  return '/' + state.currentDir.replace(/^\/|\/$/g, '');
}

// Command prompt setup
function newPrompt() {
  const promptLine = document.createElement('div'); // Container for prompt + input

  const prompt = document.createElement('span');
  prompt.textContent = `USER@ALMAYER:${getCurrentPath(state)}$> `;
  promptLine.appendChild(prompt);

  const input = document.createElement('input');
  input.autofocus = true;

  input.addEventListener('keydown', (e) => {
    // Play click for character keys only
    if (e.key.length === 1) playClick();
    if (e.key === "Backspace") playClick();
    if (e.key === "Enter") {
      const cmdLine = input.value.trim();
      const [cmd, ...args] = cmdLine.split(' ');
      // Show entered command as plain text
      const cmdText = document.createElement('span');
      cmdText.textContent = cmdLine;
      promptLine.replaceChild(cmdText, input);

      // Run command and show output below
      if (commands[cmd]) {
        playSound('sounds/agree1.wav', 0.5);
        const result = commands[cmd](terminal, state, args);
        if (result instanceof Promise) {
          result.then(output => {
            if (output) {
              typeLine(output, () => {
                terminal.appendChild(document.createElement('br')); // Add empty line
                newPrompt();
              });
            } else {
              terminal.appendChild(document.createElement('br'));
              newPrompt();
            }
          });
        } else {
          if (result) {
            typeLine(result, () => {
              terminal.appendChild(document.createElement('br'));
              newPrompt();
            });
          } else {
            terminal.appendChild(document.createElement('br'));
            newPrompt();
          }
        }
      } else if (cmd) {
        typeLine(`Unknown command: ${cmd}`, newPrompt);
        playSound('sounds/unselectable.wav', 0.5)
      } else {
        newPrompt();
        playSound('sounds/unselectable.wav', 0.5)
      }
    }
  });

  promptLine.appendChild(input);
  terminal.appendChild(promptLine);
  input.focus();
}


runBootSequence(bootLines);

