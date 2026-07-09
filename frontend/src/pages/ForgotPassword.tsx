import { useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { KeyRound, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "reset">("email");
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await api.post("/auth/forgot-password", { email });
      toast.success("Reset token generated!");
      // In dev, token is returned directly
      if (data.resetToken) {
        setResetToken(data.resetToken);
      }
      setStep("reset");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Failed to request reset");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setIsLoading(true);
    try {
      await api.post("/auth/reset-password", { token: resetToken, newPassword });
      setDone(true);
      toast.success("Password reset successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-1.5 text-zinc-500 hover:text-white text-sm mb-6 transition"
        >
          <ArrowLeft size={14} /> Back to Login
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-indigo-600/20 border border-indigo-600/30 rounded-xl flex items-center justify-center">
            <KeyRound size={18} className="text-indigo-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">
              {step === "email" ? "Forgot Password" : "Reset Password"}
            </h1>
            <p className="text-zinc-500 text-xs">
              {step === "email" ? "Enter your email to get a reset token" : "Enter the token and your new password"}
            </p>
          </div>
        </div>

        {done ? (
          <div className="text-center py-6">
            <CheckCircle2 size={48} className="text-green-400 mx-auto mb-3" />
            <p className="text-white font-semibold">Password reset successfully!</p>
            <p className="text-zinc-400 text-sm mt-1">Redirecting to login...</p>
          </div>
        ) : step === "email" ? (
          <form onSubmit={handleRequestReset} className="space-y-4">
            <div>
              <label className="text-sm text-zinc-400 mb-1.5 block">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:border-indigo-500 focus:outline-none transition"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-zinc-200 transition disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Request Reset Token"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="text-sm text-zinc-400 mb-1.5 block">Reset Token</label>
              <input
                type="text"
                value={resetToken}
                onChange={(e) => setResetToken(e.target.value)}
                required
                placeholder="Paste the reset token here"
                className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 font-mono text-xs focus:border-indigo-500 focus:outline-none transition"
              />
              {resetToken && (
                <p className="text-xs text-green-400 mt-1">Token pre-filled from server response.</p>
              )}
            </div>
            <div>
              <label className="text-sm text-zinc-400 mb-1.5 block">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="At least 6 characters"
                className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:border-indigo-500 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="text-sm text-zinc-400 mb-1.5 block">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Repeat new password"
                className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:border-indigo-500 focus:outline-none transition"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-zinc-200 transition disabled:opacity-50"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
