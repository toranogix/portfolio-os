import { create } from 'zustand'

const useOSStore = create((set) => ({
  startMenuOpen: false,

  toggleStartMenu: () =>
    set((state) => ({ startMenuOpen: !state.startMenuOpen })),

  closeStartMenu: () => set({ startMenuOpen: false }),
}))

export default useOSStore
