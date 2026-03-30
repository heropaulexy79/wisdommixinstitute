import { Metadata } from "next";
import SectionWrapper from "@/components/SectionWrapper";
import CTASection from "@/components/CTASection";
import { Compass, Sparkles, CheckCircle, Target, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "1-on-1 Mentorship | Wisdommix Academy",
  description: "Accelerate your growth journey through personalized guidance and accountability from seasoned leaders.",
};

export default function MentorshipPage() {
  return (
    <>
      <section className="bg-[#051a14] py-24 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-primary-900/40 blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-10 border border-white/20 shadow-2xl">
            <Compass className="w-8 h-8 text-primary-300" />
          </div>
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-black uppercase text-xs tracking-[0.2em] mb-8">
            Personalized GUIDANCE
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium text-white mb-10 tracking-tight max-w-5xl mx-auto font-serif italic leading-[1.1]">
            1-on-1 <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-emerald-200 not-italic font-sans font-black uppercase tracking-tighter">Mentorship</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-100/80 max-w-4xl mx-auto leading-relaxed font-light mb-12">
            Personalized guidance, rigorous accountability, and customized strategies to help you break through invisible ceilings and maximize your potential.
          </p>
          <Link
            href="/contact"
            className="px-12 py-5 rounded-full bg-white text-primary-900 font-black uppercase text-sm tracking-widest hover:bg-black hover:text-white transition-all shadow-2xl active:scale-95 group"
          >
            Apply for Mentorship
            <ArrowRight className="ml-3 w-5 h-5 inline transform group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>

      <SectionWrapper className="bg-white py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-primary-900 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Tailored for Leaders</span>
            <h2 className="text-4xl md:text-5xl font-medium text-gray-900 mb-8 font-serif italic">Who is this for?</h2>
            <p className="text-lg text-gray-500 mb-10 leading-relaxed font-light">
              Our mentorship program is not for everyone. It is meticulously designed for high-capacity individuals who are hungry for growth, willing to be challenged, and ready to execute at the highest level.
            </p>
            <ul className="space-y-6">
              {[
                "Emerging leaders transitioning into larger roles",
                "Entrepreneurs seeking clarity and strategic direction",
                "Professionals feeling stuck or unfulfilled in their careers",
                "Individuals deeply committed to their spiritual and personal growth"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start bg-gray-50/70 border border-gray-100 rounded-[1.5rem] p-6 hover:bg-white hover:shadow-premium transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-xl bg-primary-900 flex items-center justify-center text-white mr-4 shrink-0 group-hover:scale-110 transition-transform">
                    <Target className="w-5 h-5" />
                  </div>
                  <span className="text-gray-700 font-medium leading-normal pt-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-primary-900 rounded-[3rem] p-10 md:p-16 border border-primary-800 relative shadow-2xl overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/10 rounded-full blur-[100px] -mr-20 -mt-20 group-hover:bg-accent-500/20 transition-all duration-1000"></div>
            <div className="absolute -top-6 -right-6 w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center z-10 rotate-12">
              <Sparkles className="w-6 h-6 text-primary-900" />
            </div>
            <h3 className="text-3xl font-medium text-white mb-10 font-serif italic border-b border-white/10 pb-6">Program Benefits</h3>
            <ul className="space-y-8">
              {[
                {
                  title: "Diagnostic Assessment",
                  desc: "Identify your core competencies, blind spots, and areas for immediate improvement."
                },
                {
                  title: "Tailored Growth Map",
                  desc: "A step-by-step personalized action plan perfectly aligned with your unique goals."
                },
                {
                  title: "Unfiltered Feedback",
                  desc: "Honest, constructive, and direct input to course-correct effectively."
                },
                {
                  title: "Strict Accountability",
                  desc: "Regular check-ins and performance tracking to ensure you stay on course."
                }
              ].map((benefit, idx) => (
                <li key={idx} className="flex items-start relative group/item">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 mr-5 mt-1 border border-white/20 group-hover/item:bg-white group-hover/item:text-primary-900 transition-all">
                    <CheckCircle className="w-5 h-5 text-white group-hover/item:text-primary-900" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white tracking-tight uppercase text-xs tracking-widest mb-1">{benefit.title}</h4>
                    <p className="text-primary-100/70 font-light leading-relaxed">{benefit.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionWrapper>
      
      <CTASection 
        title="Stop Navigating Alone"
        subtitle="The journey to greatness is steep. Having a seasoned guide makes all the difference."
        primaryButtonText="Begin Your Application"
      />
    </>
  );
}
