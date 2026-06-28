"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const categories = [
  "Dewan",
  "Garden",
  "Ballroom",
  "Outdoor",
  "Banquet",
  "Resort",
];

const defaultPricingTiers = JSON.stringify(
  [
    { pax: 300, price: 3500 },
    { pax: 600, price: 2500 },
    { pax: 900, price: 2200 },
  ],
  null,
  2
);

const defaultPaymentTerms = JSON.stringify(
  ["50% booking deposit", "50% before kenduri (or 2 days before event)"],
  null,
  2
);

const defaultInclusions = JSON.stringify(
  [
    "Pelamin (wedding dais)",
    "Baju pengantin (wedding attire)",
    "Lauk 5 hidang: Ayam, Daging, Sayur, Nasi",
    "Minimum beverages: Kopi, Teh, Sirap/Air",
    "Kuih (pastries/desserts)",
  ],
  null,
  2
);

export default function HostPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    imageSrc: "",
    exterior360: "",
    interior360: "",
    floorPlan: "",
    mapUrl: "",
    category: categories[0],
    roomCount: 1,
    bathroomCount: 1,
    guestCount: 300,
    location: "",
    price: "",
    pricingTiers: defaultPricingTiers,
    paymentTerms: defaultPaymentTerms,
    inclusions: defaultInclusions,
    additionalDetails: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateField = (field: keyof typeof form, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/listings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        roomCount: Number(form.roomCount),
        bathroomCount: Number(form.bathroomCount),
        guestCount: Number(form.guestCount),
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Failed to create listing.");
      return;
    }

    router.push(`/listings/${data.id}`);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold">List your wedding venue</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          type="text"
          required
          placeholder="Venue title"
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
          className="w-full rounded-lg border border-zinc-300 bg-transparent p-3 outline-none focus:border-rose-500 dark:border-zinc-700 dark:bg-zinc-900"
        />
        <textarea
          required
          rows={4}
          placeholder="Description"
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          className="w-full rounded-lg border border-zinc-300 bg-transparent p-3 outline-none focus:border-rose-500 dark:border-zinc-700 dark:bg-zinc-900"
        />
        <input
          type="url"
          required
          placeholder="Main image URL"
          value={form.imageSrc}
          onChange={(e) => updateField("imageSrc", e.target.value)}
          className="w-full rounded-lg border border-zinc-300 bg-transparent p-3 outline-none focus:border-rose-500 dark:border-zinc-700 dark:bg-zinc-900"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="url"
            placeholder="360° outside image URL"
            value={form.exterior360}
            onChange={(e) => updateField("exterior360", e.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-transparent p-3 outline-none focus:border-rose-500 dark:border-zinc-700 dark:bg-zinc-900"
          />
          <input
            type="url"
            placeholder="360° inside image URL"
            value={form.interior360}
            onChange={(e) => updateField("interior360", e.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-transparent p-3 outline-none focus:border-rose-500 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </div>
        <input
          type="url"
          placeholder="Map URL (Google Maps link)"
          value={form.mapUrl}
          onChange={(e) => updateField("mapUrl", e.target.value)}
          className="w-full rounded-lg border border-zinc-300 bg-transparent p-3 outline-none focus:border-rose-500 dark:border-zinc-700 dark:bg-zinc-900"
        />
        <select
          value={form.category}
          onChange={(e) => updateField("category", e.target.value)}
          className="w-full rounded-lg border border-zinc-300 bg-transparent p-3 outline-none focus:border-rose-500 dark:border-zinc-700 dark:bg-zinc-900"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <div className="grid grid-cols-3 gap-4">
          <input
            type="number"
            min={0}
            required
            placeholder="Dressing rooms"
            value={form.roomCount}
            onChange={(e) => updateField("roomCount", e.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-transparent p-3 outline-none focus:border-rose-500 dark:border-zinc-700 dark:bg-zinc-900"
          />
          <input
            type="number"
            min={0}
            required
            placeholder="Toilets"
            value={form.bathroomCount}
            onChange={(e) => updateField("bathroomCount", e.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-transparent p-3 outline-none focus:border-rose-500 dark:border-zinc-700 dark:bg-zinc-900"
          />
          <input
            type="number"
            min={1}
            required
            placeholder="Max guests"
            value={form.guestCount}
            onChange={(e) => updateField("guestCount", e.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-transparent p-3 outline-none focus:border-rose-500 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </div>
        <input
          type="text"
          required
          placeholder="Location"
          value={form.location}
          onChange={(e) => updateField("location", e.target.value)}
          className="w-full rounded-lg border border-zinc-300 bg-transparent p-3 outline-none focus:border-rose-500 dark:border-zinc-700 dark:bg-zinc-900"
        />
        <input
          type="number"
          min={0}
          step="0.01"
          required
          placeholder="Base package price (RM)"
          value={form.price}
          onChange={(e) => updateField("price", e.target.value)}
          className="w-full rounded-lg border border-zinc-300 bg-transparent p-3 outline-none focus:border-rose-500 dark:border-zinc-700 dark:bg-zinc-900"
        />
        <textarea
          rows={4}
          placeholder='Pricing tiers JSON, e.g. [{"pax":300,"price":3500},...]'
          value={form.pricingTiers}
          onChange={(e) => updateField("pricingTiers", e.target.value)}
          className="w-full rounded-lg border border-zinc-300 bg-transparent p-3 font-mono text-sm outline-none focus:border-rose-500 dark:border-zinc-700 dark:bg-zinc-900"
        />
        <textarea
          rows={5}
          maxLength={2000}
          placeholder="Describe your venue, special amenities, restrictions, or any other details potential guests should know..."
          value={form.additionalDetails}
          onChange={(e) => updateField("additionalDetails", e.target.value)}
          className="min-h-[120px] w-full rounded-lg border border-zinc-300 bg-white p-3 outline-none focus:border-rose-500 dark:border-zinc-700 dark:bg-zinc-900"
        />
        <textarea
          rows={3}
          placeholder='Payment terms JSON, e.g. ["50% booking",...]'
          value={form.paymentTerms}
          onChange={(e) => updateField("paymentTerms", e.target.value)}
          className="w-full rounded-lg border border-zinc-300 bg-transparent p-3 font-mono text-sm outline-none focus:border-rose-500 dark:border-zinc-700 dark:bg-zinc-900"
        />
        <textarea
          rows={4}
          placeholder='Inclusions JSON, e.g. ["Pelamin",...]'
          value={form.inclusions}
          onChange={(e) => updateField("inclusions", e.target.value)}
          className="w-full rounded-lg border border-zinc-300 bg-transparent p-3 font-mono text-sm outline-none focus:border-rose-500 dark:border-zinc-700 dark:bg-zinc-900"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-rose-500 py-3 font-semibold text-white transition hover:bg-rose-600 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create venue listing"}
        </button>
      </form>
    </div>
  );
}
