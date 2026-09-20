import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Backtick from "../components/Backtick";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleResetPassword = async () => {
    try {
      setError("");

      if (!password || !confirmPassword) {
        setError("Please enter both password fields.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/reset-password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Failed to reset password.");
        return;
      }

      alert("Password reset successfully.");

      navigate("/");
    } catch (error) {
      console.error("Reset Password Error:", error);
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
            Reset Password
          </h1>

          <p className="mt-2 text-[13px] text-[#777777]">
            Create a new password for your Rewind account.
          </p>

          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-8 w-full rounded-[7px] bg-[#111111] px-4 py-3 text-sm text-white outline-none"
          />

          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-4 w-full rounded-[7px] bg-[#111111] px-4 py-3 text-sm text-white outline-none"
          />

          <button
            type="button"
            onClick={handleResetPassword}
            disabled={loading}
            className="mt-5 w-full rounded-[7px] bg-[#d71920] py-3 text-sm font-medium"
          >
            {loading ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;