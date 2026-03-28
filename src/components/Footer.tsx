import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo.png" 
                alt="Wisdommix Institute Logo" 
                width={110} 
                height={35} 
                className="h-9 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Raising transformed leaders for lasting impact. We focus on leadership development, discipleship, mind transformation, and mentorship.
            </p>
            <div className="flex space-x-4 pt-2">
              <span className="text-gray-400 hover:text-accent-400 text-sm transition-colors cursor-pointer">
                Contact us
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Explore
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm hover:text-accent-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/programs" className="text-sm hover:text-accent-400 transition-colors">Our Programs</Link>
              </li>
              <li>
                <Link href="/events" className="text-sm hover:text-accent-400 transition-colors">Events</Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-accent-400 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Programs
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/programs" className="text-sm hover:text-accent-400 transition-colors">Leadership Development</Link>
              </li>
              <li>
                <Link href="/mentorship" className="text-sm hover:text-accent-400 transition-colors">1-on-1 Mentorship</Link>
              </li>
              <li>
                <Link href="/inner-circle" className="text-sm hover:text-accent-400 transition-colors">Inner Circle</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-accent-400 mr-3 shrink-0 mt-0.5" />
                <span className="text-sm">Lagos, Nigeria</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-accent-400 mr-3 shrink-0" />
                <span className="text-sm">+234 123 456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-accent-400 mr-3 shrink-0" />
                <span className="text-sm">hello@wisdommixinstitute.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-primary-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} Wisdommix Institute. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-400">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
