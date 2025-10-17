import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  isAuthenticated: boolean;
  login: (u: string, p: string) => Promise<boolean>;
  logout: () => void;
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      async login(u, p) {
        const ok = u === 'admin' && p === 'admin123';
        set({ isAuthenticated: ok });
        return ok;
      },
      logout() {
        set({ isAuthenticated: false });
      },
    }),
    { name: 'auth-state' }
  )
);
