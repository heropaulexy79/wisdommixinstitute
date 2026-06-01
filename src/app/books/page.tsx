"use client";

import { useState } from "react";
import SectionWrapper from "@/components/SectionWrapper";
import BookCard from "@/components/BookCard";
import { Search, Filter, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import PurchaseModal from "@/components/PurchaseModal";

const MOCK_BOOKS = [
  {
    id: "kingdom-power-and-blessing",
    title: "Kingdom Power and Blessing",
    author: "Joseph Adeniran",
    price: 15000,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1000",
    description: "Unlock the spiritual principles of dominion and prosperity in the kingdom.",
  },
  {
    id: "leading-minds",
    title: "Leading Minds",
    author: "Joseph Adeniran",
    price: 15000,
    image: "https://images.unsplash.com/photo-1589998059171-d88d367a8ec7?auto=format&fit=crop&q=80&w=1000",
    description: "Master the psychology of leadership and influence to shape the future.",
  },
  {
    id: "one-of-a-kind",
    title: "One of a Kind",
    author: "Joseph Adeniran",
    price: 10000,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=1000",
    description: "Discover your unique identity and purpose to stand out in a noisy world.",
  },
  {
    id: "the-rod-of-strength",
    title: "The Rod of Strength",
    author: "Joseph Adeniran",
    price: 10000,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1000",
    description: "Harness the power of inner strength and spiritual authority.",
  },
];

export default function BooksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredBooks = MOCK_BOOKS.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBuyClick = (bookId: string) => {
    const book = MOCK_BOOKS.find(b => b.id === bookId);
    if (book) {
      setSelectedBook(book);
      setIsModalOpen(true);
    }
  };

  const handlePurchaseSubmit = async (userData: { name: string; email: string; phone: string }) => {
    if (!selectedBook) return;
    
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/books/init-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userData.email,
          name: userData.name,
          phone: userData.phone,
          bookId: selectedBook.id,
          bookTitle: selectedBook.title,
          amount: selectedBook.price,
        }),
      });

      const data = await res.json();
      if (data.authorization_url) {
        sessionStorage.setItem("nlc_book_purchase", JSON.stringify({
          email: userData.email,
          name: userData.name,
          bookId: selectedBook.id,
          bookTitle: selectedBook.title,
        }));
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
            className="text-5xl md:text-8xl font-medium text-white mb-10 tracking-tight max-w-5xl mx-auto font-serif italic leading-[1.1]"
          >
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-emerald-200 not-italic font-sans font-black uppercase tracking-tighter">Knowledge</span> Vault
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-primary-100/80 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Equip yourself with the wisdom and strategies needed to lead effectively in the 21st century.
          </motion.p>
        </div>
      </section>

      {/* Books Listing */}
      <SectionWrapper className="py-24">
        {/* Search and Filter bar */}
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
          
          <button className="flex items-center gap-3 px-8 py-5 rounded-2xl bg-gray-50 border border-gray-100 text-gray-600 hover:bg-white transition-all">
            <Filter className="w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-widest">Filter</span>
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredBooks.map((book) => (
            <div key={book.id} className="relative">
              {loading === book.id && (
                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-20 flex items-center justify-center rounded-[2.5rem]">
                  <Loader2 className="w-10 h-10 text-primary-900 animate-spin" />
                </div>
              )}
              <BookCard
                {...book}
                onBuy={handleBuyClick}
              />
            </div>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No books found matching your search.</p>
          </div>
        )}
      </SectionWrapper>

      <PurchaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handlePurchaseSubmit}
        bookTitle={selectedBook?.title || ""}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
