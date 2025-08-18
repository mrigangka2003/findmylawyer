import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";


import { useAdminStore } from "../store/adminStore";
import { toast } from "react-toastify";

interface LoginFormInputs {
    email: string;
    password: string;
}

const Login = () => {
    const [role, setRole] = useState("Admin");
    const { setAdminToken, backendUrl } = useAdminStore();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormInputs>();

    const onSubmit = async (data: LoginFormInputs) => {
        try {
            console.log("Submitting:", data);

            if (role === "Admin") {
                const response = await axios.post(`${backendUrl}/api/v1/admin/login`, data);
                
                if(response.data.success){
                    localStorage.setItem('adminToken',response.data.token);
                    setAdminToken(response.data.token);
                    console.log("response:", response.data.token);
                }else{
                    toast.error(response.data.message)
                }

            } else {
                console.log("Lawyer login flow not implemented");
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-zinc-900 shadow-lg rounded-2xl p-8 w-full max-w-md"
            >
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold tracking-wide">{role} Login</h1>
                    <p className="text-sm text-gray-400 mt-1">
                        Welcome back! Please enter your credentials.
                    </p>
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", { required: "Email is required" })}
                        className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                    {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                {/* Password */}
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", { required: "Password is required" })}
                        className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                    {errors.password && (
                        <p className="text-red-400 text-sm mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-black font-semibold py-2 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
                >
                    {isSubmitting ? "Logging in..." : "Login"}
                </button>

                {/* Switch Role */}
                <div className="text-center mt-6 text-sm text-gray-400">
                    {role === "Admin" ? (
                        <p>
                            Lawyer Login{" "}
                            <button
                                type="button"
                                onClick={() => setRole("Lawyer")}
                                className="text-white underline hover:text-gray-300"
                            >
                                Click here
                            </button>
                        </p>
                    ) : (
                        <p>
                            Admin Login{" "}
                            <button
                                type="button"
                                onClick={() => setRole("Admin")}
                                className="text-white underline hover:text-gray-300"
                            >
                                Click here
                            </button>
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Login;
