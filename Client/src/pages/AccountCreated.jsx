import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const AccountCreated = () => {

  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex justify-center">

      <div
        className="
          relative
          min-h-screen
          w-full
          max-w-[390px]
          px-5
          sm:px-8
          flex
          flex-col
          items-center
          justify-center
          bg-[radial-gradient(circle_at_50%_35%,rgba(125,0,0,0.55),transparent_45%)]
        "
      >

        {/* Extra red glow */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_50%_38%,rgba(90,0,0,0.45),transparent_55%)]
          "
        />

        {/* Content */}
        <div className="relative z-10 flex w-full flex-col items-center text-center">

          {/* Success Icon */}
          <div
            className="
              flex
              h-[64px]
              w-[64px]
              items-center
              justify-center
              rounded-full
              border
              border-[#252525]
              bg-[#111111]
              shadow-[0_0_35px_rgba(215,25,32,0.45)]
            "
          >
            <span className="text-[28px] text-white">
              ✓
            </span>
          </div>

          {/* Vault configured */}
          <p
            className="
              mt-8
              text-[12px]
              font-semibold
              tracking-[0.08em]
              text-[#777777]
            "
          >
            VAULT CONFIGURED
          </p>

          {/* Heading */}
          <h1
            className="
              mt-5
              text-[27px]
              sm:text-[29px]
              font-semibold
              leading-tight
            "
          >
            Welcome to REWIND
          </h1>

          {/* Description */}
          <p
            className="
              mt-5
              text-[14px]
              text-[#777777]
            "
          >
            Your private memory vault is ready.
          </p>

          <p
            className="
              mt-3
              max-w-[280px]
              text-[12px]
              leading-relaxed
              text-[#555555]
            "
          >
            Start saving the moments you'll never want to forget.
          </p>

          {/* Button */}
          <button onClick={() => navigate("/YearSelection")}
            className="
              mt-28
              h-[46px]
              w-full
              rounded-full
              bg-[#d71920]
              text-[13px]
              font-semibold
              tracking-wide
              shadow-[0_8px_30px_rgba(215,25,32,0.20)]
              transition
              hover:bg-[#ed1c24]
              active:scale-[0.98]
            "
          >
            ENTER MY REWIND
          </button>

        </div>

        {/* Privacy */}
        <div
          className="
            absolute
            bottom-8
            left-1/2
            flex
            -translate-x-1/2
            items-center
            gap-2
            whitespace-nowrap
          "
        >
          <img
            src={assets.lock}
            alt=""
            className="h-[11px] w-[11px] opacity-50"
          />

          <p className="text-[12px] text-[#555555]">
            Your memories are private by default.
          </p>
        </div>

      </div>
    </div>
  )
}

export default AccountCreated