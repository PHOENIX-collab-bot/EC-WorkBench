import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LoginResponse } from '@/types/auth';
import type { MenuItem } from '@/types/menu';

interface AuthState {
  token: string;
  userId?: number;
  username?: string;
  roleCodes: string[];
  permissions: string[];
  menus: MenuItem[];
  setLogin: (payload: LoginResponse) => void;
  setMenus: (menus: MenuItem[]) => void;
  logout: () => void;
}

const initialState = {
  token: '',
  userId: undefined,
  username: undefined,
  roleCodes: [],
  permissions: [],
  menus: []
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,
      setLogin: (payload) =>
        set({
          token: payload.token,
          userId: payload.userId,
          username: payload.username,
          roleCodes: payload.roleCodes,
          permissions: payload.permissions
        }),
      setMenus: (menus) => set({ menus }),
      logout: () => set({ ...initialState })
    }),
    { name: 'ec-workbench-auth' }
  )
);
