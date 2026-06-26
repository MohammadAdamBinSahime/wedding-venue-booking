import { notFound } from "next/navigation";
import { headers } from "next/headers";
import VenueListing from "./VenueListing";
import type { Listing } from "../../types";

interface ListingPageProps {
  params: Promise<{ id: string }>;
}

export default async function ListingPage({ params }: ListingPageProps) {
  const { id } = await params;

  const headersList = await headers();
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const host = headersList.get("host") || "localhost:3001";
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(`${baseUrl}/api/listings/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  const listing: Listing = await res.json();

  return <VenueListing listing={listing} />;
}
