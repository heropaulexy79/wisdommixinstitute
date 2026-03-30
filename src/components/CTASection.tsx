"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionWrapper from "./SectionWrapper";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

export default function CTASection({
  title = "Your Transformation Starts Here",
  subtitle = "Join a community of leaders committed to growth, impact, and excellence. Take the first step towards realizing your full potential today.",
  primaryButtonText = "Join Now",
  primaryButtonHref = "/contact",
  secondaryButtonText = "Explore Programs",
  secondaryButtonHref = "/programs",
}: CTASectionProps) {
  return (
    <div className="bg-[#051a14] relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary-900/40 blur-[120px] animate-pulse" />
        <div className="absolute top-[50%] -right-[20%] w-[60%] h-[80%] rounded-full bg-accent-950/30 blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <SectionWrapper className="relative z-10 text-center !py-24 md:!py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center">
          <span className="text-primary-400 font-bold tracking-[0.3em] uppercase text-xs mb-8 block">Ready to Begin?</span>
          <h2 className="text-4xl md:text-7xl font-medium text-white mb-8 tracking-tight font-serif italic leading-[1.1]">
            {title}
          </h2>
          <p className="text-xl md:text-2xl text-primary-100/70 mb-12 leading-relaxed font-light text-center max-w-2xl">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
            <Link
              href={primaryButtonHref}
              className="w-full sm:w-auto px-12 py-5 rounded-full bg-white text-primary-900 font-black uppercase text-sm tracking-widest hover:bg-primary-100 transition-all shadow-2xl active:scale-95 flex items-center justify-center group"
            >
              {primaryButtonText}
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link
              href={secondaryButtonHref}
              className="w-full sm:w-auto px-12 py-5 rounded-full bg-white/5 backdrop-blur-xl text-white font-black uppercase text-sm tracking-widest border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center text-center"
            >
              {secondaryButtonText}
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
