"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import EventCard, { EventData } from "./EventCard";
import SectionWrapper from "./SectionWrapper";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";

export default function RecentEvents() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const eventsRef = collection(db, "events");
        const q = query(eventsRef, orderBy("date", "asc"), limit(3));
        const querySnapshot = await getDocs(q);
        
        const fetchedEvents: EventData[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedEvents.push({
            id: doc.id,
            title: data.title,
            description: data.description,
            date: data.date?.toDate?.() || data.date, // handle Firestore timestamp or string
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

  return (
    <SectionWrapper id="upcoming-events" className="bg-white border-t border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Upcoming Events
          </h2>
          <p className="text-gray-600 text-lg">
            Join us at our upcoming life-transforming sessions, seminars, and training programs.
          </p>
        </div>
        <Link 
          href="/events" 
          className="group hidden md:flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
        >
          View All Events
          <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
        </div>
      ) : events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
          <p className="text-gray-500 mb-4">No upcoming events scheduled at the moment.</p>
          <p className="text-sm text-gray-400">Check back later or join our programs.</p>
        </div>
      )}

      <div className="mt-10 md:hidden flex justify-center">
        <Link 
          href="/events" 
          className="inline-flex items-center justify-center px-5 py-2.5 md:px-6 md:py-3 rounded-full bg-white border border-gray-200 text-primary-700 font-semibold hover:bg-gray-50 transition-colors w-full"
        >
          View All Events
          <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>
    </SectionWrapper>
  );
}
