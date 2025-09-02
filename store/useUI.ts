import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Profile = 'tech' | 'arts'

type UIState = {
  theme: 'dark' | 'light'
  currentProfile: Profile
  setTheme: (theme: 'dark' | 'light') => void
  setCurrentProfile: (profile: Profile) => void
  toggleTheme: () => void
}

export const useUI = create<UIState>()(
  persist(
    (set) => ({
      theme: 'dark',
      currentProfile: 'tech',
      setTheme: (theme) => set({ theme }),
      setCurrentProfile: (profile) => set({ currentProfile: profile }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
    }),
    {
      name: 'ui-storage',
    }
  )
)
