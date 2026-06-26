import { prisma } from "../app/lib/prisma";
import bcrypt from "bcryptjs";

const weddingMain =
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1600&q=80";
const weddingOut =
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80";
const weddingIn =
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1600&q=80";
const weddingBallroom =
  "https://images.unsplash.com/photo-1529634597503-139d3726fed5?auto=format&fit=crop&w=1600&q=80";

const defaultPricing = JSON.stringify([
  { pax: 300, price: 3500 },
  { pax: 600, price: 2500 },
  { pax: 900, price: 2200 },
]);

const defaultPaymentTerms = JSON.stringify([
  "50% booking deposit",
  "50% before kenduri (or 2 days before event)",
]);

const defaultInclusions = JSON.stringify([
  "Pelamin (wedding dais)",
  "Baju pengantin (wedding attire)",
  "Lauk 5 hidang: Ayam, Daging, Sayur, Nasi",
  "Minimum beverages: Kopi, Teh, Sirap/Air",
  "Kuih (pastries/desserts)",
]);

async function main() {
  await prisma.booking.deleteMany();
  await prisma.review.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  const password = await bcrypt.hash("password123", 12);

  const demoUser = await prisma.user.create({
    data: {
      email: "demo@example.com",
      name: "Demo User",
      password,
    },
  });

  const hostUser = await prisma.user.create({
    data: {
      email: "host@example.com",
      name: "Pengurus Dewan",
      password,
    },
  });

  const listings = [
    {
      title: "Dewan Titi Belimbing",
      description:
        "A charming Malaysian Malay wedding hall (dewan perkahwinan) surrounded by greenery. Features a spacious pelamin area, ample parking, vendor stalls, and comfortable toilet facilities. Perfect for traditional kenduri celebrations.",
      imageSrc: weddingMain,
      exterior360: weddingOut,
      interior360: weddingIn,
      floorPlan: null,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Titi+Belimbing",
      category: "Dewan",
      roomCount: 1,
      bathroomCount: 4,
      guestCount: 900,
      location: "Titi Belimbing, Malaysia",
      price: 2200,
      pricingTiers: defaultPricing,
      paymentTerms: defaultPaymentTerms,
      inclusions: defaultInclusions,
      userId: hostUser.id,
    },
    {
      title: "Garden Villa Aisyah",
      description:
        "An elegant garden venue for intimate Malay weddings. Beautiful outdoor setting with a covered pelamin stage and fairy-light seating area.",
      imageSrc: weddingOut,
      exterior360: weddingMain,
      interior360: weddingIn,
      floorPlan: null,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Garden+Villa+Aisyah+Malaysia",
      category: "Garden",
      roomCount: 1,
      bathroomCount: 3,
      guestCount: 400,
      location: "Shah Alam, Selangor",
      price: 1800,
      pricingTiers: JSON.stringify([
        { pax: 100, price: 4000 },
        { pax: 250, price: 3200 },
        { pax: 400, price: 2800 },
      ]),
      paymentTerms: defaultPaymentTerms,
      inclusions: defaultInclusions,
      userId: hostUser.id,
    },
    {
      title: "Grand Ballroom Seri Melati",
      description:
        "A luxurious indoor ballroom with grand chandeliers, stage lighting, and a dedicated bridal suite. Suitable for large receptions up to 1,000 guests.",
      imageSrc: weddingBallroom,
      exterior360: weddingMain,
      interior360: weddingIn,
      floorPlan: null,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Grand+Ballroom+Seri+Melati",
      category: "Ballroom",
      roomCount: 2,
      bathroomCount: 6,
      guestCount: 1000,
      location: "Kuala Lumpur",
      price: 3500,
      pricingTiers: JSON.stringify([
        { pax: 500, price: 5000 },
        { pax: 800, price: 4500 },
        { pax: 1000, price: 4000 },
      ]),
      paymentTerms: defaultPaymentTerms,
      inclusions: JSON.stringify([
        "Pelamin (wedding dais)",
        "Baju pengantin (wedding attire)",
        "Buffet 6 hidang: Ayam, Daging, Kambing, Sayur, Nasi, Buah",
        "Minimum beverages: Kopi, Teh, Sirap/Air",
        "Kuih and dessert station",
      ]),
      userId: hostUser.id,
    },
  ];

  for (const listing of listings) {
    await prisma.listing.create({
      data: listing,
    });
  }

  await prisma.review.create({
    data: {
      rating: 5,
      comment: "Tempat yang sangat cantik dan selesa untuk kenduri. Highly recommended!",
      userId: demoUser.id,
      listingId: (await prisma.listing.findFirst({
        where: { title: "Dewan Titi Belimbing" },
      }))!.id,
    },
  });

  console.log("Wedding venue seed data created successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
