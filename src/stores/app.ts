import { create } from 'zustand'
import { produce } from 'immer'
import { createJSONStorage, persist } from 'zustand/middleware'

interface AppStore {
  isLogin: boolean
  onLogin: (isLogin: boolean) => void
  onLogout: () => void
}

export const useAppStore = create(
  persist<AppStore>(
    (set) => ({
      isLogin: false,
      onLogin: (isLogin) =>
        set(
          produce<AppStore>((state) => {
            state.isLogin = isLogin
          }),
        ),
      onLogout: () =>
        set(
          produce<AppStore>((state) => {
            state.isLogin = false
          }),
        ),
    }),
    {
      name: 'app-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
