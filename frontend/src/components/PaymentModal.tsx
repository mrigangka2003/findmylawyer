import { useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { CreditCard, X, Shield, IndianRupee, CheckCircle2 } from "lucide-react";

type Props = {
  bookingId: string;
  amount: number;
  lawyerName: string;
  date: string;
  timeSlot: string;
  onClose: () => void;
  onSuccess: (bookingId: string) => void;
};

type PaymentOrder = {
  id: string;
  amount?: number;
  currency?: string;
};

type RazorpayPaymentResponse = {
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
  isMock?: boolean;
  amount?: number;
  paymentMethod?: "mock" | "razorpay";
};

type RazorpayCheckoutOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayPaymentResponse) => Promise<void>;
  prefill: { name: string; email: string };
  theme: { color: string };
  modal: { ondismiss: () => void };
};

type RazorpayCheckout = { open: () => void };

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayCheckoutOptions) => RazorpayCheckout;
  }
}

export default function PaymentModal({
  bookingId,
  amount,
  lawyerName,
  date,
  timeSlot,
  onClose,
  onSuccess,
}: Props) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handlePay = async () => {
    setIsProcessing(true);
    try {
      // Step 1: Create order
      const { data: orderData } = await api.post("/payments/create-order", {
        bookingId,
        amount,
      });

      if (orderData.isMock || orderData.key === "mock") {
        // Mock payment flow (no Razorpay configured)
        await processMockPayment(orderData.order);
        return;
      }

      // Step 2: Open Razorpay checkout
      const options = {
        key: orderData.key,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "FindMyLawyer",
        description: `Consultation with ${lawyerName}`,
        order_id: orderData.order.id,
        handler: async (response: RazorpayPaymentResponse) => {
          // Step 3: Verify payment
          await verifyAndConfirm({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });
        },
        prefill: { name: "", email: "" },
        theme: { color: "#18181b" },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            toast.error("Payment cancelled");
          },
        },
      };

      if (!window.Razorpay) {
        toast.error("Razorpay not loaded. Using mock payment.");
        await processMockPayment(orderData.order);
        return;
      }
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Payment initiation failed");
      setIsProcessing(false);
    }
  };

  const processMockPayment = async (order: PaymentOrder) => {
    try {
      await verifyAndConfirm({ isMock: true, amount, paymentMethod: "mock" }, order);
    } catch {
      setIsProcessing(false);
    }
  };

  const verifyAndConfirm = async (paymentResponse: RazorpayPaymentResponse, order?: PaymentOrder) => {
    try {
      const { data } = await api.post("/payments/verify", {
        bookingId,
        amount,
        paymentMethod: paymentResponse.isMock ? "mock" : "razorpay",
        ...paymentResponse,
        ...(order ? { razorpay_order_id: order.id } : {}),
      });

      if (data.payment) {
        setIsDone(true);
        toast.success("Payment successful! Booking confirmed.");
        setTimeout(() => {
          onSuccess(bookingId);
        }, 1500);
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Payment verification failed");
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CreditCard size={20} className="text-white" /> Confirm Payment
          </h2>
          {!isProcessing && !isDone && (
            <button onClick={onClose} className="text-zinc-500 hover:text-white transition">
              <X size={20} />
            </button>
          )}
        </div>

        {isDone ? (
          <div className="text-center py-6">
            <CheckCircle2 size={56} className="mx-auto mb-3 text-white" />
            <h3 className="text-xl font-semibold text-white">Payment Successful!</h3>
            <p className="text-zinc-400 text-sm mt-1">Your booking has been confirmed.</p>
          </div>
        ) : (
          <>
            {/* Booking Summary */}
            <div className="bg-black/50 rounded-xl p-4 mb-5 space-y-2 border border-zinc-800">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Lawyer</span>
                <span className="text-white font-medium">{lawyerName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Date</span>
                <span className="text-white">{new Date(date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Time</span>
                <span className="text-white">{timeSlot}</span>
              </div>
              <div className="border-t border-zinc-800 pt-2 mt-2 flex justify-between">
                <span className="text-zinc-300 font-medium">Total Amount</span>
                <span className="text-white font-bold flex items-center gap-0.5">
                  <IndianRupee size={14} />{amount}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-zinc-500 mb-5">
              <Shield size={12} className="text-white" />
              Payments are secure and encrypted
            </div>

            <button
              onClick={handlePay}
              disabled={isProcessing}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 font-semibold text-black transition hover:bg-zinc-200 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard size={16} />
                  Pay ₹{amount}
                </>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
