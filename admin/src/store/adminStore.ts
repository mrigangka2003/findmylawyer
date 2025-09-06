import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";


interface Lawyer {
    _id :string ;
    name:string;
    email:string;
    image:string;
    speciality:string;
    degree:string;
    experience:string;
    about:string;
    available:string;
    fees:number,
    address:{
        line1:string,
        line2:string
    }
}

interface AdminState {
    adminToken: string | null;
    backendUrl: string;
    lawyers:Lawyer[];
    setAdminToken: (token: string) => void;
    clearAdminToken: () => void;
    getAllLawyers:()=> Promise<void>;
}


export const useAdminStore = create<AdminState>((set,get) => ({
    adminToken: localStorage.getItem("adminToken")?localStorage.getItem("adminToken"):'',
    backendUrl: import.meta.env.VITE_BACKEND_URL,
    lawyers: [],
    setAdminToken: (token) => set({ adminToken: token }),
    clearAdminToken: () => {
        localStorage.removeItem("adminToken");
        set({ adminToken: null });
    },
    getAllLawyers:async() =>{
        try {
            const { backendUrl, adminToken } = get();
            if(!adminToken){
                console.error("No admin token found");
                return;
            }
            const {data} = await axios.post(`${backendUrl}/api/v1/admin/all-lawyers`,{},{
                headers:{adminToken}
            })

            if(data.success){
                set({lawyers:data.lawyers})
                console.log(data.lawyers)
                
            }else{
                toast.error(data.message)
            }
            
        } catch (error:any) {
            toast.error(error);
        }
    },
}));
