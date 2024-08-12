import { connectDB } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connectDB();

export async function POST(request: NextRequest, response: NextResponse) {
  const userID = await getDataFromToken(request);
  const user = await User.findById(userID).select("-password");
  if (!user) {
    return NextResponse.json({ message: "Unauthorized", status: 401 });
  }
  return NextResponse.json({
    message: "Fetch User data",
    data: user,
  });
}
