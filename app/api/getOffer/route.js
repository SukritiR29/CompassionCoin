import { connectMongoDB } from "../../../lib/mongodb";
import AddOffer from "../../models/addOffer";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectMongoDB();

    // Fetch all documents from the AddOffer collection
    const offers = await AddOffer.find({});

    return NextResponse.json({
      offers,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching offers:", error);

    return NextResponse.json(
      { message: "An error occurred while fetching offers" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const { offer, userEmail, firm, description, worth } = await req.json();

  // Add console log to check if userEmail is received correctly
  console.log("Received userEmail:", userEmail);

  try {
    await connectMongoDB();

    await AddOffer.create({ offer, userEmail, firm, description, worth });

    return NextResponse.json({
      msg: ["Message sent successfully"],
      success: true,
    });
  } catch (error) {
    console.error("Error adding offer:", error);

    return NextResponse.json(
      { message: "An error occurred while adding the offer" },
      { status: 500 }
    );
  }
}
