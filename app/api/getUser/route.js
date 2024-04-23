// Import necessary dependencies
import { connectMongoDB } from "../../../lib/mongodb";
import User from "../../models/user";
import { NextResponse } from "next/server";

// Define the GET handler for the /api/user endpoint
export async function GET(req) {
  try {
    // Connect to the MongoDB database
    await connectMongoDB();

    // Extract the email from the query parameters
    const url = require("url");

    // Assuming req is your request object
    const parsedUrl = url.parse(req.url, true);
    const email = parsedUrl.query.email;

    console.log(email);
    // Find the user document by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      // Return a 404 Not Found response if user not found
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Return the user document as a JSON response
    return NextResponse.json({ success: true, user });
  } catch (error) {
    // Handle any errors and return a 500 Internal Server Error response
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching user data" },
      { status: 500 }
    );
  }
}
