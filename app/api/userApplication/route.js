import { connectMongoDB } from "@/lib/mongodb";
import { getSession } from "next-auth/react";
import User from "@/app/models/user";
import { NextResponse } from "next/server";

export async function GET(req) {
  const session = await getSession({ req });

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectMongoDB();

    const user = await User.findById(session.user._id).populate(
      "appliedOffer.offerId"
    );

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      appliedOffers: user.appliedOffer,
    });
  } catch (error) {
    console.error("Error fetching applied offers:", error);

    return NextResponse.json(
      { message: "An error occurred while fetching applied offers" },
      { status: 500 }
    );
  }
}
