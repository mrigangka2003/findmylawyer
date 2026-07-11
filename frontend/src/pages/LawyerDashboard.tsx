import { useEffect, useState } from "react";
import useTop from "../hooks/useTop";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import {
  User,
  Calendar,
  Edit3,
  Check,
  X,
  Plus,
  Trash2,
  IndianRupee,
  Briefcase,
  BookOpen,
  Clock,
  type LucideIcon,
} from "lucide-react";
import MyAppointments from "./MyAppointments";

type LawyerProfileData = {
  name: string;
  email: string;
  speciality: string;
  specialization: string[];
  description: string;
  degree: string;
  experience: string;
  experienceYears: number;
  fees: number;
  image: string;
  address: { line1: string; line2?: string };
};

type AvailabilitySlot = {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  slotDuration: number;
};

type TextProfileField = "name" | "speciality" | "degree" | "experience";

const profileFields: Array<{ label: string; field: TextProfileField; icon: LucideIcon }> = [
  { label: "Full Name", field: "name", icon: User },
  { label: "Speciality", field: "speciality", icon: BookOpen },
  { label: "Degree", field: "degree", icon: BookOpen },
  { label: "Experience (text)", field: "experience", icon: Briefcase },
];

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const defaultProfile: LawyerProfileData = {
  name: "",
  email: "",
  speciality: "General",
  specialization: ["General"],
  description: "",
  degree: "LLB",
  experience: "0 years",
  experienceYears: 0,
  fees: 0,
  image: "",
  address: { line1: "", line2: "" },
};

