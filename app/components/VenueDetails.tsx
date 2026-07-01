"use client";

import { MapPin, CheckCircle2 } from "lucide-react";
import Image from "next/image";

interface VenueDetailsProps {
  location: string;
  guestCount: number;
}

const layoutPoints = ["Entrance", "Toilet", "Main hall", "Planning stalls"];

export default function VenueDetails({ location, guestCount }: VenueDetailsProps) {
  return (
    <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Venue</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Layout / Building */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Layout / Building</h3>
          <ul className="space-y-3">
            {layoutPoints.map((point) => (
              <li key={point} className="flex items-center gap-3 text-gray-600">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Parking Area */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Parking Area</h3>
          <div className="rounded-xl overflow-hidden border border-gray-200 h-40 bg-gray-100 relative">
            <Image
              src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=80"
              alt="Parking area"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="flex items-center gap-2 text-gray-700 mt-3">
            <MapPin className="w-5 h-5 text-rose-600" />
            <span className="font-medium">3 parking areas</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Combined capacity for ~{Math.round(guestCount * 0.15)} vehicles
          </p>
        </div>

        {/* Location */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
          <div className="rounded-xl overflow-hidden border border-gray-200 h-48 bg-gray-100">
            <iframe
              title={`Map of ${location}`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                location
              )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <div className="flex items-start gap-2 text-gray-700 mt-3">
            <MapPin className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <span>{location}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
