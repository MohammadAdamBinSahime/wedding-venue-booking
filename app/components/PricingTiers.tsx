"use client";

import { Check } from "lucide-react";
import type { PricingTier } from "../types";

interface PricingTiersProps {
  tiers: PricingTier[];
  selectedPax?: number | null;
  onSelect?: (pax: number) => void;
}

export default function PricingTiers({
  tiers,
  selectedPax,
  onSelect,
}: PricingTiersProps) {
  if (!tiers.length) return null;

  return (
    <div>
      <h3 className="text-lg font-semibold">Package / Pricing</h3>
      <div className="mt-3 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-100 dark:bg-zinc-900">
            <tr>
              <th className="px-4 py-3 font-medium">Pax (Guests)</th>
              <th className="px-4 py-3 font-medium">Price (RM)</th>
              {onSelect && <th className="px-4 py-3 font-medium">Select</th>}
            </tr>
          </thead>
          <tbody>
            {tiers.map((tier) => (
              <tr
                key={tier.pax}
                className={`border-t border-zinc-200 dark:border-zinc-800 ${
                  selectedPax === tier.pax
                    ? "bg-rose-50 dark:bg-rose-950"
                    : ""
                }`}
              >
                <td className="px-4 py-3">{tier.pax} pax</td>
                <td className="px-4 py-3 font-semibold">
                  RM {tier.price.toLocaleString()}
                </td>
                {onSelect && (
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => onSelect(tier.pax)}
                      className={`flex h-6 w-6 items-center justify-center rounded-full border transition ${
                        selectedPax === tier.pax
                          ? "border-rose-500 bg-rose-500 text-white"
                          : "border-zinc-300 hover:border-rose-400 dark:border-zinc-600"
                      }`}
                    >
                      {selectedPax === tier.pax && (
                        <Check className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-zinc-500">
        Prices shown are package estimates. Final quote depends on add-ons and date.
      </p>
    </div>
  );
}
