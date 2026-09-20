import React from 'react'
import { assets } from '../assets/assets'

const PublicMemory = () => {
  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex justify-center">

      <div className="
        min-h-screen
        w-full
        max-w-[390px]
        px-5
        sm:max-w-[600px]
        lg:max-w-[900px]
      ">

        {/* Header */}
        <div className="flex items-center justify-between pt-8">

          <p className="text-[10px] font-semibold tracking-[0.15em]">
            REWIND
          </p>

          <button className="
            rounded-full
            border border-[#333333]
            px-3 py-1
            text-[8px]
            text-[#777777]
          ">
            View Archive
          </button>

        </div>

        {/* Hero */}
        <div className="mt-6 overflow-hidden rounded-[8px]">

          <img
            src={assets.heroImage2}
            alt=""
            className="
              h-[220px]
              w-full
              object-cover
              sm:h-[300px]
              lg:h-[400px]
            "
          />

        </div>

        {/* Date */}
        <div className="mt-5 flex items-center gap-2">

          <span className="h-2 w-2 rounded-full bg-[#d71920]" />

          <span className="text-[10px]">
            2019
          </span>

          <span className="text-[9px] text-[#666666]">
            October 24
          </span>

        </div>

        {/* Title */}
        <h1 className="
          mt-5
          text-[25px]
          font-semibold
          sm:text-[30px]
        ">
          Quiet Night, Streaming Stones
        </h1>

        {/* Description */}
        <p className="
          mt-4
          text-[11px]
          leading-[1.8]
          text-[#777777]
        ">
          The rain began falling as we crossed the bridge.
          Rather than run, we slowed and enjoyed the quiet
          streets. Some memories are meant to be lived
          slowly.
        </p>

        {/* Media */}
        <p className="mt-7 text-[8px] uppercase text-[#555555]">
          Fragment Media
        </p>

        <div className="mt-3 flex gap-2">

          {[assets.heroImage3, assets.heroImage4, assets.heroImage5].map(
            (image, index) => (
              <img
                key={index}
                src={image}
                alt=""
                className="h-[55px] w-[70px] rounded-[6px] object-cover"
              />
            )
          )}

        </div>

        {/* Actions */}
        <div className="mt-7 flex gap-2">

          <button className="
            h-[38px]
            flex-1
            rounded-[7px]
            bg-[#151515]
            text-[10px]
          ">
            🔗 Copy Link
          </button>

          <button className="
            h-[38px]
            flex-1
            rounded-[7px]
            bg-[#d71920]
            text-[10px]
            font-semibold
          ">
            ↓ Download
          </button>

        </div>

        <p className="mt-4 text-center text-[8px] text-[#444444]">
          Only publicly shared memories are visible.
        </p>

      </div>
    </div>
  )
}

export default PublicMemory