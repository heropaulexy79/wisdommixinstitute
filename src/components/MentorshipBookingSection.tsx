"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, FileText, ArrowRight, ArrowLeft, CheckCircle, Loader2, CalendarCheck } from "lucide-react";
import BookingCalendar from "./BookingCalendar";

interface FormData {
  name: string; email: string; phone: string;
  date: string; time: string; notes: string;
}

export default function MentorshipBookingSection() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>({ name: "", email: "", phone: "", date: "", time: "", notes: "" });
  const [amount, setAmount] = useState(30000);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const update = (field: keyof FormData, value: string) => { setForm(f => ({ ...f, [field]: value })); setError(""); };

  const validateStep1 = () => {
    if (!form.name.trim()) return "Please enter your full name.";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) return "Please enter a valid email.";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 7) return "Please enter a valid phone number.";
    return "";
  };
  const validateStep2 = () => {
    if (!form.date) return "Please select a date.";
    if (!form.time) return "Please select a time slot.";
    return "";
  };

  const goNext = () => {
    const err = step === 1 ? validateStep1() : step === 2 ? validateStep2() : "";
    if (err) { setError(err); return; }
    setError(""); setStep(s => s + 1);
  };

  const formatDate = (d: string) => {
    if (!d) return "";
    return new Date(d + "T00:00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  };

  const handlePay = async () => {
    setError(""); setIsProcessing(true);
    try {
      // Save form data to sessionStorage so we can read it on the success page
      sessionStorage.setItem("nlc_booking", JSON.stringify(form));

      // Ask server to initialize a Paystack transaction
      const res = await fetch("/api/init-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, amount }),
      });
      const data = await res.json();

      if (!res.ok || !data.authorization_url) {
        setError(data.error || "Could not initialize payment. Please try again.");
        setIsProcessing(false);
        return;
      }

      // Redirect the user to Paystack's hosted payment page
      // After payment, Paystack sends them to /mentorship/booking-success?reference=xxx
      window.location.href = data.authorization_url;
    } catch {
      setError("Network error. Please check your connection and try again.");
      setIsProcessing(false);
    }
  };

  const steps = [{ num: 1, label: "Your Details" }, { num: 2, label: "Pick a Slot" }, { num: 3, label: "Notes & Pay" }];

  return (
    <div className="max-w-3xl mx-auto">
      {/* Step Indicator */}
      <div className="flex items-center justify-center mb-12">
        {steps.map((s, i) => (
          <div key={s.num} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm transition-all duration-300 ${step > s.num ? "bg-primary-900 text-white" : step === s.num ? "bg-primary-900 text-white ring-4 ring-primary-900/20" : "bg-gray-100 text-gray-400"}`}>
                {step > s.num ? <CheckCircle className="w-5 h-5" /> : s.num}
              </div>
              <span className={`mt-2 text-[10px] font-black uppercase tracking-widest hidden sm:block ${step === s.num ? "text-primary-900" : "text-gray-400"}`}>{s.label}</span>
            </div>
            {i < steps.length - 1 && <div className={`h-px w-16 sm:w-24 mx-2 mb-5 transition-colors duration-300 ${step > s.num ? "bg-primary-900" : "bg-gray-200"}`} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-6">
              <div><h3 className="text-2xl font-medium font-serif italic text-gray-900 mb-2">Your Details</h3><p className="text-gray-500 font-light text-sm">Tell us who you are so we can prepare for your session.</p></div>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">Choose Session Type</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button 
                      type="button"
                      onClick={() => setAmount(25000)}
                      className={`p-4 rounded-2xl border transition-all text-left ${amount === 25000 ? "border-primary-900 bg-primary-50/50 ring-2 ring-primary-900/10" : "border-gray-100 bg-gray-50/50 hover:border-gray-200"}`}
                    >
                      <p className="font-bold text-gray-900">Single Session</p>
                      <p className="text-xs text-gray-500">90 minutes • ₦25,000</p>
                    </button>
                    <button 
                      type="button"
                      onClick={() => setAmount(50000)}
                      className={`p-4 rounded-2xl border transition-all text-left ${amount === 50000 ? "border-primary-900 bg-primary-50/50 ring-2 ring-primary-900/10" : "border-gray-100 bg-gray-50/50 hover:border-gray-200"}`}
                    >
                      <p className="font-bold text-gray-900">Multiple Sessions</p>
                      <p className="text-xs text-gray-500">Extended Guidance • ₦50,000</p>
                    </button>
                  </div>
                </div>
                {[
                  { field: "name" as const, label: "Full Name", icon: <User className="w-3.5 h-3.5" />, type: "text", placeholder: "Joseph Adeniran" },
                  { field: "email" as const, label: "Email Address", icon: <Mail className="w-3.5 h-3.5" />, type: "email", placeholder: "Nexleadershipcommunity@gmail.com" },
                  { field: "phone" as const, label: "Phone Number", icon: <Phone className="w-3.5 h-3.5" />, type: "tel", placeholder: "+234 800 000 0000" },
                ].map(({ field, label, icon, type, placeholder }) => (
                  <div key={field} className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">{icon} {label}</label>
                    <input type={type} value={form[field]} onChange={e => update(field, e.target.value)} placeholder={placeholder}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 text-gray-900 font-medium placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-900 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-6">
              <div><h3 className="text-2xl font-medium font-serif italic text-gray-900 mb-2">Pick a Session Slot</h3><p className="text-gray-500 font-light text-sm">Choose your preferred date and time. Booked slots are grayed out.</p></div>
              <BookingCalendar selectedDate={form.date} selectedTime={form.time} onDateChange={d => update("date", d)} onTimeChange={t => update("time", t)} />
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-6">
              <div><h3 className="text-2xl font-medium font-serif italic text-gray-900 mb-2">Almost There</h3><p className="text-gray-500 font-light text-sm">Review your session, add any notes, then click Pay to be taken to a secure checkout.</p></div>

              <div className="bg-[#051a14] rounded-[1.5rem] p-6 text-white space-y-3 relative overflow-hidden">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary-400/10 rounded-full blur-2xl" />
                <div className="flex items-center gap-3 mb-4"><CalendarCheck className="w-5 h-5 text-primary-300" /><span className="font-black uppercase text-xs tracking-widest text-primary-300">Session Summary</span></div>
                <div className="flex justify-between text-sm"><span className="text-white/60">Name</span><span className="font-semibold">{form.name}</span></div>
                <div className="flex justify-between text-sm"><span className="text-white/60">Date</span><span className="font-semibold">{formatDate(form.date)}</span></div>
                 <div className="flex justify-between text-sm"><span className="text-white/60">Time</span><span className="font-semibold">{form.time} WAT</span></div>
                <div className="flex justify-between text-sm"><span className="text-white/60">Duration</span><span className="font-semibold">{amount === 25000 ? "90 Minutes" : "Flexible"}</span></div>
                <div className="pt-3 border-t border-white/10 flex justify-between"><span className="text-white/60">Session Fee</span><span className="font-black text-primary-300 text-lg">₦{amount.toLocaleString()}.00</span></div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2"><FileText className="w-3.5 h-3.5" /> Additional Notes <span className="normal-case font-normal text-gray-300">(optional)</span></label>
                <textarea value={form.notes} onChange={e => update("notes", e.target.value)} rows={4}
                  placeholder="What would you like to focus on in this session?"
                  className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 text-gray-900 font-medium placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-900 transition-all resize-none" />
              </div>

              <p className="text-xs text-gray-400 flex items-center gap-2">
                🔒 You will be redirected to Paystack&apos;s secure checkout to complete your ₦{amount.toLocaleString()} payment.
              </p>
            </div>
          )}

        </motion.div>
      </AnimatePresence>

      {error && (
        <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</motion.p>
      )}

      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
        {step > 1 ? (
          <button type="button" onClick={() => { setStep(s => s - 1); setError(""); }}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 text-gray-600 font-bold text-xs uppercase tracking-widest hover:border-gray-300 hover:text-gray-900 transition-all">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        ) : <div />}

        {step < 3 ? (
          <button type="button" onClick={goNext}
            className="flex items-center gap-2 px-8 py-4 rounded-full bg-primary-900 text-white font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl active:scale-95">
            Continue <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button type="button" onClick={handlePay} disabled={isProcessing}
            className="flex items-center gap-2 px-8 py-4 rounded-full bg-primary-900 text-white font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed">
            {isProcessing
              ? <><Loader2 className="w-4 h-4 animate-spin" /> Redirecting to Paystack...</>
              : <>Pay ₦{amount.toLocaleString()} &amp; Confirm <ArrowRight className="w-4 h-4" /></>}
          </button>
        )}
      </div>
    </div>
  );
}
