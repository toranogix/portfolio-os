import About from '../apps/About/About.jsx'
import Terminal from '../apps/Terminal/Terminal.jsx'
import FileExplorer from '../apps/FileExplorer/FileExplorer.jsx'
import Browser from '../apps/Browser/Browser.jsx'

 
// desktop apps
const APPS = [
  {
    id: 'about',
    title: 'About',
    icon: '👤',
    component: About,
    defaultWidth: 560,
    defaultHeight: 420,
  },
  {
    id: 'terminal',
    title: 'Terminal',
    icon: '🖥️',
    component: Terminal,
    defaultWidth: 620,
    defaultHeight: 400,
  },
  {
    id: 'files',
    title: 'File Explorer',
    icon: '📁',
    component: FileExplorer,
    defaultWidth: 640,
    defaultHeight: 460,
  },
  {
    id: 'browser',
    title: 'Browser',
    icon: '🌐',
    component: Browser,
    defaultWidth: 780,
    defaultHeight: 540,
  },
  // {id: 'credits',
  //   title: 'Credits',
  //   icon: '📑',
  //   component: Credits,
  //   defaultWidth: 640,
  //   defaultHeight: 460,
  // },
]

export default APPS

// quick lookup by id
export const getApp = (id) => APPS.find((a) => a.id === id)
