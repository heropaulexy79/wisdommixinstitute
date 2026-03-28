import { Metadata } from "next";
import SectionWrapper from "@/components/SectionWrapper";
import CTASection from "@/components/CTASection";
import { Compass, Sparkles, CheckCircle, Target, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "1-on-1 Mentorship | Wisdommix Institute",
  description: "Accelerate your growth journey through personalized guidance and accountability from seasoned leaders.",
};

export default function MentorshipPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-950 to-primary-900 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary-800/50 flex items-center justify-center mx-auto mb-8 backdrop-blur-sm border border-primary-700/50">
            <Compass className="w-8 h-8 text-accent-400" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            1-on-1 <span className="text-accent-400">Mentorship</span>
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-10 leading-relaxed text-left md:text-center">
            Personalized guidance, rigorous accountability, and customized strategies to help you break through invisible ceilings and maximize your potential.
          </p>
          <Link
            href="/contact"
            className="w-64 sm:w-auto inline-flex items-center justify-center px-8 py-3 md:px-8 md:py-4 rounded-full bg-white text-primary-900 font-bold text-base md:text-lg hover:bg-gray-100 hover:scale-105 transition-all shadow-xl"
          >
            Apply for Mentorship
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      <SectionWrapper className="bg-white py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Who is this for?</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed text-left md:text-justify">
              Our mentorship program is not for everyone. It is meticulously designed for high-capacity individuals who are hungry for growth, willing to be challenged, and ready to execute.
            </p>
            <ul className="space-y-4">
              {[
                "Emerging leaders transitioning into larger roles",
                "Entrepreneurs seeking clarity and strategic direction",
                "Professionals feeling stuck or unfulfilled in their careers",
                "Individuals deeply committed to their spiritual and personal growth"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start bg-gray-50 rounded-lg p-4">
                  <Target className="w-5 h-5 text-primary-600 mr-3 shrink-0 mt-0.5" />
                  <span className="text-gray-800 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-primary-50 rounded-3xl p-10 border border-primary-100 relative">
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-accent-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Program Benefits</h3>
            <ul className="space-y-6">
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
                <li key={idx} className="flex items-start relative">
                  <div className="w-8 h-8 rounded-full bg-primary-200 flex items-center justify-center shrink-0 mr-4 mt-1 border-2 border-white">
                    <CheckCircle className="w-4 h-4 text-primary-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{benefit.title}</h4>
                    <p className="text-gray-600 text-sm mt-1">{benefit.desc}</p>
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
