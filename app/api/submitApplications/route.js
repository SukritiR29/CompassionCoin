import { connectMongoDB } from "../../../lib/mongodb";
import User from "../../../models/user";
import AddOffer from "../../../models/addOffer";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { offerId, name, country, exp, approach, sender } = await req.json();

  try {
    await connectMongoDB();

    // Find the offer document by offerId
    const offer = await AddOffer.findById(offerId);

    if (!offer) {
      return NextResponse.json({ message: "Offer not found" }, { status: 404 });
    }

    // Create the application object
    const application = {
      offerId,
      sender,
      name,
      country,
      exp,
      approach,
      status: "pending", // Initial status of the application
    };

    // Find the user who created the offer
    const receiver = await User.findOneAndUpdate(
      { _id: offer.userId },
      { $push: { appliedOffer: application } },
      { new: true }
    );

    if (!receiver) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Send a message or notification to the user who created the offer
    console.log(
      `Sending message to ${receiver.email}: Application received for offer "${offer.offer}"`
    );

    // You can implement actual logic here to send a message/notification to the user

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error submitting application:", error);

    return NextResponse.json(
      { message: "An error occurred while submitting the application" },
      { status: 500 }
    );
  }
}