"use client";

import { motion } from "framer-motion";
import { BookOpen, ArrowRight, ShoppingCart } from "lucide-react";
import Image from "next/image";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  price: number;
  image: string;
  description: string;
  onBuy: (id: string) => void;
}

export default function BookCard({ id, title, author, price, image, description, onBuy }: BookCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 hover:shadow-premium transition-all duration-500 group flex flex-col"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
          <p className="text-white text-sm font-light leading-relaxed">
            {description}
          </p>
        </div>
        <div className="absolute top-6 right-6">
          <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/20">
            <span className="text-primary-900 font-bold text-lg">₦{price.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-4 h-4 text-accent-500" />
          <span className="text-xs font-bold uppercase tracking-widest text-primary-900/60">{author}</span>
        </div>
        <h3 className="text-2xl font-medium text-gray-900 mb-4 font-serif italic leading-tight group-hover:text-primary-900 transition-colors">
          {title}
        </h3>
        
        <div className="mt-auto">
          <button
            onClick={() => onBuy(id)}
            className="w-full py-4 rounded-2xl bg-primary-900 text-white font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-black transition-all active:scale-[0.98] shadow-xl group/btn"
          >
            <ShoppingCart className="w-4 h-4" />
            Buy Now
            <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
