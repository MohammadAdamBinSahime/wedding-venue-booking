"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Users } from "lucide-react";
import { safeJsonParse } from "../lib/json";
import type { Listing, PricingTier } from "../types";

export default function ListingCard({ listing }: { listing: Listing }) {
  const averageRating = listing.reviews?.length
    ? listing.reviews.reduce((sum, review) => sum + review.rating, 0) /
      listing.reviews.length
    : null;

  const tiers = safeJsonParse<PricingTier[]>(listing.pricingTiers, []);
  const startingPrice = tiers.length
    ? Math.min(...tiers.map((t) => t.price))
    : listing.price;
  const maxPax = tiers.length ? Math.max(...tiers.map((t) => t.pax)) : listing.guestCount;

  return (
    <Link
      href={`/listings/${listing.id}`}
      className="group flex flex-col gap-2"
    >
      <div className="relative aspect-square overflow-hidden rounded-xl bg-zinc-200">
        <Image
          src={listing.imageSrc}
          alt={listing.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition duration-300 group-hover:scale-105"
          unoptimized
          loading="eager"
        />
        <span className="absolute left-2 top-2 rounded-md bg-black/50 px-2 py-1 text-xs font-medium text-white">
          {listing.category}
        </span>
      </div>
      <div className="flex items-start justify-between">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
          {listing.location}
        </h3>
        {averageRating !== null && (
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-current" />
            <span>{averageRating.toFixed(1)}</span>
          </div>
        )}
      </div>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        {listing.title}
      </p>
      <div className="flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400">
        <Users className="h-3.5 w-3.5" />
        Up to {maxPax} pax
      </div>
      <p className="text-sm text-zinc-900 dark:text-zinc-100">
        <span className="font-semibold">RM {startingPrice.toLocaleString()}</span>
        {" "}
        <span className="text-zinc-500">/ package from</span>
      </p>
    </Link>
  );
}
