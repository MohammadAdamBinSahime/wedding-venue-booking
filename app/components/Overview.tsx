"use client";

import { Globe, Phone, Share2, Bookmark, CalendarDays } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

interface OverviewProps {
  description: string;
  hostName?: string | null;
}

export default function Overview({ description, hostName }: OverviewProps) {
  const socials = [
    { icon: Globe, label: "Website" },
    { icon: InstagramIcon, label: "Instagram" },
    { icon: FacebookIcon, label: "Facebook" },
    { icon: Phone, label: "Call" },
    { icon: Share2, label: "Share" },
    { icon: Bookmark, label: "Save" },
  ];

  return (
    <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>

      <div className="space-y-4 text-gray-600 leading-relaxed whitespace-pre-wrap">
        {description}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <span className="text-sm text-gray-700">
          Own by{" "}
          <strong className="text-gray-900">{hostName || "Pengurus"}</strong>
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
          <CalendarDays className="w-3.5 h-3.5" />
          12 years in operation
        </span>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        {socials.map(({ icon: Icon, label }) => (
          <a
            key={label}
            href="#"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors"
          >
            <Icon className="w-4 h-4" />
            {label}
          </a>
        ))}
      </div>

      <div className="mt-6">
        <a
          href="#"
          className="inline-flex items-center text-rose-600 font-semibold hover:underline"
        >
          Schedule a venue tour
        </a>
      </div>
    </section>
  );
}
