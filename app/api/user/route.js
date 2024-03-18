import { connectMongoDB } from "@/lib/mongodb";
import Application from "@/models/application";
import { NextResponse } from "next/server";

// Function to handle user application submission
export async function applyToOffer(req) {
  try {
    const { userId, offerId, applicationDetails } = await req.json();
    await connectMongoDB();
    await Application.create({
      userId,
      offerId,
      applicationDetails,
    });

    return NextResponse.json({ message: "Application submitted." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while submitting the application" },
      { status: 500 }
    );
  }
}
