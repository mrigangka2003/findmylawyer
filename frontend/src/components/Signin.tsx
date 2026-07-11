import { useState } from "react";
import api from "../utils/api";
import { AxiosError } from "axios";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const setAuth = useAuthStore((state) => state.setAuth);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { data } = await api.post("/auth/login", { email, password });
            setAuth(data.user, data.token);
            toast.success("Welcome back!");
            const role = data.user.role;
            if (role === 'admin') {
                navigate('/admin/dashboard');
            } else if (role === 'lawyer') {
                navigate('/lawyer/dashboard');
            } else {
                navigate('/user/dashboard');
            }
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full">
            <form className="space-y-5" onSubmit={handleSubmit}>
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
                        placeholder="Enter your password"
                        required
                        className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                    />
                </div>

                <div className="flex justify-end">
                    <Link
                        to="/forgot-password"
                        className="text-sm text-zinc-400 hover:text-white transition"
                    >
                        Forgot Password?
                    </Link>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-xl bg-white text-black py-3 font-semibold hover:scale-[1.01] transition-all disabled:opacity-50"
                >
                    {isLoading ? "Signing In..." : "Sign In"}
                </button>
            </form>
        </div>
    );
}