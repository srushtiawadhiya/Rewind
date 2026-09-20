import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate, useLocation } from 'react-router-dom'

const MediaSelection = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const year = location.state?.year;
  const selectedFiles = location.state?.selectMedia || [];
  const setAsCover = location.state?.setAsCover ?? false;

  const [selectedIndexes, setSelectedIndexes] = useState(
    selectedFiles.map((_, index) => index)
  );

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex justify-center">

      <div
        className="
          relative
          min-h-screen
          w-full
          max-w-[390px]
          bg-[#050505]
          px-4
          sm:max-w-[520px]
          sm:px-7
          md:max-w-[700px]
          md:px-10
          lg:max-w-[900px]
          lg:px-12
        "
      >

        {/* Header */}
        <div className="flex items-center justify-between pt-8">

          <button
           onClick={() => navigate("/AddMemory", {
    state: {
      year,
      selectMedia: selectedFiles,
      setAsCover,
    },
  })}
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

          <p className="text-[13px] sm:text-[15px]">
            Select Memories
          </p>

          <p className="text-[9px] text-[#d71920] sm:text-[11px]">
           {selectedIndexes.length} Selected
          </p>

        </div>


        {/* Grid */}
        <div
          className="
            mt-6
            grid
            grid-cols-3
            gap-2
            sm:gap-3
          "
        >
{selectedFiles.map((file, index) => {

  const fileURL = URL.createObjectURL(file);

  const isSelected = selectedIndexes.includes(index);

  return (
    <div
      key={`${file.name}-${index}`}
      onClick={() => {
        setSelectedIndexes((prev) =>
          prev.includes(index)
            ? prev.filter((item) => item !== index)
            : [...prev, index]
        );
      }}
      className="
        relative
        aspect-square
        overflow-hidden
        rounded-lg
        border
        border-[#222222]
        cursor-pointer
      "
    >

      {file.type.startsWith("image/") ? (
        <img
          src={fileURL}
          alt={file.name}
          className="h-full w-full object-cover"
        />
      ) : (
        <video
          src={fileURL}
          className="h-full w-full object-cover"
        />
      )}

      {isSelected && (
        <div
          className="
            absolute
            right-1.5
            top-1.5
            flex
            h-4
            w-4
            items-center
            justify-center
            rounded-full
            bg-[#d71920]
            text-[9px]
            font-bold
          "
        >
          ✓
        </div>
      )}

    </div>
  );
})}

        </div>


        {/* Bottom action */}
        <div
          className="
            fixed
            bottom-0
            left-1/2
            flex
            w-full
            max-w-[390px]
            -translate-x-1/2
            items-center
            gap-3
            border-t
            border-[#1d1d1d]
            bg-[#0b0b0b]
            px-4
            py-4
            sm:max-w-[520px]
            sm:px-7
            md:max-w-[700px]
            md:px-10
            lg:max-w-[900px]
            lg:px-12
          "
        >

          <button
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-[#202020]
              text-[14px]
            "
          >
            ◉
          </button>

          <button
          onClick={() => {
    if (selectedIndexes.length === 0) {
      alert("Please select at least one media file.");
      return;
    }

    const selectedMedia = selectedIndexes.map(
      (index) => selectedFiles[index]
    );

    navigate("/MediaPreviewEdit", {
      state: {
        year,
        selectMedia: selectedMedia,
        setAsCover,
      },
    });
  }}

            className="
              h-[42px]
              flex-1
              rounded-full
              bg-[#d71920]
              text-[13px]
              font-semibold
              sm:h-[46px]
              sm:text-[13px]
            "
          >
            Continue ({selectedIndexes.length})
          </button>

        </div>

      </div>

    </div>
  )
}

export default MediaSelection