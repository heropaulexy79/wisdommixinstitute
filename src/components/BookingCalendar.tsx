"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00",
  "14:00", "15:00", "16:00", "17:00",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

interface BookingCalendarProps {
  selectedDate: string;
  selectedTime: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
}

export default function BookingCalendar({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
}: BookingCalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Fetch booked slots for selected date
  const fetchBookedSlots = useCallback(async (dateStr: string) => {
    setLoadingSlots(true);
    try {
      const q = query(
        collection(db, "bookings"),
        where("date", "==", dateStr),
        where("status", "==", "confirmed")
      );
      const snapshot = await getDocs(q);
      const slots = snapshot.docs.map((doc) => doc.data().time as string);
      setBookedSlots(slots);
    } catch {
      setBookedSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchBookedSlots(selectedDate);
    }
  }, [selectedDate, fetchBookedSlots]);

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const formatDate = (day: number) => {
    const mm = String(viewMonth + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    return `${viewYear}-${mm}-${dd}`;
  };

  const isDisabled = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    return d < today || d.getDay() === 0; // no Sundays, no past dates
  };

  const isSelected = (day: number) => formatDate(day) === selectedDate;

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      viewMonth === today.getMonth() &&
      viewYear === today.getFullYear()
    );
  };

  return (
    <div className="space-y-6">
      {/* Calendar */}
      <div className="bg-white rounded-[1.5rem] border border-gray-100 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-primary-900">
          <button
            onClick={prevMonth}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            type="button"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <span className="text-white font-bold text-sm tracking-wider uppercase">
            {MONTHS[viewMonth]} {viewYear}
          </span>
          <button
            onClick={nextMonth}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            type="button"
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Day labels */}
        <div className="grid grid-cols-7 border-b border-gray-100">
          {DAYS.map((d) => (
            <div
              key={d}
              className={`py-2 text-center text-[10px] font-black uppercase tracking-widest ${
                d === "Sun" ? "text-gray-300" : "text-gray-400"
              }`}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 p-2 gap-1">
          {/* Empty cells before first day */}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const disabled = isDisabled(day);
            const selected = isSelected(day);
            const todayMark = isToday(day);

            return (
              <button
                key={day}
                type="button"
                disabled={disabled}
                onClick={() => {
                  onDateChange(formatDate(day));
                  onTimeChange(""); // reset time on date change
                }}
                className={`
                  h-9 w-full rounded-xl text-sm font-semibold transition-all duration-200
                  ${disabled ? "text-gray-200 cursor-not-allowed" : "hover:bg-primary-50 cursor-pointer"}
                  ${selected ? "bg-primary-900 text-white hover:bg-primary-900 shadow-md" : ""}
                  ${todayMark && !selected ? "ring-2 ring-primary-400 text-primary-900" : ""}
                  ${!disabled && !selected ? "text-gray-700" : ""}
                `}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-primary-900" />
            <span className="text-sm font-black uppercase tracking-widest text-gray-700">
              Available Times
            </span>
            {loadingSlots && (
              <span className="text-xs text-gray-400 animate-pulse">Loading...</span>
            )}
          </div>

          <div className="grid grid-cols-4 gap-2">
            {TIME_SLOTS.map((slot) => {
              const isBooked = bookedSlots.includes(slot);
              const isChosen = selectedTime === slot;

              return (
                <button
                  key={slot}
                  type="button"
                  disabled={isBooked || loadingSlots}
                  onClick={() => onTimeChange(slot)}
                  className={`
                    py-3 rounded-xl text-xs font-bold tracking-wide transition-all duration-200
                    ${isBooked ? "bg-gray-100 text-gray-300 cursor-not-allowed line-through" : ""}
                    ${isChosen ? "bg-primary-900 text-white shadow-md scale-105" : ""}
                    ${!isBooked && !isChosen ? "bg-gray-50 text-gray-700 hover:bg-primary-50 hover:text-primary-900 border border-gray-100" : ""}
                  `}
                >
                  {slot}
                  {isBooked && (
                    <span className="block text-[9px] font-medium mt-0.5">Booked</span>
                  )}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-gray-400 mt-3 font-light">
            All times are in West Africa Time (WAT, GMT+1). Sessions run for 60 minutes.
          </p>
        </div>
      )}
    </div>
  );
}
