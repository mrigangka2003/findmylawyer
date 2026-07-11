import { create } from 'zustand';

// Define the shape of our Lawyer based on the backend model
export type Lawyer = {
    _id: string;
    name: string;
    image: string;
    speciality: string;
    degree: string;
    experience: string;
    about: string;
    fees: number;
    rating?: number;
    address: {
        line1: string;
        line2?: string;
    };
    available: boolean;
    slots_booked: Record<string, string[]>;
};

type LawyerStore = {
    lawyers: Lawyer[];
    isLoading: boolean;
    error: string | null;
    fetchLawyers: () => Promise<void>;
};

export const useLawyerStore = create<LawyerStore>((set) => ({
    lawyers: [],
    isLoading: false,
    error: null,
    fetchLawyers: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch("http://localhost:8000/api/v1/lawyers/all");
            const data = await response.json();
            
            if (data.lawyers) {
                set({ lawyers: data.lawyers, isLoading: false });
            } else {
                set({ error: data.message || "Failed to fetch lawyers", isLoading: false });
            }
        } catch (err) {
            const error = err as Error;
            console.error("Error fetching lawyers:", error);
            set({ error: error.message || "Network error", isLoading: false });
        }
    }
}));
