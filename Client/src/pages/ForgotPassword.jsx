import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Backtick from "../components/Backtick";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [success, setSuccess] = useState("");

const handleSendOtp = async () => {
  try {
    setError("");
    setSuccess("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    setLoading(true);

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/send-forgot-password-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      setError(data.message || "Failed to send OTP.");
      return;
    }

   navigate("/ForgotPasswordOtp", {
  state: {
    email: email,
  },
});

  } catch (error) {
    console.error("Forgot Password Error:", error);
    setError("Unable to connect to server.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex justify-center">

      <div className="relative min-h-screen w-full max-w-[390px] px-5">

        <Backtick />

        <div className="pt-24">
          <h1 className="text-2xl font-semibold">
            Forgot Password
          </h1>

          <p 
          className="mt-2 text-[13px] text-[#777777]">
            Enter your email address to reset your password.
          </p>

          <input
            type="email"
            placeholder="Enter your email"
              value={email}
  onChange={(e) => setEmail(e.target.value)}
            className="mt-8 w-full rounded-[7px] bg-[#111111] px-4 py-3 text-sm text-white outline-none"
          />

          <button
            type="button"
             onClick={handleSendOtp}
  disabled={loading}
            className="mt-5 w-full rounded-[7px] bg-[#d71920] py-3 text-sm font-medium"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>

          {error && (
  <p className="mt-3 text-center text-[12px] text-red-500">
    {error}
  </p>
)}

{success && (
  <p className="mt-3 text-center text-[12px] text-green-500">
    {success}
  </p>
)}

          <p
            onClick={() => navigate("/")}
            className="mt-5 text-center text-[13px] text-[#777777] cursor-pointer"
          >
            Back to Login
          </p>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;