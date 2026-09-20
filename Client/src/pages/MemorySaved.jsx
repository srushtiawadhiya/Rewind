import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate, useLocation } from 'react-router-dom'

const MemorySaved = () => {

    const navigate = useNavigate();
  const location = useLocation();

  const memory = location.state?.memory;
  const year = location.state?.year;

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
        flex
        flex-col
        items-center
        text-center
        bg-[radial-gradient(circle_at_50%_32%,rgba(125,0,0,0.45),transparent_42%)]
      ">

        {/* Red glow */}
        <div className="
          absolute
          top-[105px]
          h-[45px]
          w-[45px]
          rounded-full
          bg-[#e51b23]
          blur-[14px]
          opacity-80
        " />


        {/* Heading */}
        <h1 className="
          relative
          mt-[150px]
          text-[26px]
          sm:text-[30px]
          font-serif
        ">
          Memory Saved
        </h1>


        <p className="
          mt-3
          text-[11px]
          sm:text-[12px]
          text-[#777777]
        ">
          Your nostalgic fragment is safely locked in time.
        </p>


        {/* Memory Image */}
        <div className="
          mt-9
          overflow-hidden
          rounded-[9px]
          border-[4px]
          border-[#bdbdbd]
          shadow-[0_0_20px_rgba(255,255,255,0.08)]
        ">

       <img
  src={
    memory?.media?.[0]?.url
      ? `${import.meta.env.VITE_API_URL}${memory.media[0].url}`
      : assets.sampleImage3
  }
  alt={memory?.title || "Saved memory"}
  className="
    h-[105px]
    w-[150px]
    sm:h-[120px]
    sm:w-[175px]
    object-cover
  "
/>

        </div>


        {/* Details */}
        <h2 className="
          mt-6
          text-[12px]
          sm:text-[14px]
          font-medium
        ">
          {memory?.title || "Memory"}
        </h2>

        <p className="
          mt-2
          text-[9px]
          sm:text-[10px]
          text-[#666666]
        ">
         {memory?.memoryDate
    ? new Date(memory.memoryDate).toLocaleDateString()
    : "Date not available"}
  {memory?.location ? ` · ${memory.location}` : ""}
        </p>


        {/* Button */}
        <button 
        onClick={() =>
    navigate("/DayEventDetails", {
      state: {
        year,
        memory,
      },
    })
  }
        className="
          absolute
          bottom-12
          left-5
          right-5
          h-[44px]
          rounded-full
          bg-[#d71920]
          text-[12px]
          sm:text-[13px]
          font-semibold
          shadow-[0_8px_30px_rgba(215,25,32,0.22)]
          hover:bg-[#ed1c24]
        ">
          View Memory
        </button>


        {/* Secondary button */}
        <button 
         onClick={() =>
    navigate("/AddMemory", {
      state: {
        year,
      },
    })
  }
        className="
          absolute
          bottom-3
          left-5
          right-5
          h-[36px]
          rounded-full
          bg-transparent
          text-[11px]
          text-[#666666]
        ">
          Add Another Memory
        </button>

      </div>
    </div>
  )
}

export default MemorySaved