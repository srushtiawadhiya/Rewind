import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import Backtick from '../components/Backtick'
import { useNavigate } from 'react-router-dom'


const Timeline = () => {

 const navigate = useNavigate();
    const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 
    useEffect(() => {

    const fetchMemories = async () => {
      try {

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/memories/timeline`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        console.log("Timeline Response:", data);

        if (!response.ok) {
          setError(data.message || "Failed to fetch memories.");
          return;
        }

        setMemories(data.memories);

      } catch (error) {

        console.error("Timeline Error:", error);
        setError("Failed to fetch memories.");

      } finally {

        setLoading(false);

      }
    };

    fetchMemories();

  }, []);

  const groupedMemories = memories.reduce((groups, memory) => {
  const year = new Date(memory.memoryDate).getFullYear();

  if (!groups[year]) {
    groups[year] = [];
  }

  groups[year].push(memory);

  return groups;
}, {});

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex justify-center">

      <div className="relative min-h-screen w-full max-w-[390px] px-5
        bg-[radial-gradient(circle_at_50%_20%,rgba(90,0,0,0.25),transparent_45%)]
        sm:max-w-[520px] sm:px-8 lg:max-w-[700px] lg:px-12">

        {/* Header */}
        <div className="flex items-center justify-between pt-10 sm:pt-12">
                <Backtick/>
                <h1 className="text-[12px] mx-55 sm:text-[14px] font-semibold tracking-[0.12em]">
              TIMELINE
          </h1>
          <div />

          <button 
            onClick={() => navigate("/YearSelection")}
          className="
            flex h-7 w-7 items-center justify-center
            rounded-full bg-[#151515]
            text-[#999999]
            text-[16px]
          ">
            <img src={assets.Plus} alt="" />

          </button>

        </div>

       {/* Timeline */}
<div className="mt-10 sm:mt-12">

  {loading && (
    <p className="text-center text-[11px] text-[#666666]">
      Loading timeline...
    </p>
  )}

  {error && !loading && (
    <p className="text-center text-[11px] text-[#d71920]">
      {error}
    </p>
  )}

  {!loading && !error && memories.length === 0 && (
    <p className="text-center text-[11px] text-[#666666]">
      No memories yet.
    </p>
  )}

 {!loading &&
  !error &&
  Object.entries(groupedMemories).map(([year, yearMemories]) => (
    <div
      key={year}
      className="mb-10 sm:mb-14"
    >

      {/* Year */}
      <h2 className="text-[17px] font-medium sm:text-[20px]">
        {year}
      </h2>

      {yearMemories.map((memory) => (

        <div
          key={memory._id}
          className="mt-6"
        >

          {/* Date */}
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#d71920]" />

            <span className="text-[8px] font-semibold text-[#d71920] sm:text-[10px]">
              {new Date(memory.memoryDate)
                .toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                })
                .toUpperCase()}
            </span>
          </div>

          {/* Memory Card */}
          <div
            className="
              mt-4
              cursor-pointer
              overflow-hidden
              rounded-[9px]
              border
              border-[#1d1d1d]
              bg-[#101010]
            "
            onClick={() => {
              navigate("/DayEventDetails", {
                state: {
                  memory: memory,
                   year: memory.yearId,
                },
              });
            }}
          >

            {/* Media */}
            {memory.media?.[0] && (
              memory.media[0].type === "photo" ? (
                <img
                  src={`${import.meta.env.VITE_API_URL}${memory.media[0].url}`}
                  alt={memory.title}
                  className="
                    h-[135px]
                    w-full
                    object-cover
                    sm:h-[190px]
                    lg:h-[220px]
                  "
                />
              ) : (
                <video
                  src={`${import.meta.env.VITE_API_URL}${memory.media[0].url}`}
                  className="
                    h-[135px]
                    w-full
                    object-cover
                    sm:h-[190px]
                    lg:h-[220px]
                  "
                />
              )
            )}

            {/* Information */}
            <div className="p-3 sm:p-5">

              <h3 className="text-[13px] font-medium sm:text-[17px]">
                {memory.title}
              </h3>

              <p className="mt-2 text-[10px] leading-relaxed text-[#666666] sm:text-[11px]">
                {memory.description || "No story added."}
              </p>

              <div className="mt-3 text-[10px] text-[#555555]">
                {memory.location || "Location not available"}
              </div>

            </div>

          </div>

        </div>

      ))}

    </div>
  ))}

</div>

        {/* Bottom safe area */}
        <div className="h-20" />

      </div>
    </div>
  )
}

export default Timeline