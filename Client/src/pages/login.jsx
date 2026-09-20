import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);
const [otp, setOtp] = useState("");
const [error, setError] = useState("");
const [requiresTwoFactor, setRequiresTwoFactor] = useState(false);

const handleVerifyOtp = async () => {
  try {
    setError("");

    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/verify-login-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
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

    console.log("2FA login successful:", data);

    navigate("/YearSelection");
  } catch (error) {
    console.error("Verify Login OTP Error:", error);
    setError("Unable to verify OTP.");
  } finally {
    setLoading(false);
  }
};

const handleLogin = async () => {
  try {
    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();
    console.log("LOGIN API RESPONSE:", data);

    if (!response.ok) {
      setError(data.message || "Login failed.");
      return;
    }

   if (data.requiresTwoFactor) {
  const otpResponse = await fetch(
    `${import.meta.env.VITE_API_URL}/api/auth/send-login-otp`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
      }),
    }
  );

  const otpData = await otpResponse.json();
  console.log("SEND LOGIN OTP RESPONSE:", otpData);

  if (!otpResponse.ok || !otpData.success) {
    setError(otpData.message || "Failed to send OTP.");
    return;
  }

  setRequiresTwoFactor(true);
  return;
}


    console.log("Login successful:", data);

    navigate("/YearSelection");

  } catch (error) {
    console.error("Login Error:", error);
    setError("Unable to connect to server.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex justify-center">

      <div className="relative min-h-screen w-full max-w-[390px] px-5 sm:px-8 bg-[radial-gradient(circle_at_50%_42%,rgba(125,0,0,0.55),transparent_42%)]">

       <div className='bg-[radial-gradient(circle,rgba(90,0,0,0.45),transparent_68%)]'>
        {/* REWIND */}
        <div className="flex justify-center pt-10 sm:pt-12 ">
          <p className="text-[15px] font-semibold tracking-[0.12em] mt-0.5">
            REWIND
          </p>
        </div>

        {/* Heading */}
        <div className="mt-6 text-center sm:mt-8">
          <h1 className="text-[25px] font-semibold leading-tight">
            Welcome back
          </h1>

          <p className="mt-2 text-[12px] text-[#777777]">
            Unlock your memories.
          </p>
        </div>

        {/* Form */}
        <div className="mt-10">

           {requiresTwoFactor ? (

    /* ==================== 2FA OTP FORM ==================== */
    <div>
      <p className="text-center text-[12px] text-[#777777]">
        Enter the OTP sent to your email.
      </p>

      <input
        type="text"
        value={otp}
onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
        inputMode="numeric"
        maxLength={6}
        placeholder="Enter 6-digit OTP"
        className="
          mt-6
          h-[42px]
          w-full
          rounded-[8px]
          border
          border-[#242424]
          bg-[#111111]
          px-3
          text-center
          text-[14px]
          tracking-[0.3em]
          text-white
          outline-none
          placeholder:text-[#484848]
          focus:border-[#d71920]
        "
      />

      <button
        type="button"
        onClick={handleVerifyOtp}
  disabled={loading}
        className="
          mt-5
          h-[42px]
          w-full
          rounded-full
          bg-[#d71920]
          text-[11px]
          font-semibold
          tracking-wide
        "
      >
       {loading ? "VERIFYING..." : "VERIFY OTP"}
      </button>
    </div>

  ) : (

    /* ==================== EMAIL + PASSWORD FORM ==================== */
    <>


          {/* Email */}
          <div>
            <label className="mb-2 block text-[11px] font-medium text-[#8a8a8a]">
              EMAIL ADDRESS
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
onChange={(e) => setEmail(e.target.value)}
              className="
                h-[42px]
                w-full
                rounded-[8px]
                border
                border-[#242424]
                bg-[#111111]
                px-3
                text-[14px]
                text-white
                outline-none
                placeholder:text-[#484848]
                focus:border-[#d71920]
              "
            />
          </div>

          {/* Password */}
          <div className="mt-5">
            <label className="mb-2 block text-[11px] font-medium text-[#8a8a8a]">
              PASSWORD
            </label>

            <div className="relative">
              <input
                type = {showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
onChange={(e) => setPassword(e.target.value)}
                className="
                  h-[42px]
                  w-full
                  rounded-[8px]
                  border
                  border-[#242424]
                  bg-[#111111]
                  px-3
                  pr-10
                  text-[14px]
                  text-white
                  outline-none
                  placeholder:text-[#484848]
                  focus:border-[#d71920]
                "
              />
              <button
               type ="button" onClick={()=> setShowPassword(!showPassword) }

                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555555]">

               {showPassword ? (
             <img src={assets.eye} alt="Show password" />
               ) : (
               <img src={assets.eyeclose} alt="Hide password" />
                )}  
              
                
              </button>
            </div>
          </div>

          {/* Login button */}
          <button   onClick={handleLogin}
  disabled={loading}
            className="
              mt-5
              h-[42px]
              w-full
              rounded-full
              bg-[#d71920]
              text-[11px]
              font-semibold
              tracking-wide
              shadow-[0_8px_25px_rgba(215,25,32,0.18)]
              transition
              hover:bg-[#ed1c24]
            "
          >
            {loading ? "UNLOCKING..." : "UNLOCK REWIND"}
          </button>

          {error && (
  <p className="mt-3 text-center text-[12px] text-red-500">
    {error}
  </p>
)}

        <p
  onClick={() => navigate("/ForgotPassword")}
  className="mt-4 text-center text-[13px] text-[#777777] cursor-pointer"
>
  Forgot password?
</p>

          {/* OR */}
          <div className="mt-10 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#222222]" />
            <span className="text-[9px] text-[#666666]">
              OR
            </span>
            <div className="h-px flex-1 bg-[#222222]" />
          </div>

          {/* Create account */}
          <div className="mt-10 text-center">
            <button  onClick={()=> navigate("/createaccount")} className="text-[14px] font-medium text-white">
              Create an account
            </button>
          </div>

   </>
  )}

        </div>

        {/* Privacy */}
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap">
          <img
            src={assets.lock}
            alt=""
            className="h-[10px] w-[10px] opacity-50"
          />

          <p className="text-[14px] text-[#555555]">
            Your memories stay private.
          </p>
        </div>
        </div>

      </div>
    </div>
  )
}

export default Login