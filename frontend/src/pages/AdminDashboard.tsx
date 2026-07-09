import { useState, useEffect } from "react";
import useTop from "../hooks/useTop";
import { useAuthStore } from "../store/useAuthStore";
import { Users, UserPlus, Calendar, Shield, Trash2 } from "lucide-react";
import api from "../utils/api";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import MyAppointments from "./MyAppointments";

type AdminUser = {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt?: string;
};

export default function AdminDashboard() {
    useTop();
    const { user } = useAuthStore();
    const [activeTab, setActiveTab] = useState<'appointments' | 'create-lawyer' | 'users' | 'lawyers'>('appointments');
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [lawyers, setLawyers] = useState<AdminUser[]>([]);
    const [dataLoading, setDataLoading] = useState(false);

    // Form state for creating a lawyer
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (activeTab === 'users') fetchUsers();
        if (activeTab === 'lawyers') fetchLawyerUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab]);

    const fetchUsers = async () => {
        setDataLoading(true);
        try {
            const { data } = await api.get("/admin/users");
            setUsers(data.users || []);
        } catch {
            toast.error("Failed to load users");
        } finally {
            setDataLoading(false);
        }
    };

    const fetchLawyerUsers = async () => {
        setDataLoading(true);
        try {
            const { data } = await api.get("/admin/lawyers");
            setLawyers(data.lawyers || []);
        } catch {
            toast.error("Failed to load lawyers");
        } finally {
            setDataLoading(false);
        }
    };

    const handleDeleteUser = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await api.delete(`/admin/users/${id}`);
            setUsers((prev) => prev.filter((u) => u._id !== id));
            toast.success("User deleted");
        } catch {
            toast.error("Failed to delete user");
        }
    };

    const handleCreateLawyer = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await api.post("/auth/register", { name, email, password, role: "lawyer" });
            toast.success("Lawyer account created!");
            setName(""); setEmail(""); setPassword("");
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

    const tabs = [
        { id: 'appointments', label: 'Appointments', icon: Calendar },
        { id: 'users', label: 'Users', icon: Users },
        { id: 'lawyers', label: 'Lawyers', icon: Shield },
        { id: 'create-lawyer', label: 'Add Lawyer', icon: UserPlus },
    ] as const;

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8 border-b border-zinc-800 pb-6">
                    <div className="w-14 h-14 bg-indigo-600/20 border border-indigo-600/30 rounded-2xl flex items-center justify-center">
                        <Shield size={26} className="text-indigo-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                        <p className="text-zinc-500 text-sm">Manage platform users, lawyers & appointments</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-8 flex-wrap">
                    {tabs.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            onClick={() => setActiveTab(id)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                                activeTab === id
                                    ? 'bg-white text-black shadow-lg'
                                    : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                            }`}
                        >
                            <Icon size={16} /> {label}
                        </button>
                    ))}
                </div>

                {/* Appointments Tab */}
                {activeTab === 'appointments' && (
                    <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800">
                        <MyAppointments />
                    </div>
                )}

                {/* Users Tab */}
                {activeTab === 'users' && (
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                        <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
                            <h2 className="font-semibold flex items-center gap-2">
                                <Users size={16} className="text-indigo-400" /> Registered Users
                            </h2>
                            <span className="text-xs text-zinc-500">{users.length} users</span>
                        </div>
                        {dataLoading ? (
                            <div className="text-center py-10 text-zinc-500">Loading...</div>
                        ) : (
                            <div className="divide-y divide-zinc-800">
                                {users.map((u) => (
                                    <div key={u._id} className="flex items-center justify-between px-5 py-3 hover:bg-white/5 transition">
                                        <div>
                                            <p className="text-white font-medium text-sm">{u.name}</p>
                                            <p className="text-zinc-500 text-xs">{u.email}</p>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteUser(u._id)}
                                            className="text-zinc-600 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-500/10 transition"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                ))}
                                {users.length === 0 && (
                                    <p className="text-center py-10 text-zinc-600 text-sm">No users found</p>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Lawyers Tab */}
                {activeTab === 'lawyers' && (
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                        <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
                            <h2 className="font-semibold flex items-center gap-2">
                                <Shield size={16} className="text-indigo-400" /> Registered Lawyers
                            </h2>
                            <span className="text-xs text-zinc-500">{lawyers.length} lawyers</span>
                        </div>
                        {dataLoading ? (
                            <div className="text-center py-10 text-zinc-500">Loading...</div>
                        ) : (
                            <div className="divide-y divide-zinc-800">
                                {lawyers.map((l) => (
                                    <div key={l._id} className="flex items-center justify-between px-5 py-3 hover:bg-white/5 transition">
                                        <div>
                                            <p className="text-white font-medium text-sm">{l.name}</p>
                                            <p className="text-zinc-500 text-xs">{l.email}</p>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteUser(l._id)}
                                            className="text-zinc-600 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-500/10 transition"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                ))}
                                {lawyers.length === 0 && (
                                    <p className="text-center py-10 text-zinc-600 text-sm">No lawyers found</p>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Create Lawyer Tab */}
                {activeTab === 'create-lawyer' && (
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-2xl mx-auto shadow-2xl">
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            <UserPlus className="text-indigo-400" /> Register New Lawyer
                        </h2>
                        <form onSubmit={handleCreateLawyer} className="space-y-5">
                            {[
                                { label: "Full Name", value: name, setter: setName, type: "text" },
                                { label: "Email Address", value: email, setter: setEmail, type: "email" },
                                { label: "Temporary Password", value: password, setter: setPassword, type: "password" },
                            ].map(({ label, value, setter, type }) => (
                                <div key={label}>
                                    <label className="text-sm text-zinc-400 mb-2 block">{label}</label>
                                    <input
                                        type={type}
                                        value={value}
                                        onChange={(e) => setter(e.target.value)}
                                        required
                                        className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none transition"
                                    />
                                </div>
                            ))}
                            <p className="text-xs text-zinc-600">
                                The lawyer will be able to complete their profile after logging in.
                            </p>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
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
