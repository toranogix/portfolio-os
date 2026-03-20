import styles from './Taskbar.module.css'
import APPS from '../../config/apps.js'
import useWindowStore from '../../store/useWindowStore.js'
import useOSStore from '../../store/useOSStore.js'

export default function StartMenu() {
  const openWindow = useWindowStore((s) => s.openWindow)
  const closeStartMenu = useOSStore((s) => s.closeStartMenu)

  const handleAppClick = (appId) => {
    openWindow(appId)
    closeStartMenu()
  }

  return (
    <div className={styles.startMenu} onClick={(e) => e.stopPropagation()}>
      {/* Vertical sidebar stripe */}
      <div className={styles.startSidebar}>
        <span>romangix</span>
      </div>

      {/* App list */}
      <ul className={styles.startList}>
        {APPS.map((app) => (
          <li key={app.id}>
            <button
              className={styles.startItem}
              onClick={() => handleAppClick(app.id)}
            >
              <span className={styles.startItemIcon}>{app.icon}</span>
              <span>{app.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
