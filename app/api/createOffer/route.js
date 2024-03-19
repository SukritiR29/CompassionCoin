import { connectMongoDB } from '../../../lib/mongodb';
import AddOffer from '../../../models/addOffer'
import { NextResponse } from "next/server";

export async function POST(req) {
  const { offer, firm, description, worth } = await req.json();

  try {
    await connectMongoDB();

    await AddOffer.create({ offer, firm, description, worth });

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
