import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'


const Welcome = () => {

  const navigate = useNavigate();

  
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white">

      {/* Red background glow */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_50%_42%,rgba(125,0,0,0.55),transparent_42%)]
        "
      />

      {/* Bottom red glow */}
      <div
        className="
          pointer-events-none
          absolute
          -bottom-32
          left-1/2
          h-[420px]
          w-[420px]
          -translate-x-1/2
          rounded-full
          bg-[radial-gradient(circle,rgba(90,0,0,0.45),transparent_68%)]
          blur-3xl
          sm:h-[520px]
          sm:w-[520px]
        "
      />

      {/* Main content */}
      <main
        className="
          relative
          z-10
          flex
          min-h-screen
          flex-col
          items-center
          justify-center
          px-6
          text-center
          sm:px-8
          lg:px-10
        "
      >

        {/* REWIND */}
        <h1
          className="
            text-[30px]
            font-bold
            tracking-[0.08em]
            sm:text-[36px]
            md:text-[40px]
            lg:text-[44px]
          "
        >
          REWIND
        </h1>

        {/* Tagline */}
        <p
          className="
            mt-2
            text-[9px]
            font-normal
            tracking-[0.02em]
            text-[#777777]
            sm:mt-3
            sm:text-[11px]
            md:text-xs
          "
        >
          Your life. Your memories. Your story.
        </p>

        {/* Enter button */}
        <button onClick={()=>navigate('/login')}
          className="
            mt-[54px]
            h-[40px]
            w-[198px]
            rounded-full
            bg-[#e50914]
            text-[10px]
            font-semibold
            tracking-[0.04em]
            text-white
            shadow-[0_8px_30px_rgba(229,9,20,0.22)]
            transition-all
            duration-200
            hover:bg-[#f20d18]
            hover:shadow-[0_8px_35px_rgba(229,9,20,0.35)]
            active:scale-95

            sm:mt-[60px]
            sm:h-[44px]
            sm:w-[220px]
            sm:text-[11px]

            md:mt-[64px]
            md:h-[46px]
            md:w-[230px]
          "
        >
          ENTER REWIND
        </button>

{/* Private memory vault */}
<div
  className="
    absolute
    bottom-8
    flex
    flex-row
    items-center
    justify-center
    gap-2
    text-[#666666]
    sm:bottom-10
    md:bottom-12
  "
>
  <img
    src={assets.lock}
    alt=""
    className="
      h-[11px]
      w-[11px]
      opacity-80
      sm:h-[12px]
      sm:w-[12px]
    "
  />

  <p
    className="
      text-[8px]
      font-normal
      tracking-[0.02em]
      text-[#666666]
      sm:text-[9px]
      md:text-[10px]
    "
  >
    Your private memory vault.
  </p>
</div>

      </main>

    </div>
  )
}

export default Welcome