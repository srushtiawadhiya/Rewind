import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Backtick from "../components/Backtick";

const ForgotPasswordOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerifyOtp = async () => {
    try {
      setError("");

      if (!otp) {
        setError("Please enter the OTP.");
        return;
      }

      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/verify-forgot-password-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Invalid OTP.");
        return;
      }

      navigate("/ResetPassword", {
        state: {
          email,
        },
      });
    } catch (error) {
      console.error("Forgot Password OTP Error:", error);
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
            Verify OTP
          </h1>

          <p className="mt-2 text-[13px] text-[#777777]">
            Enter the OTP sent to your email.
          </p>

          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="mt-8 w-full rounded-[7px] bg-[#111111] px-4 py-3 text-sm text-white outline-none"
          />

          <button
            type="button"
            onClick={handleVerifyOtp}
            disabled={loading}
            className="mt-5 w-full rounded-[7px] bg-[#d71920] py-3 text-sm font-medium"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          {error && (
            <p className="mt-3 text-center text-[12px] text-red-500">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordOtp;