import { connectMongoDB } from "../../../lib/mongodb";
import User from "../../../models/user";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectMongoDB();

    // Find all users
    const users = await User.find({});

    // Extract applied offers from each user
    const applications = users.reduce((allApplications, user) => {
      // Concatenate the appliedOffer arrays of all users
      return allApplications.concat(user.appliedOffer);
    }, []);

    return NextResponse.json({ success: true, applications });
  } catch (error) {
    console.error("Error fetching applications:", error);

    return NextResponse.json(
      { message: "An error occurred while fetching applications" },
      { status: 500 }
    );
  }
}
