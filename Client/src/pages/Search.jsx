import React from 'react'
import { assets } from '../assets/assets'

const Search = () => {
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
        bg-[radial-gradient(circle_at_50%_20%,rgba(100,0,0,0.25),transparent_45%)]
      ">

        {/* Search box */}
        <div className="
          mt-8
          h-[38px]
          w-full
          rounded-[8px]
          border
          border-[#202020]
          bg-[#111111]
          flex
          items-center
          px-3
          gap-2
        ">

          <span className="text-[#d71920]">
            ⌕
          </span>

          <input
            type="text"
            placeholder="Search nostalgic moments..."
            className="
              flex-1
              bg-transparent
              outline-none
              text-[10px]
              text-white
              placeholder:text-[#555555]
            "
          />

          <span className="text-[#555555]">
            ◇
          </span>

        </div>


        {/* Filters */}
        <div className="mt-4 flex gap-2 overflow-x-auto">

          <button className="
            rounded-full
            bg-[#d71920]
            px-4
            py-2
            text-[9px]
            font-medium
          ">
            All
          </button>

          <button className="
            rounded-full
            bg-[#151515]
            px-4
            py-2
            text-[9px]
            text-[#777777]
          ">
            Photos
          </button>

          <button className="
            rounded-full
            bg-[#151515]
            px-4
            py-2
            text-[9px]
            text-[#777777]
          ">
            Videos
          </button>

          <button className="
            rounded-full
            bg-[#151515]
            px-4
            py-2
            text-[9px]
            text-[#777777]
          ">
            Stories
          </button>

        </div>


        {/* Jump to year */}
        <div className="mt-6">

          <p className="text-[9px] font-semibold text-[#777777] tracking-wider">
            JUMP TO YEAR
          </p>

          <div className="mt-3 flex gap-2 overflow-x-auto">

            {['2024', '2023', '2022', '2019', '2018', '2017'].map((year) => (
              <button
                key={year}
                className="
                  min-w-[50px]
                  rounded-[6px]
                  bg-[#151515]
                  border border-[#202020]
                  py-3
                  text-[9px]
                  text-[#aaaaaa]
                "
              >
                {year}
              </button>
            ))}

          </div>

        </div>


        {/* Recent searches */}
        <div className="mt-6">

          <p className="text-[9px] font-semibold text-[#777777] tracking-wider">
            RECENT SEARCHES
          </p>

          <div className="mt-3 flex gap-2 overflow-x-auto">

            {['Aman Coast', 'Bonfire', 'Rainy day in Paris'].map((item) => (
              <button
                key={item}
                className="
                  whitespace-nowrap
                  rounded-full
                  bg-[#151515]
                  px-3
                  py-2
                  text-[9px]
                  text-[#888888]
                "
              >
                {item} ×
              </button>
            ))}

          </div>

        </div>


        {/* Suggested */}
        <div className="mt-7">

          <p className="text-[9px] font-semibold text-[#777777] tracking-wider">
            SUGGESTED FOR YOU
          </p>


          <div className="
            mt-3
            flex
            items-center
            gap-3
            rounded-[9px]
            bg-[#111111]
            border
            border-[#202020]
            p-3
          ">

            <img
              src={assets.sampleImage4}
              alt=""
              className="h-[46px] w-[52px] rounded-[6px] object-cover"
            />

            <div className="flex-1 text-left">

              <p className="text-[11px] font-medium">
                Sunset Drive
              </p>

              <p className="mt-1 text-[8px] text-[#666666]">
                September 2021 · California
              </p>

            </div>

            <span className="text-[#666666]">
              ›
            </span>

          </div>

        </div>


        {/* Bottom indicator */}
        <div className="
          absolute
          bottom-5
          left-1/2
          -translate-x-1/2
          h-[4px]
          w-[120px]
          rounded-full
          bg-[#555555]
        " />

      </div>
    </div>
  )
}

export default Search