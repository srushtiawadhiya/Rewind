import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import Backtick from '../components/Backtick'
import Share from '../components/Share'
import BottomNavigation from '../components/BottomNavigation'
import Favorite from '../components/Favorite'

const DayEventDetails = () => {

    const location = useLocation();
    const navigate = useNavigate();

  const memory = location.state?.memory;
  const year = location.state?.year;
  const [showFullStory, setShowFullStory] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
const [galleryIndex, setGalleryIndex] = useState(0);
const [touchStartX, setTouchStartX] = useState(null);
const [touchEndX, setTouchEndX] = useState(null);

 //photos 
const photos = memory?.media || [];

const openGallery = (index) => {
  setGalleryIndex(index);
  setIsGalleryOpen(true);
};

const closeGallery = () => {
  setIsGalleryOpen(false);
};

const showPreviousMedia = () => {
  setGalleryIndex((prev) =>
    prev === 0 ? photos.length - 1 : prev - 1
  );
};

const showNextMedia = () => {
  setGalleryIndex((prev) =>
    prev === photos.length - 1 ? 0 : prev + 1
  );
};

  //Delete
  const handleDeleteMemory = async () => {
  if (!memory?._id) {
    alert("Memory not found.");
    return;
  }

  const confirmed = window.confirm(
    "Are you sure you want to delete this memory? This action cannot be undone."
  );

  if (!confirmed) {
    return;
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/memories/${memory._id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      alert(data.message || "Failed to delete memory.");
      return;
    }

    alert("Memory deleted successfully.");

    navigate("/Timeline");
  } catch (error) {
    console.error("Delete Memory Error:", error);
    alert("Something went wrong while deleting the memory.");
  }
};

 const handleSwipe = () => {
  if (touchStartX === null || touchEndX === null) return;

  const distance = touchStartX - touchEndX;

  // Swipe left → next media
  if (distance > 50) {
    showNextMedia();
  }

  // Swipe right → previous media
  if (distance < -50) {
    showPreviousMedia();
  }

  setTouchStartX(null);
  setTouchEndX(null);
};

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
          bg-[radial-gradient(circle_at_50%_25%,rgba(100,0,0,0.32),transparent_48%)]
          sm:px-6
          md:max-w-[520px]
          lg:max-w-[850px]
          lg:px-10
        "
      >

        {/* Header */}
        <div className="flex items-center justify-between pt-8 sm:pt-10">
            <Backtick/>


          <p className="text-[13px] font-semibold tracking-[0.12em] sm:text-[16px]">
            {memory?.memoryDate
    ? new Date(memory.memoryDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).toUpperCase()
    : "MEMORY"}
          </p>


          <Share memory={memory}/>

        </div>


        {/* Event title */}
        <div className="mt-7">

          <div className="flex items-start justify-between gap-4">

            <div>

              <h1
                className="
                  text-[26px]
                  font-semibold
                  leading-tight
                  sm:text-[30px]
                "
              >
                {memory?.title || "Memory"}
              </h1>

              <p className="mt-2 text-[11px] text-[#777777] sm:text-[13px]">
                📍{memory?.location || "Location not available"}
              </p>

            </div>


            <div className="flex items-center gap-3 pt-2">

            <Favorite memory={memory} />

             <button
  onClick={() =>
    navigate("/EditMemory", {
      state: {
        memory,
        year,
      },
    })
  }
  className="text-[22px] text-white"
>
  <img src={assets.edit} alt="Edit memory" />
</button>

<button
  onClick={handleDeleteMemory}
  className="text-[12px] text-[#d71920]"
>
 <img src={assets.trash} alt="delete memory" />
</button>

            </div>

          </div>


          {/* Event information */}
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">

            <span className="text-[10px] text-[#777777] sm:text-[12px]">
             ◷{" "}
  {memory?.memoryDate
    ? new Date(memory.memoryDate).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      })
    : "Time not available"}
            </span>

            <span className="text-[10px] text-[#777777] sm:text-[12px]">
              📷 {photos.length} {photos.length === 1 ? "Memory" : "Memories"}
            </span>

            <span className="text-[10px] text-[#777777] sm:text-[12px]">
             📍{memory?.location || "Location not available"}
            </span>

          </div>

        </div>


        {/* Story preview */}
        <div
          className="
            mt-6
            rounded-[8px]
            border
            border-[#d71920]
            bg-[#111111]
            p-4
          "
        >

          <p className="text-[12px] leading-relaxed text-[#aaaaaa] sm:text-[12px]">
  {memory?.description
    ? showFullStory
      ? memory.description
      : memory.description.length > 180
        ? `${memory.description.slice(0, 180)}...`
        : memory.description
    : "No story added for this memory."}
</p>

{memory?.description && memory.description.length > 180 && (
  <button
    onClick={() => setShowFullStory(!showFullStory)}
    className="
      mt-3
      text-[11px]
      font-semibold
      text-[#d71920]
      sm:text-[10px]
    "
  >
    {showFullStory ? "Read less" : "Read more"}
  </button>
)}

        </div>


        {/* Memories title */}
        <div className="mt-7">

          <div className="flex items-center justify-between">

            <p className="text-[11px] font-semibold tracking-[0.08em] text-[#666666] sm:text-[10px]">
              {memory?.memoryDate
    ? new Date(memory.memoryDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).toUpperCase()
    : "MEMORY"}
            </p>

            <p className="text-[10px] text-[#555555] sm:text-[10px]">
              {photos.length} {photos.length === 1 ? "Memory" : "Memories"}
            </p>

          </div>


          {/* Photo grid */}
          <div className="mt-3 grid grid-cols-2 gap-3">

            {photos.map((photo, index) => (

  <div
    key={index}
    className={`
      relative
      overflow-hidden
      rounded-[8px]
      bg-[#151515]
      ${
        index === 4
          ? 'col-span-2 h-[180px]'
          : 'h-[145px]'
      }
    `}
  >

    {photo.type === "photo" ? (
      <img
        src={`${import.meta.env.VITE_API_URL}${photo.url}`}
        alt={`Memory ${index + 1}`}
        onClick={() => openGallery(index)}
        className="h-full w-full object-cover"
      />
    ) : (
      <video
        src={`${import.meta.env.VITE_API_URL}${photo.url}`}
        className="h-full w-full object-cover"
        controls
      />
    )}

    {/* Gradient */}
    <div
      className="
        absolute
        inset-0
        bg-gradient-to-t
        from-black/50
        via-transparent
        to-transparent
        pointer-events-none
      "
    />

    {/* Video indicator */}
    {photo.type === "video" && (
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
        "
      >
        ▶
      </div>
    )}

  </div>

))}

          </div>

        </div>


        {/* Floating Add Memory
        <button onClick={() => navigate("/")}
          className="
            fixed
            bottom-20
            right-5
            z-10
            rounded-full
            bg-[#d71920]
            px-5
            py-3
            text-[11px]
            font-semibold
            shadow-[0_8px_25px_rgba(215,25,32,0.35)]
            sm:right-8
            sm:text-[10px]
            lg:absolute
            lg:bottom-24
            lg:right-10
          "
        >
          + Add Memory
        </button> */}


        {/* Bottom navigation */}
        <div
          className="
            fixed
            bottom-0
            left-1/2
            z-20
            w-full
            max-w-[390px]
            -translate-x-1/2
            border-t
            border-[#1b1b1b]
            bg-[#0a0a0a]/95
            px-5
            pb-5
            pt-3
            backdrop-blur-md
            md:max-w-[520px]
            lg:max-w-[850px]
            lg:px-10
          "
        >

          <BottomNavigation/>
        </div>

      </div>

      {isGalleryOpen && photos.length > 0 && (
  <div className="fixed inset-0 z-50 bg-black flex items-center justify-center"
   onTouchStart={(e) => {
    setTouchStartX(e.touches[0].clientX);
  }}
  onTouchMove={(e) => {
    setTouchEndX(e.touches[0].clientX);
  }}
  onTouchEnd={handleSwipe}>

    {/* Close button */}
    <button
      onClick={closeGallery}
      className="absolute top-5 right-5 z-50 text-white text-3xl"
    >
      ✕
    </button>

    {/* Previous */}
    {photos.length > 1 && (
      <button
        onClick={showPreviousMedia}
        className="absolute left-4 z-50 text-white text-4xl"
      >
        ‹
      </button>
    )}

    {/* Current media */}
    <div className="w-full h-full flex items-center justify-center px-10">

      {photos[galleryIndex].type === "photo" ? (
        <img
          src={`${import.meta.env.VITE_API_URL}${photos[galleryIndex].url}`}
          alt={`Memory ${galleryIndex + 1}`}
          className="max-h-full max-w-full object-contain"
           onError={(e) => {
    console.log("IMAGE URL:", e.currentTarget.src);
    console.log("PHOTO OBJECT:", photos[galleryIndex]);
  }}
        />
      ) : (
        <video
          src={`${import.meta.env.VITE_API_URL}${photos[galleryIndex].url}`}
          className="max-h-full max-w-full object-contain"
          controls
          autoPlay
        />
      )}

    </div>

    {/* Next */}
    {photos.length > 1 && (
      <button
        onClick={showNextMedia}
        className="absolute right-4 z-50 text-white text-4xl"
      >
        ›
      </button>
    )}

    {/* Counter */}
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white text-sm">
      {galleryIndex + 1} / {photos.length}
    </div>

  </div>
)}


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


export default DayEventDetails