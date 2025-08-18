import { create } from "zustand";


interface AdminState {
    adminToken: string | null;
    backendUrl: string;
    setAdminToken: (token: string) => void;
    clearAdminToken: () => void;
}

export const useAdminStore = create<AdminState>((set) => ({
    adminToken: localStorage.getItem("adminToken")?localStorage.getItem("adminToken"):'',
    backendUrl: import.meta.env.VITE_BACKEND_URL,

    setAdminToken: (token) => set({ adminToken: token }),
    clearAdminToken: () => {
        localStorage.removeItem("adminToken");
        set({ adminToken: null });
    },
}));
