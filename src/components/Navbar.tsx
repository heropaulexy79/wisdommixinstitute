"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Programs", href: "/programs" },
  { name: "Inner Circle", href: "/inner-circle" },
  { name: "Mentorship", href: "/mentorship" },
  { name: "Events", href: "/events" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-700 ${
      scrolled 
        ? "bg-white/85 backdrop-blur-lg shadow-[0_4px_20px_rgba(0,100,0,0.08)] py-0 border-b border-primary-900/10" 
        : "bg-white py-2"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-500 ${scrolled ? "h-16" : "h-24"}`}>
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center group">
              <Image 
                src="/logo.png" 
                alt="Wisdommix Academy Logo" 
                width={180} 
                height={70} 
                className={`w-auto object-contain transition-all duration-500 group-hover:scale-105 ${
                  scrolled ? "h-8 md:h-10" : "h-10 md:h-12"
                }`}
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all relative group/link ${
                    isActive
                      ? "text-primary-900"
                      : "text-gray-700 hover:text-primary-900"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div 
                      layoutId="activeNav"
                      className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-primary-900"
                    />
                  )}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="ml-6 px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-xl active:scale-95 bg-primary-900 text-white hover:bg-black"
            >
              Consultation
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl transition-colors text-gray-900 hover:bg-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute w-full shadow-2xl border-b border-gray-100 overflow-hidden bg-white text-gray-900"
          >
            <div className="px-4 pt-4 pb-8 space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all ${
                      isActive
                        ? "bg-primary-50 text-primary-900"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-4 px-2">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-4 rounded-2xl bg-primary-900 text-white text-center text-xs font-black uppercase tracking-[0.3em] shadow-xl"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
