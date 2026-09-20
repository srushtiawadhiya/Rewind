import React from 'react'
import { assets } from '../assets/assets'

const MemoryDetails = () => {
  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex justify-center">

      <div
        className="
          relative
          min-h-screen
          w-full
          max-w-[390px]
          overflow-hidden
          bg-[radial-gradient(circle_at_50%_28%,rgba(125,0,0,0.42),transparent_45%)]
          sm:max-w-[520px]
          md:max-w-[700px]
          lg:max-w-[900px]
        "
      >

        {/* Main content */}
        <div className="relative min-h-screen">

          {/* Hero image */}
          <div className="relative h-[300px] w-full overflow-hidden sm:h-[360px] md:h-[420px] lg:h-[470px]">

            <img
              src={assets.sectionImage}
              alt="Independence Day Trip"
              className="h-full w-full object-cover"
            />

            {/* Dark gradient */}
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-b
                from-black/10
                via-transparent
                to-[#050505]
              "
            />

            {/* Top controls */}
            <div className="absolute left-5 right-5 top-8 flex items-center justify-between">

              <button
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-black/30
                  backdrop-blur-sm
                "
              >
                <img
                  src={assets.backleft}
                  alt=""
                  className="h-4 w-4"
                />
              </button>

              <div className="flex gap-3">

                <button
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#d71920]
                    bg-black/20
                  "
                >
                  <img
                    src={assets.heart}
                    alt=""
                    className="h-4 w-4"
                  />
                </button>

                <button
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-black/30
                  "
                >
                  <span className="text-lg leading-none">•••</span>
                </button>

              </div>
            </div>

            {/* Play button */}
            <button
              className="
                absolute
                left-1/2
                top-1/2
                flex
                h-12
                w-12
                -translate-x-1/2
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-white/40
                bg-black/40
                backdrop-blur-sm
              "
            >
              <span className="ml-1 text-lg">▶</span>
            </button>

            {/* Duration */}
            <div
              className="
                absolute
                bottom-5
                right-4
                rounded
                bg-black/70
                px-2
                py-1
                text-[10px]
                text-white
              "
            >
              2:34
            </div>

          </div>


          {/* Details */}
          <div className="relative -mt-3 px-5 sm:px-8 md:px-10 lg:px-12">

            <h1
              className="
                font-serif
                text-[27px]
                leading-tight
                sm:text-[31px]
                md:text-[36px]
                lg:text-[40px]
              "
            >
              Independence Day Trip
            </h1>

            <p
              className="
                mt-3
                max-w-[650px]
                text-[12px]
                leading-relaxed
                text-[#777777]
                sm:text-[14px]
                md:text-[15px]
              "
            >
              One of those days I'll always remember. A beautiful
              day with unforgettable moments.
            </p>


            {/* Metadata */}
            <div className="mt-5 flex flex-wrap gap-2">

              <span className="rounded-full bg-[#151515] px-3 py-2 text-[10px] text-[#999999]">
                📅 August 15, 2025
              </span>

              <span className="rounded-full bg-[#151515] px-3 py-2 text-[10px] text-[#999999]">
                ◷ 10:30 AM
              </span>

              <span className="rounded-full bg-[#151515] px-3 py-2 text-[10px] text-[#999999]">
                📍 Bhopal, India
              </span>

            </div>


            {/* Action buttons */}
            <div
              className="
                mt-6
                grid
                grid-cols-4
                border-y
                border-[#1d1d1d]
                py-4
              "
            >

              <button className="flex flex-col items-center gap-1">
                <span className=""><img src={assets.heart} alt="" /></span>
                <span className="text-[9px] text-[#777777]">LOVED</span>
              </button>

              <button className="flex flex-col items-center gap-1">
                <span className="text-lg"><img src={assets.send} alt="" /></span>
                <span className="text-[9px] text-[#777777]">SHARE</span>
              </button>

              <button className="flex flex-col items-center gap-1">
                <span className="text-lg"><img src={assets.download} alt=""/></span>
                <span className="text-[9px] text-[#777777]">SAVE</span>
              </button>

              <button className="flex flex-col items-center gap-1">
                <span className="text-lg"><img src={assets.edit} alt=""/></span>
                <span className="text-[9px] text-[#777777]">EDIT</span>
              </button>

            </div>


            {/* Privacy */}
            <div className="flex items-center justify-center gap-2 py-5">

              <img
                src={assets.lock}
                alt=""
                className="h-3 w-3 opacity-50"
              />

              <p className="text-[12px] text-[#555555]">
                Private memory
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default MemoryDetails