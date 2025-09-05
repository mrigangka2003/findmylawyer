import React from "react";
import {
    User,
    Mail,
    GraduationCap,
    Lock,
    MapPin,
    Briefcase,
    IndianRupee,
    FileText,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import type { AxiosResponse } from "axios";

import { useAdminStore } from "../../store/adminStore";

interface LawyerFormData {
    image: FileList;
    name: string;
    email: string;
    speciality: string;
    degree: string;
    password: string;
    addressLine1: string;
    addressLine2: string;
    experience: string;
    fees: string;
    about: string;
}

const AddLawyer: React.FC = () => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<LawyerFormData>();

    const experienceOptions: number[] = Array.from(
        { length: 60 },
        (_, i) => i + 1
    );

    const { adminToken, backendUrl } = useAdminStore();

    const onSubmit = async(data: LawyerFormData) => {
        try {
            if (!data.image || data.image.length == 0) {
                return toast.error("Please select a image!");
            }

            const formData = new FormData();

            formData.append("image", data.image[0]);
            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("speciality", data.speciality);
            formData.append("degree", data.degree);
            formData.append("password", data.password);

            //we are stringify this we have parse in the backend
            formData.append(
                "address",
                JSON.stringify({
                    line1: data.addressLine1,
                    line2: data.addressLine2,
                })
            );

            formData.append("experience", data.experience);
            formData.append("fees", data.fees);
            formData.append("about", data.about);

            const res:AxiosResponse<any> = await axios.post(`${backendUrl}/api/v1/admin/add-lawyer`, formData,{
              headers:{adminToken}
            });

            if(res.data.success){
              toast.success(res.data.message);
              reset();
            }else{
              toast.error(res.data.error)
            }
          
        } catch (error:any) {
          toast.error(error.message)
        }
    };

    return (
        <div className="min-h-screen text-white py-12 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">
                        Add a New Lawyer
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Empower justice by connecting skilled lawyers with those
                        who need them most.
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-white/20 rounded-2xl shadow-xl p-8"
                >
                    {/* Photo Upload */}
                    <div className="md:col-span-2 flex justify-center">
                        <label className="relative w-32 h-32 flex items-center justify-center rounded-full bg-black border border-white/20 cursor-pointer overflow-hidden">
                            {watch("image") && watch("image")[0] ? (
                                <img
                                    src={URL.createObjectURL(watch("image")[0])}
                                    alt="Preview"
                                    className="w-full h-full object-cover rounded-full"
                                />
                            ) : (
                                <span className="text-3xl text-gray-400">
                                    +
                                </span>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                {...register("image")}
                                className="hidden"
                            />
                        </label>
                    </div>

                    {/* Name */}
                    <div>
                        <label className="flex items-center gap-2 text-sm mb-2">
                            <User className="w-4 h-4" /> Full Name
                        </label>
                        <input
                            type="text"
                            {...register("name", {
                                required: "Full name is required",
                            })}
                            className="w-full px-4 py-3 rounded-lg bg-black border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-white"
                            placeholder="John Doe"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="flex items-center gap-2 text-sm mb-2">
                            <Mail className="w-4 h-4" /> Email
                        </label>
                        <input
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                            })}
                            className="w-full px-4 py-3 rounded-lg bg-black border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-white"
                            placeholder="example@email.com"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Speciality Dropdown */}
                    <div>
                        <label className="flex items-center gap-2 text-sm mb-2">
                            <Briefcase className="w-4 h-4" /> Speciality
                        </label>
                        <select
                            {...register("speciality", {
                                required: "Speciality is required",
                            })}
                            className="w-full px-4 py-3 rounded-lg bg-black border border-white/20 text-white focus:outline-none focus:border-white"
                        >
                            <option value="">Select Speciality</option>
                            <option value="criminal">Criminal Law</option>
                            <option value="family">Family Law</option>
                            <option value="intellectual">
                                Property Lawyers
                            </option>
                            <option value="civil">Civil Law</option>
                            <option value="corporate">Corporate Law</option>
                            <option value="tax">Tax Law</option>
                        </select>
                        {errors.speciality && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.speciality.message}
                            </p>
                        )}
                    </div>

                    {/* Education */}
                    <div>
                        <label className="flex items-center gap-2 text-sm mb-2">
                            <GraduationCap className="w-4 h-4" /> Education
                        </label>
                        <input
                            type="text"
                            {...register("degree", {
                                required: "Education is required",
                            })}
                            className="w-full px-4 py-3 rounded-lg bg-black border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-white"
                            placeholder="LLB, LLM..."
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="flex items-center gap-2 text-sm mb-2">
                            <Lock className="w-4 h-4" /> Password
                        </label>
                        <input
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                            })}
                            className="w-full px-4 py-3 rounded-lg bg-black border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-white"
                            placeholder="********"
                        />
                    </div>

                    {/* Address Line 1 */}
                    <div>
                        <label className="flex items-center gap-2 text-sm mb-2">
                            <MapPin className="w-4 h-4" /> Address Line 1
                        </label>
                        <input
                            type="text"
                            {...register("addressLine1")}
                            className="w-full px-4 py-3 rounded-lg bg-black border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-white"
                            placeholder="Street, City"
                        />
                    </div>

                    {/* Address Line 2 */}
                    <div>
                        <label className="flex items-center gap-2 text-sm mb-2">
                            <MapPin className="w-4 h-4" /> Address Line 2
                        </label>
                        <input
                            type="text"
                            {...register("addressLine2")}
                            className="w-full px-4 py-3 rounded-lg bg-black border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-white"
                            placeholder="State, Country"
                        />
                    </div>

                    {/* Experience */}
                    <div>
                        <label className="flex items-center gap-2 text-sm mb-2">
                            <Briefcase className="w-4 h-4" /> Experience (Years)
                        </label>
                        <select
                            {...register("experience")}
                            className="w-full px-4 py-3 rounded-lg bg-black border border-white/20 text-white focus:outline-none focus:border-white"
                        >
                            <option value="">Select years</option>
                            {experienceOptions.map((year) => (
                                <option key={year} value={year}>
                                    {year} {year === 1 ? "year" : "years"}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Fees */}
                    <div>
                        <label className="flex items-center gap-2 text-sm mb-2">
                            <IndianRupee className="w-4 h-4" /> Fees
                        </label>
                        <input
                            type="text"
                            {...register("fees")}
                            className="w-full px-4 py-3 rounded-lg bg-black border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-white"
                            placeholder="e.g. ₹100/hr"
                        />
                    </div>

                    {/* About Me */}
                    <div className="md:col-span-2">
                        <label className="flex items-center gap-2 text-sm mb-2">
                            <FileText className="w-4 h-4" /> About Lawyer
                        </label>
                        <textarea
                            {...register("about")}
                            rows={4}
                            className="w-full px-4 py-3 rounded-lg bg-black border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-white"
                            placeholder="Write a short introduction..."
                        ></textarea>
                    </div>

                    {/* Submit */}
                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 mt-4 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition"
                        >
                            {isSubmitting ? "Adding..." : "Add Lawyer"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddLawyer;
