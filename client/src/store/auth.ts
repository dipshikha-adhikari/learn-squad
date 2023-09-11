import { create } from "zustand";

interface AuthState {
    authToken: string | null;
    login: (token: string) => void;
    logout: () => void;
  }

const useAuthStore = create<AuthState>((set) => ({
  authToken: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')!) : null,
    login: (token) => set({ authToken: token }),
    logout: () => {
      localStorage.removeItem('token');
      set({ authToken: null });
    },
  }));
  
  export default useAuthStore;