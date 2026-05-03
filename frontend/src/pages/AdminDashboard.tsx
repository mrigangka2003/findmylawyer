import { useState } from "react";
import useTop from "../hooks/useTop";
import { useAuthStore } from "../store/useAuthStore";
import { Users, UserPlus, Calendar } from "lucide-react";
import api from "../utils/api";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import MyAppointments from "./MyAppointments";

export default function AdminDashboard() {
    useTop();
    const { user } = useAuthStore();
    const [activeTab, setActiveTab] = useState<'appointments' | 'create-lawyer'>('appointments');
    const [isLoading, setIsLoading] = useState(false);

    // Form state for creating a lawyer
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleCreateLawyer = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await api.post("/auth/register", { name, email, password, role: "lawyer" });
            toast.success("Lawyer created successfully!");
            setName("");
            setEmail("");
            setPassword("");
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            toast.error(error.response?.data?.message || "Failed to create lawyer");
        } finally {
            setIsLoading(false);
        }
    };

    if (user?.role !== 'admin') {
        return <div className="text-center py-20 text-white">Access Denied</div>;
    }

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-10">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-8 border-b border-zinc-800 pb-6">
                    <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <Users size={32} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                        <p className="text-zinc-400 mt-1">Manage platform appointments and lawyers</p>
                    </div>
                </div>

                <div className="flex gap-4 mb-8">
                    <button 
                        onClick={() => setActiveTab('appointments')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                            activeTab === 'appointments' 
                            ? 'bg-white text-black shadow-lg' 
                            : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
                        }`}
                    >
                        <Calendar size={18} /> All Appointments
                    </button>
                    <button 
                        onClick={() => setActiveTab('create-lawyer')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                            activeTab === 'create-lawyer' 
                            ? 'bg-white text-black shadow-lg' 
                            : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
                        }`}
                    >
                        <UserPlus size={18} /> Create Lawyer Profile
                    </button>
                </div>

                {activeTab === 'appointments' && (
                    <div className="bg-zinc-900/50 rounded-3xl p-6 border border-zinc-800">
                        {/* Reusing the unified appointments component */}
                        <MyAppointments />
                    </div>
                )}

                {activeTab === 'create-lawyer' && (
                    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-2xl mx-auto shadow-2xl">
                        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                            <UserPlus className="text-indigo-400" /> Register New Lawyer
                        </h2>
                        <form onSubmit={handleCreateLawyer} className="space-y-5">
                            <div>
                                <label className="text-sm text-zinc-400 mb-2 block">Full Name</label>
                                <input 
                                    type="text" 
                                    value={name} onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 focus:border-indigo-500 focus:outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-zinc-400 mb-2 block">Email Address</label>
                                <input 
                                    type="email" 
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 focus:border-indigo-500 focus:outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-zinc-400 mb-2 block">Temporary Password</label>
                                <input 
                                    type="password" 
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 focus:border-indigo-500 focus:outline-none transition-colors"
                                />
                            </div>
                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50 mt-4"
                            >
                                {isLoading ? "Creating..." : "Create Lawyer Account"}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
