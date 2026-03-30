import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

export interface EventData {
  id: string;
  title: string;
  description: string;
  date: string; // ISO string or formatted date
  location: string;
}

interface EventCardProps {
  event: EventData;
}

export default function EventCard({ event }: EventCardProps) {
  // Format the date assuming it's an ISO string or just display it if pre-formatted
  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="group relative bg-white border border-gray-100 rounded-[2rem] overflow-hidden hover:shadow-premium transition-all duration-500 flex flex-col h-full hover:-translate-y-2">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary-200/30 transition-colors" />
      
      <div className="p-8 md:p-10 flex-grow flex flex-col relative z-10">
        <div className="inline-flex items-center space-x-2 text-xs font-black uppercase tracking-[0.2em] text-primary-900 mb-6 bg-primary-50 px-4 py-2 rounded-full w-fit">
          <Calendar className="w-3 h-3" />
          <span>{formattedDate !== "Invalid Date" ? formattedDate : event.date}</span>
        </div>
        
        <h3 className="text-2xl font-medium text-gray-900 mb-4 font-serif italic leading-tight group-hover:text-primary-900 transition-colors">
          {event.title}
        </h3>
        
        <p className="text-gray-500 mb-8 flex-grow line-clamp-3 font-light leading-relaxed">
          {event.description}
        </p>
        
        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-8 border-t border-gray-50 pt-6">
          <MapPin className="w-4 h-4 shrink-0" />
          <span className="truncate font-medium">{event.location}</span>
        </div>
        
        <Link 
          href={`/events/${event.id}`} 
          className="w-full inline-flex items-center justify-center py-4 px-6 rounded-2xl bg-gray-900 text-white font-bold text-sm tracking-widest uppercase hover:bg-primary-900 transition-all shadow-xl active:scale-95 group/btn"
        >
          Register Now
          <ArrowRight className="ml-3 w-4 h-4 transform group-hover/btn:translate-x-2 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
