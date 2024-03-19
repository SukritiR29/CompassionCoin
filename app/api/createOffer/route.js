import { connectMongoDB } from "@/lib/mongodb";
import CreateOffer from "@/models/createOffer";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import User from "@/models/user";

export async function POST(req) {
  const { offer, firm, discription, worth, adminId } = await req.json();
    
  try {
    await connectMongoDB();

    await CreateOffer.create({ offer, firm, discription, worth, adminId });

    return NextResponse.json({
      msg: ["Message sent successfully"],
      success: true,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let errorList = [];
      for (let e in error.errors) {
        errorList.push(e.message);
      }

      return NextResponse.json({ msg: errorList });
    } else {
      return NextResponse.json(error);
    }
  }
}
