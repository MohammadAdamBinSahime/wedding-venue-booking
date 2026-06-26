"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Listing } from "../../types";

export default function BookingForm({ listing }: { listing: Listing }) {
  const router = useRouter();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const nights =
    startDate && endDate
      ? Math.max(
          0,
          (new Date(endDate).getTime() - new Date(startDate).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  const totalPrice = nights * listing.price;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!startDate || !endDate || nights <= 0) {
      setError("Please select valid dates.");
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
          startDate,
          endDate,
          totalPrice,
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
    <div className="sticky top-32 rounded-xl border border-zinc-200 p-6 shadow-lg dark:border-zinc-800">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold">${listing.price}</span>
        <span className="text-zinc-500">/ night</span>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div className="grid grid-cols-2 gap-2 rounded-lg border border-zinc-200 p-2 dark:border-zinc-700">
          <label className="flex flex-col gap-1 text-xs font-medium uppercase text-zinc-500">
            Check in
            <input
              type="date"
              required
              min={today}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-transparent text-sm outline-none"
            />
          </label>
          <label className="flex flex-col gap-1 border-l border-zinc-200 pl-2 text-xs font-medium uppercase text-zinc-500 dark:border-zinc-700">
            Check out
            <input
              type="date"
              required
              min={startDate || today}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-transparent text-sm outline-none"
            />
          </label>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-rose-500 py-3 font-semibold text-white transition hover:bg-rose-600 disabled:opacity-50"
        >
          {loading ? "Booking..." : "Reserve"}
        </button>
      </form>

      {nights > 0 && (
        <div className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
          <div className="flex justify-between">
            <span>
              ${listing.price} x {nights} nights
            </span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t border-zinc-200 pt-2 font-bold dark:border-zinc-700">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
