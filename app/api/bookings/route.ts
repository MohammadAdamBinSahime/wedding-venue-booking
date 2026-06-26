import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

async function getDefaultUserId() {
  const user = await prisma.user.findFirst({
    where: { email: "demo@example.com" },
  });
  return user?.id;
}

export async function GET(req: Request) {
  try {
    const userId = await getDefaultUserId();

    if (!userId) {
      return NextResponse.json({ error: "No default user found" }, { status: 500 });
    }

    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Bookings GET error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const userId = await getDefaultUserId();

    if (!userId) {
      return NextResponse.json({ error: "No default user found" }, { status: 500 });
    }

    const body = await req.json();
    const { listingId, startDate, endDate, totalPrice, pax } = body;

    if (!listingId || !startDate || !endDate || !totalPrice) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        listingId,
        userId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalPrice: parseFloat(totalPrice),
        pax: pax ? parseInt(pax) : null,
      },
      include: {
        listing: true,
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Bookings POST error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
