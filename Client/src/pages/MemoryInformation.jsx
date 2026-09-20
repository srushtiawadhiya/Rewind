import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate, useLocation } from 'react-router-dom'

const MemoryInformation = () => {

    const navigate = useNavigate();
  const location = useLocation();

  const year = location.state?.year;
  const selectedFiles = location.state?.selectMedia || [];
  const setAsCover = location.state?.setAsCover ?? false;

  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [memoryDate, setMemoryDate] = useState("");
const [memoryTime, setMemoryTime] = useState("");
const [locationName, setLocationName] = useState("");
const [isFavorite, setIsFavorite] = useState(false);
const [isShareable, setIsShareable] = useState(false);
const [isYearCover, setIsYearCover] = useState(setAsCover);

const handleSaveMemory = async () => {
  try {
    if (!year?._id) {
      alert("Year not selected.");
      return;
    }

    if (!selectedFiles.length) {
      alert("Please select at least one photo or video.");
      return;
    }

    if (!title.trim()) {
      alert("Please enter a memory title.");
      return;
    }

    if (!memoryDate) {
      alert("Please select a date.");
      return;
    }

    // --------------------------------
    // STEP 1: Upload media
    // --------------------------------

    const formData = new FormData();

    selectedFiles.forEach((file) => {
      formData.append("media", file);
    });

    const uploadResponse = await fetch(
      `${import.meta.env.VITE_API_URL}/api/memories/upload`,
      {
        method: "POST",
        credentials: "include",
        body: formData,
      }
    );

    const uploadData = await uploadResponse.json();

    console.log("Upload Response:", uploadData);

    if (!uploadResponse.ok) {
      alert(uploadData.message || "Media upload failed.");
      return;
    }

    // --------------------------------
    // STEP 2: Create Memory
    // --------------------------------

    const memoryDateTime = memoryTime
      ? `${memoryDate}T${memoryTime}`
      : memoryDate;

    const memoryData = {
      yearId: year._id,
      title: title,
      description: story,
      memoryDate: memoryDateTime,
      location: locationName,
      isFavorite: isFavorite,
      isShareable: isShareable,
      media: uploadData.files,
    };

    console.log("Memory Data:", memoryData);

    const memoryResponse = await fetch(
      `${import.meta.env.VITE_API_URL}/api/memories`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(memoryData),
      }
    );

    const memoryResult = await memoryResponse.json();

    console.log("Memory Response:", memoryResult);

    if (!memoryResponse.ok) {
      alert(memoryResult.message || "Failed to create memory.");
      return;
    }

    // --------------------------------
    // STEP 3: Set Year Cover
    // --------------------------------

    if (isYearCover) {
      const coverPhoto = uploadData.files.find(
        (file) => file.type === "photo"
      );

      if (!coverPhoto) {
        alert("Year cover must be a photo.");
        return;
      }

      const yearResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/api/years/${year._id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            coverImage: coverPhoto.url,
          }),
        }
      );

      const yearResult = await yearResponse.json();

      console.log("Year Cover Response:", yearResult);

      if (!yearResponse.ok) {
        alert(yearResult.message || "Failed to update year cover.");
        return;
      }
    }

    // --------------------------------
    // STEP 4: Go to Memory Saved
    // --------------------------------

    navigate("/MemorySaved", {
      state: {
        year,
        memory: memoryResult.memory,
      },
    });

  } catch (error) {
    console.error("Save Memory Error:", error);
    alert("Something went wrong.");
  }
};


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
        lg:max-w-[520px]
        bg-[radial-gradient(circle_at_50%_25%,rgba(100,0,0,0.40),transparent_45%)]
      ">

        {/* Header */}
        <div className="flex items-center justify-between pt-8 sm:pt-10">

         <button
  onClick={() =>
    navigate("/MediaPreviewEdit", {
      state: {
        year,
        selectMedia: selectedFiles,
        setAsCover,
      },
    })
  }
  className="
    flex h-8 w-8 items-center justify-center
    rounded-full
    bg-[#181818]
    text-[#dddddd]
    text-lg
    transition
    hover:bg-[#242424]
  "
>
  <img src={assets.backleft} alt="" />
</button>

          <p className="text-[11px] sm:text-[13px] font-semibold tracking-wide">
            ARCHIVE ENTRY
          </p>

          <button className="h-9 w-9 rounded-full bg-[#171717]">
            ♧
          </button>

        </div>


        {/* Title */}
        <div className="mt-7">

          <label className="text-[10px] font-semibold text-[#777777]">
            TITLE
          </label>

          <input
            type="text"
             value={title}
  onChange={(e) => setTitle(e.target.value)}
            className="
              mt-2
              h-[42px]
              w-full
              rounded-[7px]
              border
              border-[#d71920]
              bg-[#111111]
              px-3
              text-[12px]
              outline-none
            "
          />

        </div>


        {/* Story */}
        <div className="mt-5">

          <label className="text-[10px] font-semibold text-[#777777]">
            THE STORY
          </label>

          <textarea
            value={story}
  onChange={(e) => setStory(e.target.value)}
            className="
              mt-2
              h-[72px]
              w-full
              resize-none
              rounded-[8px]
              border
              border-[#242424]
              bg-[#111111]
              p-3
              text-[11px]
              leading-relaxed
              text-[#cccccc]
              outline-none
            "
          />

        </div>


        {/* Date / Time */}
        <div className="mt-5 grid grid-cols-2 gap-3">

         <div>
  <label className="text-[9px] font-semibold text-[#777777]">
    DATE
  </label>

  <input
    type="date"
    value={memoryDate}
    onChange={(e) => setMemoryDate(e.target.value)}
    className="
      mt-2
      h-[40px]
      w-full
      rounded-[7px]
      bg-[#111111]
      border border-[#242424]
      px-3
      text-[10px]
      text-[#cccccc]
      outline-none
    "
  />
</div>


          <div>
  <label className="text-[9px] font-semibold text-[#777777]">
    TIME
  </label>

  <input
    type="time"
    value={memoryTime}
    onChange={(e) => setMemoryTime(e.target.value)}
    className="
      mt-2
      h-[40px]
      w-full
      rounded-[7px]
      bg-[#111111]
      border border-[#242424]
      px-3
      text-[10px]
      text-[#cccccc]
      outline-none
    "
  />
</div>

        </div>


        {/* Location */}
       <input
  type="text"
  value={locationName}
  onChange={(e) => setLocationName(e.target.value)}
  placeholder="Enter location"
  className="
    mt-2
    h-[40px]
    w-full
    rounded-[7px]
    bg-[#111111]
    border border-[#242424]
    px-3
    text-[10px]
    text-[#cccccc]
    outline-none
  "
/>


        {/* Settings */}
        <div className="mt-3 rounded-[8px] bg-[#111111] border border-[#202020]">

          <div className="flex items-center justify-between px-3 py-3 border-b border-[#202020]">
            <span className="text-[10px]">♡ &nbsp; Add to Favorites</span>

            <button
  type="button"
  onClick={() => setIsFavorite(!isFavorite)}
  className={`
    h-5
    w-8
    rounded-full
    p-[2px]
    flex
    ${isFavorite ? "justify-end bg-[#d71920]" : "justify-start bg-[#444444]"}
  `}
>
  <div className="h-4 w-4 rounded-full bg-white" />
</button>
          </div>


          <div className="flex items-center justify-between px-3 py-3 border-b border-[#202020]">
            <span className="text-[10px]">↗ &nbsp; Make Shareable</span>

            <button
  type="button"
  onClick={() => setIsShareable(!isShareable)}
  className={`
    h-5
    w-8
    rounded-full
    p-[2px]
    flex
    ${isShareable ? "justify-end bg-[#d71920]" : "justify-start bg-[#444444]"}
  `}
>
  <div className="h-4 w-4 rounded-full bg-white" />
</button>
          </div>


          <div className="flex items-center justify-between px-3 py-3">
            <span className="text-[10px]">▦ &nbsp; Set as Year Cover</span>

            <button
  type="button"
  onClick={() => setIsYearCover(!isYearCover)}
  className={`
    h-5
    w-8
    rounded-full
    p-[2px]
    flex
    ${isYearCover ? "justify-end bg-[#d71920]" : "justify-start bg-[#444444]"}
  `}
>
  <div className="h-4 w-4 rounded-full bg-white" />
</button>
          </div>

        </div>


        {/* Save */}
        <button 
        onClick={handleSaveMemory}
        className="
          absolute
          bottom-8
          left-5
          right-5
          h-[44px]
          rounded-full
          bg-[#d71920]
          text-[12px]
          font-semibold
          shadow-[0_8px_30px_rgba(215,25,32,0.20)]
        ">
          Save Memory
        </button>

      </div>
    </div>
  )
}

export default MemoryInformation