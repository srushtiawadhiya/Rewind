import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LockRewind = () => {

  const navigate = useNavigate();
  const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const handleUnlock = async () => {
  try {
    setError("");

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/verify-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      setError(data.message || "Incorrect password.");
      return;
    }

    navigate("/YearSelection");

  } catch (error) {
    console.error("Unlock Rewind Error:", error);
    setError("Unable to connect to server.");
  } finally {
    setLoading(false);
  }
};

  
  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex justify-center">

      <div className="relative flex min-h-screen w-full max-w-[390px] flex-col items-center px-5">

        {/* Header */}
        <div className="pt-10 text-center">


          <p className="mt-16 text-[20px] tracking-wide">
            REWIND
          </p>

        </div>

        {/* Lock */}
        <div className="mt-20 flex flex-col items-center">

          <div className="
            flex
            h-[70px]
            w-[70px]
            items-center
            justify-center
            rounded-full
            border
            border-[#333333]
            bg-[#111111]
            shadow-[0_0_30px_rgba(215,25,32,0.18)]
          ">
            <span className="text-[27px]">
              🔒
            </span>
          </div>

          <h1 className="mt-10 text-[18px] font-semibold">
            REWIND is Locked
          </h1>

          <p className="mt-2 text-[13px] text-[#666666]">
            Enter your password to unlock
          </p>

        </div>

        {/* Password */}
        <div className="absolute bottom-34 left-5 right-5">

          <input
            type="password"
            placeholder="Enter your password"
             value={password}
  onChange={(e) => setPassword(e.target.value)}
            className="
              h-[42px]
              w-full
              rounded-[7px]
              border border-[#222222]
              bg-[#111111]
              px-3
              text-[15px]
              outline-none
              placeholder:text-[#444444]
              focus:border-[#d71920]
            "
          />

          <button
          onClick={handleUnlock}
  disabled={loading}
           className="
            mt-3
            h-[44px]
            w-full
            rounded-full
            bg-[#d71920]
            text-[14px]
            font-semibold
          ">
           {loading ? "UNLOCKING..." : "UNLOCK REWIND"}
          </button>
          {error && (
  <p className="mt-2 text-center text-[11px] text-[#d71920]">
    {error}
  </p>
)}

          <p
  onClick={() => navigate("/ForgotPassword")}
  className="mt-4 text-center text-[13px] text-[#777777] cursor-pointer"
>
  Forgot password?
</p>

        </div>

      </div>
    </div>
  )
}

export default LockRewind