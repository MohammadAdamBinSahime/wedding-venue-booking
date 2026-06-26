"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  MapPin,
  Star,
  Users,
  Calendar as CalendarIcon,
  User,
} from "lucide-react";
import VenueGallery from "../../components/VenueGallery";
import YearCalendar from "../../components/YearCalendar";
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
  const router = useRouter();

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

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedPax, setSelectedPax] = useState<number | null>(
    pricingTiers[0]?.pax || null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedTier = pricingTiers.find((t) => t.pax === selectedPax);
  const totalPrice = selectedTier?.price ?? 0;

  const today = new Date().toISOString().split("T")[0];

  const isDateBooked = (date: string) => {
    if (!listing.bookings) return false;
    const d = new Date(date);
    return listing.bookings.some(
      (b) => d >= new Date(b.startDate) && d <= new Date(b.endDate)
    );
  };

  const handleReserve = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate) {
      setError("Please select an event date.");
      return;
    }
    if (!selectedPax || !selectedTier) {
      setError("Please select a guest package.");
      return;
    }
    if (isDateBooked(selectedDate)) {
      setError("Selected date is already taken.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingId: listing.id,
          startDate: selectedDate,
          endDate: selectedDate,
          totalPrice,
          pax: selectedPax,
        }),
      });

      if (!res.ok) {
        throw new Error("Booking failed.");
      }

      router.push("/trips");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

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

      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        {/* Main column */}
        <div className="space-y-10 lg:col-span-2">
          <VenueGallery
            title={listing.title}
            imageSrc={listing.imageSrc}
            exterior360={listing.exterior360}
            interior360={listing.interior360}
          />

          <section>
            <h2 className="mb-4 text-xl font-semibold">
              Date Availability — {new Date().getFullYear()}
            </h2>
            <YearCalendar
              selectedDate={selectedDate}
              onSelect={setSelectedDate}
              bookedRanges={listing.bookings || []}
            />
          </section>

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

        {/* Booking sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-32 space-y-6 rounded-xl border border-zinc-200 p-6 shadow-lg dark:border-zinc-800">
            <div>
              <p className="text-sm text-zinc-500">Starting from</p>
              <p className="text-2xl font-bold">
                RM{" "}
                {pricingTiers.length
                  ? Math.min(...pricingTiers.map((t) => t.price)).toLocaleString()
                  : listing.price}
              </p>
              <p className="text-sm text-zinc-500">per package</p>
            </div>

            <form onSubmit={handleReserve} className="space-y-4">
              <div>
                <label className="mb-1 flex items-center gap-1 text-xs font-medium uppercase text-zinc-500">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  Event date
                </label>
                <input
                  type="date"
                  required
                  min={today}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 bg-transparent p-3 text-sm outline-none focus:border-rose-500 dark:border-zinc-700"
                />
              </div>

              <div>
                <label className="mb-1 flex items-center gap-1 text-xs font-medium uppercase text-zinc-500">
                  <Users className="h-3.5 w-3.5" />
                  Guest package (pax)
                </label>
                <select
                  required
                  value={selectedPax ?? ""}
                  onChange={(e) => setSelectedPax(Number(e.target.value))}
                  className="w-full rounded-lg border border-zinc-200 bg-transparent p-3 text-sm outline-none focus:border-rose-500 dark:border-zinc-700"
                >
                  {pricingTiers.map((tier) => (
                    <option key={tier.pax} value={tier.pax}>
                      {tier.pax} pax — RM {tier.price.toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-rose-500 py-3 font-semibold text-white transition hover:bg-rose-600 disabled:opacity-50"
              >
                {loading ? "Booking..." : "Reserve date"}
              </button>
            </form>

            {selectedTier && (
              <div className="space-y-2 border-t border-zinc-200 pt-4 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
                <div className="flex justify-between">
                  <span>{selectedPax} pax package</span>
                  <span>RM {selectedTier.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-zinc-900 dark:text-white">
                  <span>Total</span>
                  <span>RM {selectedTier.price.toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
