import { create } from 'zustand'

let idCounter = 1

const useWindowStore = create((set, get) => ({
  windows: [],

  openWindow: (appId) => {
    const { windows } = get()

    // If already open, just focus it
    const existing = windows.find((w) => w.appId === appId)
    if (existing) {
      get().focusWindow(existing.id)
      return
    }

    const id = idCounter++
    const maxZ = windows.reduce((acc, w) => Math.max(acc, w.zIndex), 100)
    const offset = windows.length * 30

    set((state) => ({
      windows: [
        ...state.windows,
        {
          id,
          appId,
          zIndex: maxZ + 1,
          minimized: false,
          // initial position with stagger
          x: 80 + offset,
          y: 60 + offset,
          width: 640,
          height: 480,
        },
      ],
    }))
  },

  closeWindow: (id) => {
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
    }))
  },

  minimizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, minimized: true } : w
      ),
    }))
  },

  restoreWindow: (id) => {
    const { windows } = get()
    const maxZ = windows.reduce((acc, w) => Math.max(acc, w.zIndex), 100)
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, minimized: false, zIndex: maxZ + 1 } : w
      ),
    }))
  },

  focusWindow: (id) => {
    const { windows } = get()
    const maxZ = windows.reduce((acc, w) => Math.max(acc, w.zIndex), 100)
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, zIndex: maxZ + 1, minimized: false } : w
      ),
    }))
  },

  updateWindowPosition: (id, x, y) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, x, y } : w
      ),
    }))
  },

  updateWindowSize: (id, width, height) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, width, height } : w
      ),
    }))
  },
}))

export default useWindowStore
