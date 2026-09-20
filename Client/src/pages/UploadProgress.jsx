import React from 'react'

const UploadProgress = () => {
  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex justify-center">

      <div className="
        relative
        min-h-screen
        w-full
        max-w-[390px]
        px-5
        sm:max-w-[430px]
        sm:px-7
        md:max-w-[480px]
        bg-[radial-gradient(circle_at_50%_42%,rgba(100,0,0,0.30),transparent_45%)]
        flex
        flex-col
        items-center
      ">

        {/* Images */}
        <div className="mt-16 flex gap-2">

          <div className="h-[42px] w-[48px] rounded-[7px] bg-[#182529]" />
          <div className="h-[42px] w-[48px] rounded-[7px] bg-[#38241c]" />
          <div className="h-[42px] w-[48px] rounded-[7px] bg-[#153035]" />
          <div className="h-[42px] w-[48px] rounded-[7px] bg-[#75624d]" />

        </div>


        {/* Percentage */}
        <div className="mt-16 text-center">

          <h1 className="
            text-[58px]
            sm:text-[64px]
            md:text-[70px]
            font-light
            leading-none
          ">
            84%
          </h1>

          <p className="
            mt-5
            text-[9px]
            sm:text-[10px]
            tracking-[0.3em]
            font-bold
            text-[#d71920]
          ">
            PRESERVING EMOTIONS
          </p>

        </div>


        {/* Progress */}
        <div className="mt-9 w-full">

          <div className="h-[3px] w-full bg-[#242424]">
            <div className="h-full w-[84%] bg-[#d71920]" />
          </div>

          <div className="mt-4 flex justify-between text-[10px]">

            <span className="text-[#666666]">
              Uploading your memories...
            </span>

            <span className="text-[#d71920]">
              3 of 4
            </span>

          </div>

        </div>


        {/* Files */}
        <div className="mt-7 w-full space-y-4">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">
              <span className="text-[#d71920]">◉</span>
              <span className="text-[10px] text-[#aaaaaa]">
                IMG_4612.HEIC
              </span>
            </div>

            <span className="text-[9px] text-[#666666]">
              Success
            </span>

          </div>


          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">
              <span className="text-[#d71920]">◉</span>
              <span className="text-[10px] text-[#aaaaaa]">
                IMG_4613.HEIC
              </span>
            </div>

            <span className="text-[9px] text-[#666666]">
              Success
            </span>

          </div>


          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">
              <span className="text-[#d71920]">◉</span>
              <span className="text-[10px] text-[#aaaaaa]">
                MOV_0921.MOV
              </span>
            </div>

            <span className="text-[9px] text-[#d71920]">
              Uploading
            </span>

          </div>

        </div>


        {/* Bottom indicator */}
        <div className="
          absolute
          bottom-5
          h-[4px]
          w-[120px]
          rounded-full
          bg-[#555555]
        " />

      </div>
    </div>
  )
}

export default UploadProgress