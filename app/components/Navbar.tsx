"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, Search, Calendar, Clock, Users } from "lucide-react";

const HOURS = Array.from({ length: 24 }, (_, i) => {
  const label = i === 0 ? "12 AM" : i < 12 ? `${i} AM` : i === 12 ? "12 PM" : `${i - 12} PM`;
  return { value: String(i), label };
});

function todayInputValue() {
  return new Date().toISOString().split("T")[0];
}

export default function Navbar() {
  const router = useRouter();
  const [venue, setVenue] = useState("");
  const [eventDate, setEventDate] = useState(todayInputValue());
  const [startTime, setStartTime] = useState("15");
  const [endTime, setEndTime] = useState("16");
  const [pax, setPax] = useState(50);

  const handleStartTimeChange = (value: string) => {
    setStartTime(value);
    const start = Number(value);
    const end = Number(endTime);
    if (end <= start) {
      const nextEnd = start + 1;
      setEndTime(String(nextEnd > 23 ? 23 : nextEnd));
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (venue.trim()) params.set("location", venue.trim());
    if (eventDate) params.set("date", eventDate);
    if (startTime) params.set("start", startTime);
    if (endTime) params.set("end", endTime);
    params.set("pax", String(pax));
    router.push(`/?${params.toString()}`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-blue-950 bg-blue-900">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2 text-rose-500">
          <Heart className="h-7 w-7 fill-current" />
          <span className="hidden text-xl font-bold sm:inline">DewanKita</span>
        </Link>

        <form
          onSubmit={handleSearch}
          className="hidden flex-1 justify-center px-4 lg:flex"
        >
          <div className="flex items-stretch divide-x divide-zinc-200 overflow-hidden rounded-2xl bg-white shadow-lg">
            {/* Venue */}
            <div className="flex min-w-[10rem] flex-col justify-center px-4 py-2">
              <label className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
                <Search className="h-3 w-3" />
                Venue
              </label>
              <input
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="Wedding in KL"
                className="w-full bg-transparent text-sm font-medium text-zinc-800 placeholder-zinc-400 outline-none"
                data-testid="nav-venue"
              />
            </div>

            {/* Event Date */}
            <div className="flex min-w-[8rem] flex-col justify-center px-4 py-2">
              <label className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
                <Calendar className="h-3 w-3" />
                Date
              </label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="bg-transparent text-sm font-medium text-zinc-800 outline-none"
                data-testid="nav-date"
              />
            </div>

            {/* Start Time */}
            <div className="flex min-w-[6rem] flex-col justify-center px-4 py-2">
              <label className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
                <Clock className="h-3 w-3" />
                Start
              </label>
              <select
                value={startTime}
                onChange={(e) => handleStartTimeChange(e.target.value)}
                className="bg-transparent text-sm font-medium text-zinc-800 outline-none"
                data-testid="nav-start"
              >
                {HOURS.map((h) => (
                  <option key={h.value} value={h.value}>{h.label}</option>
                ))}
              </select>
            </div>

            {/* End Time */}
            <div className="flex min-w-[6rem] flex-col justify-center px-4 py-2">
              <label className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
                <Clock className="h-3 w-3" />
                End
              </label>
              <select
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="bg-transparent text-sm font-medium text-zinc-800 outline-none"
                data-testid="nav-end"
              >
                {HOURS.map((h) => (
                  <option key={h.value} value={h.value}>{h.label}</option>
                ))}
              </select>
            </div>

            {/* Pax */}
            <div className="flex min-w-[7rem] items-center justify-between px-4 py-2">
              <div>
                <label className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
                  <Users className="h-3 w-3" />
                  Pax
                </label>
                <input
                  type="number"
                  min={50}
                  step={50}
                  value={pax}
                  onChange={(e) => {
                    const raw = parseInt(e.target.value, 10);
                    if (Number.isNaN(raw)) {
                      setPax(50);
                      return;
                    }
                    const rounded = Math.max(50, Math.round(raw / 50) * 50);
                    setPax(rounded);
                  }}
                  className="w-14 bg-transparent text-left text-sm font-semibold text-zinc-800 outline-none"
                  data-testid="nav-pax"
                />
              </div>
              <div className="ml-3 flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => setPax((p) => p + 50)}
                  className="flex h-4 w-4 items-center justify-center rounded border border-zinc-300 text-zinc-600 hover:bg-zinc-100"
                  data-testid="nav-pax-plus"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => setPax((p) => Math.max(50, p - 50))}
                  disabled={pax <= 50}
                  className="flex h-4 w-4 items-center justify-center rounded border border-zinc-300 text-zinc-600 hover:bg-zinc-100 disabled:opacity-40"
                  data-testid="nav-pax-minus"
                >
                  −
                </button>
              </div>
            </div>

            {/* Search */}
            <button
              type="submit"
              className="rounded-r-2xl bg-rose-500 px-6 text-sm font-bold text-white transition hover:bg-rose-600"
              data-testid="nav-search"
            >
              SEARCH
            </button>
          </div>
        </form>

        {/* Mobile fallback search */}
        <form
          onSubmit={handleSearch}
          className="flex flex-1 justify-center px-4 lg:hidden"
        >
          <div className="flex w-full max-w-md items-center rounded-full border border-blue-500 bg-white shadow-sm">
            <input
              type="text"
              placeholder="Search wedding venues"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className="w-full bg-transparent px-4 py-2 text-sm text-zinc-800 outline-none"
            />
            <button
              type="submit"
              className="mr-1 rounded-full bg-rose-500 p-2 text-white"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        </form>

        <nav className="flex shrink-0 items-center gap-4">
          <Link
            href="/host"
            className="hidden text-sm font-medium text-white hover:text-blue-100 md:block"
          >
            List your venue
          </Link>
          <Link href="/trips" className="text-sm font-medium text-white hover:text-blue-100">
            Bookings
          </Link>
        </nav>
      </div>
    </header>
  );
}
