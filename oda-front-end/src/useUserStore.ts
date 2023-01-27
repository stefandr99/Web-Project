import { create } from 'zustand'
import { persist} from 'zustand/middleware'


export const useUserStore = create(
    persist(
        (set) => ({
            userName: '',
            setUserName: (userName: string) => set({ userName }),
            email: '',
            setEmail: (email: string) => set({ email }),
            token: '',
            setToken: (token: string) => set({ token }),
            isLoggedIn: false,
            setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
            resetStore: () => set({ userName: '', email: '', token: '', isLoggedIn: false }),
        }),
        {
            name: 'user-storage',
        }
    )
)

