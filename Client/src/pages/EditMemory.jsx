import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const EditMemory = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const memory = location.state?.memory;
  const year = location.state?.year;

  const memoryDateValue = memory?.memoryDate
    ? new Date(memory.memoryDate)
    : null;

  const [title, setTitle] = useState(memory?.title || "");
  const [story, setStory] = useState(memory?.description || "");
  const [memoryDate, setMemoryDate] = useState(
    memoryDateValue
      ? memoryDateValue.toISOString().split("T")[0]
      : ""
  );
  const [memoryTime, setMemoryTime] = useState(
    memoryDateValue
      ? memoryDateValue.toTimeString().slice(0, 5)
      : ""
  );
  const [locationName, setLocationName] = useState(
    memory?.location || ""
  );

  const [isFavorite, setIsFavorite] = useState(
    memory?.isFavorite || false
  );

  const [isShareable, setIsShareable] = useState(
    memory?.isShareable || false
  );

  const handleSaveChanges = async () => {
  try {

    if (!title.trim()) {
      alert("Please enter a memory title.");
      return;
    }

    if (!memoryDate) {
      alert("Please select a date.");
      return;
    }

    const memoryDateTime = memoryTime
      ? `${memoryDate}T${memoryTime}`
      : memoryDate;

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}http:///api/memories/${memory._id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: story,
          memoryDate: memoryDateTime,
          location: locationName,
          isFavorite: isFavorite,
          isShareable: isShareable,
        }),
      }
    );

    const data = await response.json();

    console.log("Update Memory Response:", data);

    if (!response.ok) {
      alert(data.message || "Failed to update memory.");
      return;
    }

    alert("Memory updated successfully.");

    navigate("/DayEventDetails", {
      state: {
        memory: data.memory,
        year: year,
      },
    });

  } catch (error) {

    console.error("Update Memory Error:", error);
    alert("Something went wrong.");

  }
};

