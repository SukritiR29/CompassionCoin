import { connectMongoDB } from "@/lib/mongodb";
import User from "@/app/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(req) {
  try {
    await connectMongoDB();

    const currUser = await User.find(
      {},
      { name: 1, email: 1, appliedOffers: 1 }
    );

    return NextResponse.json({
      currUser,
      success: true,
    });
  } catch (error) {
    console.log("Error fetching user:", error);

    return NextResponse.json(
      { message: "An error occurred while fetching user" },
      { status: 500 }
    );
  }
}
export async function POST(req) {
  try {
    const { name, email, password, role, appliedOffers } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      appliedOffers: [],
    });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user" },
      { status: 500 }
    );
  }
}
