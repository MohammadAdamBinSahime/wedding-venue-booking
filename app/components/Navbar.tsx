"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, Search } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = search.trim();
    router.push(query ? `/?location=${encodeURIComponent(query)}` : "/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-rose-500"
        >
          <Heart className="h-7 w-7 fill-current" />
          <span className="hidden text-xl font-bold sm:inline">DewanKita</span>
        </Link>

        <form
          onSubmit={handleSearch}
          className="hidden max-w-md flex-1 px-8 sm:block"
        >
          <div className="flex items-center rounded-full border border-zinc-200 shadow-sm transition hover:shadow-md dark:border-zinc-700">
            <input
              type="text"
              placeholder="Search wedding venues"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent px-4 py-2 text-sm outline-none"
            />
            <button
              type="submit"
              className="mr-1 rounded-full bg-rose-500 p-2 text-white"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        </form>

        <nav className="flex items-center gap-4">
          <Link
            href="/host"
            className="hidden text-sm font-medium hover:text-rose-500 md:block"
          >
            List your venue
          </Link>

          <Link
            href="/trips"
            className="text-sm font-medium hover:text-rose-500"
          >
            Bookings
          </Link>
        </nav>
      </div>
    </header>
  );
}
