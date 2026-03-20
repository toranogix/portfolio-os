import { useState } from 'react'
import styles from './Desktop.module.css'

export default function DesktopIcon({ app, onOpen }) {
  const [selected, setSelected] = useState(false)

  const handleClick = () => setSelected(true)

  const handleDoubleClick = () => {
    setSelected(false)
    onOpen(app.id)
  }

  const handleBlur = () => setSelected(false)

  return (
    <button
      className={[styles.icon, selected ? styles.iconSelected : ''].join(' ')}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onBlur={handleBlur}
      title={app.title}
      aria-label={`Open ${app.title}`}
    >
      <span className={styles.iconEmoji}>{app.icon}</span>
      <span className={styles.iconLabel}>{app.title}</span>
    </button>
  )
}
