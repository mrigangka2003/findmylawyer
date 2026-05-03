import { useState, useEffect } from "react";
import useTop from "../hooks/useTop";
import api from "../utils/api";
import { AxiosError } from "axios";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
    Edit3,
    Check,
    X,
    User,
    Mail,
    Phone,
    Calendar,
    MapPin,
    Users,
} from "lucide-react";

type Address = { 
    line1: string;
    line2?: string
};
type UserData = {
    name: string;
    image: string;
    email: string;
    phoneNumber: string;
    address: Address;
    gender: string;
    dob: string;
};

export default function MyProfile() {
    useTop();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuthStore();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isEdit, setIsEdit] = useState(false);
    const [draft, setDraft] = useState<UserData | null>(null);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        const fetchProfile = async () => {
            try {
                const { data } = await api.get("/users/profile");
                const profileData = {
                    name: data.user.name,
                    email: data.user.email,
                    image: data.user.image || "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg",
                    phoneNumber: data.user.phoneNumber || "",
                    address: data.user.address || { line1: "", line2: "" },
                    gender: data.user.gender || "male",
                    dob: data.user.dob || "",
                };
                setUserData(profileData);
                setDraft(profileData);
            } catch (err) {
                const error = err as AxiosError<{ message: string }>;
                toast.error(error.response?.data?.message || "Failed to fetch profile");
            }
        };

        fetchProfile();
    }, [isAuthenticated, navigate]);

    const handleSave = async () => {
        if (!draft) return;
        try {
            await api.put("/users/profile", draft);
            setUserData(draft);
            setIsEdit(false);
            toast.success("Profile updated!");
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            toast.error(error.response?.data?.message || "Failed to update profile");
        }
    };
    
    const handleCancel = () => {
        setDraft(userData);
        setIsEdit(false);
    };

    if (!userData || !draft) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;

    return (
        <main className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-black p-4 flex items-center justify-center">
            <div className="w-full max-w-3xl rounded-2xl bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/50 ring-1 ring-white/10 p-6 md:p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-white">
                        My Profile
                    </h1>
                    {!isEdit ? (
                        <button
                            onClick={() => setIsEdit(true)}
                            className="flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition"
                        >
                            <Edit3 size={16} /> Edit
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                onClick={handleSave}
                                className="flex items-center gap-2 rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-500 transition"
                            >
                                <Check size={16} /> Save
                            </button>
                            <button
                                onClick={handleCancel}
                                className="flex items-center gap-2 rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-500 transition"
                            >
                                <X size={16} /> Cancel
                            </button>
                        </div>
                    )}
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Avatar */}
                    <div className="flex flex-col items-center">
                        <img
                            src={userData.image}
                            alt="avatar"
                            className="w-32 h-32 rounded-full object-cover ring-2 ring-white/20"
                        />
                    </div>

                    {/* Fields */}
                    <div className="md:col-span-2 space-y-4 text-neutral-200">
                        {renderField(
                            "Name",
                            draft.name,
                            (v) => setDraft({ ...draft, name: v }),
                            isEdit,
                            User
                        )}
                        {renderField(
                            "Email",
                            draft.email,
                            (v) => setDraft({ ...draft, email: v }),
                            isEdit,
                            Mail
                        )}
                        {renderField(
                            "Phone",
                            draft.phoneNumber,
                            (v) => setDraft({ ...draft, phoneNumber: v }),
                            isEdit,
                            Phone
                        )}
                        {renderField(
                            "Gender",
                            draft.gender,
                            (v) => setDraft({ ...draft, gender: v }),
                            isEdit,
                            Users
                        )}
                        {renderField(
                            "Date of Birth",
                            draft.dob,
                            (v) => setDraft({ ...draft, dob: v }),
                            isEdit,
                            Calendar
                        )}
                        {renderField(
                            "Address Line 1",
                            draft.address.line1,
                            (v) =>
                                setDraft({
                                    ...draft,
                                    address: { ...draft.address, line1: v },
                                }),
                            isEdit,
                            MapPin
                        )}
                        {draft.address.line2 &&
                            renderField(
                                "Address Line 2",
                                draft.address.line2!,
                                (v) =>
                                    setDraft({
                                        ...draft,
                                        address: { ...draft.address, line2: v },
                                    }),
                                isEdit,
                                MapPin
                            )}
                    </div>
                </div>
            </div>
        </main>
    );
}

function renderField(
    label: string,
    value: string,
    onChange: (val: string) => void,
    isEdit: boolean,
    Icon: React.ElementType
) {
    return (
        <div>
            <label className="flex items-center gap-2 mb-1 text-sm text-neutral-400">
                <Icon size={14} /> {label}
            </label>
            {isEdit ? (
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full rounded-md bg-white/10 px-3 py-2 text-white placeholder-neutral-500 ring-1 ring-white/20 focus:outline-none focus:ring-indigo-500"
                />
            ) : (
                <p className="px-3 py-2 text-white">{value}</p>
            )}
        </div>
    );
}
