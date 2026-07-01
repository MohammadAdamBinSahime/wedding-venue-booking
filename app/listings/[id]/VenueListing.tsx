"use client";

import { useMemo } from "react";
import { MapPin } from "lucide-react";
import Gallery from "../../components/Gallery";
import Overview from "../../components/Overview";
import VenueDetails from "../../components/VenueDetails";
import PricingTiers from "../../components/PricingTiers";
import AdditionalDetails from "../../components/AdditionalDetails";
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

  return (
    <main className="pb-16 px-4 pt-6 sm:px-6 lg:px-8 bg-gray-50">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {listing.title}
          </h1>
          <p className="text-gray-500 mt-1 flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {listing.location}
          </p>
        </div>

        <Gallery
          title={listing.title}
          imageSrc={listing.imageSrc}
          exterior360={listing.exterior360}
          interior360={listing.interior360}
          floorPlan={listing.floorPlan}
        />

        <Overview
          description={listing.description}
          hostName={listing.user.name}
        />

        <VenueDetails
          location={listing.location}
          guestCount={listing.guestCount}
        />

        <AdditionalDetails details={listing.additionalDetails} />

        <PricingTiers tiers={pricingTiers} />
      </div>
    </main>
  );
}
