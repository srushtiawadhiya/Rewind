import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate, useLocation } from 'react-router-dom'

const AddMemory = () => {

  const navigate = useNavigate();
  const location = useLocation();

const year = location.state?.year;

  const [ selectMedia,setSelectMedia] =  useState([]);
  const handleMediaSelect = (event) => {
    const files = Array.from(event.target.files);

    setSelectMedia((prev) => [...prev,...files]);
  };

  const [setAsCover, setSetAsCover] = useState(true);

 const handleContinue = () => {

  if (!year?._id) {
    alert("Year not selected.");
    return;
  }

  if (setAsCover) {
  const hasPhoto = selectMedia.some((file) =>
    file.type.startsWith("image/")
  );

  if (!hasPhoto) {
    alert("Please select at least one photo to set as the year cover.");
    return;
  }
}

  navigate("/MediaSelection", {
    state: {
      year,
      selectMedia,
      setAsCover
    }
  });
};

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex justify-center">

      <div
        className="
          relative
          min-h-screen
          w-full
          max-w-[390px]
          bg-[radial-gradient(circle_at_50%_40%,rgba(125,0,0,0.40),transparent_50%)]
          px-5
          sm:max-w-[520px]
          sm:px-8
          md:max-w-[700px]
          md:px-10
          lg:max-w-[900px]
          lg:px-12
        "
      >

        {/* Header */}
        <div className="flex items-center justify-between pt-8 sm:pt-10">

          <button onClick={() => navigate("/YearSelection")}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-[#151515]
            "
          >
            <img 
              src={assets.backleft}
              alt=""
              className="h-4 w-4"
            />
          </button>

          <h1 className="text-[14px] font-medium sm:text-[16px]">
            Add Memory
          </h1>

          <div className="w-9" />

        </div>


       {/* Upload box */}
<label
  htmlFor="media-upload"
  className="
    mt-8
    flex
    h-[150px]
    w-full
    cursor-pointer
    flex-col
    items-center
    justify-center
    rounded-xl
    border
    border-dashed
    border-[#303030]
    bg-[#0d0d0d]
    transition
    hover:border-[#d71920]
    sm:h-[190px]
    md:h-[220px]
  "
>
  <div className="mb-3 text-2xl text-[#777777]">
    ▱
  </div>

  <p className="text-[13px] font-medium sm:text-[15px]">
    Add Photos & Videos
  </p>

  <p className="mt-2 text-[10px] text-[#555555] sm:text-[12px]">
    Drag or select from gallery
  </p>

  <input
    id="media-upload"
    type="file"
    accept="image/*,video/*"
    multiple
    className="hidden"
    onChange={handleMediaSelect}
  />
</label>


        {/* Add story */}
        <button
          onClick={() => {
    navigate("/MemoryInformation", {
      state: {
        year,
        selectMedia,
        setAsCover,
      },
    });
  }}

          className="
            mt-4
            flex
            h-[42px]
            w-full
            items-center
            rounded-lg
            bg-[#151515]
            px-4
            text-left
            text-[11px]
            text-white
            sm:text-[13px]
          "
        >
          <span className="mr-2 text-[#d71920] text-[12px]">▤</span>
          + Add Story
        </button>


        {/* Selected media */}
       {/* Selected media */}
{selectMedia.length > 0 && (
  <div className="mt-7">

    <div className="flex items-center justify-between">

      <p className="text-[11px] text-[#666666]">
        SELECTED MEDIA
      </p>

      <button
        type="button"
        onClick={() => document.getElementById("media-upload").click()}
        className="text-[11px] text-[#d71920]"
      >
        + Add more
      </button>

    </div>

    <div className="mt-3 flex gap-2 overflow-x-auto">

      {selectMedia.map((file, index) => {

        const fileURL = URL.createObjectURL(file);

        return (
          <div
            key={`${file.name}-${index}`}
            className="relative h-16 w-16 shrink-0 sm:h-20 sm:w-20"
          >

            {file.type.startsWith("image/") ? (
              <img
                src={fileURL}
                alt={file.name}
                className="h-full w-full rounded-lg object-cover"
              />
            ) : (
              <video
                src={fileURL}
                className="h-full w-full rounded-lg object-cover"
              />
            )}

            <button
              type="button"
              onClick={() => {
                setSelectMedia((prev) =>
                  prev.filter((_, i) => i !== index)
                );
              }}
              className="
                absolute
                right-1
                top-1
                flex
                h-4
                w-4
                items-center
                justify-center
                rounded-full
                bg-black/70
                text-[9px]
                text-white
              "
            >
              ×
            </button>

          </div>
        );
      })}

    </div>

  </div>
)}


        {/* Set cover */}
<div
  className="
    mt-6
    flex
    items-center
    justify-between
    rounded-lg
    bg-[#151515]
    px-4
    py-3
  "
>
  <div>
    <p className="text-[12px] sm:text-[13px]">
      Set as year cover
    </p>

    <p className="mt-1 text-[10px] text-[#555555] sm:text-[10px]">
      Use this photo on your rewind grid
    </p>
  </div>

  <button
    type="button"
    onClick={() => setSetAsCover(!setAsCover)}
    className={`
      flex
      h-5
      w-9
      items-center
      rounded-full
      p-1
      transition
      ${setAsCover ? "bg-[#d71920]" : "bg-[#444444]"}
    `}
  >
    <div
      className={`
        h-3
        w-3
        rounded-full
        bg-white
        transition-transform
        ${setAsCover ? "translate-x-4" : "translate-x-0"}
      `}
    />
  </button>
</div>


        {/* Continue */}
        <button onClick={handleContinue}
          className="
            absolute
            bottom-8
            left-5
            right-5
            h-[44px]
            rounded-full
            bg-[#d71920]
            text-[13px]
            font-semibold
            shadow-[0_8px_30px_rgba(215,25,32,0.2)]
            transition
            hover:bg-[#ed1c24]
            sm:left-8
            sm:right-8
            sm:h-[48px]
            sm:text-[13px]
            md:left-10
            md:right-10
            lg:left-12
            lg:right-12
          "
        >
          Continue
        </button>

      </div>

    </div>
  )
}

export default AddMemory