const handleDeleteMemory = async () => {
  try {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this memory?"
    );

    if (!confirmDelete) {
      return;
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/memories/${memory._id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    const data = await response.json();

    console.log("Delete Memory Response:", data);

    if (!response.ok) {
      alert(data.message || "Failed to delete memory.");
      return;
    }

    alert("Memory deleted successfully.");

    navigate("/YearDetails", {
      state: {
        year: year,
      },
    });

  } catch (error) {
    console.error("Delete Memory Error:", error);
    alert("Something went wrong.");
  }
};


  if (!memory) {
    return (
      <div className="min-h-screen w-full bg-[#050505] text-white flex items-center justify-center">

        <div className="text-center">

          <p className="text-[#777777]">
            Memory not found.
          </p>

          <button
            onClick={() => navigate("/YearSelection")}
            className="
              mt-4
              rounded-full
              bg-[#d71920]
              px-5
              py-2
              text-sm
            "
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
          min-h-screen
          w-full
          max-w-[390px]
          px-5
          pb-10
          sm:max-w-[520px]
          sm:px-8
          lg:max-w-[700px]
          lg:px-12
        "
      >

        {/* Header */}

        <div className="flex items-center justify-between pt-8">

          <button
            onClick={() =>
              navigate("/DayEventDetails", {
                state: {
                  memory,
                  year,
                },
              })
            }
            className="
              text-[12px]
              text-[#777777]
            "
          >
            Cancel
          </button>

          <h1
            className="
              text-[13px]
              font-semibold
              tracking-[0.12em]
              sm:text-[16px]
            "
          >
            EDIT MEMORY
          </h1>

          <div className="w-[45px]" />

        </div>


        {/* Title */}

        <div className="mt-8">

          <label className="text-[10px] text-[#777777]">
            TITLE
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="
              mt-2
              w-full
              rounded-[8px]
              border
              border-[#292929]
              bg-[#111111]
              px-4
              py-3
              text-[12px]
              text-white
              outline-none
              focus:border-[#d71920]
            "
          />

        </div>


        {/* Story */}

        <div className="mt-5">

          <label className="text-[10px] text-[#777777]">
            STORY
          </label>

          <textarea
            value={story}
            onChange={(e) => setStory(e.target.value)}
            rows={6}
            className="
              mt-2
              w-full
              resize-none
              rounded-[8px]
              border
              border-[#292929]
              bg-[#111111]
              px-4
              py-3
              text-[12px]
              text-white
              outline-none
              focus:border-[#d71920]
            "
          />

        </div>


        {/* Date */}

        <div className="mt-5">

          <label className="text-[10px] text-[#777777]">
            DATE
          </label>

          <input
            type="date"
            value={memoryDate}
            onChange={(e) => setMemoryDate(e.target.value)}
            className="
              mt-2
              w-full
              rounded-[8px]
              border
              border-[#292929]
              bg-[#111111]
              px-4
              py-3
              text-[12px]
              text-white
              outline-none
              focus:border-[#d71920]
            "
          />

        </div>


        {/* Time */}

        <div className="mt-5">

          <label className="text-[10px] text-[#777777]">
            TIME
          </label>

          <input
            type="time"
            value={memoryTime}
            onChange={(e) => setMemoryTime(e.target.value)}
            className="
              mt-2
              w-full
              rounded-[8px]
              border
              border-[#292929]
              bg-[#111111]
              px-4
              py-3
              text-[12px]
              text-white
              outline-none
              focus:border-[#d71920]
            "
          />

        </div>


        {/* Location */}

        <div className="mt-5">

          <label className="text-[10px] text-[#777777]">
            LOCATION
          </label>

          <input
            type="text"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            className="
              mt-2
              w-full
              rounded-[8px]
              border
              border-[#292929]
              bg-[#111111]
              px-4
              py-3
              text-[12px]
              text-white
              outline-none
              focus:border-[#d71920]
            "
          />

        </div>


        {/* Favorite */}

        <div
          className="
            mt-6
            flex
            items-center
            justify-between
            rounded-[8px]
            border
            border-[#292929]
            bg-[#111111]
            px-4
            py-4
          "
        >

          <div>

            <p className="text-[12px]">
              Favorite
            </p>

            <p className="mt-1 text-[9px] text-[#666666]">
              Add this memory to favorites
            </p>

          </div>

          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`
              h-6
              w-11
              rounded-full
              p-1
              transition
              ${isFavorite ? "bg-[#d71920]" : "bg-[#292929]"}
            `}
          >
            <div
              className={`
                h-4
                w-4
                rounded-full
                bg-white
                transition
                ${isFavorite ? "translate-x-5" : "translate-x-0"}
              `}
            />
          </button>

        </div>


        {/* Shareable */}

        <div
          className="
            mt-3
            flex
            items-center
            justify-between
            rounded-[8px]
            border
            border-[#292929]
            bg-[#111111]
            px-4
            py-4
          "
        >

          <div>

            <p className="text-[12px]">
              Shareable
            </p>

            <p className="mt-1 text-[9px] text-[#666666]">
              Allow this memory to be shared
            </p>

          </div>

          <button
            onClick={() => setIsShareable(!isShareable)}
            className={`
              h-6
              w-11
              rounded-full
              p-1
              transition
              ${isShareable ? "bg-[#d71920]" : "bg-[#292929]"}
            `}
          >
            <div
              className={`
                h-4
                w-4
                rounded-full
                bg-white
                transition
                ${isShareable ? "translate-x-5" : "translate-x-0"}
              `}
            />
          </button>

        </div>


        {/* Save */}

        <button
         onClick={handleSaveChanges}
          className="
            mt-8
            w-full
            rounded-full
            bg-[#d71920]
            py-3
            text-[11px]
            font-semibold
            text-white
          "
        >
          SAVE CHANGES
        </button>

        <button
  onClick={handleDeleteMemory}
  className="
    mt-3
    w-full
    rounded-full
    border
    border-[#3a3a3a]
    bg-transparent
    py-3
    text-[11px]
    font-semibold
    text-[#d71920]
  "
>
  DELETE MEMORY
</button>

      </div>

    </div>
  )
}

export default EditMemory