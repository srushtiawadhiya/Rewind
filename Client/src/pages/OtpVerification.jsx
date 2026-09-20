import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const OtpVerification = () => {

  const navigate = useNavigate();

   const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  //get otp 
  useEffect(() => {
  const savedEmail = sessionStorage.getItem("rewindEmail");

  if (!savedEmail) {
    navigate("/createaccount");
    return;
  }

  setEmail(savedEmail);
}, [navigate]);


//otp check
const handleOtpChange = (value, index) => {

  if (!/^\d?$/.test(value)) {
    return;
  }

  const newOtp = [...otp];
  newOtp[index] = value;

  setOtp(newOtp);
};


const handleVerify = async () => {

  const enteredOtp = otp.join("");

  if (enteredOtp.length !== 6) {
    alert("Please enter the complete 6-digit OTP");
    return;
  }

  try {

    setLoading(true);

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/verify-otp`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: email,
          otp: enteredOtp,
        }),
      }
    );

    const data = await response.json();

    if (!data.success) {
      alert(data.message);
      return;
    }

    navigate("/CompleteAccount");

  } catch (error) {

    console.error("Verify OTP Error:", error);

    alert("Something went wrong. Please try again.");

  } finally {

    setLoading(false);

  }
};


  return (
    <div className="min-h-screen w-full  bg-[#050505] text-white flex justify-center">

      <div className="relative min-h-screen w-full max-w-[390px] px-5 sm:px-8 
      bg-[radial-gradient(circle_at_50%_42%,rgba(125,0,0,0.55),transparent_42%)]">
  
  <div className=' bg-[radial-gradient(circle,rgba(90,0,0,0.45),transparent_68%)]'> 
        {/* Header */}
        <div className="flex items-center justify-between pt-10 sm:pt-12">

          <button onClick={() => navigate('/createaccount')}

          className="text-lg text-white">

            <img src={assets.backleft} alt="" />

          </button>

          <p className="text-[12px] font-semibold tracking-[0.12em]">
            REWIND
          </p>

          <div className="w-4" />
        </div>

        {/* Heading */}
        <div className="mt-12 text-center">

          <h1 className="text-[25px] font-semibold">
            Verify your email
          </h1>

          <p className="mt-3 text-[11px] text-[#777777]">
            We sent a verification code to
          </p>

          <p className="mt-1 text-[10px] text-white">
            {email}
          </p>

        </div>

        {/* OTP boxes */}
        <div className="mt-12 flex justify-center gap-2">

          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
               value={value}
    onChange={(e) => handleOtpChange(e.target.value, index)}
              className={`
                h-[32px]
                w-[32px]
                rounded-[7px]
                border
                bg-[#111111]
                text-center
                text-[12px]
                text-white
                outline-none
                ${
                  index === 0
                    ? 'border-[#d71920]'
                    : 'border-[#242424]'
                }
              `}
            />
          ))}

        </div>

        {/* Resend */}
        <div className="mt-14 text-center">
          <p className="text-[10px] text-[#777777]">
            Didn't receive the code?
          </p>

          <p className="mt-1 text-[10px] text-[#777777]">
            Resend code in 30s
          </p>
        </div>

        {/* Verify */}
        <button  onClick={handleVerify}
  disabled={loading}
          className="
            absolute
            bottom-20
            left-5
            right-5
            h-[42px]
            rounded-full
            bg-[#d71920]
            text-[12px]
            font-semibold
            shadow-[0_8px_25px_rgba(215,25,32,0.18)]
            hover:bg-[#ed1c24]
            sm:left-8
            sm:right-8
          "
        >
          {loading ? "VERIFYING..." : "VERIFY & CONTINUE"}
        </button>

        {/* Privacy */}
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap">
          <img
            src={assets.lock}
            alt=""
            className="h-[9px] w-[9px] opacity-50"
          />

          <p className="text-[12px] text-[#555555]">
            Your memories are protected.
          </p>
        </div>

       </div>
      </div>
    </div>
  )
}

export default OtpVerification