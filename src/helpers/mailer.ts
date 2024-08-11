import Users from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    let htmlContent = "";

    if (emailType === "VERIFY") {
      await Users.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hour
      });

      htmlContent = `
        <h1>Email Verification</h1>
        <p>Thank you for registering with our service. Please verify your email address by clicking the link below:</p>
        <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}&id=${userId}">Verify Email</a>
        <p>This link will expire in 1 hour.</p>
      `;
    } else if (emailType === "RESET") {
      await Users.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour
      });

      htmlContent = `
        <h1>Password Reset</h1>
        <p>We received a request to reset your password. Please click the link below to set a new password:</p>
        <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}&id=${userId}">Reset Password</a>
        <p>This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.</p>
      `;
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "e1e459f39a7b2d",
        pass: "e293a2f28458e0",
      },
    });

    const mailOptions = {
      from: "karkiarpan555@gmail.com",
      to: email,
      subject: emailType === "VERIFY" ? "Email Verification" : "Password Reset",
      html: htmlContent,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
