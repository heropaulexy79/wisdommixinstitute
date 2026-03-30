"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import SectionWrapper from "@/components/SectionWrapper";
import { MapPin, Phone, Mail, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "contact_messages"), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        createdAt: serverTimestamp(),
      });
      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting form: ", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <section className="bg-[#051a14] py-24 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-primary-900/40 blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-black uppercase text-xs tracking-[0.2em] mb-8">
            Connect With Us
          </span>
          <h1 className="text-5xl md:text-7xl font-medium text-white mb-10 tracking-tight max-w-5xl mx-auto font-serif italic leading-[1.1]">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-emerald-200 not-italic font-sans font-black uppercase tracking-tighter">Touch</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-100/80 max-w-3xl mx-auto font-light leading-relaxed">
            Have questions about our programs, mentorship, or events? We&apos;d love to hear from you and walk this journey together.
          </p>
        </div>
      </section>

      <SectionWrapper className="bg-white py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* Contact Info */}
          <div>
            <span className="text-primary-900 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Information</span>
            <h2 className="text-4xl md:text-5xl font-medium text-gray-900 mb-8 font-serif italic">Contact Details</h2>
            <p className="text-lg text-gray-500 mb-12 leading-relaxed font-light">
              We are committed to helping you on your transformation journey. Reach out through any of the channels below or fill out the form.
            </p>
            
            <div className="space-y-10">
              <div className="flex items-start group">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 mr-6 border border-gray-100 group-hover:bg-primary-900 group-hover:text-white transition-all duration-300">
                  <MapPin className="w-6 h-6 text-gray-900 group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 tracking-tight uppercase text-xs tracking-widest mb-1">Our Location</h3>
                  <p className="text-gray-500 font-light">Lagos, Nigeria</p>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 mr-6 border border-gray-100 group-hover:bg-primary-900 group-hover:text-white transition-all duration-300">
                  <Phone className="w-6 h-6 text-gray-900 group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 tracking-tight uppercase text-xs tracking-widest mb-1">Phone Number</h3>
                  <p className="text-gray-500 font-light">+234 123 456 7890</p>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 mr-6 border border-gray-100 group-hover:bg-primary-900 group-hover:text-white transition-all duration-300">
                  <Mail className="w-6 h-6 text-gray-900 group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 tracking-tight uppercase text-xs tracking-widest mb-1">Email Address</h3>
                  <p className="text-gray-500 font-light">hello@wisdommixacademy.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-[3rem] p-10 md:p-14 border border-gray-100 shadow-premium relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100/10 rounded-full blur-[100px] -mr-32 -mt-32" />
            
            <h3 className="text-2xl font-medium text-gray-900 mb-10 font-serif italic border-b border-gray-50 pb-6">Send us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 block ml-1">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-primary-900 focus:border-primary-900 outline-none transition-all bg-gray-50/30 text-gray-900 font-medium placeholder:text-gray-300"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 block ml-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-primary-900 focus:border-primary-900 outline-none transition-all bg-gray-50/30 text-gray-900 font-medium placeholder:text-gray-300"
                  placeholder="john@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 block ml-1">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-6 py-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-primary-900 focus:border-primary-900 outline-none transition-all resize-none bg-gray-50/30 text-gray-900 font-medium placeholder:text-gray-300"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              {isSuccess && (
                <div className="p-5 rounded-[1.5rem] bg-primary-900 text-white border border-primary-800 flex items-center shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <CheckCircle className="w-6 h-6 mr-4 shrink-0" />
                  <p className="font-medium text-sm">Your message has been sent successfully. We will get back to you soon.</p>
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-5 rounded-2xl text-white font-black uppercase text-sm tracking-widest flex items-center justify-center transition-all shadow-xl active:scale-95 ${
                  isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-primary-900 hover:bg-black"
                }`}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                {!isSubmitting && <Send className="ml-3 w-4 h-4" />}
              </button>
            </form>
          </div>

        </div>
      </SectionWrapper>
    </>
  );
}
