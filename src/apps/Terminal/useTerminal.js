import { useState, useCallback } from 'react'

const COMMANDS = {
  help: () =>
    `Available commands:\n  help       Show this help\n  about      About this OS\n  ls         List files\n  clear      Clear terminal\n  date       Show current date\n  echo <msg> Print a message`,

  about: () =>
    `romangix v1.0\nBuilt with React + Framer Motion + Zustand`,

  ls: () =>
    `drwxr-xr-x  about/\ndrwxr-xr-x  projects/\n-rw-r--r--  readme.txt`,

  date: () => new Date().toString(),

  echo: (args) => args.join(' '),

  clear: null, // handled specially
}

export function useTerminal() {
  const [lines, setLines] = useState([
    { type: 'output', text: 'romangix Terminal — type "help" for commands.' },
  ])

  const run = useCallback((raw) => {
    const [cmd, ...args] = raw.trim().split(/\s+/)

    if (!cmd) {
      setLines((prev) => [...prev, { type: 'input', text: `$ ${raw}` }])
      return
    }

    if (cmd === 'clear') {
      setLines([])
      return
    }

    const handler = COMMANDS[cmd]
    const outputText =
      handler !== undefined
        ? handler(args)
        : `Command not found: ${cmd}. Type "help".`

    setLines((prev) => [
      ...prev,
      { type: 'input', text: `$ ${raw}` },
      { type: 'output', text: outputText },
    ])
  }, [])

  return { lines, run }
}
