"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Check, BookOpen } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

import { useState } from "react";
import { BookFormat } from "@/context/CartContext";

interface BookPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: {
    id: string;
    title: string;
    author: string;
    price: number;
    priceDigital?: number;
    pricePhysical?: number;
    image: string;
    images: string[];
    description: string;
    previewText?: string[];
  } | null;
}

export default function BookPreviewModal({ isOpen, onClose, book }: BookPreviewModalProps) {
  const [selectedFormat, setSelectedFormat] = useState<BookFormat>("digital");
  const { addToCart, removeFromCart, isInCart } = useCart();

  if (!book) return null;

  const digitalPrice = book.priceDigital || book.price;
  const physicalPrice = book.pricePhysical || book.price + 5000;
  const activePrice = selectedFormat === "physical" ? physicalPrice : digitalPrice;

  const inCart = isInCart(book.id, selectedFormat);

  const handleToggleCart = () => {
    if (inCart) {
      removeFromCart(`${book.id}-${selectedFormat}`);
    } else {
      addToCart({
        id: `${book.id}-${selectedFormat}`,
        bookId: book.id,
        title: `${book.title} (${selectedFormat === "physical" ? "Physical Preorder" : "Digital E-Book"})`,
        author: book.author,
        price: activePrice,
        image: book.image,
        description: book.description,
        format: selectedFormat,
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#051a14]/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-50 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Side - Image/Gallery */}
            <div className="w-full md:w-2/5 relative bg-gray-50 aspect-[3/4] md:aspect-auto">
              <Image
                src={book.image}
                alt={book.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Right Side - Content */}
            <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto custom-scrollbar flex flex-col">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-4 h-4 text-accent-500" />
                  <span className="text-xs font-bold uppercase tracking-widest text-primary-900/60">
                    {book.author}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-2 font-serif italic leading-tight">
                  {book.title}
                </h2>
                <div className="flex items-baseline gap-3">
                  <div className="text-3xl font-bold text-primary-900">
                    ₦{activePrice.toLocaleString()}
                  </div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {selectedFormat === 'physical' ? 'Physical Hardcopy Preorder' : 'Digital E-Book Access'}
                  </span>
                </div>
              </div>

              {/* Format Switcher */}
              <div className="mb-8 p-1.5 bg-gray-100 rounded-2xl flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedFormat("digital")}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all text-center text-sm ${
                    selectedFormat === "digital"
                      ? "bg-white text-primary-900 shadow-md"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  Digital E-Book
                  <span className="block text-xs font-normal text-gray-500">₦{digitalPrice.toLocaleString()}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedFormat("physical")}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all text-center text-sm ${
                    selectedFormat === "physical"
                      ? "bg-primary-900 text-white shadow-md"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  Physical Preorder
                  <span className="block text-xs font-normal opacity-90">₦{physicalPrice.toLocaleString()}</span>
                </button>
              </div>

              <div className="space-y-6 mb-12">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary-900/40">
                  <div className="h-px flex-grow bg-gray-100" />
                  Preview Excerpt
                  <div className="h-px flex-grow bg-gray-100" />
                </div>
                {book.previewText && book.previewText.length > 0 ? (
                  book.previewText.map((paragraph, index) => (
                    <p key={index} className="text-gray-600 leading-relaxed font-light italic text-lg">
                      "{paragraph}"
                    </p>
                  ))
                ) : (
                  <p className="text-gray-600 leading-relaxed font-light italic text-lg line-clamp-4">
                    {book.description}
                  </p>
                )}
              </div>

              <div className="mt-auto pt-8 border-t border-gray-50 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleToggleCart}
                  className={`flex-grow py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-xl ${
                    inCart
                      ? "bg-gray-100 text-primary-900 hover:bg-red-50 hover:text-red-600"
                      : "bg-primary-900 text-white hover:bg-black"
                  }`}
                >
                  {inCart ? (
                    <>
                      <Check className="w-4 h-4" />
                      In Cart — Remove ({selectedFormat === 'physical' ? 'Preorder' : 'Digital'})
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      {selectedFormat === 'physical' ? 'Preorder Physical Copy' : 'Add Digital Copy'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
