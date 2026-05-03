import { useState } from "react";
import api from "../utils/api";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await api.post("/auth/register", { name, email, password, role });
            toast.success("Account created! Please sign in.");
            // Optionally switch to sign in tab here if parent provides a way
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            toast.error(error.response?.data?.message || "Registration failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full">
            <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                    <label className="text-sm text-zinc-300 mb-2 block">
                        Full Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        required
                        className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                    />
                </div>

                <div>
                    <label className="text-sm text-zinc-300 mb-2 block">
                        Email Address
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                    />
                </div>

                <div>
                    <label className="text-sm text-zinc-300 mb-2 block">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a password"
                        required
                        className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                    />
                </div>

                <div>
                    <label className="text-sm text-zinc-300 mb-2 block">
                        I am a:
                    </label>
                    <select 
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                    >
                        <option value="user" className="bg-zinc-900">Client / User</option>
                        <option value="lawyer" className="bg-zinc-900">Lawyer</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-xl bg-white text-black py-3 font-semibold hover:scale-[1.01] transition-all disabled:opacity-50"
                >
                    {isLoading ? "Creating Account..." : "Create Account"}
                </button>
            </form>
        </div>
    );
}