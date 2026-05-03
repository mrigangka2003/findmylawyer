import { useEffect, useState } from "react";
import useTop from "../hooks/useTop";
import { CalendarClock, CreditCard, XCircle, CheckCircle } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import api from "../utils/api";
import toast from "react-hot-toast";

type Booking = {
    _id: string;
    userId: { _id: string; name: string; email: string };
    lawyerId: { _id: string; name: string; email: string };
    date: string;
    timeSlot: string;
    status: string;
    paymentStatus: string;
};

const MyAppointments = () => {
    useTop();
    const { user, isAuthenticated } = useAuthStore();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated || !user) return;

        const fetchBookings = async () => {
            try {
                let endpoint = "";
                if (user.role === 'admin') endpoint = "/bookings/admin/all";
                else if (user.role === 'lawyer') endpoint = "/bookings/lawyer/my-bookings";
                else endpoint = "/bookings/user/my-bookings";

                const { data } = await api.get(endpoint);
                setBookings(data.bookings || []);
            } catch (error) {
                toast.error("Failed to load appointments");
                console.log(error)
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [user, isAuthenticated]);

    const handleUpdateStatus = async (bookingId: string, status: string) => {
        try {
            await api.patch(`/bookings/${bookingId}/status`, { status });
            setBookings(bookings.map(b => b._id === bookingId ? { ...b, status } : b));
            toast.success("Status updated!");
        } catch (error) {
            toast.error("Failed to update status"); 
            console.log(error)
        }
    };

    if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;

    return (
        <main className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-black p-4 md:p-8">
            <h1 className="text-3xl font-bold text-white mb-8 text-center">
                {user?.role === 'admin' ? "All Appointments" : "My Appointments"}
            </h1>

            <div className="space-y-4 max-w-4xl mx-auto">
                {bookings.length === 0 ? (
                    <p className="text-center text-gray-400">No appointments found.</p>
                ) : (
                    bookings.map((booking) => (
                        <article
                            key={booking._id}
                            className="flex flex-col md:flex-row items-center gap-4 rounded-2xl bg-white/5 backdrop-blur-xl ring-1 ring-white/10 shadow-lg shadow-black/40 p-4 transition hover:bg-white/10"
                        >
                            {/* Details */}
                            <div className="flex-1 grid sm:grid-cols-3 gap-x-4 gap-y-1 text-sm text-neutral-200 min-w-0 w-full">
                                <div>
                                    <h2 className="font-semibold text-white text-base">
                                        {user?.role === 'lawyer' ? booking.userId.name : booking.lawyerId.name}
                                    </h2>
                                    <p className="text-indigo-400 capitalize">
                                        {user?.role === 'lawyer' ? "Client" : "Lawyer"}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                        booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                                        booking.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                                        'bg-yellow-500/20 text-yellow-400'
                                    }`}>
                                        {booking.status}
                                    </span>
                                </div>

                                <div className="flex items-center gap-1">
                                    <CalendarClock size={14} className="text-neutral-400 shrink-0" />
                                    <span>{new Date(booking.date).toLocaleDateString()} at {booking.timeSlot}</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 shrink-0">
                                {user?.role === 'user' && booking.status !== 'cancelled' && (
                                    <>
                                        <button className="flex items-center gap-1.5 rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-500 transition">
                                            <CreditCard size={14} /> Pay
                                        </button>
                                        <button 
                                            onClick={() => handleUpdateStatus(booking._id, 'cancelled')}
                                            className="flex items-center gap-1.5 rounded-md bg-red-600/80 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-600 transition"
                                        >
                                            <XCircle size={14} /> Cancel
                                        </button>
                                    </>
                                )}
                                
                                {user?.role === 'lawyer' && booking.status === 'pending' && (
                                    <>
                                        <button 
                                            onClick={() => handleUpdateStatus(booking._id, 'confirmed')}
                                            className="flex items-center gap-1.5 rounded-md bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-500 transition"
                                        >
                                            <CheckCircle size={14} /> Confirm
                                        </button>
                                        <button 
                                            onClick={() => handleUpdateStatus(booking._id, 'cancelled')}
                                            className="flex items-center gap-1.5 rounded-md bg-red-600/80 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-600 transition"
                                        >
                                            <XCircle size={14} /> Reject
                                        </button>
                                    </>
                                )}
                            </div>
                        </article>
                    ))
                )}
            </div>
        </main>
    );
};

export default MyAppointments;
