import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import SectionWrapper from "@/components/SectionWrapper";
import CTASection from "@/components/CTASection";
import RecentEvents from "@/components/RecentEvents";
import { ArrowRight, BookOpen, Brain, Users, Compass, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* 1. HERO SECTION */}
      <HeroSlider />

      {/* 2. WHAT WE DO */}
      <SectionWrapper id="what-we-do" className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative">
            <div className="aspect-video rounded-[2rem] overflow-hidden bg-black shadow-premium relative border border-gray-100 group">
              <iframe
                src="https://player.vimeo.com/video/1124785898?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                className="absolute inset-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                title="Wisdommix Academy Transformation System"
              ></iframe>
            </div>
            {/* Design Element */}
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-primary-100/50 rounded-full blur-3xl z-[-1]" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-accent-200/40 rounded-full blur-2xl z-[-1]" />
          </div>
          
          <div>
            <span className="text-primary-900 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Our Philosophy</span>
            <h2 className="text-4xl md:text-5xl font-medium text-gray-900 mb-8 font-serif leading-tight">
              A Proven System for <br/><span className="italic text-primary-900">Total Transformation</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed font-light">
              At Wisdommix Academy, we believe true leadership begins from within. Our unique transformational system is designed to break limitations, renew mindsets, and equip individuals with the spiritual and mental fortitude needed to lead effectively.
            </p>
            <ul className="space-y-6 mb-10">
              <li className="flex items-start group">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-900 mt-0.5 group-hover:bg-primary-900 group-hover:text-white transition-colors">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Holistic Growth</h4>
                  <p className="text-gray-600 text-sm">Combining spiritual depth with professional excellence.</p>
                </div>
              </li>
              <li className="flex items-start group">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-900 mt-0.5 group-hover:bg-primary-900 group-hover:text-white transition-colors">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Expert Guidance</h4>
                  <p className="text-gray-600 text-sm">Sessions led by seasoned mentors with real-world impact.</p>
                </div>
              </li>
            </ul>
            <Link 
              href="/about" 
              className="inline-flex items-center text-primary-900 font-black uppercase text-sm tracking-widest hover:text-black group border-b-2 border-primary-900 pb-1"
            >
              Learn More About Us
              <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </SectionWrapper>

      {/* 3. IMPACT STATS */}
      {/* 
      <SectionWrapper id="impact" className="bg-white !py-12 md:!py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {[
            { label: "Leaders Trained", value: "500+" },
            { label: "Countries Reached", value: "15+" },
            { label: "Community Members", value: "2k+" },
            { label: "Years of Impact", value: "10+" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center group">
              <div className="text-4xl md:text-5xl font-medium text-primary-900 mb-2 font-serif italic group-hover:scale-110 transition-transform duration-500">
                {stat.value}
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>
      */}

      {/* 4. CORE PILLARS */}
      <SectionWrapper id="pillars" className="bg-[#051a14] relative overflow-hidden">
        {/* Background decorative blurs */}
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary-900/40 rounded-full blur-[120px] -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-accent-950/20 rounded-full blur-[100px] -ml-20 -mb-20"></div>
        
        <div className="text-center max-w-4xl mx-auto mb-24 relative z-10">
          <span className="text-primary-300 font-bold tracking-[0.3em] uppercase text-xs mb-6 block">The Foundation</span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium text-white mb-10 font-serif italic leading-tight">Our Core Pillars</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary-400 to-transparent mx-auto mb-10" />
          <p className="text-xl text-primary-100/70 font-light max-w-2xl mx-auto leading-relaxed">
            The bedrock of our transformational system, meticulously designed to forge exceptional leaders of character and impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {[
            {
              title: "Leadership",
              desc: "Building capacity to lead oneself and others with excellence and character.",
              icon: <Compass className="w-8 h-8" />,
            },
            {
              title: "Discipleship",
              desc: "Deepening spiritual roots and understanding sound doctrinal foundations.",
              icon: <BookOpen className="w-8 h-8" />,
            },
            {
              title: "Transformation",
              desc: "Breaking mental barriers and cultivating a growth-oriented, winning mindset.",
              icon: <Brain className="w-8 h-8" />,
            },
            {
              title: "Mentorship",
              desc: "Providing guidance, accountability, and accelerated growth through relationships.",
              icon: <Users className="w-8 h-8" />,
            },
          ].map((pillar, idx) => (
            <div 
              key={idx} 
              className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-12 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-premium transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-400/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary-400/10 transition-colors" />
              <div className="w-16 h-16 rounded-[1.2rem] bg-primary-900 flex items-center justify-center mb-10 border border-white/5 shadow-2xl group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                <div className="text-white">
                  {pillar.icon}
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-4 tracking-wider uppercase text-xs tracking-widest">{pillar.title}</h3>
              <p className="text-primary-100/60 font-light leading-relaxed text-sm">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* 4. UPCOMING EVENTS */}
      <RecentEvents />

      {/* 5. PROGRAMS OVERVIEW */}
      <SectionWrapper id="programs-overview" className="bg-white">
        <div className="bg-[#051a14] rounded-[3rem] overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary-900/40 rounded-full blur-[120px] -mr-80 -mt-80 group-hover:bg-primary-900/60 transition-all duration-1000"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05] mix-blend-overlay" />
          
          <div className="relative p-12 md:p-24 lg:p-32 text-center max-w-5xl mx-auto flex flex-col items-center">
            <span className="text-primary-300 font-black tracking-[0.3em] uppercase text-xs mb-6 block">Structured Growth</span>
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-medium text-white mb-10 font-serif italic leading-tight">Comprehensive Education</h2>
            <p className="text-xl text-primary-100/70 mb-12 leading-relaxed max-w-3xl font-light">
              Whether you are looking to refine your leadership skills, understand your spiritual identity, or receive personalized guidance, our curated programs are tailored for your elevation.
            </p>
            <Link 
              href="/programs" 
              className="px-12 py-5 rounded-full bg-white text-primary-900 font-black uppercase text-sm tracking-widest hover:bg-primary-100 transition-all shadow-2xl active:scale-95 group"
            >
              Explore Curriculum
              <ArrowRight className="ml-3 w-5 h-5 inline transform group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </SectionWrapper>

      {/* 6. FOUNDER'S VISION QUOTE */}
      <section className="bg-white py-24 md:py-32 overflow-hidden border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute -top-24 -left-24 text-[20rem] font-serif text-gray-50 opacity-50 z-0 pointer-events-none italic select-none">
            &ldquo;
          </div>
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 mb-12 font-serif italic leading-tight">
              &ldquo;Self Leadership is the ability to receive sense early knowing that what you're not doing at the moment has a negative impact on your life.&rdquo;
            </h2>
            <div className="flex flex-col items-center">
              <div className="w-12 h-1 bg-primary-900 mb-6" />
              <p className="text-xs font-black uppercase tracking-[0.4em] text-gray-900">Joseph Adeniran</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mt-2">Founder & Mentor, Wisdommix Academy</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6 & 7. INNER CIRCLE & MENTORSHIP (Split Layout) */}
      <SectionWrapper id="community" className="bg-gray-50/50 !py-24 border-y border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Inner Circle Section */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 p-12 md:p-16 shadow-sm hover:shadow-premium transition-all duration-500 group">
            <div className="w-16 h-16 rounded-2xl bg-accent-50 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
              <Users className="w-8 h-8 text-accent-700" />
            </div>
            <h3 className="text-3xl font-medium text-gray-900 mb-6 font-serif italic">The Inner Circle</h3>
            <p className="text-lg text-gray-500 mb-10 leading-relaxed font-light">
              Gain access to a private, exclusive community of high-achievers. Network, learn, and grow alongside like-minded individuals committed to excellence.
            </p>
            <Link 
              href="/inner-circle" 
              className="inline-flex items-center text-primary-900 font-bold uppercase text-xs tracking-widest hover:text-black group"
            >
              Join the Inner Circle
              <ArrowRight className="ml-3 w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          {/* Mentorship Section */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 p-12 md:p-16 shadow-sm hover:shadow-premium transition-all duration-500 group">
            <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
              <Compass className="w-8 h-8 text-primary-900" />
            </div>
            <h3 className="text-3xl font-medium text-gray-900 mb-6 font-serif italic">1-on-1 Mentorship</h3>
            <p className="text-lg text-gray-500 mb-10 leading-relaxed font-light">
              Accelerate your growth journey through personalized guidance and accountability from seasoned leaders who have walked the path.
            </p>
            <Link 
              href="/mentorship" 
              className="inline-flex items-center text-primary-900 font-bold uppercase text-xs tracking-widest hover:text-black group"
            >
              Apply for Mentorship
              <ArrowRight className="ml-3 w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          
        </div>
      </SectionWrapper>

      {/* 8. FINAL CTA */}
      <CTASection />
    </>
  );
}
