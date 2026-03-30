import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#020c09] text-gray-400 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-20">
          <div className="space-y-8">
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo.png" 
                alt="Wisdommix Academy Logo" 
                width={140} 
                height={45} 
                className="h-10 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-base text-gray-500 leading-relaxed font-light">
              Raising transformed leaders for lasting global impact. We focus on holisitic development through leadership, discipleship, and mentorship.
            </p>
            <div className="flex space-x-5">
              {/* social placeholders if needed, or just a sophisticated touch */}
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary-900 transition-colors cursor-pointer">
                <Mail className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium text-white mb-8 font-serif italic border-b border-white/5 pb-4">
              Explore
            </h3>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-sm hover:text-primary-300 transition-all hover:translate-x-1 inline-block">About Our Vision</Link>
              </li>
              <li>
                <Link href="/programs" className="text-sm hover:text-primary-300 transition-all hover:translate-x-1 inline-block">Education & Programs</Link>
              </li>
              <li>
                <Link href="/events" className="text-sm hover:text-primary-300 transition-all hover:translate-x-1 inline-block">Upcoming Events</Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-primary-300 transition-all hover:translate-x-1 inline-block">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-lg font-medium text-white mb-8 font-serif italic border-b border-white/5 pb-4">
              Specializations
            </h3>
            <ul className="space-y-4">
              <li>
                <Link href="/programs" className="text-sm hover:text-primary-300 transition-all hover:translate-x-1 inline-block">Leadership Strategy</Link>
              </li>
              <li>
                <Link href="/mentorship" className="text-sm hover:text-primary-300 transition-all hover:translate-x-1 inline-block">Individual Mentorship</Link>
              </li>
              <li>
                <Link href="/inner-circle" className="text-sm hover:text-primary-300 transition-all hover:translate-x-1 inline-block">The Inner Circle</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-medium text-white mb-8 font-serif italic border-b border-white/5 pb-4">
              Office
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 mr-4 border border-white/5 group-hover:bg-primary-900 transition-colors">
                  <MapPin className="h-4 w-4 text-primary-300" />
                </div>
                <span className="text-sm pt-2 group-hover:text-white transition-colors">Lagos, Nigeria</span>
              </li>
              <li className="flex items-center group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 mr-4 border border-white/5 group-hover:bg-primary-900 transition-colors">
                  <Phone className="h-4 w-4 text-primary-300" />
                </div>
                <span className="text-sm group-hover:text-white transition-colors">+234 123 456 7890</span>
              </li>
              <li className="flex items-center group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 mr-4 border border-white/5 group-hover:bg-primary-900 transition-colors">
                  <Mail className="h-4 w-4 text-primary-300" />
                </div>
                <span className="text-sm group-hover:text-white transition-colors">hello@wisdommixacademy.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-600">
            &copy; {currentYear} Wisdommix Academy. Crafted for Excellence.
          </p>
          <div className="flex space-x-10 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
            <span className="hover:text-primary-300 cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-primary-300 cursor-pointer transition-colors">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
