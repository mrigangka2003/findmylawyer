import { useState } from "react";

import { SignUp, SignIn } from "../components";

export default function Login() {
    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black px-4">
            <div className="w-full max-w-md">
                {/* Toggle Buttons */}
                <div className="mb-8 flex bg-zinc-800 rounded-lg p-1">
                    <button
                        onClick={() => setIsSignUp(false)}
                        className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-300 ${
                            !isSignUp
                                ? "bg-indigo-600 text-white shadow-lg"
                                : "text-zinc-400 hover:text-white"
                        }`}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => setIsSignUp(true)}
                        className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-300 ${
                            isSignUp
                                ? "bg-indigo-600 text-white shadow-lg"
                                : "text-zinc-400 hover:text-white"
                        }`}
                    >
                        Sign Up
                    </button>
                </div>

                {/* Form Container */}
                <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-8 shadow-2xl border border-zinc-800">
                    <div className="space-y-8">
                        {/* Header */}
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-white mb-2">
                                {isSignUp ? "Create Account" : "Welcome Back"}
                            </h1>
                            <p className="text-zinc-400">
                                {isSignUp
                                    ? "Join us and start your journey"
                                    : "Sign in to continue to your account"}
                            </p>
                        </div>

                        {/* Your Components with Animation */}
                        <div className="relative overflow-hidden">
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

                        {/* Additional Links */}
                        <div className="text-center text-sm text-zinc-400">
                            {isSignUp
                                ? "Already have an account?"
                                : "Don't have an account?"}{" "}
                            <button
                                onClick={() => setIsSignUp(!isSignUp)}
                                className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors font-medium"
                            >
                                {isSignUp ? "Sign In" : "Sign Up"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
