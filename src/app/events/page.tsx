"use client";

import { useEffect, useState } from "react";
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
      <section className="bg-primary-950 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-bg-pattern.svg')] opacity-5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Institute <span className="text-accent-400">Events</span>
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Join our upcoming sessions, seminars, and training programs designed to stretch your capacity and renew your mind.
          </p>
        </div>
      </section>

      {loading ? (
        <div className="flex justify-center items-center py-40">
          <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
        </div>
      ) : events.length === 0 ? (
        <SectionWrapper className="text-center py-32">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Upcoming Events</h2>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            We currently do not have any new events scheduled. Please check back later or subscribe to our newsletter for updates.
          </p>
        </SectionWrapper>
      ) : (
        <>
          {/* Featured Event */}
          {featuredEvent && (
            <SectionWrapper className="bg-white !py-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <span className="w-2 h-8 bg-accent-500 rounded-full mr-3"></span>
                Featured Event
              </h2>
              <div className="bg-primary-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden flex flex-col md:flex-row gap-10 items-center">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500 rounded-full blur-[80px] opacity-20 -mr-20 -mt-20"></div>
                
                <div className="md:w-1/2 relative z-10">
                  <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-accent-500/20 text-accent-400 font-medium text-xs mb-6 border border-accent-500/30">
                    <Calendar className="w-3 h-3 mr-2" />
                    {new Date(featuredEvent.date).toLocaleDateString("en-US", {
                      weekday: "long", month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit"
                    })}
                  </div>
                  <h3 className="text-3xl md:text-5xl font-bold mb-4">{featuredEvent.title}</h3>
                  <p className="text-primary-100 mb-8 leading-relaxed max-w-xl text-lg">
                    {featuredEvent.description}
                  </p>
                  <p className="text-primary-200 text-sm mb-8 font-medium bg-primary-800/50 inline-block px-4 py-2 rounded-lg backdrop-blur-sm border border-primary-700">
                    Location: {featuredEvent.location}
                  </p>
                  <div>
                    <button className="px-8 py-4 rounded-full bg-accent-500 text-white font-bold text-lg hover:bg-accent-400 hover:scale-105 transition-all shadow-lg shadow-accent-500/30">
                      Register for this Event
                    </button>
                  </div>
                </div>
                
                <div className="md:w-1/2 relative z-10 w-full">
                  <div className="aspect-video bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm flex items-center justify-center shadow-2xl">
                    <Calendar className="w-20 h-20 text-white/20" />
                  </div>
                </div>
              </div>
            </SectionWrapper>
          )}

          {/* Other Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <SectionWrapper className="bg-gray-50 !py-16 border-t border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <span className="w-2 h-8 bg-primary-600 rounded-full mr-3"></span>
                More Upcoming Events
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </SectionWrapper>
          )}
        </>
      )}

      <CTASection />
    </>
  );
}
