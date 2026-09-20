import React from 'react'
import { assets } from '../assets/assets'

const MemoryReel = () => {
  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex justify-center">

      <div className="
        relative min-h-screen w-full max-w-[390px]
        overflow-hidden
        sm:max-w-[520px]
        lg:max-w-[700px]
      ">

        {/* Hero image */}
        <img
          src={assets.heroImage5}
          alt=""
          className="
            absolute inset-0
            h-full w-full
            object-cover
          "
        />

        {/* Dark overlay */}
        <div className="
          absolute inset-0
          bg-gradient-to-b
          from-black/20
          via-transparent
          to-black
        " />

        {/* Header */}
        <div className="
          relative z-10
          flex items-center justify-between
          px-5 pt-10
          sm:px-8
        ">

          <button className="
            h-8 w-8 rounded-full
            bg-black/40
            text-white
          ">
            ←
          </button>

          <h1 className="
            text-[10px] sm:text-[13px]
            font-semibold tracking-[0.12em]
          ">
            MEMORY REEL
          </h1>

          <button className="
            text-[14px] text-white
          ">
            ⋮
          </button>

        </div>

        {/* Right Controls */}
        <div className="
          absolute right-4 top-[42%]
          z-10 flex flex-col gap-4
        ">

          <button className="text-white text-xl">
            ♡
          </button>

          <button className="text-white text-xl">
            ↗
          </button>

          <button className="text-white text-xl">
            ↓
          </button>

        </div>

        {/* Bottom content */}
        <div className="
          absolute bottom-8 left-0 right-0
          z-10 px-5
          sm:px-8
        ">

          <p className="
            text-[8px] sm:text-[10px]
            text-[#cccccc]
          ">
            2019 · October 24
          </p>

          <h2 className="
            mt-2
            text-[18px] sm:text-[25px]
            font-medium
          ">
            A Night in Trastevere
          </h2>

          <p className="
            mt-2 max-w-[300px]
            text-[9px] sm:text-[12px]
            leading-relaxed text-[#bbbbbb]
          ">
            Standing under the heavy downpour of Trastevere,
            completely lost but never feeling more present.
          </p>

        </div>

      </div>
    </div>
  )
}

export default MemoryReel