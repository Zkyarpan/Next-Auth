import { connectDB } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });

    // Clear the cookie by setting it to an empty string and expiring it immediately
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0), // Expire the cookie immediately
      path: "/", // Ensure the cookie is cleared across the whole site
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
