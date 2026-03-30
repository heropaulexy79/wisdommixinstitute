import { Metadata } from "next";
import SectionWrapper from "@/components/SectionWrapper";
import CTASection from "@/components/CTASection";
import { Target, Eye, TrendingUp, Shield, Compass, Zap } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us | Wisdommix Academy",
  description: "Learn more about Wisdommix Academy, our mission, vision, and the founder behind the transformational leadership platform.",
};

export default function AboutPage() {
  return (
    <>
      {/* 1. ABOUT THE ACADEMY */}
      <section className="bg-[#051a14] py-24 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary-900/40 blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-black uppercase text-xs tracking-[0.2em] mb-8">
            Who We Are
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium text-white mb-10 tracking-tight max-w-5xl mx-auto font-serif italic leading-[1.1]">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-emerald-200 not-italic font-sans font-black uppercase tracking-tighter">Wisdommix Academy</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-100/80 max-w-4xl mx-auto leading-relaxed font-light">
            Wisdommix Academy is a premier transformational platform dedicated to shaping the minds and capacities of individuals who aspire to lead with purpose, deep spiritual understanding, and unwavering excellence. We believe that true leadership requires a profound inner transformation before it can result in lasting outward impact.
          </p>
        </div>
      </section>

      {/* 2. MISSION & VISION */}
      <SectionWrapper id="mission-vision" className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {/* Mission */}
          <div className="bg-gray-50/50 rounded-[2.5rem] p-12 md:p-16 border border-gray-100 relative overflow-hidden group hover:shadow-premium transition-all duration-500">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary-100/30 rounded-full blur-3xl -mr-24 -mt-24 group-hover:bg-primary-100/50 transition-colors" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-primary-900 flex items-center justify-center mb-10 shadow-xl shadow-primary-900/10 group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-medium text-gray-900 mb-6 font-serif italic">Our Mission</h2>
              <p className="text-lg text-gray-500 leading-relaxed font-light">
                To equip emerging and established leaders with robust spiritual, mental, and professional tools, enabling them to navigate complex challenges, disciple others effectively, and leave an indelible mark on their spheres of influence.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-gray-50/50 rounded-[2.5rem] p-12 md:p-16 border border-gray-100 relative overflow-hidden group hover:shadow-premium transition-all duration-500">
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent-100/30 rounded-full blur-3xl -mr-24 -mt-24 group-hover:bg-accent-100/50 transition-colors" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-accent-950 flex items-center justify-center mb-10 shadow-xl shadow-accent-950/10 group-hover:scale-110 transition-transform">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-medium text-gray-900 mb-6 font-serif italic">Our Vision</h2>
              <p className="text-lg text-gray-500 leading-relaxed font-light">
                To build a global network of enlightened, deeply rooted, and impeccably skilled leaders who operate with integrity, drive sustainable growth, and foster transformational cultures wherever they are planted.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* 3. FOUNDER SECTION */}
      <SectionWrapper id="founder" className="bg-gray-50/50 border-y border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          <div className="lg:col-span-5 relative">
            <div className="aspect-[3/4] rounded-[3rem] overflow-hidden bg-gray-200 relative shadow-premium group">
              {/* Actual Image */}
              <Image 
                src="/mentor.jpeg" 
                alt="Founder & Mentor Joseph Adeniran" 
                fill
                className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
              />
              {/* Overlay Gradient for readability of name text */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-transparent to-transparent z-10 opacity-80" />
              
              {/* Founder Name Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-10 z-20">
                <span className="text-primary-300 font-bold mb-2 tracking-[.3em] uppercase text-xs block">Founder & Mentor</span>
                <h3 className="text-4xl font-medium text-white font-serif italic">Joseph Adeniran</h3>
              </div>
            </div>
            
            {/* Design Element */}
            <div className="absolute top-1/2 -right-12 w-48 h-48 bg-accent-400/20 rounded-full blur-[80px] z-[-1]" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary-600/10 rounded-full blur-2xl z-[-1]" />
          </div>
          
          <div className="lg:col-span-7">
            <span className="text-primary-900 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Our Leadership</span>
            <h2 className="text-4xl md:text-5xl font-medium text-gray-900 mb-8 font-serif leading-tight">Meet The <span className="italic text-primary-900">Visionary</span></h2>
            <div className="prose prose-lg text-gray-500 leading-relaxed max-w-none font-light">
              <p className="mb-8 text-xl text-gray-900 font-medium font-serif italic">
                Joseph Adeniran is a recognized mentor, leadership strategist, and deeply passionate teacher.
              </p>
              <p className="mb-6">
                With over a decade of experience guiding individuals through significant personal and professional transitions, he founded Wisdommix Academy to address a critical vacuum in holistic leader development.
              </p>
              <p className="mb-6">
                His unique approach intertwines robust scriptural principles with pragmatic, modern leadership frameworks. Joseph believes that authentic leadership cannot be simulated—it must be naturally produced through a renewed mind and a disciplined spirit.
              </p>
              <p>
                Through Wisdommix Academy, Joseph continues to mentor hundreds of high-performing individuals, helping them clarify their life&apos;s calling, break through mental limitations, and execute their visions with pinpoint accuracy and uncommon grace.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* 4. CORE VALUES */}
      <SectionWrapper id="core-values" className="bg-white">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-primary-900 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Alignment</span>
          <h2 className="text-4xl md:text-6xl font-medium text-gray-900 mb-8 font-serif italic">Our Core Values</h2>
          <p className="text-lg text-gray-500 font-light leading-relaxed">
            These distinguishing principles dictate how we operate, how we teach, and the character traits we strive to instill in every member of our academy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Growth",
              desc: "A commitment to continuous learning, unlearning, and expanding our individual and collective capacities.",
              icon: <TrendingUp className="w-6 h-6 text-white" />,
              color: "bg-gray-900",
            },
            {
              title: "Discipline",
              desc: "The consistent, deliberate execution of actions required to turn potential into reality.",
              icon: <Shield className="w-6 h-6 text-white" />,
              color: "bg-primary-900",
            },
            {
              title: "Leadership",
              desc: "Taking responsibility, influencing positively, and leading by serving others with excellence.",
              icon: <Compass className="w-6 h-6 text-white" />,
              color: "bg-primary-950",
            },
            {
              title: "Transformation",
              desc: "Going beyond mere behavior modification to achieve a radical change of the heart and mind.",
              icon: <Zap className="w-6 h-6 text-white" />,
              color: "bg-accent-950",
            },
          ].map((value, idx) => (
            <div key={idx} className="bg-gray-50/70 rounded-[2.5rem] p-10 border border-gray-100 hover:bg-white hover:shadow-premium transition-all text-center group">
              <div className={`w-16 h-16 rounded-[1.5rem] ${value.color} flex items-center justify-center mx-auto mb-8 shadow-xl shadow-gray-200 transform group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight uppercase text-sm tracking-widest">{value.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-light">{value.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <CTASection 
        title="Ready to Begin Your Journey?"
        subtitle="Step into a new dimension of spiritual depth and leadership mastery."
        primaryButtonText="Explore Programs"
        primaryButtonHref="/programs"
        secondaryButtonText="Contact Us"
        secondaryButtonHref="/contact"
      />
    </>
  );
}
