import { Metadata } from "next";
import SectionWrapper from "@/components/SectionWrapper";
import CTASection from "@/components/CTASection";
import { Target, Eye, TrendingUp, Shield, Compass, Zap } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us | Wisdommix Institute",
  description: "Learn more about Wisdommix Institute, our mission, vision, and the founder behind the transformational leadership platform.",
};

export default function AboutPage() {
  return (
    <>
      {/* 1. ABOUT THE INSTITUTE */}
      <section className="bg-primary-950 py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-bg-pattern.svg')] opacity-5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-900 border border-primary-800 text-accent-400 font-medium text-sm mb-6">
            Who We Are
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 tracking-tight max-w-4xl mx-auto">
            About <span className="text-accent-400">Wisdommix Institute</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed text-left md:text-justify">
            Wisdommix Institute is a premier transformational platform dedicated to shaping the minds and capacities of individuals who aspire to lead with purpose, deep spiritual understanding, and unwavering excellence. We believe that true leadership requires a profound inner transformation before it can result in lasting outward impact.
          </p>
        </div>
      </section>

      {/* 2. MISSION & VISION */}
      <SectionWrapper id="mission-vision" className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Mission */}
          <div className="bg-gray-50 rounded-3xl p-10 md:p-12 border border-gray-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 border border-gray-100">
                <Target className="w-8 h-8 text-primary-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed text-left md:text-justify">
                To equip emerging and established leaders with robust spiritual, mental, and professional tools, enabling them to navigate complex challenges, disciple others effectively, and leave an indelible mark on their spheres of influence.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-gray-50 rounded-3xl p-10 md:p-12 border border-gray-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-100 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 border border-gray-100">
                <Eye className="w-8 h-8 text-accent-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-lg text-gray-600 leading-relaxed text-left md:text-justify">
                To build a global network of enlightened, deeply rooted, and impeccably skilled leaders who operate with integrity, drive sustainable growth, and foster transformational cultures wherever they are planted.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* 3. FOUNDER SECTION */}
      <SectionWrapper id="founder" className="bg-gray-50/50">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 relative">
            <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-gray-200 relative shadow-2xl shadow-primary-900/10">
              {/* Actual Image */}
              <Image 
                src="/mentor.jpeg" 
                alt="Founder & Mentor Joseph Adeniran" 
                fill
                className="object-cover object-center transition-transform hover:scale-110 duration-700"
              />
              {/* Overlay Gradient for readability of name text */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-transparent to-transparent z-10" />
              
              {/* Founder Name Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-8 z-20">
                <p className="text-accent-400 font-medium mb-1 tracking-wider uppercase text-sm">Founder & Mentor</p>
                <h3 className="text-3xl font-bold text-white">Joseph Adeniran</h3>
              </div>
            </div>
            
            {/* Design Element */}
            <div className="absolute top-1/2 -right-8 w-24 h-24 bg-accent-400 rounded-full blur-2xl opacity-30 z-[-1]" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary-600 rounded-full blur-2xl opacity-20 z-[-1]" />
          </div>
          
          <div className="lg:col-span-7">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Meet The Visionary</h2>
            <div className="prose prose-lg text-gray-600 leading-loose max-w-none text-left md:text-justify">
              <p className="mb-6">
                Joseph Adeniran is a recognized mentor, leadership strategist, and deeply passionate teacher. With over a decade of experience guiding individuals through significant personal and professional transitions, he founded Wisdommix Institute to address a critical vacuum in holistic leader development.
              </p>
              <p className="mb-6">
                His unique approach intertwines robust scriptural principles with pragmatic, modern leadership frameworks. Joseph believes that authentic leadership cannot be simulated—it must be naturally produced through a renewed mind and a disciplined spirit.
              </p>
              <p>
                Through Wisdommix Institute, Joseph continues to mentor hundreds of high-performing individuals, helping them clarify their life's calling, break through mental limitations, and execute their visions with pinpoint accuracy and uncommon grace.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* 4. CORE VALUES */}
      <SectionWrapper id="core-values" className="bg-white">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Core Values</h2>
          <p className="text-lg text-gray-600">
            These distinguishing principles dictate how we operate, how we teach, and the character traits we strive to instill in every member of our institute.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Growth",
              desc: "A commitment to continuous learning, unlearning, and expanding our individual and collective capacities.",
              icon: <TrendingUp className="w-6 h-6 text-white" />,
              color: "bg-blue-500",
            },
            {
              title: "Discipline",
              desc: "The consistent, deliberate execution of actions required to turn potential into reality.",
              icon: <Shield className="w-6 h-6 text-white" />,
              color: "bg-indigo-500",
            },
            {
              title: "Leadership",
              desc: "Taking responsibility, influencing positively, and leading by serving others with excellence.",
              icon: <Compass className="w-6 h-6 text-white" />,
              color: "bg-primary-600",
            },
            {
              title: "Transformation",
              desc: "Going beyond mere behavior modification to achieve a radical change of the heart and mind.",
              icon: <Zap className="w-6 h-6 text-white" />,
              color: "bg-accent-500",
            },
          ].map((value, idx) => (
            <div key={idx} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:bg-white hover:shadow-lg transition-all text-center group">
              <div className={`w-14 h-14 rounded-full ${value.color} flex items-center justify-center mx-auto mb-6 shadow-md shadow-${value.color}/20 transform group-hover:scale-110 transition-transform`}>
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{value.desc}</p>
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
