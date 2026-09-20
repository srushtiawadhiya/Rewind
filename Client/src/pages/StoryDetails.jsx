import React from 'react'
import { assets } from '../assets/assets'

const StoryDetails = () => {
  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex justify-center">

      <div
        className="
          relative
          min-h-screen
          w-full
          max-w-[390px]
          overflow-hidden
          bg-[radial-gradient(circle_at_50%_35%,rgba(125,0,0,0.40),transparent_48%)]
          sm:max-w-[520px]
          md:max-w-[700px]
          lg:max-w-[900px]
        "
      >

        {/* Hero */}
        <div className="relative h-[250px] w-full overflow-hidden sm:h-[320px] md:h-[380px] lg:h-[430px]">

          <img
            src={assets.sectionImage1}
            alt=""
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#050505]" />

          {/* Back */}
          <button
            className="
              absolute
              left-5
              top-8
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-black/40
            "
          >
            <img
              src={assets.backleft}
              alt=""
              className="h-4 w-4"
            />
          </button>

          {/* Actions */}
          <div className="absolute right-5 top-8 flex gap-3">

            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40">
              <span>⌯</span>
            </button>

            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40">
              ✎
            </button>

          </div>

        </div>


        {/* Story */}
        <div className="relative -mt-3 px-5 pb-10 sm:px-8 md:px-10 lg:px-12">

          <h1
            className="
              font-serif
              text-[28px]
              leading-tight
              sm:text-[32px]
              md:text-[37px]
              lg:text-[42px]
            "
          >
            Independence Day Trip
          </h1>


          {/* Date */}
          <div className="mt-2 flex items-center gap-2 text-[10px] text-[#777777] sm:text-[12px]">
            <span>▣</span>
            <span>August 15, 2025</span>
            <span>•</span>
            <span>Bhopal, India</span>
          </div>


          {/* Story */}
          <div className="mt-6">

            <p className="text-[13px] leading-[1.8] text-[#aaaaaa] sm:text-[15px] md:text-[16px]">

              The morning started with the sound of temple bells
              echoing through the misty hills. We drove through
              winding roads surrounded by lush greenery, stopping
              at every viewpoint to capture the beauty.

            </p>

            <p className="mt-5 text-[13px] leading-[1.8] text-[#aaaaaa] sm:text-[15px] md:text-[16px]">

              The sunset painted the sky in shades of orange and
              gold — a moment frozen in time. We shared stories,
              laughed until our stomachs hurt, and made promises
              to return.

            </p>

            <p className="mt-5 text-[13px] leading-[1.8] text-[#aaaaaa] sm:text-[15px] md:text-[16px]">

              Some days are meant to be lived slowly, and this
              was one of them.

            </p>

          </div>


          {/* Attached media */}
          <div className="mt-8">

            <p className="mb-3 text-[9px] tracking-wider text-[#666666]">
              ATTACHED MEDIA
            </p>

            <div className="flex gap-2 overflow-hidden">

              <img
                src={assets.sampleImage}
                alt=""
                className="h-14 w-14 rounded-lg object-cover"
              />

              <img
                src={assets.sampleImage1}
                alt=""
                className="h-14 w-14 rounded-lg object-cover"
              />

              <img
                src={assets.sampleImage2}
                alt=""
                className="h-14 w-14 rounded-lg object-cover"
              />

              <img
                src={assets.sampleImage3}
                alt=""
                className="h-14 w-14 rounded-lg object-cover"
              />

            </div>

          </div>


          {/* Bottom actions */}
          <div
            className="
              mt-7
              grid
              grid-cols-3
              border-t
              border-[#1d1d1d]
              pt-5
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
                          <span className="text-lg"><img src={assets.edit} alt=""/></span>
                          <span className="text-[9px] text-[#777777]">EDIT</span>
                        </button>

          </div>

        </div>

      </div>

    </div>
  )
}

export default StoryDetails