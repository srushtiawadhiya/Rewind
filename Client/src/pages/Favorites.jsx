import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import Backtick from '../components/Backtick'

const Favorites = () => {

  const [memories, setMemories] = useState([]);
const [loading, setLoading] = useState(true);
const [filter, setFilter] = useState("all");

const [isGalleryOpen, setIsGalleryOpen] = useState(false);
const [galleryIndex, setGalleryIndex] = useState(0);

const openGallery = (index) => {
  setGalleryIndex(index);
  setIsGalleryOpen(true);
};

const closeGallery = () => {
  setIsGalleryOpen(false);
};

const showPreviousMedia = () => {
  setGalleryIndex((prev) =>
    prev === 0 ? filteredMedia.length - 1 : prev - 1
  );
};

const showNextMedia = () => {
  setGalleryIndex((prev) =>
    prev === filteredMedia.length - 1 ? 0 : prev + 1
  );
};

useEffect(() => {
  const fetchFavorites = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/memories/favorites`,
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      console.log("Favorites Response:", data);

      if (!response.ok) {
        alert(data.message || "Failed to fetch favorites.");
        return;
      }

      setMemories(data.memories);

    } catch (error) {
      console.error("Fetch Favorites Error:", error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  fetchFavorites();
}, []);

//filter media
const favoriteMedia = memories.flatMap((memory) =>
  (memory.media || []).map((media, index) => ({
    ...media,
    memoryId: memory._id,
    memoryTitle: memory.title,
    mediaId: media._id || index,
  }))
);

const filteredMedia = favoriteMedia.filter((media) => {
  if (filter === "photos") {
    return media.type === "photo";
  }

  if (filter === "videos") {
    return media.type === "video";
  }

  return true;
});

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex justify-center">

      <div className="
        min-h-screen w-full max-w-[390px] px-5
        sm:max-w-[520px] sm:px-8
        lg:max-w-[700px] lg:px-12
      ">

        {/* Header */}
        <div className="flex items-center justify-between pt-10">

         <Backtick/>

          <h1 className="
            text-[13px] sm:text-[16px]
            font-semibold tracking-[0.12em]
          ">
            FAVORITES
          </h1>

          <button className="text-[#777]">
            <img src={assets.heartPlus} alt=""/>
          </button>

        </div>

        {/* Filters */}
        <div className="mt-7 flex gap-2">

          <button
  onClick={() => setFilter("all")}
  className={`
    rounded-full
    px-4 py-2
    text-[10px] sm:text-[12px]
    ${filter === "all"
      ? "bg-[#d71920] text-white"
      : "bg-[#151515] text-[#777]"
    }
  `}
>
            All
          </button>

         <button
  onClick={() => setFilter("photos")}
  className={`
    rounded-full
    px-4 py-2
    text-[10px] sm:text-[12px]
    ${filter === "photos"
      ? "bg-[#d71920] text-white"
      : "bg-[#151515] text-[#777]"
    }
  `}
>
  Photos
</button>

         <button
  onClick={() => setFilter("videos")}
  className={`
    rounded-full
    px-4 py-2
    text-[10px] sm:text-[12px]
    ${filter === "videos"
      ? "bg-[#d71920] text-white"
      : "bg-[#151515] text-[#777]"
    }
  `}
>
  Videos
</button>

        </div>

        {/* Grid */}
        <div className="
          mt-6 grid grid-cols-2 gap-3
          sm:gap-4
        ">

         {loading ? (
  <p className="col-span-2 text-center text-[11px] text-[#666666]">
    Loading favorites...
  </p>
) : filteredMedia.length === 0 ? (
  <p className="col-span-2 text-center text-[11px] text-[#666666]">
    No {filter === "all" ? "favorite memories" : filter} found.
  </p>
) : (
  filteredMedia.map((media, index) => (
    <div
      key={`${media.memoryId}-${media.mediaId}`}
      className="
        relative
        h-[145px] w-full
        overflow-hidden
        rounded-[9px]
        bg-[#151515]
        sm:h-[210px]
        lg:h-[270px]
      "
    >
      {media.type === "photo" ? (
        <img
          src={`${import.meta.env.VITE_API_URL}${media.url}`}
          alt={media.memoryTitle}
         onClick={() => openGallery(index)}
          className="h-full w-full object-cover"
        />
      ) : (
        <video
          src={`${import.meta.env.VITE_API_URL}${media.url}`}
          className="h-full w-full object-cover"
          onClick={() => openGallery(index)}
          controls
        />
      )}
    </div>
  ))
)}

{/* Fullscreen Gallery */}
{isGalleryOpen && filteredMedia.length > 0 && (
  <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">

    {/* Close */}
    <button
      onClick={closeGallery}
      className="absolute top-5 right-5 z-50 text-white text-3xl"
    >
      ✕
    </button>

    {/* Previous */}
    {filteredMedia.length > 1 && (
      <button
        onClick={showPreviousMedia}
        className="absolute left-4 z-50 text-white text-4xl"
      >
        ‹
      </button>
    )}

    {/* Media */}
    <div className="w-full h-full flex items-center justify-center px-10">

      {filteredMedia[galleryIndex].type === "photo" ? (
        <img
          src={`${import.meta.env.VITE_API_URL}${filteredMedia[galleryIndex].url}`}
          alt={filteredMedia[galleryIndex].memoryTitle}
          className="max-h-full max-w-full object-contain"
        />
      ) : (
        <video
          src={`${import.meta.env.VITE_API_URL}${filteredMedia[galleryIndex].url}`}
          className="max-h-full max-w-full object-contain"
          controls
          autoPlay
        />
      )}

    </div>

    {/* Next */}
    {filteredMedia.length > 1 && (
      <button
        onClick={showNextMedia}
        className="absolute right-4 z-50 text-white text-4xl"
      >
        ›
      </button>
    )}

    {/* Counter */}
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white text-sm">
      {galleryIndex + 1} / {filteredMedia.length}
    </div>

  </div>
)}

        </div>

      </div>
    </div>
  )
}

export default Favorites