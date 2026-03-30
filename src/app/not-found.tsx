import Link from "next/link";
import { MoveLeft, HelpCircle } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#051a14] flex flex-center relative overflow-hidden flex-col justify-center items-center px-4">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl bg-primary-900/20 rounded-full blur-[160px] pointer-events-none" />
      
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <div className="w-24 h-24 rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-10 backdrop-blur-xl shadow-2xl">
          <HelpCircle className="w-12 h-12 text-primary-300 animate-pulse" />
        </div>
        
        <span className="text-primary-300 font-black tracking-[0.4em] uppercase text-[10px] mb-6 block">Error 404</span>
        <h1 className="text-6xl md:text-8xl font-medium text-white mb-8 font-serif italic tracking-tighter">Lost in <span className="opacity-50">Transition</span></h1>
        
        <p className="text-xl text-primary-100/70 mb-12 font-light leading-relaxed">
          The page you are looking for has been moved or redefined. Let&apos;s get you back on the path of transformation.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            href="/"
            className="px-10 py-4 rounded-full bg-white text-primary-900 font-black uppercase text-xs tracking-widest hover:bg-primary-100 transition-all shadow-2xl flex items-center justify-center group"
          >
            <MoveLeft className="mr-3 w-4 h-4 group-hover:-translate-x-2 transition-transform" />
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="px-10 py-4 rounded-full bg-white/5 border border-white/10 text-white font-black uppercase text-xs tracking-widest hover:bg-white/10 transition-all flex items-center justify-center"
          >
            Get Help
          </Link>
        </div>
      </div>
      
      {/* Absolute decor */}
      <div className="absolute bottom-10 left-10 text-[8px] font-black uppercase tracking-[0.5em] text-white/10">
        Wisdommix Academy &copy; 2026
      </div>
    </main>
  );
}
