import { Metadata } from "next";
import SectionWrapper from "@/components/SectionWrapper";
import CTASection from "@/components/CTASection";
import { Users, Star, Lock, Network, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Inner Circle | Wisdommix Academy",
  description: "Join our exclusive private community of high-achievers. Network, learn, and grow alongside like-minded individuals.",
};

export default function InnerCirclePage() {
  const benefits = [
    {
      title: "Exclusive Masterclasses",
      desc: "Monthly closed-door sessions with Joseph Adeniran and guest experts.",
      icon: <Star className="w-6 h-6 text-accent-500" />
    },
    {
      title: "Private Community",
      desc: "A safe, high-leverage network of leaders across various industries.",
      icon: <Lock className="w-6 h-6 text-accent-500" />
    },
    {
      title: "Resource Vault",
      desc: "Instant access to a library of templates, blueprints, and recorded sessions.",
      icon: <Lock className="w-6 h-6 text-accent-500" />
    },
    {
      title: "Global Networking",
      desc: "Strategic alliances, partnerships, and collaborations made easy.",
      icon: <Network className="w-6 h-6 text-accent-500" />
    }
  ];

  return (
    <>
      <section className="bg-[#051a14] py-24 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-primary-900/40 blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="w-20 h-20 rounded-[2rem] bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-10 shadow-2xl border border-white/20 animate-pulse">
            <Users className="w-10 h-10 text-primary-300" />
          </div>
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-black uppercase text-xs tracking-[0.2em] mb-8">
            Exclusive Network
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium text-white mb-10 tracking-tight max-w-5xl mx-auto font-serif italic leading-[1.1]">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-emerald-200 not-italic font-sans font-black uppercase tracking-tighter">Inner Circle</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-100/80 max-w-4xl mx-auto leading-relaxed font-light mb-12">
            A private, deeply committed community of leaders actively shaping the future. Elevate your associations, elevate your life.
          </p>
          <Link
            href="/contact"
            className="px-12 py-5 rounded-full bg-white text-primary-900 font-black uppercase text-sm tracking-widest hover:bg-black hover:text-white transition-all shadow-2xl active:scale-95 group"
          >
            Apply to Join Today
            <ArrowRight className="ml-3 w-5 h-5 inline transform group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>

      <SectionWrapper className="bg-white py-24">
        <div className="mb-20 text-center max-w-4xl mx-auto">
          <span className="text-primary-900 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Proximity is Power</span>
          <h2 className="text-4xl md:text-6xl font-medium text-gray-900 mb-8 font-serif italic">Why the Inner Circle?</h2>
          <div className="w-20 h-1 bg-primary-900 mx-auto mb-8" />
          <p className="text-xl text-gray-500 font-light leading-relaxed">
            You are the average of the five people you spend the most time with. The Inner Circle provides an environment where your ambition is nurtured, your faith is strengthened, and your leadership capacity is exponentially increased through high-level associations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="bg-gray-50/70 rounded-[2.5rem] p-10 border border-gray-100 hover:bg-white hover:shadow-premium transition-all duration-500 text-center group">
              <div className="w-16 h-16 rounded-2xl bg-primary-900 flex items-center justify-center mx-auto mb-10 shadow-xl shadow-primary-900/10 group-hover:scale-110 transition-transform">
                <div className="text-white">
                  {benefit.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight uppercase text-sm tracking-widest leading-snug">{benefit.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-light">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>
      
      <CTASection />
    </>
  );
}
