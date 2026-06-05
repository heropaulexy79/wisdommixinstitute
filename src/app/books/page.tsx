"use client";

import { useState } from "react";
import SectionWrapper from "@/components/SectionWrapper";
import BookCard from "@/components/BookCard";
import { Search, Filter, ShoppingCart, ArrowRight, X, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PurchaseModal from "@/components/PurchaseModal";
import BookPreviewModal from "@/components/BookPreviewModal";
import { useCart } from "@/context/CartContext";
import { BOOKS } from "@/lib/products";

export default function BooksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCartPreview, setShowCartPreview] = useState(false);
  const { items, removeFromCart, clearCart, totalPrice, itemCount } = useCart();

  const filteredBooks = BOOKS.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePreview = (book: any) => {
    setSelectedBook(book);
    setIsPreviewOpen(true);
  };

  const handleCheckout = () => {
    if (itemCount === 0) return;
    setShowCartPreview(false);
    setIsModalOpen(true);
  };

  const handlePurchaseSubmit = async (userData: { name: string; email: string; phone: string }) => {
    if (items.length === 0) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/books/init-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userData.email,
          name: userData.name,
          phone: userData.phone,
          cartItems: items.map((b) => ({ id: b.id, title: b.title, price: b.price })),
          amount: totalPrice,
        }),
      });

      const data = await res.json();
      if (data.authorization_url) {
        sessionStorage.setItem(
          "nlc_book_purchase",
          JSON.stringify({
            email: userData.email,
            name: userData.name,
            cartItems: items.map((b) => ({ id: b.id, title: b.title })),
          })
        );
        window.location.href = data.authorization_url;
      } else {
        alert(data.error || "Failed to initialize payment");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Purchase error:", error);
      alert("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-[#051a14] py-24 md:py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-primary-900/40 blur-[120px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-black uppercase text-xs tracking-[0.2em] mb-8"
          >
            Digital Resource Library
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-8xl font-medium text-white mb-10 tracking-tight max-w-5xl mx-auto font-serif italic leading-[1.1]"
          >
            The{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-emerald-200 not-italic font-sans font-black uppercase tracking-tighter">
              Knowledge
            </span>{" "}
            Vault
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-primary-100/80 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Equip yourself with the wisdom and strategies needed to lead effectively in the 21st century.
          </motion.p>
        </div>
      </section>

      {/* Books Listing */}
      <SectionWrapper className="py-24 pb-40">
        {/* Search bar */}
        <div className="flex flex-col md:flex-row gap-6 mb-16 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by title..."
              className="w-full pl-16 pr-8 py-5 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:ring-4 focus:ring-primary-900/5 focus:border-primary-900 transition-all outline-none text-gray-900 font-light"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredBooks.map((book) => (
            <BookCard 
              key={book.id} 
              {...book} 
              onPreview={() => handlePreview(book)} 
            />
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No books found matching your search.</p>
          </div>
        )}
      </SectionWrapper>

      {/* Floating Cart Bar */}
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50"
          >
            <div className="bg-[#051a14]/95 backdrop-blur-xl border-t border-white/10 shadow-2xl">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
                {/* Cart Info */}
                <button
                  onClick={() => setShowCartPreview(!showCartPreview)}
                  className="flex items-center gap-3 text-white hover:text-primary-300 transition-colors"
                >
                  <div className="relative">
                    <ShoppingCart className="w-6 h-6" />
                    <span className="absolute -top-2 -right-2 bg-primary-400 text-[#051a14] text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                      {itemCount}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-white/60">
                      {itemCount} {itemCount === 1 ? "book" : "books"} selected
                    </p>
                    <p className="text-lg font-bold text-white">
                      ₦{totalPrice.toLocaleString()}
                    </p>
                  </div>
                </button>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={clearCart}
                    className="p-3 rounded-xl text-white/50 hover:text-red-400 hover:bg-white/5 transition-all"
                    title="Clear cart"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleCheckout}
                    className="px-8 py-4 rounded-2xl bg-white text-[#051a14] font-black uppercase text-xs tracking-[0.2em] flex items-center gap-3 hover:bg-primary-300 transition-all active:scale-[0.98] shadow-xl"
                  >
                    Checkout
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Cart Preview Dropdown */}
            <AnimatePresence>
              {showCartPreview && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="absolute bottom-full left-0 right-0 bg-white border-t border-gray-100 shadow-2xl overflow-hidden"
                >
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-3">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-black uppercase tracking-widest text-gray-600">Your Cart</h3>
                      <button onClick={() => setShowCartPreview(false)} className="p-1 rounded-lg hover:bg-gray-100">
                        <X className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                        <div>
                          <p className="font-medium text-gray-900">{item.title}</p>
                          <p className="text-sm text-gray-400">{item.author}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-primary-900">₦{item.price.toLocaleString()}</span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-500 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="pt-3 flex justify-between items-center text-lg font-bold">
                      <span className="text-gray-600">Total</span>
                      <span className="text-primary-900">₦{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Purchase Modal */}
      <PurchaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handlePurchaseSubmit}
        cartItems={items}
        totalPrice={totalPrice}
        isSubmitting={isSubmitting}
      />

      {/* Book Preview Modal */}
      <BookPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        book={selectedBook}
      />
    </div>
  );
}
