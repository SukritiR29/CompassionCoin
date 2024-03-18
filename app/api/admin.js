// api/admin.js

import { connectMongoDB } from "@/lib/mongodb";
import Offer from "@/models/offer";
import { NextResponse } from "next/server";

export async function createOffer(req) {
  try {
    const { adminId, offerName, offerDetails } = await req.json();
    await connectMongoDB();
    await Offer.create({ adminId, offerName, offerDetails });

    return NextResponse.json({ message: "Offer created." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while creating the offer" },
      { status: 500 }
    );
  }
}
