import { useState, useEffect } from 'react'
import styles from './Taskbar.module.css'

function pad(n) {
  return String(n).padStart(2, '0')
}

export default function Clock() {
  const [time, setTime] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const h = pad(time.getHours())
  const m = pad(time.getMinutes())

  return (
    <div className={styles.clock} title={time.toLocaleDateString()}>
      {h}:{m}
    </div>
  )
}
