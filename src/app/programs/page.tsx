import { Metadata } from "next";
import Link from "next/link";
import SectionWrapper from "@/components/SectionWrapper";
import CTASection from "@/components/CTASection";
import { Compass, BookOpen, Brain, Users, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Programs | Wisdommix Academy",
  description: "Explore our comprehensive transformational programs: Leadership Development, Discipleship Training, Mind Transformation, and Mentorship Systems.",
};

export default function ProgramsPage() {
  const programs = [
    {
      id: "leadership-development",
      title: "Leadership Development",
      description: "Effective leadership is the bedrock of any successful enterprise or ministry. Our Leadership Development program equips you with the tools to lead with vision, character, and unshakeable confidence.",
      icon: <Compass className="w-10 h-10 text-primary-600" />,
      benefits: [
        "Mastering emotional intelligence and self-regulation",
        "Strategic decision-making and crisis management",
        "Building and leading high-performance teams",
        "Cultivating a culture of accountability and excellence"
      ],
      bgPrimary: "from-blue-50 to-white",
      borderColor: "border-blue-100"
    },
    {
      id: "discipleship-training",
      title: "Discipleship Training",
      description: "True transformation starts with spiritual depth. This intensive program focuses on deepening your spiritual roots, understanding sound doctrinal foundations, and learning how to consistently walk in purpose.",
      icon: <BookOpen className="w-10 h-10 text-primary-600" />,
      benefits: [
        "In-depth study and application of foundational scriptures",
        "Developing a sustainable personal spiritual discipline",
        "Understanding calling vs. career alignment",
        "Principles of mentoring and raising others"
      ],
      bgPrimary: "from-indigo-50 to-white",
      borderColor: "border-indigo-100"
    },
    {
      id: "mind-transformation",
      title: "Mind Transformation",
      description: "You cannot rise above the level of your mindset. This track is designed to systematically dismantle limiting beliefs, break mental barriers, and reconstruct a growth-oriented, winning paradigm.",
      icon: <Brain className="w-10 h-10 text-primary-600" />,
      benefits: [
        "Identifying and breaking limiting mental strongholds",
        "Developing cognitive flexibility and resilience",
        "The psychology of success and wealth creation",
        "Maintaining focus and overcoming imposter syndrome"
      ],
      bgPrimary: "from-purple-50 to-white",
      borderColor: "border-purple-100"
    },
    {
      id: "mentorship-systems",
      title: "Mentorship Systems",
      description: "Accelerate your growth journey by learning from those who have successfully walked the path. This program provides structured guidance, rigorous accountability, and access to exclusive networks.",
      icon: <Users className="w-10 h-10 text-primary-600" />,
      benefits: [
        "One-on-one tailored guidance and feedback",
        "Peer-to-peer accountability groups",
        "Access to proven frameworks and templates",
        "Exclusive networking opportunities and mastermind sessions"
      ],
      bgPrimary: "from-orange-50 to-white",
      borderColor: "border-orange-100"
    }
  ];

  return (
    <>
      {/* Header */}
      <section className="bg-[#051a14] py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-primary-900/40 blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-black uppercase text-xs tracking-[0.2em] mb-8">
            Our Curriculum
          </span>
          <h1 className="text-5xl md:text-7xl font-medium text-white mb-8 tracking-tight font-serif italic leading-[1.1]">
            Transformational <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-emerald-200 not-italic font-sans font-black uppercase tracking-tighter">Programs</span>
          </h1>
          <p className="text-xl text-primary-100/80 max-w-3xl mx-auto font-light leading-relaxed">
            Carefully curated tracks designed to push you beyond your limits and forge you into an exceptional leader of impact.
          </p>
        </div>
      </section>

      {/* Programs List */}
      <div className="bg-white py-24">
        <SectionWrapper className="!py-0">
          <div className="flex flex-col gap-12 md:gap-20">
            {programs.map((program, index) => (
              <div 
                key={program.id} 
                id={program.id}
                className="relative group"
              >
                <div className="rounded-[3rem] border border-gray-100 bg-gray-50/50 p-8 md:p-14 lg:p-20 shadow-sm hover:shadow-premium transition-all duration-700 overflow-hidden relative">
                  
                  {/* Background decorative element */}
                  <div className="absolute -right-20 -bottom-20 opacity-[0.03] pointer-events-none transform scale-[3] text-primary-900 group-hover:opacity-[0.07] transition-all duration-700">
                    {program.icon}
                  </div>
    
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10 text-left">
                    <div className="lg:col-span-7">
                      <div className="w-20 h-20 rounded-2xl bg-primary-900 flex items-center justify-center mb-10 shadow-xl shadow-primary-900/10 group-hover:scale-110 transition-transform">
                        <div className="text-white">
                          {program.icon}
                        </div>
                      </div>
                      <h2 className="text-4xl md:text-5xl font-medium text-gray-900 mb-8 font-serif italic leading-tight">
                        {program.title}
                      </h2>
                      <p className="text-lg text-gray-500 mb-10 leading-relaxed font-light">
                        {program.description}
                      </p>
                      <Link 
                        href="/contact" 
                        className="px-10 py-4 rounded-full bg-primary-900 text-white font-black uppercase text-sm tracking-widest hover:bg-black transition-all shadow-xl active:scale-95 inline-flex"
                      >
                        Enroll in this Program
                      </Link>
                    </div>
    
                    <div className="lg:col-span-5 bg-white rounded-[2.5rem] p-10 md:p-12 border border-gray-100 shadow-premium relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100/20 rounded-full blur-3xl -mr-16 -mt-16" />
                      <h3 className="text-xl font-bold text-gray-900 mb-8 tracking-widest uppercase text-xs border-b border-gray-100 pb-4">Key Outcomes</h3>
                      <ul className="space-y-6">
                        {program.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start group/item">
                            <div className="mr-4 mt-1 bg-primary-50 rounded-full p-1 group-hover/item:bg-primary-900 group-hover/item:text-white transition-colors">
                              <CheckCircle2 className="w-4 h-4 text-primary-900 group-hover/item:text-white" />
                            </div>
                            <span className="text-gray-600 font-light leading-snug">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </div>

      <CTASection />
    </>
  );
}
