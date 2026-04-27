import { useState } from "react";
import { SignUp, SignIn } from "../components";

export default function Login() {
    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <section className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md">

                {/* Toggle Tabs */}
                <div className="mb-6 flex items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-1">
                    <button
                        onClick={() => setIsSignUp(false)}
                        className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
                            !isSignUp
                                ? "bg-white text-black shadow-lg"
                                : "text-zinc-400 hover:text-white"
                        }`}
                    >
                        Sign In
                    </button>

                    <button
                        onClick={() => setIsSignUp(true)}
                        className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
                            isSignUp
                                ? "bg-white text-black shadow-lg"
                                : "text-zinc-400 hover:text-white"
                        }`}
                    >
                        Sign Up
                    </button>
                </div>

                {/* Main Card */}
                <div className="bg-zinc-950/70 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

                    {/* Heading */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">
                            {isSignUp ? "Create Account" : "Welcome Back"}
                        </h1>

                        <p className="text-zinc-400 text-sm">
                            {isSignUp
                                ? "Create your account and find the right legal help"
                                : "Sign in to continue to your account"}
                        </p>
                    </div>

                    {/* Form Switch */}
                    <div className="relative min-h-[340px] overflow-hidden">
                        <div
                            className={`transition-all duration-500 ease-in-out ${
                                isSignUp
                                    ? "translate-x-0 opacity-100"
                                    : "translate-x-full opacity-0 absolute inset-0"
                            }`}
                        >
                            <SignUp />
                        </div>

                        <div
                            className={`transition-all duration-500 ease-in-out ${
                                !isSignUp
                                    ? "translate-x-0 opacity-100"
                                    : "-translate-x-full opacity-0 absolute inset-0"
                            }`}
                        >
                            <SignIn />
                        </div>
                    </div>

                    {/* Bottom Link */}
                    <div className="text-center text-sm text-zinc-400 mt-6">
                        {isSignUp
                            ? "Already have an account?"
                            : "Don’t have an account?"}{" "}
                        <button
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="text-white font-semibold hover:underline transition"
                        >
                            {isSignUp ? "Sign In" : "Sign Up"}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}