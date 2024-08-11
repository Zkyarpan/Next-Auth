import nodemailer from "nodemailer";

export const sendMaile = async ({ email, emailType, userId }: any) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your_email",
        pass: "your_password",
      },
    });

    const mailOptions = {
      from: "karkiarpan555@gmail.com",
      to: email,
      subject: emailType === "VERIFY" ? "Email Verification" : "Password Reset",
      html: "<b>Hello world?</b>",
    };
    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
