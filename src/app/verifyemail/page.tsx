"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const EmailVerificationPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<
    "verifying" | "success" | "error"
  >("verifying");

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");
      if (!token) {
        setVerificationStatus("error");
        toast.error("Verification token is missing");
        return;
      }

      try {
        const response = await fetch("/api/users/verifyemail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.ok) {
          setVerificationStatus("success");
          toast.success("Email verified successfully");
          setTimeout(() => router.push("/login"), 3000);
        } else {
          setVerificationStatus("error");
          toast.error(data.error || "Verification failed");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setVerificationStatus("error");
        toast.error("An error occurred during verification");
      }
    };

    verifyEmail();
  }, [searchParams.get("token"), router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Email Verification
          </h2>
          <div className="mt-2 text-center text-sm text-gray-600">
            {verificationStatus === "verifying" && "Verifying your email..."}
            {verificationStatus === "success" &&
              "Your email has been successfully verified!"}
            {verificationStatus === "error" &&
              "There was an error verifying your email."}
          </div>
        </div>
        {verificationStatus === "verifying" && (
          <div className="flex justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerificationPage;
