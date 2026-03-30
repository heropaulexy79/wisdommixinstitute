"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import EventCard, { EventData } from "@/components/EventCard";
import SectionWrapper from "@/components/SectionWrapper";
import CTASection from "@/components/CTASection";
import { Calendar, Loader2 } from "lucide-react";

export default function EventsPage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const eventsRef = collection(db, "events");
        const q = query(eventsRef, orderBy("date", "asc"));
        const querySnapshot = await getDocs(q);
        
        const fetchedEvents: EventData[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedEvents.push({
            id: doc.id,
            title: data.title,
            description: data.description,
            date: data.date?.toDate?.() || data.date,
            location: data.location,
          } as EventData);
        });
        
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const featuredEvent = events.length > 0 ? events[0] : null;
  const upcomingEvents = events.length > 1 ? events.slice(1) : [];

  return (
    <>
      <section className="bg-[#051a14] py-24 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-primary-900/40 blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-black uppercase text-xs tracking-[0.2em] mb-8">
            Upcoming Calendar
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium text-white mb-10 tracking-tight max-w-5xl mx-auto font-serif italic leading-[1.1]">
            Academy <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-emerald-200 not-italic font-sans font-black uppercase tracking-tighter">Events</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-100/80 max-w-3xl mx-auto font-light leading-relaxed">
            Join our upcoming sessions, seminars, and training programs designed to stretch your capacity and renew your mind.
          </p>
        </div>
      </section>

      {loading ? (
        <div className="flex flex-col justify-center items-center py-64">
          <Loader2 className="w-16 h-16 text-primary-900 animate-spin mb-6" />
          <p className="text-gray-400 font-bold tracking-[0.2em] uppercase text-xs">Loading Events...</p>
        </div>
      ) : events.length === 0 ? (
        <SectionWrapper className="text-center py-40">
          <div className="w-24 h-24 bg-gray-50 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-premium border border-gray-100">
            <Calendar className="w-10 h-10 text-gray-300" />
          </div>
          <h2 className="text-4xl font-medium text-gray-900 mb-6 font-serif italic">No Upcoming Events</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-12 font-light leading-relaxed">
            We currently do not have any new events scheduled. Please check back later or subscribe to our newsletter for updates.
          </p>
          <Link 
            href="/contact"
            className="px-10 py-4 rounded-full bg-primary-900 text-white font-black uppercase text-sm tracking-widest hover:bg-black transition-all shadow-xl active:scale-95 inline-flex"
          >
            Get Notified
          </Link>
        </SectionWrapper>
      ) : (
        <div className="bg-white">
          {/* Featured Event */}
          {featuredEvent && (
            <SectionWrapper className="!py-24">
              <div className="mb-16">
                <span className="text-primary-900 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Recommended</span>
                <h2 className="text-4xl md:text-6xl font-medium text-gray-900 mb-8 font-serif italic">Featured Event</h2>
              </div>
              <div className="bg-[#051a14] rounded-[3rem] p-10 md:p-20 text-white relative overflow-hidden flex flex-col md:row-span-2 lg:flex-row gap-16 lg:gap-24 items-center shadow-2xl group">
                <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary-900/40 rounded-full blur-[120px] -mr-32 -mt-32"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05] mix-blend-overlay" />
                
                <div className="lg:w-3/5 relative z-10 text-left">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary-300 font-bold uppercase text-[10px] tracking-widest mb-10 backdrop-blur-md">
                    <Calendar className="w-3 h-3 mr-3" />
                    {new Date(featuredEvent.date).toLocaleDateString("en-US", {
                      weekday: "long", month: "long", day: "numeric", year: "numeric"
                    })}
                  </div>
                  <h3 className="text-4xl md:text-7xl font-medium mb-10 font-serif italic leading-tight group-hover:tracking-tight transition-all duration-700">{featuredEvent.title}</h3>
                  <p className="text-primary-100/70 mb-12 leading-relaxed max-w-xl text-xl font-light">
                    {featuredEvent.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
                    <span className="text-white/40 text-xs font-black uppercase tracking-[0.2em] bg-white/5 px-6 py-3 rounded-full border border-white/5 backdrop-blur-md">
                      Location: <span className="text-white">{featuredEvent.location}</span>
                    </span>
                    <Link 
                      href="/contact"
                      className="px-12 py-5 rounded-full bg-white text-primary-900 font-black uppercase text-sm tracking-widest hover:bg-primary-100 transition-all shadow-2xl active:scale-95 inline-flex"
                    >
                      Register Now
                    </Link>
                  </div>
                </div>
                
                <div className="lg:w-2/5 relative z-10 w-full">
                  <div className="aspect-[4/3] bg-white/5 rounded-[2.5rem] border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-premium relative group-hover:scale-105 transition-transform duration-700">
                    <Calendar className="w-24 h-24 text-white/10" />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-400/10 to-transparent rounded-[2.5rem]" />
                  </div>
                </div>
              </div>
            </SectionWrapper>
          )}

          {/* Other Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <SectionWrapper className="bg-gray-50/50 !py-24 border-t border-gray-100">
              <div className="mb-20 text-center">
                <span className="text-primary-900 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Calendar</span>
                <h2 className="text-4xl md:text-6xl font-medium text-gray-900 mb-8 font-serif italic">More Upcoming Sessions</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </SectionWrapper>
          )}
        </div>
      )}

      <CTASection />
    </>
  );
}
