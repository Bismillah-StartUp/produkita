import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthState {
  uuid: string | null
  email: string | null
  role: string | null
  setSession: (data: { uuid: string; email: string; role: string }) => void
  clearSession: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      uuid: null,
      email: null,
      role: null,
      setSession: (data) => set(data),
      clearSession: () => set({ uuid: null, email: null, role: null }),
    }),
    { name: "auth-session" }
  )
)