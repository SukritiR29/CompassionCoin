import { connectMongoDB } from "../../../lib/mongodb";
import User from "../../../models/user";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectMongoDB();

    // Retrieve all users
    const users = await User.find();

    // Extract all submitted applications from all users
    const responses = users.flatMap((user) => user.appliedOffer);

    return NextResponse.json({ success: true, responses });
  } catch (error) {
    console.error("Error fetching submitted responses:", error);

    return NextResponse.json(
      { message: "An error occurred while fetching submitted responses" },
      { status: 500 }
    );
  }
}