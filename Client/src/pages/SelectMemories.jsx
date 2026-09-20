import React from 'react'
import { assets } from '../assets/assets'

const SelectMemories = () => {
  const memories = [
    assets.heroImage1,
    assets.heroImage2,
    assets.heroImage3,
    assets.heroImage4,
    assets.heroImage5,
  ]

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex justify-center">

      <div className="relative min-h-screen w-full max-w-[390px] px-4 sm:max-w-[600px] lg:max-w-[900px]">

        {/* Header */}
        <div className="flex items-center justify-between pt-10">

          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#151515] text-white">
            ←
          </button>

          <div className="flex items-center gap-2">
            <h1 className="text-[13px] font-semibold">
              SELECT MEMORIES
            </h1>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d71920] px-1 text-[9px]">
              3
            </span>
          </div>

          <button className="text-[10px] text-[#d71920]">
            Select All
          </button>

        </div>

        {/* Memory Grid */}
        <div className="mt-8 grid grid-cols-3 gap-2">

          {memories.map((image, index) => (
            <div
              key={index}
              className={`
                relative aspect-square overflow-hidden rounded-[8px]
                border
                ${index < 3
                  ? 'border-[#d71920]'
                  : 'border-[#222222]'
                }
              `}
            >

              <img
                src={image}
                alt=""
                className="h-full w-full object-cover"
              />

              {index < 3 && (
                <div className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#d71920] text-[10px]">
                  ✓
                </div>
              )}

            </div>
          ))}

          <div className="aspect-square rounded-[8px] border border-[#222222] bg-[#111111]" />

        </div>

        {/* Continue */}
        <div className="absolute bottom-10 left-4 right-4">

          <button
            className="
              h-[44px]
              w-full
              rounded-full
              bg-[#d71920]
              text-[12px]
              font-semibold
              shadow-[0_8px_25px_rgba(215,25,32,0.20)]
              transition
              hover:bg-[#ed1c24]
            "
          >
            Continue (3 Selected)
          </button>

        </div>

      </div>
    </div>
  )
}

export default SelectMemories