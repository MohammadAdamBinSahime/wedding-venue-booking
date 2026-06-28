import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const location = searchParams.get("location");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    const where: Prisma.ListingWhereInput = {};

    if (category && category !== "All") {
      where.category = category;
    }

    if (location) {
      where.location = {
        contains: location,
      };
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    const listings = await prisma.listing.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(listings);
  } catch (error) {
    console.error("Listings GET error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

function safeJson(value: unknown, fallback: unknown): string {
  if (typeof value === "string") {
    try {
      JSON.parse(value);
      return value;
    } catch {
      return JSON.stringify(fallback);
    }
  }
  if (Array.isArray(value)) return JSON.stringify(value);
  return JSON.stringify(fallback);
}

export async function POST(req: Request) {
  try {
    const defaultUser = await prisma.user.findFirst({
      where: { email: "host@example.com" },
    });

    if (!defaultUser) {
      return NextResponse.json(
        { error: "No default host user found" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      location,
      price,
      exterior360,
      interior360,
      floorPlan,
      mapUrl,
      pricingTiers,
      paymentTerms,
      inclusions,
      additionalDetails,
    } = body;

    if (
      !title ||
      !description ||
      !imageSrc ||
      !category ||
      !location ||
      !price
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        imageSrc,
        category,
        roomCount: parseInt(roomCount) || 1,
        bathroomCount: parseInt(bathroomCount) || 1,
        guestCount: parseInt(guestCount) || 1,
        location,
        price: parseFloat(price),
        exterior360: exterior360 || null,
        interior360: interior360 || null,
        floorPlan: floorPlan || null,
        mapUrl: mapUrl || null,
        pricingTiers: safeJson(pricingTiers, []),
        paymentTerms: safeJson(paymentTerms, []),
        inclusions: safeJson(inclusions, []),
        additionalDetails: additionalDetails || null,
        userId: defaultUser.id,
      },
    });

    return NextResponse.json(listing, { status: 201 });
  } catch (error) {
    console.error("Listings POST error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
