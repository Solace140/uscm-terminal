export default function help() {
  return [
    "Available commands:",
    "help                - Show this help message",
    "clear               - Clear the terminal display",
    "list                - List directories and files in the current directory",
    "open <name|number>  - Open a file, enter a directory, or open a file by its list/query number",
    "back                - Go up one directory (to the parent directory)",
    "query <word>        - Search for files whose name contains <word> (case-insensitive)",
    "",
    "Usage notes:",
    "- Use 'open <number>' after 'list' or 'query' to open a file by its number in the results.",
    "- Current path is shown in the prompt."
  ].join('\n');
}