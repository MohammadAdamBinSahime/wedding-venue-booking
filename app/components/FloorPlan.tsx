"use client";

export default function FloorPlan() {
  return (
    <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
      <h3 className="mb-4 text-lg font-semibold">Bird&apos;s Eye View</h3>
      <div className="w-full overflow-auto">
        <svg
          viewBox="0 0 600 420"
          className="mx-auto h-auto w-full max-w-2xl"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Parking surround */}
          <rect
            x="10"
            y="10"
            width="580"
            height="400"
            rx="12"
            fill="#f4f4f5"
            stroke="#a1a1aa"
            strokeWidth="2"
            strokeDasharray="8 4"
          />
          <text x="300" y="40" textAnchor="middle" className="fill-zinc-500 text-sm">
            Parking
          </text>

          {/* Main hall */}
          <rect
            x="80"
            y="70"
            width="440"
            height="280"
            rx="8"
            fill="#fff"
            stroke="#27272a"
            strokeWidth="2"
          />
          <text x="300" y="100" textAnchor="middle" className="fill-zinc-800 text-sm font-semibold">
            Main Hall
          </text>

          {/* Pelamin (wedding dais) */}
          <rect
            x="230"
            y="80"
            width="140"
            height="60"
            rx="4"
            fill="#fecaca"
            stroke="#be123c"
            strokeWidth="2"
          />
          <text x="300" y="115" textAnchor="middle" className="fill-rose-800 text-xs font-semibold">
            Pelamin
          </text>

          {/* Entrance */}
          <path
            d="M 270 350 L 270 370 L 330 370 L 330 350"
            fill="none"
            stroke="#16a34a"
            strokeWidth="4"
          />
          <text x="300" y="400" textAnchor="middle" className="fill-green-700 text-xs font-semibold">
            Entrance
          </text>

          {/* Stall areas */}
          <rect x="100" y="120" width="70" height="100" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
          <text x="135" y="175" textAnchor="middle" className="fill-amber-800 text-xs font-semibold">
            Stall
          </text>

          <rect x="430" y="120" width="70" height="100" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
          <text x="465" y="175" textAnchor="middle" className="fill-amber-800 text-xs font-semibold">
            Stall
          </text>

          {/* Tables / seating */}
          <rect x="180" y="180" width="60" height="40" rx="4" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
          <rect x="260" y="180" width="60" height="40" rx="4" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
          <rect x="340" y="180" width="60" height="40" rx="4" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
          <rect x="180" y="240" width="60" height="40" rx="4" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
          <rect x="260" y="240" width="60" height="40" rx="4" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
          <rect x="340" y="240" width="60" height="40" rx="4" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />

          {/* Toilets */}
          <rect x="90" y="260" width="60" height="50" rx="4" fill="#dcfce7" stroke="#15803d" strokeWidth="2" />
          <text x="120" y="290" textAnchor="middle" className="fill-green-800 text-xs font-semibold">
            Toilet
          </text>

          <rect x="450" y="260" width="60" height="50" rx="4" fill="#dcfce7" stroke="#15803d" strokeWidth="2" />
          <text x="480" y="290" textAnchor="middle" className="fill-green-800 text-xs font-semibold">
            Toilet
          </text>
        </svg>
      </div>
      <p className="mt-3 text-center text-sm text-zinc-500">
        Layout includes pelamin, vendor stalls, seating, toilets, parking, and entrance.
      </p>
    </div>
  );
}
