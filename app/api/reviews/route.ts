import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

async function getDefaultUserId() {
  const user = await prisma.user.findFirst({
    where: { email: "demo@example.com" },
  });
  return user?.id;
}

export async function POST(req: Request) {
  try {
    const userId = await getDefaultUserId();

    if (!userId) {
      return NextResponse.json({ error: "No default user found" }, { status: 500 });
    }

    const body = await req.json();
    const { listingId, rating, comment } = body;

    if (!listingId || !rating || !comment) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const ratingNum = Number(rating);
    if (ratingNum < 1 || ratingNum > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    const review = await prisma.review.create({
      data: {
        listingId,
        userId,
        rating: ratingNum,
        comment,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Reviews POST error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
