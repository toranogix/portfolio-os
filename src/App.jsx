import Desktop from './components/Desktop/Desktop.jsx'
import WindowManager from './components/Window/WindowManager.jsx'
import Taskbar from './components/Taskbar/Taskbar.jsx'

export default function App() {
  return (
    <Desktop>
      <WindowManager />
      <Taskbar />
    </Desktop>
  )
}
