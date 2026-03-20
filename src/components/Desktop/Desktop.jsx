import styles from './Desktop.module.css'
import DesktopIcon from './DesktopIcon.jsx'
import APPS from '../../config/apps.js'
import useWindowStore from '../../store/useWindowStore.js'
import useOSStore from '../../store/useOSStore.js'

export default function Desktop({ children }) {
  const openWindow = useWindowStore((s) => s.openWindow)
  const closeStartMenu = useOSStore((s) => s.closeStartMenu)

  const handleDesktopClick = () => {
    closeStartMenu()
  }

  return (
    <div className={styles.desktop} onClick={handleDesktopClick}>
      {/* Desktop icons – left column */}
      <div className={styles.icons}>
        {APPS.map((app) => (
          <DesktopIcon key={app.id} app={app} onOpen={openWindow} />
        ))}
      </div>

      {/* Windows rendered on top */}
      {children}
    </div>
  )
}
