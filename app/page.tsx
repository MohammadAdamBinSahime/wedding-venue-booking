import { headers } from "next/headers";
import Categories from "./components/Categories";
import ListingCard from "./components/ListingCard";
import type { Listing } from "./types";

interface HomePageProps {
  searchParams: Promise<{ category?: string; location?: string }>;
}

export default async function Home({ searchParams }: HomePageProps) {
  const { category, location } = await searchParams;

  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (location) params.set("location", location);

  const headersList = await headers();
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const host = headersList.get("host") || "localhost:3000";
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(`${baseUrl}/api/listings?${params.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="p-8 text-center text-zinc-500">
        Failed to load listings.
      </div>
    );
  }

  const listings: Listing[] = await res.json();

  return (
    <div>
      <Categories initialCategory={category || "All"} />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {listings.length === 0 ? (
          <p className="text-center text-zinc-500">No listings found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
