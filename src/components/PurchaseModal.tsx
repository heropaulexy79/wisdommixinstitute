"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, User, Phone, Mail, MapPin, Loader2, ArrowRight, BookOpen, Truck } from "lucide-react";
import { useState } from "react";
import { CartItem } from "@/context/CartContext";

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string; phone: string; address?: string }) => void;
  cartItems: CartItem[];
  totalPrice: number;
  isSubmitting: boolean;
}

export default function PurchaseModal({ isOpen, onClose, onSubmit, cartItems, totalPrice, isSubmitting }: PurchaseModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const hasPhysicalItems = cartItems.some((item) => item.format === "physical");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#051a14]/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="bg-[#051a14] p-8 text-white relative">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-[10px] font-black uppercase tracking-widest mb-4">
                {hasPhysicalItems ? "Checkout & Preorder Delivery" : "Confirm Purchase"}
              </span>
              <h2 className="text-2xl font-medium font-serif italic">
                {cartItems.length === 1 ? cartItems[0].title : `${cartItems.length} Books Selected`}
              </h2>
            </div>

            {/* Cart Summary */}
            <div className="px-8 pt-6 pb-2 border-b border-gray-100">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Order Summary</p>
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-1.5">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-primary-900/40 shrink-0" />
                      <div>
                        <span className="text-sm text-gray-800 font-medium block">{item.title}</span>
                        <span className={`inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          item.format === 'physical' 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {item.format === 'physical' ? 'Physical Preorder' : 'Digital E-Book'}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-primary-900">₦{item.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center pt-3 mt-3 border-t border-gray-100">
                <span className="text-sm font-bold text-gray-600">Total</span>
                <span className="text-lg font-black text-primary-900">₦{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-4">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      required
                      type="text"
                      placeholder="John Doe"
                      className="w-full pl-14 pr-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:ring-4 focus:ring-primary-900/5 focus:border-primary-900 transition-all outline-none text-gray-900"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      required
                      type="email"
                      placeholder="john@example.com"
                      className="w-full pl-14 pr-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:ring-4 focus:ring-primary-900/5 focus:border-primary-900 transition-all outline-none text-gray-900"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      required
                      type="tel"
                      placeholder="+234..."
                      className="w-full pl-14 pr-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:ring-4 focus:ring-primary-900/5 focus:border-primary-900 transition-all outline-none text-gray-900"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                {/* Delivery Address (required if physical items exist) */}
                {hasPhysicalItems && (
                  <div className="space-y-3 pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 ml-4">
                      <Truck className="w-3.5 h-3.5 text-amber-600" />
                      <label className="text-[10px] font-black uppercase tracking-widest text-amber-700">Delivery Address (For Physical Preorders)</label>
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-5 top-5 w-5 h-5 text-gray-400" />
                      <textarea
                        required
                        rows={3}
                        placeholder="Street Address, City, State, Country..."
                        className="w-full pl-14 pr-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:ring-4 focus:ring-primary-900/5 focus:border-primary-900 transition-all outline-none text-gray-900 font-normal text-sm"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      />
                    </div>
                    <div className="p-3.5 bg-amber-50 border border-amber-200/60 rounded-2xl text-amber-900 text-xs font-medium leading-relaxed">
                      <p className="font-bold text-amber-950 mb-0.5">⚠️ Delivery Fee Notice:</p>
                      Please note that delivery fees are <strong>not included</strong> in the purchase price. Our representative will contact you directly to confirm delivery arrangements. Delivery charges will be covered by the recipient.
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full py-5 rounded-[1.5rem] bg-primary-900 text-white font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 hover:bg-black transition-all active:scale-[0.98] shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Pay ₦{totalPrice.toLocaleString()}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <p className="text-center text-[10px] text-gray-400 mt-6 uppercase tracking-extra-widest">
                  Secure Payment by Paystack
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
