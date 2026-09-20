import React from 'react'
import { assets } from '../assets/assets'

const ShareSheet = () => {
  return (
    <div className="
      min-h-screen w-full
      bg-[#050505]
      text-white
      flex justify-center
    ">

      <div className="
        relative min-h-screen w-full max-w-[390px]
        px-5
        sm:max-w-[520px] sm:px-8
        lg:max-w-[700px] lg:px-12
      ">

        {/* Header */}
        <div className="
          flex items-center justify-between
          pt-10
        ">

          <div />

          <h1 className="
            text-[10px] sm:text-[13px]
            font-semibold tracking-[0.12em]
          ">
            ARCHIVE ENTRY
          </h1>

          <div />

        </div>

        {/* Memory */}
        <div className="mt-10">

          <img
            src={assets.heroImage1}
            alt=""
            className="
              h-[120px] w-full
              rounded-[8px]
              object-cover
              opacity-70
              sm:h-[180px]
              lg:h-[230px]
            "
          />

          <h2 className="
            mt-4
            text-[14px] sm:text-[19px]
          ">
            A Night in Trastevere
          </h2>

          <p className="
            mt-1
            text-[8px] sm:text-[10px]
            text-[#555555]
          ">
            October 24, 2019 · Rome, Italy
          </p>

        </div>

        {/* Share to */}
        <p className="
          mt-8
          text-[8px] sm:text-[10px]
          font-semibold tracking-[0.12em]
          text-[#666666]
        ">
          SHARE TO
        </p>

        {/* Social icons */}
        <div className="
          mt-4
          grid grid-cols-5
          gap-3
        ">

          {['WhatsApp', 'Instagram', 'Facebook', 'Twitter', 'Telegram'].map(
            (item) => (
              <button
                key={item}
                className="
                  flex flex-col items-center gap-2
                  text-[#777777]
                "
              >
                <span className="
                  flex h-9 w-9 items-center justify-center
                  rounded-full bg-[#151515]
                  text-[11px]
                ">
                  <img src={assets.instagram} alt=""/>
                </span>

                <span className="text-[7px]">
                  {item}
                </span>

              </button>
            )
          )}

        </div>

        {/* Actions */}
        <div className="mt-8 space-y-2">

          <button className="
            flex w-full items-center
            rounded-[8px]
            border border-[#222]
            bg-[#111]
            px-4 py-3
            text-left
            text-[10px] sm:text-[12px]
          ">
            🔗
            <span className="ml-3">
              Copy Secret Link
            </span>
          </button>

          <button className="
            flex w-full items-center
            rounded-[8px]
            border border-[#222]
            bg-[#111]
            px-4 py-3
            text-left
            text-[10px] sm:text-[12px]
          ">
            ↓
            <span className="ml-3">
              Download Archive
            </span>
          </button>

        </div>

        {/* Bottom indicator */}
        <div className="
          absolute bottom-5 left-1/2
          h-1 w-24
          -translate-x-1/2
          rounded-full
          bg-[#555555]
        " />

      </div>
    </div>
  )
}

export default ShareSheet