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
              <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary-900 hover:border-primary-400 transition-colors">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary-900 hover:border-primary-400 transition-colors">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="mailto:hello@wisdommixacademy.com" aria-label="Email" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary-900 hover:border-primary-400 transition-colors">
                <Mail className="w-4 h-4 text-white" />
              </a>
              <a href="#" aria-label="TikTok" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary-900 hover:border-primary-400 transition-colors">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.01.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.17-3.8-5.46-.4-2.51.69-5.1 2.73-6.66 1.41-1.09 3.22-1.54 4.96-1.3v4.06c-1.1-.03-2.22.45-2.91 1.35-.91 1.17-.89 2.98.05 4.12.82.97 2.15 1.36 3.42 1.05 1.25-.32 2.22-1.35 2.5-2.61.18-.84.14-1.74.14-2.6V.02z" />
                </svg>
              </a>
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
                <span className="text-sm group-hover:text-white transition-colors break-all">hello@wisdommixacademy.com</span>
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
