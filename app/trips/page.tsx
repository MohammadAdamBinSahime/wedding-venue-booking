"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Users } from "lucide-react";
import type { Booking } from "../types";

export default function TripsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/bookings", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        setBookings(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <p className="px-4 py-16 text-center text-zinc-500">Loading bookings...</p>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold">Your bookings</h1>
      {bookings.length === 0 ? (
        <p className="mt-4 text-zinc-500">No bookings yet.</p>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <Link
              href={`/listings/${booking.listingId}`}
              key={booking.id}
              className="flex gap-4 rounded-xl border border-zinc-200 p-4 transition hover:shadow-md dark:border-zinc-800"
            >
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-200">
                <Image
                  src={booking.listing.imageSrc}
                  alt={booking.listing.title}
                  fill
                  sizes="96px"
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="font-semibold">{booking.listing.title}</h3>
                <p className="text-sm text-zinc-500">
                  {booking.listing.location}
                </p>
                <p className="mt-2 flex items-center gap-1 text-sm text-zinc-600 dark:text-zinc-300">
                  <Calendar className="h-4 w-4" />
                  {new Date(booking.startDate).toLocaleDateString()}
                </p>
                {booking.pax && (
                  <p className="flex items-center gap-1 text-sm text-zinc-600 dark:text-zinc-300">
                    <Users className="h-4 w-4" />
                    {booking.pax} pax
                  </p>
                )}
                <p className="text-sm font-medium">
                  RM {booking.totalPrice.toLocaleString()} total
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
