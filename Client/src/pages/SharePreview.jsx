import React from 'react'
import { assets } from '../assets/assets'

const SharePreview = () => {
  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex justify-center">

      <div className="relative min-h-screen w-full max-w-[390px] px-5 sm:max-w-[600px] lg:max-w-[900px]">

        {/* Header */}
        <div className="flex items-center justify-between pt-10">

          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#151515]">
            ←
          </button>

          <h1 className="text-[12px] font-semibold tracking-wide">
            SHARE PREVIEW
          </h1>

          <div className="w-8" />

        </div>

        {/* Image */}
        <div className="mt-8 overflow-hidden rounded-[8px]">

          <img
            src={assets.heroImage1}
            alt=""
            className="h-[190px] w-full object-cover sm:h-[250px] lg:h-[300px]"
          />

        </div>

        {/* Information */}
        <div className="mt-5">

          <div className="flex items-center gap-2">

            <span className="rounded-full bg-[#d71920] px-2 py-1 text-[8px]">
              2019
            </span>

            <span className="text-[9px] text-[#777777]">
              October 24
            </span>

          </div>

          <h2 className="mt-3 text-[18px] font-semibold">
            A Night in Trastevere
          </h2>

          <p className="mt-2 text-[10px] leading-relaxed text-[#777777]">
            A beautiful memory from one of those nights
            you never want to forget.
          </p>

        </div>

        {/* Share destination */}
        <div className="mt-6 rounded-[8px] bg-[#111111] px-4 py-3">

          <p className="text-[9px] text-[#777777]">
            Sharing to Instagram & WhatsApp
          </p>

          <div className="mt-3 flex items-center justify-between">

            <span className="text-[11px]">
              Social sharing
            </span>

            <div className="flex gap-2">
              <span className="h-5 w-5 rounded-full bg-[#222222]" />
              <span className="h-5 w-5 rounded-full bg-[#222222]" />
            </div>

          </div>

        </div>

        {/* Buttons */}
        <div className="absolute bottom-10 left-5 right-5 space-y-3">

          <button className="
            h-[44px]
            w-full
            rounded-full
            bg-[#d71920]
            text-[12px]
            font-semibold
          ">
            Share Memory
          </button>

          <button className="
            h-[40px]
            w-full
            rounded-full
            bg-[#151515]
            text-[13px]
            text-[#777777]
          ">
            Edit Selection
          </button>

        </div>

      </div>
    </div>
  )
}

export default SharePreview