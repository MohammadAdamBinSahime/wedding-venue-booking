export interface PricingTier {
  pax: number;
  price: number;
}

export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  userId: string;
  listingId: string;
  user?: User;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  category: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  location: string;
  price: number;
  exterior360?: string | null;
  interior360?: string | null;
  floorPlan?: string | null;
  mapUrl?: string | null;
  pricingTiers: string;
  paymentTerms: string;
  inclusions: string;
  additionalDetails?: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: User;
  reviews: Review[];
  bookings?: { startDate: string; endDate: string }[];
}

export interface Booking {
  id: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  pax?: number | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
  listingId: string;
  listing: Listing;
}
