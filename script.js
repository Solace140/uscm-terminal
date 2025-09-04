const terminal = document.getElementById('terminal');
const container = document.getElementById('terminal-container');

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

// Typewriter effect
function typeLine(line, callback) {
  let i = 0;
  const speed = 40; // ms per character

  function typeChar() {
    if (i < line.length) {
      terminal.innerHTML += line.charAt(i);
      i++;
      setTimeout(typeChar, speed);
    } else {
      terminal.innerHTML += "<br>";
      if (callback) callback();
    }
  }
  typeChar();
}

// Run boot sequence
function runBootSequence(lines, index = 0) {
  if (index < lines.length) {
    typeLine(lines[index], () => runBootSequence(lines, index + 1));
  } else {
    setTimeout(() => {
      container.classList.remove('flicker');
      startPrompt();
    }, 1000);
  }
}

// Command prompt setup
function startPrompt() {
  const prompt = document.createElement('span');
  prompt.textContent = "USER@WEYLAND-YUTANI:~$ ";
  terminal.appendChild(prompt);

  const input = document.createElement('input');
  input.style.background = 'black';
  input.style.color = '#00ff66';
  input.style.border = 'none';
  input.style.outline = 'none';
  input.style.font = 'inherit';
  input.autofocus = true;

  input.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
      terminal.innerHTML += input.value + "<br>";
      input.value = '';
    }
  });

  terminal.appendChild(input);
  input.focus();
}

// Start everything with flicker effect
container.classList.add('flicker');
runBootSequence(bootLines);