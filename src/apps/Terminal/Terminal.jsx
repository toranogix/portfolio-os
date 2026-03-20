import { useState, useEffect, useRef } from 'react'
import { useTerminal } from './useTerminal.js'
import styles from './Terminal.module.css'

export default function Terminal() {
  const { lines, run } = useTerminal()
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  const handleSubmit = (e) => {
    e.preventDefault()
    run(input)
    setInput('')
  }

  return (
    <div className={styles.terminal} onClick={() => inputRef.current?.focus()}>
      <div className={styles.output}>
        {lines.map((line, i) => (
          <div
            key={i}
            className={line.type === 'input' ? styles.lineInput : styles.lineOutput}
          >
            {line.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form className={styles.inputRow} onSubmit={handleSubmit}>
        <span className={styles.prompt}>$</span>
        <input
          ref={inputRef}
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </form>
    </div>
  )
}
