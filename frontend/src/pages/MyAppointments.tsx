import { useLawyerStore } from "../store/useLawyerStore";
import { MapPin, CalendarClock, CreditCard, XCircle  } from "lucide-react";

const MyAppointments = () => {
    const lawyers = useLawyerStore((state) => state.lawyers);

    return (
        <main className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-black p-4 md:p-8">
            <h1 className="text-3xl font-bold text-white mb-8 text-center">
                My Appointments
            </h1>

            <div className="space-y-4">
                {lawyers.slice(0, 2).map((item) => (
                    <article
                        key={item._id}
                        className="flex flex-col md:flex-row items-center gap-4 rounded-2xl bg-white/5 backdrop-blur-xl ring-1 ring-white/10 shadow-lg shadow-black/40 p-4 transition hover:bg-white/10"
                    >
                        {/* Avatar */}
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-full object-cover ring-2 ring-white/20 shrink-0"
                        />

                        {/* Details */}
                        <div className="flex-1 grid sm:grid-cols-3 gap-x-4 gap-y-1 text-sm text-neutral-200 min-w-0">
                            <div>
                                <h2 className="font-semibold text-white text-base">
                                    {item.name}
                                </h2>
                                <p className="text-indigo-400">
                                    {item.speciality}
                                </p>
                            </div>

                            <div className="flex items-start gap-1">
                                <MapPin
                                    size={14}
                                    className="mt-0.5 text-neutral-400 shrink-0"
                                />
                                <span className="truncate">
                                    {item.address.line1}
                                    {item.address.line2 &&
                                        `, ${item.address.line2}`}
                                </span>
                            </div>

                            <div className="flex items-center gap-1">
                                <CalendarClock
                                    size={14}
                                    className="text-neutral-400 shrink-0"
                                />
                                <span>15 Aug 2025, 10:30</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 shrink-0">
                            <button className="flex items-center gap-1.5 rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-500 transition">
                                <CreditCard size={14} /> Pay
                            </button>
                            <button className="flex items-center gap-1.5 rounded-md bg-red-600/80 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-600 transition">
                                <XCircle size={14} /> Cancel
                            </button>
                        </div>
                    </article>
                ))}
                
            </div>
        </main>
    );
};

export default MyAppointments;
