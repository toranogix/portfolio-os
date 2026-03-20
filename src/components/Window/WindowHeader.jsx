import styles from './Window.module.css'
import useWindowStore from '../../store/useWindowStore.js'

export default function WindowHeader({ winId, title, icon, dragHandlers }) {
  const closeWindow = useWindowStore((s) => s.closeWindow)
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow)

  return (
    <div
      className={styles.titlebar}
      {...dragHandlers}
    >
      <div className={styles.titlebarLeft}>
        {icon && <span className={styles.titlebarIcon}>{icon}</span>}
        <span className={styles.titlebarText}>{title}</span>
      </div>

      <div className={styles.titlebarButtons}>
        <button
          className={styles.tbBtn}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => minimizeWindow(winId)}
          title="Minimize"
          aria-label="Minimize"
        >
          _
        </button>
        <button
          className={styles.tbBtn}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => closeWindow(winId)}
          title="Close"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
