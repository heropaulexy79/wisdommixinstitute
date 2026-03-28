import { Metadata } from "next";
import SectionWrapper from "@/components/SectionWrapper";
import CTASection from "@/components/CTASection";
import { Compass, BookOpen, Brain, Users, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Programs | Wisdommix Institute",
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
      <section className="bg-primary-950 py-10 md:py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-900 rounded-l-full blur-3xl opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Transformational <span className="text-accent-400">Programs</span>
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Carefully curated tracks designed to push you beyond your limits and forge you into an exceptional leader.
          </p>
        </div>
      </section>

      {/* Programs List */}
      <div className="py-6 md:py-12 bg-white">
        {programs.map((program, index) => (
          <SectionWrapper 
            key={program.id} 
            id={program.id}
            className={`${index !== programs.length - 1 ? "mb-2 md:mb-4" : ""}`}
            innerClassName="py-2 md:py-4"
            delay={0.1}
          >
            <div className={`rounded-3xl border ${program.borderColor} bg-gradient-to-br ${program.bgPrimary} p-5 md:p-8 lg:p-10 shadow-sm overflow-hidden relative`}>
              
              {/* Optional background decorative element */}
              <div className="absolute -right-20 -bottom-20 opacity-5 pointer-events-none transform scale-150">
                {program.icon}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                <div>
                  <div className="w-20 h-20 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 border border-white">
                    {program.icon}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    {program.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    {program.description}
                  </p>
                  <a 
                    href="/contact" 
                    className="inline-flex items-center px-3 py-1.5 md:px-5 md:py-2.5 rounded-full bg-primary-600 text-white font-semibold hover:bg-primary-600/90 transition-colors shadow-sm text-[10px] md:text-sm"
                  >
                    Enroll in this Program
                  </a>
                </div>

                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-white shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">What You Will Learn</h3>
                  <ul className="space-y-4">
                    {program.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                        <span className="text-gray-700 font-medium">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </SectionWrapper>
        ))}
      </div>

      <CTASection />
    </>
  );
}
