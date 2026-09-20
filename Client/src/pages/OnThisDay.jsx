import React from 'react'
import { assets } from '../assets/assets'
import Backtick from '../components/Backtick'

const OnThisDay = () => {
  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex justify-center">

      <div className="
        min-h-screen w-full max-w-[390px] px-5
        sm:max-w-[520px] sm:px-8
        lg:max-w-[700px] lg:px-12
      ">

        {/* Header */}
        <div className="flex items-center justify-between pt-10">

          <Backtick/>

          <h1 className="text-[12px] sm:text-[17px] font-semibold tracking-[0.12em]">
            ON THIS DAY
          </h1>

          <div className="w-8" />

        </div>

        {/* Date */}
        <div className="mt-10">

          <h2 className="text-[23px] sm:text-[30px] font-medium">
            August 14
          </h2>

          <p className="mt-2 text-[11px] sm:text-[13px] text-[#666666]">
            Step back into the moments that happened on this day.
          </p>

        </div>

        {/* Main Memory */}
        <div className="
          mt-6 overflow-hidden rounded-[10px]
          border border-[#222]
          bg-[#101010]
        ">

          <div className="relative">

            <img
              src={assets.heroImage5}
              alt=""
              className="
                h-[175px] w-full object-cover
                sm:h-[240px]
                lg:h-[300px]
              "
            />

            <span className="
              absolute left-3 top-3
              rounded-full bg-[#d71920]
              px-2 py-1
              text-[8px] font-semibold
            ">
              2019
            </span>

          </div>

          <div className="p-4">

            <h3 className="text-[15px] sm:text-[18px] font-medium">
              The Last Golden Hour
            </h3>

            <p className="mt-2 text-[11px] sm:text-[14px] text-[#666666]">
              1 Memory from August 14
            </p>

          </div>

        </div>

        {/* Other Years */}
        <p className="
          mt-7 text-[10px] sm:text-[10px]
          font-semibold tracking-[0.12em]
          text-[#555555]
        ">
          OTHER YEARS
        </p>

        <div className="
          mt-3 space-y-2
        ">

          <div className="
            flex items-center gap-3
            rounded-[8px] bg-[#111111]
            border border-[#1d1d1d] p-2
          ">

            <img
              src={assets.heroImage6}
              alt=""
              className="h-10 w-12 rounded object-cover"
            />

            <div>
              <p className="text-[12px] sm:text-[12px]">
                Midnight Neon Cafe
              </p>
              <p className="text-[10px] text-[#555]">
                Remember this moment
              </p>
            </div>

            <span className="ml-auto text-[#777]">
              ›
            </span>

          </div>

          <div className="
            flex items-center gap-3
            rounded-[8px] bg-[#111111]
            border border-[#1d1d1d] p-2
          ">

            <img
              src={assets.heroImage7}
              alt=""
              className="h-10 w-12 rounded object-cover"
            />

            <div>
              <p className="text-[12px] sm:text-[12px]">
                Cold Shore Solitude
              </p>
              <p className="text-[10px] text-[#555]">
                Remember this moment
              </p>
            </div>

            <span className="ml-auto text-[#777]">
              ›
            </span>

          </div>

        </div>

      </div>
    </div>
  )
}

export default OnThisDay