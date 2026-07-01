"use client";

import type { PricingTier } from "../types";

interface PricingTiersProps {
  tiers: PricingTier[];
}

export default function PricingTiers({ tiers }: PricingTiersProps) {
  if (!tiers.length) return null;

  return (
    <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Package / Pricing</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 px-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Pax
              </th>
              <th className="py-3 px-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Price (RM)
              </th>
            </tr>
          </thead>
          <tbody>
            {tiers.map((tier) => (
              <tr key={tier.pax} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                <td className="py-4 px-4 text-gray-900 font-medium">{tier.pax} pax</td>
                <td className="py-4 px-4 text-rose-600 font-bold">
                  RM {tier.price.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-gray-500 mt-4">
        Prices are indicative and may vary based on season, add-ons, and custom packages.
      </p>
    </section>
  );
}
