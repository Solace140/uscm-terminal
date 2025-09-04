export default function help() {
  return [
    "Available commands:",
    "help  - Show this message",
    "clear - Clear the terminal",
    "list  - List directories and files in the current directory",
    "open <name> - Open a file or enter a directory",
    "back - Go up one directory",
    "Current path is shown in the prompt."
  ].join('\n');
}