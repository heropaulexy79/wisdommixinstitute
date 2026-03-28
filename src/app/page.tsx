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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <div className="aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl relative border border-gray-100">
              <iframe
                src="https://player.vimeo.com/video/1124785898?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                title="Wisdommix Institute Transformation System"
              ></iframe>
            </div>
            {/* Design Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent-400 rounded-full blur-2xl opacity-40 z-[-1]" />
          </div>
          
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              A Proven System for Total Transformation
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed text-left md:text-justify">
              At Wisdommix Institute, we believe true leadership begins from within. Our unique transformational system is designed to break limitations, renew mindsets, and equip individuals with the spiritual and mental fortitude needed to lead effectively.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-1">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="ml-3 text-gray-700">Holistic approach combining spiritual and professional growth.</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-1">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="ml-3 text-gray-700">Expert-led sessions tailored to real-world challenges.</span>
              </li>
            </ul>
            <Link 
              href="/about" 
              className="inline-flex items-center text-primary-600 font-bold hover:text-primary-700 group"
            >
              Learn More About Us
              <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </SectionWrapper>

      {/* 3. CORE PILLARS */}
      <SectionWrapper id="pillars" className="bg-primary-950">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Our Core Pillars</h2>
          <p className="text-lg text-primary-100 text-center">
            The foundation of everything we do is built upon these four essential pillars, designed to bring out the absolute best in you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Leadership Development",
              desc: "Building capacity to lead oneself and others with excellence and character.",
              icon: <Compass className="w-8 h-8" />,
            },
            {
              title: "Discipleship Training",
              desc: "Deepening spiritual roots and understanding sound doctrinal foundations.",
              icon: <BookOpen className="w-8 h-8" />,
            },
            {
              title: "Mind Transformation",
              desc: "Breaking mental barriers and cultivating a growth-oriented, winning mindset.",
              icon: <Brain className="w-8 h-8" />,
            },
            {
              title: "Mentorship Systems",
              desc: "Providing guidance, accountability, and accelerated growth through relationships.",
              icon: <Users className="w-8 h-8" />,
            },
          ].map((pillar, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:shadow-primary-900/5 hover:-translate-y-1 transition-all group"
            >
              <div className="w-16 h-16 rounded-xl bg-primary-50 flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                {/* Clone the icon to change its color on hover if needed, or just let color cascade */}
                <div className="text-primary-600 group-hover:text-white transition-colors">
                  {pillar.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{pillar.title}</h3>
              <p className="text-gray-600 leading-relaxed text-left md:text-justify">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* 4. UPCOMING EVENTS */}
      <RecentEvents />

      {/* 5. PROGRAMS OVERVIEW */}
      <SectionWrapper id="programs-overview" className="bg-white">
        <div className="bg-primary-900 rounded-3xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500 rounded-full blur-[80px] opacity-20 -mr-20 -mt-20"></div>
          <div className="relative p-10 md:p-16 lg:p-20 text-center max-w-4xl mx-auto flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Comprehensive Programs</h2>
            <p className="text-lg text-primary-100 mb-10 leading-relaxed max-w-2xl text-center">
              Whether you are looking to refine your leadership skills, understand your spiritual identity, or receive personalized guidance, our structured programs are tailored for you.
            </p>
            <Link 
              href="/programs" 
              className="w-64 sm:w-auto inline-flex items-center justify-center px-7 py-3 md:px-8 md:py-4 rounded-full bg-white text-primary-900 font-bold text-base md:text-lg hover:bg-primary-50 transition-colors group"
            >
              Explore All Programs
              <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </SectionWrapper>

      {/* 6 & 7. INNER CIRCLE & MENTORSHIP (Split Layout) */}
      <SectionWrapper id="community" className="bg-white !py-16 border-t border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Inner Circle Section */}
          <div className="bg-white rounded-3xl border border-gray-100 p-10 md:p-12 hover:shadow-xl hover:shadow-primary-900/5 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-accent-50 flex items-center justify-center mb-6">
              <Users className="w-7 h-7 text-accent-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">The Inner Circle</h3>
            <p className="text-gray-600 mb-8 leading-relaxed text-left md:text-justify">
              Gain access to a private, exclusive community of high-achievers. Network, learn, and grow alongside like-minded individuals committed to excellence.
            </p>
            <Link 
              href="/inner-circle" 
              className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 group"
            >
              Join the Inner Circle
              <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mentorship Section */}
          <div className="bg-white rounded-3xl border border-gray-100 p-10 md:p-12 hover:shadow-xl hover:shadow-primary-900/5 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mb-6">
              <Compass className="w-7 h-7 text-primary-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">1-on-1 Mentorship</h3>
            <p className="text-gray-600 mb-8 leading-relaxed text-left md:text-justify">
              Accelerate your growth journey through personalized guidance and accountability from seasoned leaders who have walked the path.
            </p>
            <Link 
              href="/mentorship" 
              className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 group"
            >
              Apply for Mentorship
              <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
        </div>
      </SectionWrapper>

      {/* 8. FINAL CTA */}
      <CTASection />
    </>
  );
}
