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
    <div className="bg-primary-950 relative overflow-hidden">
      {/* Abstract Background Patterns */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary-800/30 blur-3xl" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[60%] rounded-full bg-accent-600/20 blur-3xl" />
      </div>

      <SectionWrapper className="relative z-10 text-center !py-20 md:!py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-primary-100/80 mb-10 leading-relaxed font-light">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={primaryButtonHref}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-accent-500 text-white font-bold text-lg hover:bg-accent-400 hover:scale-105 transition-all shadow-lg shadow-accent-500/30 flex items-center justify-center group"
            >
              {primaryButtonText}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href={secondaryButtonHref}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 text-white font-bold text-lg border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center"
            >
              {secondaryButtonText}
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
