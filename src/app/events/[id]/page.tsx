"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { EventData } from "@/components/EventCard";
import SectionWrapper from "@/components/SectionWrapper";
import CTASection from "@/components/CTASection";
import { Calendar, Loader2, MapPin, Banknote, User, Mail, Phone, ArrowRight } from "lucide-react";
import Image from "next/image";

const MASTERCLASS_EVENT: EventData = {
  id: "masterclass-2026",
  title: "2-Month Transformational Masterclass",
  description: "Join our comprehensive 2-month Masterclass designed to elevate your leadership skills and kingdom mindset. Over the course of 8 weeks, you'll receive intensive training, profound teachings, and actionable insights to transform your mind and life. Don't miss this opportunity to take your capacity to the next level!",
  date: new Date("2026-07-20T10:00:00Z"),
  dateString: "Monday July 20th - Monday September 14th",
  location: "Online",
  price: "NGN70,000 or $50",
  image: "/2-MONTH MASTERCLASS PORTRAIT.png"
};

export default function EventRegistrationPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function fetchEvent() {
      if (id === "masterclass-2026") {
        setEvent(MASTERCLASS_EVENT);
        setLoading(false);
        return;
      }
      
      try {
        const docRef = doc(db, "events", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setEvent({
            id: docSnap.id,
            title: data.title,
            description: data.description,
            date: data.date?.toDate?.() || data.date,
            dateString: data.dateString,
            location: data.location,
            price: data.price,
            image: data.image,
          } as EventData);
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    }
    
    if (id) {
      fetchEvent();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;
    
    // Parse amount from price string, defaulting to 0 if not parsable or not present
    let amount = 0;
    if (event.id === "masterclass-2026") {
      amount = 70000;
    } else if (event.price) {
      const match = event.price.match(/\d+(?:,\d+)?/);
      if (match) amount = parseInt(match[0].replace(/,/g, ''), 10);
    }
    
    if (amount === 0) {
      alert("This event does not require payment or price is invalid.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/events/init-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          eventId: event.id,
          amount,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Payment initialization failed");
      }
      
      if (data.authorization_url) {
        window.location.href = data.authorization_url;
      }
    } catch (err: any) {
      setErrorMsg(err.message);
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-64 bg-gray-50 min-h-screen">
        <Loader2 className="w-16 h-16 text-primary-900 animate-spin mb-6" />
        <p className="text-gray-400 font-bold tracking-[0.2em] uppercase text-xs">Loading Event...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex flex-col justify-center items-center py-64 bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-serif italic text-gray-900 mb-4">Event Not Found</h1>
        <button onClick={() => router.push('/events')} className="text-primary-900 font-bold uppercase text-sm tracking-widest hover:underline">
          Back to Events
        </button>
      </div>
    );
  }

  return (
    <>
      <section className="bg-[#051a14] py-24 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-primary-900/40 blur-[120px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button onClick={() => router.push('/events')} className="text-white/60 hover:text-white font-bold uppercase text-xs tracking-widest mb-8 inline-flex items-center">
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Back to Events
          </button>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium text-white mb-6 tracking-tight max-w-5xl font-serif italic leading-[1.1]">
            {event.title}
          </h1>
        </div>
      </section>

      <SectionWrapper className="bg-white !py-16 md:!py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            {event.image && (
              <div className="w-full h-80 md:h-[30rem] relative rounded-[2.5rem] overflow-hidden mb-10 shadow-premium border border-gray-100">
                <Image src={event.image} alt={event.title} fill className="object-cover" />
              </div>
            )}
            <h2 className="text-3xl font-serif italic text-gray-900 mb-6">About the Event</h2>
            <p className="text-gray-500 font-light leading-relaxed text-lg mb-10">{event.description}</p>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div className="p-3 bg-white rounded-xl shadow-sm"><Calendar className="w-6 h-6 text-primary-900" /></div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Date & Time</p>
                  <p className="text-gray-900 font-medium">{event.dateString || new Date(event.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div className="p-3 bg-white rounded-xl shadow-sm"><MapPin className="w-6 h-6 text-primary-900" /></div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Location</p>
                  <p className="text-gray-900 font-medium">{event.location}</p>
                </div>
              </div>
              {event.price && (
                <div className="flex items-center space-x-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <div className="p-3 bg-white rounded-xl shadow-sm"><Banknote className="w-6 h-6 text-emerald-500" /></div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Registration Fee</p>
                    <p className="text-gray-900 font-medium">{event.price}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-premium p-8 md:p-12 sticky top-24">
              <h3 className="text-2xl font-serif italic text-gray-900 mb-2">Register Now</h3>
              <p className="text-gray-500 font-light text-sm mb-8">Fill out your details to secure your spot.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input required type="text" placeholder="John Doe" className="w-full pl-14 pr-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:ring-4 focus:ring-primary-900/5 focus:border-primary-900 transition-all outline-none text-gray-900" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input required type="email" placeholder="john@example.com" className="w-full pl-14 pr-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:ring-4 focus:ring-primary-900/5 focus:border-primary-900 transition-all outline-none text-gray-900" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input required type="tel" placeholder="+234..." className="w-full pl-14 pr-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:ring-4 focus:ring-primary-900/5 focus:border-primary-900 transition-all outline-none text-gray-900" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                  </div>
                </div>

                {errorMsg && <p className="text-red-500 text-sm px-4">{errorMsg}</p>}

                <button disabled={isSubmitting} type="submit" className="w-full py-5 rounded-[1.5rem] bg-primary-900 text-white font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 hover:bg-black transition-all active:scale-[0.98] shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed mt-4">
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                  ) : (
                    <>Proceed to Payment <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
                <p className="text-center text-[10px] text-gray-400 mt-6 uppercase tracking-extra-widest">
                  Secure Payment by Paystack
                </p>
              </form>
            </div>
          </div>
        </div>
      </SectionWrapper>
      <CTASection />
    </>
  );
}
