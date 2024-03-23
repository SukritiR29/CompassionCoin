import { connectMongoDB } from "../../../lib/mongodb";
import User from "../../../models/user";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectMongoDB();

    // Retrieve all users
    const users = await User.find();

    // Extract all submitted applications from all users
    const applications = users.flatMap((user) => user.appliedOffer);

    return NextResponse.json({ success: true, applications });
  } catch (error) {
    console.error("Error fetching applications:", error);

    return NextResponse.json(
      { message: "An error occurred while fetching applications" },
      { status: 500 }
    );
  }
}
