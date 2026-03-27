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
    <div className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary-900/5 transition-all duration-300 flex flex-col h-full">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary-600 to-accent-400 transform origin-left md:scale-x-0 md:group-hover:scale-x-100 transition-transform duration-300" />
      
      <div className="p-6 md:p-8 flex-grow flex flex-col">
        <div className="flex items-center space-x-2 text-sm text-primary-600 font-medium mb-4">
          <Calendar className="w-4 h-4" />
          <span>{formattedDate !== "Invalid Date" ? formattedDate : event.date}</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors">
          {event.title}
        </h3>
        
        <p className="text-gray-600 mb-6 flex-grow line-clamp-3">
          {event.description}
        </p>
        
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <MapPin className="w-4 h-4 shrink-0" />
          <span className="truncate">{event.location}</span>
        </div>
        
        <Link 
          href={`/events/${event.id}`} 
          className="inline-flex items-center justify-center w-full py-3 px-4 rounded-xl bg-primary-50 text-primary-700 font-semibold hover:bg-primary-600 hover:text-white transition-colors group/btn"
        >
          Register Now
          <ArrowRight className="ml-2 w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
