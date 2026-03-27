import { Metadata } from "next";
import SectionWrapper from "@/components/SectionWrapper";
import CTASection from "@/components/CTASection";
import { Users, Star, Lock, Network, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Inner Circle | Wisdommix Institute",
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
      <section className="bg-primary-950 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-bg-pattern.svg')] opacity-5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="w-20 h-20 rounded-full bg-accent-500/10 flex items-center justify-center mx-auto mb-8 animate-pulse">
            <Users className="w-10 h-10 text-accent-400" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            The <span className="text-accent-400">Inner Circle</span>
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto mb-10">
            A private, deeply committed community of leaders actively shaping the future. Elevate your associations, elevate your life.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-accent-500 text-white font-bold text-lg hover:bg-accent-400 hover:scale-105 transition-all shadow-lg shadow-accent-500/30"
          >
            Apply to Join Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      <SectionWrapper className="bg-white py-20">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why the Inner Circle?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            You are the average of the five people you spend the most time with. The Inner Circle provides an environment where your ambition is nurtured, your faith is strengthened, and your leadership capacity is exponentially increased through high-level associations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:-translate-y-1 transition-transform group">
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
              <p className="text-gray-600">
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
