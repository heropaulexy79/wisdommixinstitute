"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader2, ArrowLeft } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

type Status = "verifying" | "success" | "failed";

export default function BookingSuccessPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference") || searchParams.get("trxref");
  const [status, setStatus] = useState<Status>("verifying");
  const [bookingData, setBookingData] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!reference) { setStatus("failed"); return; }

    // Load form data saved before redirect
    let saved: Record<string, string> = {};
    try {
      const raw = sessionStorage.getItem("nlc_booking");
      if (raw) saved = JSON.parse(raw);
    } catch { /* ignore */ }
    setBookingData(saved);

    // Verify payment with our server
    const verify = async () => {
      try {
        const res = await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference }),
        });
        const data = await res.json();

        if (res.ok && data.success) {
          // Save booking to Firestore (best-effort)
          addDoc(collection(db, "bookings"), {
            ...saved,
            paystackRef: reference,
            amount: 5000,
            status: "confirmed",
            createdAt: serverTimestamp(),
          }).catch(console.error);

          sessionStorage.removeItem("nlc_booking");
          setStatus("success");
        } else {
          setStatus("failed");
        }
      } catch {
        setStatus("failed");
      }
    };

    verify();
  }, [reference]);

  const formatDate = (d: string) => {
    if (!d) return "";
    try { return new Date(d + "T00:00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" }); }
    catch { return d; }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-lg">

        {/* Verifying */}
        {status === "verifying" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
            <Loader2 className="w-16 h-16 text-primary-900 animate-spin mx-auto mb-6" />
            <h2 className="text-2xl font-medium font-serif italic text-gray-900 mb-3">Verifying your payment…</h2>
            <p className="text-gray-500 font-light">Please wait, this only takes a moment.</p>
          </motion.div>
        )}

        {/* Success */}
        {status === "success" && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <div className="w-20 h-20 bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-medium font-serif italic text-gray-900 mb-4">You&apos;re Booked!</h2>
            <p className="text-gray-500 font-light mb-8 leading-relaxed">
              Your mentorship session is confirmed.
              {bookingData.email && <> A receipt was sent to <strong className="text-gray-800">{bookingData.email}</strong>.</>}
            </p>

            <div className="bg-white rounded-[1.5rem] border border-gray-100 shadow-sm p-8 text-left space-y-4 mb-8">
              {bookingData.name && <div className="flex justify-between text-sm"><span className="text-gray-400 uppercase text-xs font-bold tracking-wider">Name</span><span className="font-semibold text-gray-800">{bookingData.name}</span></div>}
              {bookingData.date && <div className="flex justify-between text-sm"><span className="text-gray-400 uppercase text-xs font-bold tracking-wider">Date</span><span className="font-semibold text-gray-800">{formatDate(bookingData.date)}</span></div>}
              {bookingData.time && <div className="flex justify-between text-sm"><span className="text-gray-400 uppercase text-xs font-bold tracking-wider">Time</span><span className="font-semibold text-gray-800">{bookingData.time} WAT</span></div>}
              <div className="flex justify-between text-sm"><span className="text-gray-400 uppercase text-xs font-bold tracking-wider">Reference</span><span className="font-mono text-xs text-gray-600 break-all">{reference}</span></div>
              <div className="pt-3 border-t border-gray-100 flex justify-between"><span className="text-gray-400 uppercase text-xs font-bold tracking-wider">Paid</span><span className="font-black text-primary-900">₦50.00</span></div>
            </div>

            <p className="text-xs text-gray-400 mb-8">Save your reference number for any follow-up queries.</p>
            <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary-900 text-white font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </motion.div>
        )}

        {/* Failed */}
        {status === "failed" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <XCircle className="w-10 h-10 text-red-400" />
            </div>
            <h2 className="text-3xl font-medium font-serif italic text-gray-900 mb-4">Verification Failed</h2>
            <p className="text-gray-500 font-light mb-4 leading-relaxed">
              We could not verify your payment. If you were charged, please contact us with your reference:
            </p>
            {reference && <p className="font-mono text-sm bg-gray-100 rounded-xl px-4 py-3 mb-8 break-all">{reference}</p>}
            <Link href="/mentorship" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary-900 text-white font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl">
              <ArrowLeft className="w-4 h-4" /> Try Again
            </Link>
          </motion.div>
        )}

      </div>
    </div>
  );
}
