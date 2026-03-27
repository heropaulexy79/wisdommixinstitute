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
      <section className="bg-primary-950 py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent-500 rounded-l-full blur-[120px] opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Get in <span className="text-accent-400">Touch</span>
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Have questions about our programs, mentorship, or events? We'd love to hear from you.
          </p>
        </div>
      </section>

      <SectionWrapper className="bg-gray-50/50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              We are committed to helping you on your transformation journey. Reach out through any of the channels below or fill out the form.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center shrink-0 mr-5 border border-primary-100">
                  <MapPin className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Our Location</h3>
                  <p className="text-gray-600 mt-1">Lagos, Nigeria</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center shrink-0 mr-5 border border-primary-100">
                  <Phone className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Phone Number</h3>
                  <p className="text-gray-600 mt-1">+234 123 456 7890</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center shrink-0 mr-5 border border-primary-100">
                  <Mail className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Email Address</h3>
                  <p className="text-gray-600 mt-1">hello@wisdommixinstitute.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-xl shadow-primary-900/5">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-gray-50/50"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-gray-50/50"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all resize-none bg-gray-50/50"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              {isSuccess && (
                <div className="p-4 rounded-xl bg-green-50 text-green-700 border border-green-200 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3 shrink-0" />
                  <p>Your message has been sent successfully. We will get back to you soon.</p>
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl text-white font-bold text-lg flex items-center justify-center transition-all ${
                  isSubmitting ? "bg-primary-400 cursor-not-allowed" : "bg-primary-600 hover:bg-primary-700 hover:shadow-lg hover:-translate-y-0.5"
                }`}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                {!isSubmitting && <Send className="ml-2 w-5 h-5" />}
              </button>
            </form>
          </div>

        </div>
      </SectionWrapper>
    </>
  );
}
