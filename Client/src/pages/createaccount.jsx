import React, { useState } from 'react';
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const CreateAccount = () => {

  const navigate = useNavigate();

   const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);


  const handleContinue = async () => {

  if (!email) {
    alert("Please enter your email");
    return;
  }

  try {

    setLoading(true);

    const response = await fetch(
     `${import.meta.env.VITE_API_URL}/api/auth/send-otp`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: email,
        }),
      }
    );

    const data = await response.json();

    if (!data.success) {
      alert(data.message);
      return;
    }

    // Save email temporarily so the OTP page knows which email
    // the user is verifying.
    sessionStorage.setItem("rewindEmail", email);

    navigate("/OtpVerification");

  } catch (error) {

    console.error("Send OTP Error:", error);

    alert("Something went wrong. Please try again.");

  } finally {

    setLoading(false);

  }
};


  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex justify-center">

      <div className="relative min-h-screen w-full max-w-[390px] px-5 sm:px-8 bg-[radial-gradient(circle_at_50%_42%,rgba(125,0,0,0.55),transparent_42%)]">

        {/* Top navigation */}
        <div className='bg-[radial-gradient(circle,rgba(90,0,0,0.45),transparent_68%)'>
        <div className="flex items-center justify-between pt-10 sm:pt-12">
          <button className="text-lg text-white">
            <img src={assets.backleft} alt=''/>
          </button>

          <p className="text-[12px] font-semibold tracking-[0.12em] lg:text-[15px]">
            REWIND
          </p>

          <div className="w-4" />
        </div>

        {/* Heading */}
        <div className="mt-10 text-center">
          <h1 className="text-[23px] font-semibold leading-tight sm:text-[25px]">
            Create your memory
            <br />
            vault
          </h1>

          <p className="mt-5 text-[14px] leading-relaxed text-[#777777]">
            Start preserving the moments that matter.
          </p>
        </div>

        {/* Form */}
        <div className="mt-10">

          {/* Email */}
          <div>
            <label className="mb-2 block text-[12px] text-[#8a8a8a]">
              EMAIL ADDRESS
            </label>

            <div className="relative">
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
                  pl-9
                  text-[13px]
                  outline-none
                  placeholder:text-[#484848]
                  focus:border-[#d71920]
                "
              />

              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[5px] text-[#555555]">
                <img src={assets.mail} alt='' className='size-5'/>
              </span>
            </div>
          </div>

          {/* Continue */}
          <button  onClick={handleContinue}
  disabled={loading}
            className="
              mt-5
              h-[42px]
              w-full
              rounded-full
              bg-[#d71920]
              text-[13px]
              font-semibold
              tracking-wide
              shadow-[0_8px_25px_rgba(215,25,32,0.18)]
              hover:bg-[#ed1c24]
            "
          >
             {loading ? "SENDING..." : "CONTINUE"}
          </button>

          <p className="mt-2 text-center text-[13px] text-[#555555]">
            We'll send you a verification code.
          </p>

        </div>

        {/* Privacy */}
        <div className="absolute bottom-14 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap">
          <img
            src={assets.lock}
            alt=""
            className="h-[9px] w-[9px] opacity-50"
          />

          <p className="text-[14px] text-[#555555]">
            Your memories are private by default.
          </p>
        </div>

        {/* Login */}
        <p className="absolute bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[13px] text-[#666666]">
          Already have an account?{' '}
          <button onClick={() => navigate("/login")} className="text-white">
            Log in
          </button>
        </p>
        
        </div>
      </div>
    </div>
  )
}

export default CreateAccount