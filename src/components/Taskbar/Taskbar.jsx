import styles from './Taskbar.module.css'
import Clock from './Clock.jsx'
import StartMenu from './StartMenu.jsx'
import useWindowStore from '../../store/useWindowStore.js'
import useOSStore from '../../store/useOSStore.js'
import { getApp } from '../../config/apps.js'

export default function Taskbar() {
  const windows = useWindowStore((s) => s.windows)
  const focusWindow = useWindowStore((s) => s.focusWindow)
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow)
  const restoreWindow = useWindowStore((s) => s.restoreWindow)
  const startMenuOpen = useOSStore((s) => s.startMenuOpen)
  const toggleStartMenu = useOSStore((s) => s.toggleStartMenu)

  const handleTaskbarBtn = (win) => {
    if (win.minimized) {
      restoreWindow(win.id)
    } else {
      minimizeWindow(win.id)
    }
  }

  return (
    <>
      {startMenuOpen && <StartMenu />}

      <div className={styles.taskbar}>
        {/* home button */}
        <button
          className={[styles.startBtn, startMenuOpen ? styles.startBtnActive : ''].join(' ')}
          onClick={(e) => { e.stopPropagation(); toggleStartMenu() }}
        >
          <span>🪟</span>
          <span>Home</span>
        </button>

        {/* Separator */}
        <div className={styles.separator} />

        {/* windows buttons */}
        <div className={styles.windowList}>
          {windows.map((win) => {
            const app = getApp(win.appId)
            return (
              <button
                key={win.id}
                className={[styles.taskBtn, win.minimized ? '' : styles.taskBtnActive].join(' ')}
                onClick={() => handleTaskbarBtn(win)}
              >
                {app?.icon && <span className={styles.taskBtnIcon}>{app.icon}</span>}
                <span className={styles.taskBtnLabel}>{app?.title ?? win.appId}</span>
              </button>
            )
          })}
        </div>

        {/* clock */}
        <div className={styles.tray}>
          <Clock />
        </div>
      </div>
    </>
  )
}
