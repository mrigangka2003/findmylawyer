import { useEffect, useState } from "react";
import useTop from "../hooks/useTop";
import { CalendarClock, CreditCard, XCircle, CheckCircle, IndianRupee } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import api from "../utils/api";
import toast from "react-hot-toast";
import PaymentModal from "../components/PaymentModal";

type BookingLawyer = {
  _id: string;
  name: string;
  email: string;
};

type Booking = {
  _id: string;
  userId: { _id: string; name: string; email: string };
  lawyerId: BookingLawyer;
  date: string;
  timeSlot: string;
  status: string;
  paymentId?: string;
  fees?: number;
};

const STATUS_STYLES: Record<string, string> = {
  confirmed: "bg-green-500/20 text-green-400 border border-green-500/30",
  accepted:  "bg-green-500/20 text-green-400 border border-green-500/30",
  cancelled: "bg-red-500/20 text-red-400 border border-red-500/30",
  rejected:  "bg-red-500/20 text-red-400 border border-red-500/30",
  pending:   "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
};

const MyAppointments = () => {
  useTop();
  const { user, isAuthenticated } = useAuthStore();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [paymentModal, setPaymentModal] = useState<{
    bookingId: string;
    amount: number;
    lawyerName: string;
    date: string;
    timeSlot: string;
  } | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !user) return;
    const fetchBookings = async () => {
      try {
        let endpoint = "";
        if (user.role === "admin") endpoint = "/bookings/admin/all";
        else if (user.role === "lawyer") endpoint = "/bookings/lawyer/my-bookings";
        else endpoint = "/bookings/user/my-bookings";

        const { data } = await api.get(endpoint);
        setBookings(data.bookings || []);
      } catch {
        toast.error("Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user, isAuthenticated]);

  const handleUpdateStatus = async (bookingId: string, status: string) => {
    try {
      await api.patch(`/bookings/${bookingId}/status`, { status });
      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status } : b))
      );
      toast.success(`Booking ${status}!`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handlePaymentSuccess = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b._id === bookingId ? { ...b, status: "confirmed", paymentId: "paid" } : b))
    );
    setPaymentModal(null);
  };

  const openPaymentModal = async (booking: Booking) => {
    let fees = booking.fees || 0;

    // If we don't have fees, try fetching from lawyer profile
    if (!fees && booking.lawyerId?._id) {
      try {
        const { data } = await api.get(`/lawyers/${booking.lawyerId._id}`);
        fees = data.lawyer?.fees || 500;
      } catch {
        fees = 500; // fallback
      }
    }

    setPaymentModal({
      bookingId: booking._id,
      amount: fees,
      lawyerName: booking.lawyerId?.name || "Lawyer",
      date: booking.date,
      timeSlot: booking.timeSlot,
    });
  };

  if (loading)
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-zinc-400">Loading appointments...</p>
        </div>
      </div>
    );

  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-black p-4 md:p-8">
      {paymentModal && (
        <PaymentModal
          {...paymentModal}
          onClose={() => setPaymentModal(null)}
          onSuccess={handlePaymentSuccess}
        />
      )}

      <h1 className="text-2xl font-bold text-white mb-6 text-center">
        {user?.role === "admin" ? "All Appointments" : "My Appointments"}
      </h1>

      <div className="space-y-3 max-w-4xl mx-auto">
        {bookings.length === 0 ? (
          <div className="text-center py-16 text-zinc-600">
            <CalendarClock size={40} className="mx-auto mb-3 opacity-30" />
            <p>No appointments found.</p>
          </div>
        ) : (
          bookings.map((booking) => (
            <article
              key={booking._id}
              className="flex flex-col md:flex-row items-start md:items-center gap-4 rounded-2xl bg-white/5 backdrop-blur-xl ring-1 ring-white/10 shadow-lg p-4 transition hover:bg-white/[0.07]"
            >
              {/* Details */}
              <div className="flex-1 grid sm:grid-cols-3 gap-x-4 gap-y-1 text-sm text-neutral-200 min-w-0 w-full">
                <div>
                  <h2 className="font-semibold text-white text-base">
                    {user?.role === "lawyer"
                      ? booking.userId?.name
                      : booking.lawyerId?.name}
                  </h2>
                  <p className="text-indigo-400 text-xs capitalize">
                    {user?.role === "lawyer" ? "Client" : "Lawyer"}
                  </p>
                </div>

                <div className="flex items-center">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      STATUS_STYLES[booking.status] || STATUS_STYLES.pending
                    }`}
                  >
                    {booking.status}
                  </span>
                  {booking.paymentId && (
                    <span className="ml-2 flex items-center gap-0.5 text-xs text-green-400">
                      <IndianRupee size={10} /> Paid
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 text-zinc-400">
                  <CalendarClock size={13} className="shrink-0" />
                  <span className="text-xs">
                    {new Date(booking.date).toLocaleDateString()} at {booking.timeSlot}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 shrink-0 flex-wrap">
                {user?.role === "user" && booking.status !== "cancelled" && !booking.paymentId && (
                  <>
                    <button
                      onClick={() => openPaymentModal(booking)}
                      className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-500 transition"
                    >
                      <CreditCard size={13} /> Pay
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(booking._id, "cancelled")}
                      className="flex items-center gap-1.5 rounded-xl bg-red-600/70 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-600 transition"
                    >
                      <XCircle size={13} /> Cancel
                    </button>
                  </>
                )}

                {user?.role === "lawyer" && booking.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleUpdateStatus(booking._id, "confirmed")}
                      className="flex items-center gap-1.5 rounded-xl bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-500 transition"
                    >
                      <CheckCircle size={13} /> Confirm
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(booking._id, "cancelled")}
                      className="flex items-center gap-1.5 rounded-xl bg-red-600/70 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-600 transition"
                    >
                      <XCircle size={13} /> Reject
                    </button>
                  </>
                )}

                {user?.role === "admin" && (
                  <span className="text-xs text-zinc-500 px-2">
                    {booking.userId?.email}
                  </span>
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
