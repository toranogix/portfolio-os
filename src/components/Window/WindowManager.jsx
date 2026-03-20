import { AnimatePresence } from 'framer-motion'
import useWindowStore from '../../store/useWindowStore.js'
import Window from './Window.jsx'

export default function WindowManager() {
  const windows = useWindowStore((s) => s.windows)

  return (
    <AnimatePresence>
      {windows.map((win) => (
        <Window key={win.id} win={win} />
      ))}
    </AnimatePresence>
  )
}
