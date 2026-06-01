"use client";

import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ShoppingCart, Check, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  price: number;
  image: string; // Keep for backward compatibility or first image
  images?: string[]; // Optional array of images
  description: string;
  previewText?: string[];
  onPreview?: () => void;
}

export default function BookCard({ 
  id, title, author, price, image, images = [], description, previewText, onPreview 
}: BookCardProps) {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const inCart = isInCart(id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const allImages = images.length > 0 ? images : [image];

  const handleToggleCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inCart) {
      removeFromCart(id);
    } else {
      addToCart({ id, title, author, price, image: allImages[0], description });
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(1);
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(-1);
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-white rounded-[2.5rem] overflow-hidden border ${inCart ? "border-primary-900 ring-4 ring-primary-900/10" : "border-gray-100"} hover:shadow-premium transition-all duration-500 group flex flex-col`}
    >
      <button 
        onClick={onPreview}
        className="relative aspect-[3/4] overflow-hidden bg-gray-100 text-left w-full cursor-pointer"
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentImageIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-0"
          >
            <Image
              src={allImages[currentImageIndex]}
              alt={`${title} - Image ${currentImageIndex + 1}`}
              fill
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Hover overlay for description */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#051a14]/90 via-[#051a14]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 z-10">
          <div className="mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <span className="text-primary-300 text-[10px] font-black uppercase tracking-[0.2em] mb-2 block">Preview Available</span>
            <p className="text-white text-sm font-light leading-relaxed line-clamp-3">
              {description}
            </p>
          </div>
          <div className="flex items-center gap-2 text-white font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity delay-200">
            Read Preview <BookOpen className="w-3 h-3" />
          </div>
        </div>

        {/* Navigation Arrows */}
        {allImages.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between p-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={prevImage}
              className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors pointer-events-auto"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors pointer-events-auto"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Dots Navigation */}
        {allImages.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {allImages.map((_, idx) => (
              <div
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentImageIndex ? "bg-white w-4" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}

        <div className="absolute top-6 right-6 z-20">
          <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/20">
            <span className="text-primary-900 font-bold text-lg">₦{price.toLocaleString()}</span>
          </div>
        </div>

        {inCart && (
          <div className="absolute top-6 left-6 z-20">
            <div className="bg-primary-900 text-white px-3 py-1.5 rounded-full shadow-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
              <Check className="w-3 h-3" />
              In Cart
            </div>
          </div>
        )}
      </button>

      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-4 h-4 text-accent-500" />
          <span className="text-xs font-bold uppercase tracking-widest text-primary-900/60">{author}</span>
        </div>
        <button 
          onClick={onPreview}
          className="text-2xl font-medium text-gray-900 mb-4 font-serif italic leading-tight group-hover:text-primary-900 transition-colors text-left hover:underline decoration-primary-900/20 underline-offset-4"
        >
          {title}
        </button>
        
        <div className="mt-auto">
          <button
            onClick={handleToggleCart}
            className={`w-full py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-xl group/btn ${
              inCart
                ? "bg-gray-100 text-primary-900 hover:bg-red-50 hover:text-red-600"
                : "bg-primary-900 text-white hover:bg-black"
            }`}
          >
            {inCart ? (
              <>
                <Check className="w-4 h-4" />
                Added — Remove
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
