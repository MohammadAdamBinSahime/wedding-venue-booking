"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Building2,
  Home,
  PartyPopper,
  Palmtree,
  Tent,
  Trees,
  UtensilsCrossed,
} from "lucide-react";

const categories = [
  { label: "All", icon: Home },
  { label: "Dewan", icon: Building2 },
  { label: "Garden", icon: Trees },
  { label: "Ballroom", icon: PartyPopper },
  { label: "Outdoor", icon: Tent },
  { label: "Banquet", icon: UtensilsCrossed },
  { label: "Resort", icon: Palmtree },
];

export default function Categories({
  initialCategory = "All",
}: {
  initialCategory?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("category") || initialCategory;

  const handleClick = (label: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (label === "All") {
      params.delete("category");
    } else {
      params.set("category", label);
    }
    const query = params.toString();
    router.push(query ? `/?${query}` : "/");
  };

  return (
    <div className="sticky top-16 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-4 py-4 sm:px-6 lg:px-8">
        {categories.map(({ label, icon: Icon }) => {
          const isActive = active === label;
          return (
            <button
              key={label}
              onClick={() => handleClick(label)}
              className={`flex min-w-fit flex-col items-center gap-2 border-b-2 pb-2 text-sm font-medium transition ${
                isActive
                  ? "border-rose-500 text-rose-500"
                  : "border-transparent text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              <Icon className="h-6 w-6" />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
