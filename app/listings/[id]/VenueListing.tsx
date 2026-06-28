"use client";

import { useMemo, useState } from "react";
import { MapPin, Star, User } from "lucide-react";
import VenueGallery from "../../components/VenueGallery";
import FloorPlan from "../../components/FloorPlan";
import PricingTiers from "../../components/PricingTiers";
import PaymentTerms from "../../components/PaymentTerms";
import InclusionsList from "../../components/InclusionsList";
import ReviewForm from "./ReviewForm";
import { safeJsonParse } from "../../lib/json";
import type { Listing, PricingTier } from "../../types";

interface VenueListingProps {
  listing: Listing;
}

export default function VenueListing({ listing }: VenueListingProps) {

  const pricingTiers = useMemo<PricingTier[]>(() => {
    const parsed = safeJsonParse<PricingTier[]>(listing.pricingTiers, []);
    return parsed.sort((a, b) => a.pax - b.pax);
  }, [listing.pricingTiers]);

  const paymentTerms = useMemo(
    () => safeJsonParse<string[]>(listing.paymentTerms, []),
    [listing.paymentTerms]
  );

  const inclusions = useMemo(
    () => safeJsonParse<string[]>(listing.inclusions, []),
    [listing.inclusions]
  );

  const [reviews, setReviews] = useState(listing.reviews || []);

  const averageRating = reviews.length
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold sm:text-3xl">{listing.title}</h1>
      <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
        <span className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          {listing.location}
        </span>
        {averageRating !== null && (
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-current" />
            {averageRating.toFixed(1)} · {listing.reviews.length} reviews
          </span>
        )}
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-1">
        {/* Main column */}
        <div className="space-y-10">
          <VenueGallery
            title={listing.title}
            imageSrc={listing.imageSrc}
            exterior360={listing.exterior360}
            interior360={listing.interior360}
          />

          <section className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4 dark:border-zinc-800">
              <div>
                <p className="text-lg font-medium">
                  Hosted by {listing.user.name || "Pengurus"}
                </p>
                <p className="text-sm text-zinc-500">
                  Capacity up to {listing.guestCount} guests ·{" "}
                  {listing.bathroomCount} toilet facilities
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">
                {listing.user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element -- Host avatar is an external, unoptimized image
                  <img
                    src={listing.user.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User className="h-6 w-6" />
                )}
              </div>
            </div>

            <div className="mt-4">
              <h2 className="text-xl font-semibold">About this venue</h2>
              <p className="mt-2 leading-relaxed text-zinc-600 dark:text-zinc-300">
                {listing.description}
              </p>
            </div>
          </section>

          <FloorPlan />

          <section className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <MapPin className="h-5 w-5 text-rose-500" />
              Location
            </h3>
            <div className="relative aspect-video overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-800">
              <iframe
                title={`Map of ${listing.location}`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  listing.location
                )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                className="absolute inset-0 h-full w-full border-0"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {listing.location}
              </p>
              {listing.mapUrl && (
                <a
                  href={listing.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-rose-500 hover:underline"
                >
                  Open in Google Maps
                </a>
              )}
            </div>
          </section>

          <PricingTiers tiers={pricingTiers} />

          <PaymentTerms terms={paymentTerms} />

          <InclusionsList items={inclusions} />

          <section>
            <h2 className="text-xl font-semibold">Reviews</h2>
            {reviews.length ? (
              <div className="mt-4 space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">
                        {review.user?.name || "Guest"}
                      </span>
                      <span className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 fill-current" />
                        {review.rating}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-zinc-500">No reviews yet.</p>
            )}
            <ReviewForm
              listingId={listing.id}
              onReviewAdded={(newReview) => setReviews((prev) => [newReview, ...prev])}
            />
          </section>
        </div>

      </div>
    </div>
  );
}
