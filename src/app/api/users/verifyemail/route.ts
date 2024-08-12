import { connectDB } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/helpers/mailer";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log("Received token:", token);

    // Find user by token and ensure token is not expired
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    // Mark the user as verified
    user.isVerified = true;

    // Remove the verification token and expiry time from the user's document
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    // Send a success email after verification
    await sendMail({ email: user.email, emailType: "SUCCESS" });

    return NextResponse.json(
      { message: "Email verified successfully", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Verification error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
