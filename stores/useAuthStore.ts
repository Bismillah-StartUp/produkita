import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthState {
  uuid: string | null
  email: string | null
  role: string | null
  name: string | null
  setSession: (data: { uuid: string; email: string; role: string; name?: string | null }) => void
  clearSession: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      uuid: null,
      email: null,
      role: null,
      name: null,
      setSession: (data) => set({ ...data, name: data.name ?? null }),
      clearSession: () => set({ uuid: null, email: null, role: null, name: null }),
    }),
    { name: "auth-session" }
  )
)