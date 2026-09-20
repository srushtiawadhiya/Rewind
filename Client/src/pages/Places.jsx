import React from 'react'
import { assets } from '../assets/assets'

const Places = () => {
  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex justify-center">

      <div className="
        relative min-h-screen w-full max-w-[390px] px-5
        bg-[radial-gradient(circle_at_50%_18%,rgba(70,0,0,0.3),transparent_45%)]
        sm:max-w-[520px] sm:px-8
        lg:max-w-[700px] lg:px-12
      ">

        {/* Header */}
        <div className="flex items-center justify-between pt-10">

          <button className="
            h-8 w-8 rounded-full
            bg-[#151515]
            text-[#aaaaaa]
          ">
            ←
          </button>

          <h1 className="text-[12px] sm:text-[14px] font-semibold tracking-[0.12em]">
            PLACES
          </h1>

          <button className="text-[#777777]">
            ◉
          </button>

        </div>

        {/* Map */}
        <div className="
          relative mt-8 h-[175px]
          overflow-hidden rounded-[10px]
          bg-[radial-gradient(circle_at_50%_50%,#263344,#111722_55%,#08090b)]
          sm:h-[240px]
          lg:h-[300px]
        ">

          <div className="
            absolute inset-0
            opacity-40
            bg-[radial-gradient(circle,transparent_20%,#050505_75%)]
          " />

          <div className="
            absolute inset-0
            flex items-center justify-center
          ">
            <p className="
              text-[10px] sm:text-[12px]
              tracking-[0.2em]
              text-white
            ">
              EXPLORING WORLD ATLAS
            </p>
          </div>

        </div>

        {/* Your Geography */}
        <p className="
          mt-7
          text-[10px] sm:text-[10px]
          font-semibold tracking-[0.1em]
          text-[#555555]
        ">
          YOUR GEOGRAPHY
        </p>

        {/* Rome */}
        <div className="
          mt-3 flex items-center justify-between
          rounded-[8px]
          bg-[#111111]
          border border-[#1e1e1e]
          p-2
        ">

          <div className="flex items-center gap-3">

            <img
              src={assets.heroImage3}
              alt=""
              className="h-10 w-12 rounded-[5px] object-cover"
            />

            <div>
              <p className="text-[12px] sm:text-[12px]">
                Rome, Italy
              </p>

              <p className="mt-1 text-[10px] text-[#555555]">
                54 Saved Memories
              </p>
            </div>

          </div>

          <span className="
            rounded-full bg-[#251111]
            px-2 py-1
            text-[7px] text-[#d71920]
          ">
            ACTIVE
          </span>

        </div>

        {/* California */}
        <div className="
          mt-2 flex items-center
          rounded-[8px]
          bg-[#111111]
          border border-[#1e1e1e]
          p-2
        ">

          <img
            src={assets.heroImage4}
            alt=""
            className="h-10 w-12 rounded-[5px] object-cover"
          />

          <div className="ml-3">

            <p className="text-[12px] sm:text-[12px]">
              California, USA
            </p>

            <p className="mt-1 text-[10px] text-[#555555]">
              21 Saved Memories
            </p>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Places