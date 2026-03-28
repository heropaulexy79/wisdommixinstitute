"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?auto=format&fit=crop&q=80",
    tagline: "Empowering the Next Generation of Leaders",
    title: "Raising Transformed Leaders for",
    highlight: "Lasting Impact",
    description:
      "Join Wisdommix Institute to experience deep spiritual growth, mental transformation, and capacity building for exceptional leadership.",
    cta1: "Join the Institute",
    cta1Link: "/contact",
    cta2: "Explore Programs",
    cta2Link: "/programs",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
    tagline: "The Transformation System",
    title: "A Proven System for",
    highlight: "Total Transformation",
    description:
      "Break limitations, renew your mindset, and construct the spiritual and mental fortitude needed to lead effectively.",
    cta1: "Learn More",
    cta1Link: "/about",
    cta2: "View Pillars",
    cta2Link: "#pillars",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80",
    tagline: "Community & Mentorship",
    title: "Accelerate Growth in the",
    highlight: "Inner Circle",
    description:
      "Gain access to a private, exclusive community. Network, learn, and grow alongside high-achievers committed to excellence.",
    cta1: "Join Inner Circle",
    cta1Link: "/inner-circle",
    cta2: "1-on-1 Mentorship",
    cta2Link: "/mentorship",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section 
      className="relative h-[100dvh] min-h-[600px] w-full overflow-hidden bg-gray-950"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${slides[currentSlide].image}')`,
            }}
          />
          {/* Gradients to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-primary-950/30 mix-blend-multiply" />
        </motion.div>
      </AnimatePresence>

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center pb-32 md:pb-40">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${currentSlide}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium text-sm mb-6">
                <span className="flex h-2 w-2 rounded-full bg-primary-400 mr-2 animate-pulse" />
                {slides[currentSlide].tagline}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6 text-balance leading-tight">
                {slides[currentSlide].title}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-emerald-300">
                  {slides[currentSlide].highlight}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl text-balance">
                {slides[currentSlide].description}
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                <Link
                  href={slides[currentSlide].cta1Link}
                  className="px-5 py-2.5 md:px-8 md:py-4 rounded-full bg-primary-500 text-white font-bold text-base md:text-lg hover:bg-primary-600 hover:shadow-xl hover:shadow-primary-500/30 transition-all transform hover:-translate-y-1 text-center"
                >
                  {slides[currentSlide].cta1}
                </Link>
                <Link
                  href={slides[currentSlide].cta2Link}
                  className="px-5 py-2.5 md:px-8 md:py-4 rounded-full bg-white/10 backdrop-blur-md text-white font-bold text-base md:text-lg border border-white/30 hover:bg-white/20 transition-all flex items-center justify-center text-center group"
                >
                  {slides[currentSlide].cta2}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Thumbnails Underneath */}
      <div className="absolute bottom-6 md:bottom-10 left-0 right-0 z-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-end justify-between">
          <div className="flex space-x-3 md:space-x-4">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(index)}
                className={`group relative overflow-hidden rounded-xl transition-all duration-300 ${
                  currentSlide === index
                    ? "w-24 md:w-32 h-16 md:h-20 ring-2 ring-primary-400 ring-offset-2 ring-offset-black"
                    : "w-16 md:w-20 h-10 md:h-12 opacity-50 hover:opacity-100"
                }`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${slide.image}')` }}
                />
                <div
                  className={`absolute inset-0 bg-black/40 transition-opacity ${
                    currentSlide === index ? "opacity-0" : "group-hover:opacity-0"
                  }`}
                />
                {currentSlide === index && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute inset-x-0 bottom-0 h-1 bg-primary-400"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Slide counter */}
          <div className="hidden md:flex items-center text-white/50 font-mono text-sm">
            <span className="text-white text-lg font-bold">
              {String(currentSlide + 1).padStart(2, "0")}
            </span>
            <span className="mx-2">/</span>
            <span>{String(slides.length).padStart(2, "0")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
