import React, { useEffect, useMemo, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate, useLocation } from 'react-router-dom'
import Cropper from 'react-easy-crop'

const createCroppedImage = async (imageSrc, pixelCrop, rotation = 0) => {
  const image = new Image();

  image.src = imageSrc;

  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
  });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((rotation * Math.PI) / 180);

  ctx.drawImage(
    image,
    -image.width / 2 - pixelCrop.x,
    -image.height / 2 - pixelCrop.y
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Could not create cropped image."));
          return;
        }

        resolve(blob);
      },
      "image/jpeg",
      0.9
    );
  });
};


const MediaPreviewEdit = () => {
  
  const navigate = useNavigate();
  const location = useLocation();

  const year = location.state?.year;

  const initialFiles = location.state?.selectMedia || [];
const [selectedFiles, setSelectedFiles] = useState(initialFiles);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
const [rotation, setRotation] = useState(0);
const [positionX, setPositionX] = useState(0);
const [positionY, setPositionY] = useState(0);

const [crop, setCrop] = useState({ x: 0, y: 0 });
const [mediaCrops, setMediaCrops] = useState({});

  const setAsCover = location.state?.setAsCover ?? false;
  const fileInputRef = React.useRef(null);

  const [mediaEdits, setMediaEdits] = useState({});
  const [cropEnabled, setCropEnabled] = useState({});
  const [isFullscreen, setIsFullscreen] = useState(false);

useEffect(() => {
  const savedEdit = mediaEdits[currentIndex];

  if (savedEdit) {
    setZoom(savedEdit.zoom);
    setRotation(savedEdit.rotation);
    setPositionX(savedEdit.positionX);
    setPositionY(savedEdit.positionY);
    setCrop({ x: 0, y: 0 });
  } else {
    setZoom(1);
    setRotation(0);
    setPositionX(0);
    setPositionY(0);
  }
}, [currentIndex, mediaEdits]);

const handleAddMedia = (event) => {
  const newFiles = Array.from(event.target.files || []);

  if (newFiles.length === 0) return;

  setSelectedFiles((prevFiles) => {
    const updatedFiles = [...prevFiles, ...newFiles];

    // Open the first newly added media
    setCurrentIndex(prevFiles.length);

    return updatedFiles;
  });

  // Allow selecting the same files again later
  event.target.value = "";
};

const saveCurrentEdit = () => {
  setMediaEdits((prev) => ({
    ...prev,
    [currentIndex]: {
      zoom,
      rotation,
      positionX,
      positionY,
    },
  }));
};

const handleContinue = async () => {
  try {
    const updatedFiles = [...selectedFiles];

    // Save the current image's latest edit
    const allEdits = {
      ...mediaEdits,
      [currentIndex]: {
        zoom,
        rotation,
        positionX,
        positionY,
      },
    };

    // Process every selected media
    for (let index = 0; index < selectedFiles.length; index++) {
      const file = selectedFiles[index];

      // Keep videos unchanged
      if (!file.type.startsWith("image/")) {
        continue;
      }

      // Keep images unchanged if user did not enable Edit
      if (!cropEnabled[index]) {
        continue;
      }

      // Get this image's crop
      const cropPixels = mediaCrops[index];

      if (!cropPixels) {
        continue;
      }

      const imageUrl = URL.createObjectURL(file);

      const imageRotation =
        allEdits[index]?.rotation ?? 0;

      const croppedBlob = await createCroppedImage(
        imageUrl,
        cropPixels,
        imageRotation
      );

      URL.revokeObjectURL(imageUrl);

      const croppedFile = new File(
        [croppedBlob],
        file.name,
        {
          type: "image/jpeg",
        }
      );

      updatedFiles[index] = croppedFile;
    }

    navigate("/MemoryInformation", {
      state: {
        year,
        selectMedia: updatedFiles,
        setAsCover,
      },
    });

  } catch (error) {
    console.error("Crop Error:", error);
    alert("Failed to process the images.");
  }
};


  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex justify-center">

{isFullscreen && selectedFiles[currentIndex] && (
  <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">

    <button
      onClick={() => setIsFullscreen(false)}
      className="
        absolute
        top-5
        right-5
        z-50
        h-10
        w-10
        rounded-full
        bg-[#181818]
        text-white
        text-xl
      "
    >
      ×
    </button>

    {selectedFiles[currentIndex].type.startsWith("image/") ? (
      <img
        src={URL.createObjectURL(selectedFiles[currentIndex])}
        alt={selectedFiles[currentIndex].name}
        className="max-h-full max-w-full object-contain p-5"
      />
    ) : (
      <video
        src={URL.createObjectURL(selectedFiles[currentIndex])}
        controls
        className="max-h-full max-w-full object-contain p-5"
      />
    )}

  </div>
)}

      <input
  ref={fileInputRef}
  type="file"
  accept="image/*,video/*"
  multiple
  onChange={handleAddMedia}
  className="hidden"
/>


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
        bg-[radial-gradient(circle_at_50%_35%,rgba(100,0,0,0.45),transparent_45%)]
      ">

        {/* Header */}
        <div className="flex items-center justify-between pt-8 sm:pt-10">

         <button
  onClick={() =>
    navigate("/MediaSelection", {
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

          <p className="text-[12px] sm:text-[14px] font-semibold tracking-wide">
            PREVIEW
          </p>

          <button
  onClick={() => setIsFullscreen(true)}
  className="h-9 w-9 rounded-full bg-[#171717] flex items-center justify-center"
>
  <span className="text-sm">◱</span>
</button>

        </div>


        {/* Main Preview */}
        <div className="mt-6">

        <div className="relative overflow-hidden rounded-[12px] border border-[#191919]">

            {selectedFiles.length > 0 && (
  selectedFiles[currentIndex].type.startsWith("image/") ? (

   <div className="relative h-[255px] sm:h-[300px] md:h-[330px] w-full">

    {cropEnabled[currentIndex] ? (
      <Cropper
        image={URL.createObjectURL(selectedFiles[currentIndex])}
        crop={crop}
        zoom={zoom}
        rotation={rotation}
        aspect={1}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onRotationChange={setRotation}
        onCropComplete={(_, croppedPixels) => {
          setMediaCrops((prev) => ({
            ...prev,
            [currentIndex]: croppedPixels,
          }));
        }}
        cropShape="rect"
        showGrid={true}
      />
    ) : (
      <img
        src={URL.createObjectURL(selectedFiles[currentIndex])}
        alt={selectedFiles[currentIndex].name}
        className="h-full w-full object-contain"
      />
    )}

  </div>
  ) : (
    <video
      src={URL.createObjectURL(selectedFiles[currentIndex])}
      controls
      className="h-[255px] sm:h-[300px] md:h-[330px] w-full object-cover"
    />
  )
)}

            {/* Counter */}
            <div className="
              absolute
              top-3
              left-3
              rounded-full
              bg-[#111111]/80
              px-3
              py-1
              text-[10px]
              sm:text-[11px]
            ">
             {String(currentIndex + 1).padStart(2, "0")} / {String(selectedFiles.length).padStart(2, "0")}
            </div>

            {/* Crop Toggle */}
<button
  onClick={() => {
    setCropEnabled((prev) => ({
      ...prev,
      [currentIndex]: !prev[currentIndex],
    }));
  }}
  className="
    absolute
    bottom-4
    left-4
    z-10
    rounded-full
    bg-[#111111]/80
    px-4
    py-2
    text-[10px]
    text-white
  "
>
  {cropEnabled[currentIndex] ? "Original" : "Edit"}
</button>

            {/* Not Grain */}
            <div className="
              absolute
              top-3
              right-3
              rounded-full
              bg-[#111111]/80
              px-3
              py-1
              text-[9px]
              text-[#dddddd]
            ">
              ✦ No Grain
            </div>

            {/* Bottom buttons */}
              <button 
             onClick={() => setRotation((prev) => prev + 90)}
            className="
              absolute
              bottom-4
              right-4
              h-8
              w-8
              rounded-full
              bg-[#111111]/80
              flex
              items-center
              justify-center
            ">
              ↻
            </button>

            <div className="mt-4 rounded-[10px] bg-[#111111] p-3">

  <div className="flex items-center justify-between">
    <p className="text-[9px] text-[#777777]">
      ZOOM
    </p>

    <p className="text-[9px] text-[#777777]">
      {Math.round(zoom * 100)}%
    </p>
  </div>

  <input
    type="range"
    min="1"
    max="3"
    step="0.1"
    value={zoom}
    onChange={(event) => setZoom(Number(event.target.value))}
    className="mt-2 w-full"
  />

</div>
{/* Position Controls */}
<div className="mt-3 rounded-[10px] bg-[#111111] p-3">

  <p className="text-[9px] text-[#777777]">
    POSITION
  </p>

  <div className="mt-2 flex items-center justify-center gap-2">

    {/* Left */}
    <button
      onClick={() => setPositionX((prev) => prev - 10)}
      className="
        h-9
        w-9
        rounded-full
        bg-[#181818]
        text-sm
        hover:bg-[#242424]
      "
    >
      ←
    </button>

    {/* Up */}
    <button
      onClick={() => setPositionY((prev) => prev - 10)}
      className="
        h-9
        w-9
        rounded-full
        bg-[#181818]
        text-sm
        hover:bg-[#242424]
      "
    >
      ↑
    </button>

    {/* Down */}
    <button
      onClick={() => setPositionY((prev) => prev + 10)}
      className="
        h-9
        w-9
        rounded-full
        bg-[#181818]
        text-sm
        hover:bg-[#242424]
      "
    >
      ↓
    </button>

    {/* Right */}
    <button
      onClick={() => setPositionX((prev) => prev + 10)}
      className="
        h-9
        w-9
        rounded-full
        bg-[#181818]
        text-sm
        hover:bg-[#242424]
      "
    >
      →
    </button>

  </div>

</div>

          </div>


          {/* Selected Memories */}
          <div className="mt-5">

            <p className="text-[10px] sm:text-[12px] font-semibold tracking-wider text-[#777777]">
              SELECTED MEMORIES
            </p>

            <div className="mt-3 flex gap-3">

              {selectedFiles.map((file, index) => (
  <button
    key={index}
   onClick={() => {
  saveCurrentEdit();
  setCurrentIndex(index);
}}
    className={`
      h-[58px]
      w-[58px]
      rounded-[8px]
      overflow-hidden
      flex-shrink-0
      ${
        currentIndex === index
          ? "border-2 border-[#d71920]"
          : "border border-[#292929]"
      }
    `}
  >
    {file.type.startsWith("image/") ? (
      <img
        src={URL.createObjectURL(file)}
        alt={file.name}
        className="h-full w-full object-cover"
      />
    ) : (
      <video
        src={URL.createObjectURL(file)}
        className="h-full w-full object-cover"
      />
    )}
  </button>
))}

              <button 
                onClick={() => fileInputRef.current?.click()}
              className="
                h-[58px]
                w-[58px]
                rounded-[8px]
                border
                border-[#292929]
                bg-[#111111]
                text-[#777777]
                text-xl
              ">
                <img src={assets.Plus} alt=""/>
              </button>

            </div>

          </div>

        </div>


        {/* Continue */}
       <button
    onClick={handleContinue}
  className="
    mt-8
  mb-8
  w-full
  h-[44px]
  rounded-full
  bg-[#d71920]
  text-[13px]
  sm:text-[13px]
  font-semibold
  shadow-[0_8px_30px_rgba(215,25,32,0.20)]
  hover:bg-[#ed1c24]
  "
>
  Continue
</button>

      </div>
    </div>
  )
}

export default MediaPreviewEdit