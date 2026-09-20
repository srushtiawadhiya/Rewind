import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate, useLocation } from 'react-router-dom'
import BottomNavigation from '../components/BottomNavigation';
import Backtick from '../components/Backtick';
// import Share from '../components/Share';

const YearDetails = () => {

  const navigate = useNavigate();

    const location = useLocation();

  const year = location.state?.year;
  const [yearData, setYearData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [memories, setMemories] = useState([]);
const [activeFilter, setActiveFilter] = useState("All");

useEffect(() => {
  const fetchYear = async () => {
    try {
      if (!year?._id) {
         setError("Year not found");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/years/${year._id}`,
        {
          credentials: "include",
        }
      );

      const data = await response.json();

     if (!data.success) {
  setError(data.message || "Failed to fetch year");
  return;
}

      setYearData(data.year);

      const memoryResponse = await fetch(
  `${import.meta.env.VITE_API_URL}/api/memories/year/${year._id}`,
  {
    credentials: "include",
  }
);

const memoryData = await memoryResponse.json();

if (!memoryData.success) {
  setError(memoryData.message || "Failed to fetch memories");
  return;
}

setMemories(memoryData.memories);


    } catch (error) {
      console.error("Fetch Year Error:", error);
         setError("Failed to fetch year");

    } finally {
      setLoading(false);
    }
  };

  fetchYear();
}, [year]);

const filteredMemories =
  activeFilter === "All"
    ? memories
    : memories.filter((memory) =>
        memory.media?.some(
          (media) =>
            media.type === activeFilter.toLowerCase().slice(0, -1)
        )
      );

if (loading) {
  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex items-center justify-center">
      Loading...
    </div>
  );
}

if (error) {
  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex items-center justify-center">
      <div className="text-center">
        <p className="text-[#777777]">{error}</p>

        <button
          onClick={() => navigate("/YearSelection")}
          className="mt-4 rounded-full bg-[#d71920] px-5 py-2 text-sm"
        >
          Back to Years
        </button>
      </div>
    </div>
  );
}

  if (!yearData) {
  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex items-center justify-center">
      <div className="text-center">
        <p className="text-[#777777]">Year not found.</p>

        <button
          onClick={() => navigate("/YearSelection")}
          className="mt-4 rounded-full bg-[#d71920] px-5 py-2 text-sm"
        >
          Back to Years
        </button>
      </div>
    </div>
  );
}


  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex justify-center">

      <div
        className="
          relative
          min-h-screen
          w-full
          max-w-[390px]
          px-4
          pb-24
          bg-[radial-gradient(circle_at_50%_25%,rgba(100,0,0,0.30),transparent_48%)]
          sm:px-6
          md:max-w-[520px]
          lg:max-w-[850px]
          lg:px-10
        "
      >

        {/* Header */}
        <div className="flex items-center justify-between pt-8 sm:pt-10">
             <Backtick/>

          <div className="text-center">
            <h1 className="text-[14px] font-semibold tracking-[0.12em] sm:text-[16px]">
                {yearData?.year}
            </h1>

            <h1 className="mt-1 text-[10px] text-[#777777] sm:text-[12px]">
              {memories.length} {memories.length === 1 ? "Memory" : "Memories"}
            </h1>
          </div>

     {/* <Share memory={memory}/> */}

        </div>


        {/* Memory count */}
        <div className="mt-7">

          <h1 className="text-[26px] font-semibold sm:text-[30px]">
  {memories.length} {memories.length === 1 ? "Memory" : "Memories"}
</h1>

          <p className="mt-1 text-[11px] text-[#666666] sm:text-[13px]">
  {memories.reduce(
    (total, memory) =>
      total +
      (memory.media?.filter((media) => media.type === "photo").length || 0),
    0
  )} Photos •{" "}
  {memories.reduce(
    (total, memory) =>
      total +
      (memory.media?.filter((media) => media.type === "video").length || 0),
    0
  )} Videos •{" "}
  {memories.filter((memory) => !memory.media?.length).length} Stories
</p>    

        </div>


        {/* Filter tabs */}
        <div
          className="
            mt-5
            flex
            gap-2
            overflow-x-auto
            pb-1
            scrollbar-none
          "
        >

          {['All', 'Photos', 'Videos', 'Stories'].map((tab) => (
  <button
    key={tab}
    onClick={() => setActiveFilter(tab)}
    className={`
      shrink-0
      rounded-full
      px-4
      py-1.5
      text-[11px]
      sm:text-[12px]
      ${
        activeFilter === tab
          ? 'bg-[#d71920] text-white'
          : 'bg-[#151515] text-[#777777]'
      }
    `}
  >
    {tab}
  </button>
))}

        </div>


        {/* Memories */}
        <div className="mt-7">

          <p className="mb-3 text-[10px] font-semibold tracking-[0.08em] text-[#666666] sm:text-[12px]">
            {memories.length > 0
    ? new Date(memories[0].memoryDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).toUpperCase()
    : ""}
          </p>


          {/* Masonry-style grid */}
          <div className="grid grid-cols-2 gap-3">

            {filteredMemories.map((memory, index) => (
  <div
    key={memory._id}
    onClick={() =>
      navigate("/DayEventDetails", {
        state: {
          memory,
          year: yearData,
        },
      })
    }
    className={`
      relative
      cursor-pointer
      overflow-hidden
      rounded-[9px]
      bg-[#151515]
      ${
        index === 0 || index === 4 || index === 7
          ? "h-[190px]"
          : "h-[145px]"
      }
    `}
  >

    {/* First media of this memory */}
    {memory.media?.[0] && (
      <>
        {memory.media[0].type === "photo" ? (
          <img
            src={`${import.meta.env.VITE_API_URL}${memory.media[0].url}`}
            alt={memory.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <video
            src={`${import.meta.env.VITE_API_URL}${memory.media[0].url}`}
            className="h-full w-full object-cover"
          />
        )}
      </>
    )}

    {/* Dark gradient */}
    <div
      className="
        absolute
        inset-0
        bg-gradient-to-t
        from-black/75
        via-transparent
        to-transparent
        pointer-events-none
      "
    />

    {/* Media count */}
    {memory.media?.length > 1 && (
      <div
        className="
          absolute
          top-2
          right-2
          rounded
          bg-black/70
          px-2
          py-1
          text-[8px]
          text-white
        "
      >
        {memory.media.length} items
      </div>
    )}

    {/* Video indicator */}
    {memory.media?.[0]?.type === "video" && (
      <div
        className="
          absolute
          bottom-2
          right-2
          rounded
          bg-black/70
          px-1.5
          py-1
          text-[7px]
          text-white
        "
      >
        ▶
      </div>
    )}

    {/* Caption */}
    <div className="absolute bottom-2 left-2 right-2">

      <p className="text-[10px] font-medium text-white">
        {memory.title}
      </p>

    </div>

  </div>
))}

          </div>

        </div>


       <BottomNavigation/>

      </div>

    </div>
  )
}


const NavItem = ({ icon, label }) => {
  return (
    <button className="flex flex-col items-center gap-1 text-[#666666]">

      <span className="text-[20px]">
        {icon}
      </span>

      <span className="text-[10px]">
        {label}
      </span>

    </button>
  )
}


export default YearDetails