export default function LawyerDashboard() {
  useTop();
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"appointments" | "profile" | "availability">("appointments");
  const [profile, setProfile] = useState<LawyerProfileData>(defaultProfile);
  const [draft, setDraft] = useState<LawyerProfileData>(defaultProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [availabilityDraft, setAvailabilityDraft] = useState<AvailabilitySlot[]>([]);
  const [isSavingAvail, setIsSavingAvail] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) { navigate("/login"); return; }
    if (user?.role !== "lawyer") { navigate("/"); return; }
    fetchProfile();
    fetchAvailability();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user]);

  const fetchProfile = async () => {
    try {
      const { data } = await api.get("/lawyers/me/profile");
      const p = data.profile;
      const merged: LawyerProfileData = {
        name: p.name || "",
        email: p.email || "",
        speciality: p.speciality || "General",
        specialization: p.specialization || ["General"],
        description: p.description || "",
        degree: p.degree || "LLB",
        experience: p.experience || "0 years",
        experienceYears: p.experienceYears || 0,
        fees: p.fees || 0,
        image: p.image || "",
        address: p.address || { line1: "", line2: "" },
      };
      setProfile(merged);
      setDraft(merged);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Failed to load profile");
    }
  };

  const fetchAvailability = async () => {
    if (!user) return;
    try {
      const { data } = await api.get(`/lawyers/${user.id}/availability`);
      setAvailabilityDraft(data.availability || []);
    } catch {
      // ignore
    }
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      await api.put("/lawyers/me/profile", draft);
      setProfile(draft);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAvailability = async () => {
    setIsSavingAvail(true);
    try {
      await api.put("/lawyers/me/availability", { availabilityData: availabilityDraft });
      toast.success("Availability updated!");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Failed to update availability");
    } finally {
      setIsSavingAvail(false);
    }
  };

  const addAvailabilitySlot = () => {
    const existingDays = availabilityDraft.map((s) => s.dayOfWeek);
    const nextDay = [1, 2, 3, 4, 5, 0, 6].find((d) => !existingDays.includes(d)) ?? 1;
    setAvailabilityDraft([
      ...availabilityDraft,
      { dayOfWeek: nextDay, startTime: "09:00", endTime: "17:00", slotDuration: 30 },
    ]);
  };

  const removeAvailabilitySlot = (idx: number) => {
    setAvailabilityDraft(availabilityDraft.filter((_, i) => i !== idx));
  };

  const updateAvailabilitySlot = (idx: number, field: keyof AvailabilitySlot, value: string | number) => {
    setAvailabilityDraft(
      availabilityDraft.map((slot, i) =>
        i === idx ? { ...slot, [field]: field === "dayOfWeek" || field === "slotDuration" ? Number(value) : value } : slot
      )
    );
  };

  const tabs = [
    { id: "appointments", label: "Appointments", icon: Calendar },
    { id: "profile", label: "My Profile", icon: User },
    { id: "availability", label: "Availability", icon: Clock },
  ] as const;

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-zinc-800">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
            <Briefcase size={26} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Lawyer Dashboard</h1>
            <p className="text-zinc-400 text-sm">Welcome back, {user?.name}</p>
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
                  ? "bg-white text-black shadow-lg"
                  : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800"
              }`}
            >
              <Icon size={16} /> {label}
            </button>
          ))}
        </div>

        {/* Appointments Tab */}
        {activeTab === "appointments" && <MyAppointments />}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <User size={20} className="text-white" /> Professional Profile
              </h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
                >
                  <Edit3 size={15} /> Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200 disabled:opacity-50"
                  >
                    <Check size={15} /> {isSaving ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={() => { setDraft(profile); setIsEditing(false); }}
                    className="flex items-center gap-2 bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded-xl text-sm font-medium transition"
                  >
                    <X size={15} /> Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Profile image preview */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src={draft.image || "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg"}
                alt="profile"
                className="w-20 h-20 rounded-xl object-cover ring-2 ring-white/10"
              />
              {isEditing && (
                <div className="flex-1">
                  <label className="text-xs text-zinc-400 mb-1 block">Image URL</label>
                  <input
                    value={draft.image}
                    onChange={(e) => setDraft({ ...draft, image: e.target.value })}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-white focus:outline-none"
                  />
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {profileFields.map(({ label, field, icon: Icon }) => (
                <div key={field}>
                  <label className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1">
                    <Icon size={12} /> {label}
                  </label>
                  {isEditing ? (
                    <input
                      value={draft[field]}
                      onChange={(e) => setDraft({ ...draft, [field]: e.target.value })}
                      className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-white focus:outline-none"
                    />
                  ) : (
                    <p className="px-3 py-2 text-sm text-white">{profile[field] || "—"}</p>
                  )}
                </div>
              ))}

              {/* Fees */}
              <div>
                <label className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1">
                  <IndianRupee size={12} /> Consultation Fees (₹)
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    value={draft.fees}
                    onChange={(e) => setDraft({ ...draft, fees: Number(e.target.value) })}
                    className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-white focus:outline-none"
                  />
                ) : (
                  <p className="px-3 py-2 text-sm text-white">₹{profile.fees}</p>
                )}
              </div>

              {/* Experience Years */}
              <div>
                <label className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1">
                  <Briefcase size={12} /> Years of Experience
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    value={draft.experienceYears}
                    onChange={(e) => setDraft({ ...draft, experienceYears: Number(e.target.value) })}
                    className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-white focus:outline-none"
                  />
                ) : (
                  <p className="px-3 py-2 text-sm text-white">{profile.experienceYears} years</p>
                )}
              </div>

              {/* Address Line 1 */}
              <div>
                <label className="text-xs text-zinc-400 mb-1 block">Address Line 1</label>
                {isEditing ? (
                  <input
                    value={draft.address.line1}
                    onChange={(e) => setDraft({ ...draft, address: { ...draft.address, line1: e.target.value } })}
                    className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-white focus:outline-none"
                  />
                ) : (
                  <p className="px-3 py-2 text-sm text-white">{profile.address?.line1 || "—"}</p>
                )}
              </div>

              {/* Address Line 2 */}
              <div>
                <label className="text-xs text-zinc-400 mb-1 block">Address Line 2</label>
                {isEditing ? (
                  <input
                    value={draft.address.line2 || ""}
                    onChange={(e) => setDraft({ ...draft, address: { ...draft.address, line2: e.target.value } })}
                    className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-white focus:outline-none"
                  />
                ) : (
                  <p className="px-3 py-2 text-sm text-white">{profile.address?.line2 || "—"}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mt-5">
              <label className="text-xs text-zinc-400 mb-1 block">About / Description</label>
              {isEditing ? (
                <textarea
                  value={draft.description}
                  onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                  rows={4}
                  className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-white focus:outline-none resize-none"
                />
              ) : (
                <p className="px-3 py-2 text-sm text-white leading-relaxed">{profile.description || "—"}</p>
              )}
            </div>

            {/* Specializations (comma separated) */}
            <div className="mt-5">
              <label className="text-xs text-zinc-400 mb-1 block">Specializations (comma-separated)</label>
              {isEditing ? (
                <input
                  value={draft.specialization.join(", ")}
                  onChange={(e) => setDraft({ ...draft, specialization: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
                  className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-white focus:outline-none"
                />
              ) : (
                <div className="flex flex-wrap gap-2 px-3 py-2">
                  {profile.specialization.map((s, i) => (
                    <span key={i} className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-zinc-300">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Availability Tab */}
        {activeTab === "availability" && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Clock size={20} className="text-white" /> Weekly Availability
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={addAvailabilitySlot}
                  className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
                >
                  <Plus size={15} /> Add Day
                </button>
                <button
                  onClick={handleSaveAvailability}
                  disabled={isSavingAvail}
                  className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200 disabled:opacity-50"
                >
                  <Check size={15} /> {isSavingAvail ? "Saving..." : "Save"}
                </button>
              </div>
            </div>

            {availabilityDraft.length === 0 ? (
              <div className="text-center py-12 text-zinc-500">
                <Clock size={40} className="mx-auto mb-3 opacity-30" />
                <p>No availability set. Click "Add Day" to get started.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {availabilityDraft.map((slot, idx) => (
                  <div
                    key={idx}
                    className="flex flex-wrap items-center gap-4 bg-black border border-zinc-800 rounded-xl p-4"
                  >
                    {/* Day */}
                    <div className="flex-1 min-w-[140px]">
                      <label className="text-xs text-zinc-500 mb-1 block">Day</label>
                      <select
                        value={slot.dayOfWeek}
                        onChange={(e) => updateAvailabilitySlot(idx, "dayOfWeek", e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-white focus:outline-none"
                      >
                        {DAYS.map((day, i) => (
                          <option key={i} value={i}>{day}</option>
                        ))}
                      </select>
                    </div>

                    {/* Start Time */}
                    <div>
                      <label className="text-xs text-zinc-500 mb-1 block">Start Time</label>
                      <input
                        type="time"
                        value={slot.startTime}
                        onChange={(e) => updateAvailabilitySlot(idx, "startTime", e.target.value)}
                        className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-white focus:outline-none"
                      />
                    </div>

                    {/* End Time */}
                    <div>
                      <label className="text-xs text-zinc-500 mb-1 block">End Time</label>
                      <input
                        type="time"
                        value={slot.endTime}
                        onChange={(e) => updateAvailabilitySlot(idx, "endTime", e.target.value)}
                        className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-white focus:outline-none"
                      />
                    </div>

                    {/* Slot duration */}
                    <div>
                      <label className="text-xs text-zinc-500 mb-1 block">Slot (min)</label>
                      <select
                        value={slot.slotDuration}
                        onChange={(e) => updateAvailabilitySlot(idx, "slotDuration", e.target.value)}
                        className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:border-white focus:outline-none"
                      >
                        {[15, 30, 45, 60].map((d) => (
                          <option key={d} value={d}>{d} min</option>
                        ))}
                      </select>
                    </div>

                    <button
                      onClick={() => removeAvailabilitySlot(idx)}
                      className="mt-4 rounded-lg p-1.5 text-zinc-500 transition hover:bg-white/10 hover:text-white"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <p className="text-xs text-zinc-600 mt-4">
              Changes saved here will reflect in the appointment booking slots for clients.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
