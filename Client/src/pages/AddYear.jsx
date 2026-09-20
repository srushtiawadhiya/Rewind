import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const AddYear = () => {
  const navigate = useNavigate();

  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddYear = async () => {
    try {
      setError("");

      if (!year) {
        setError("Please enter a year.");
        return;
      }

      const yearNumber = Number(year);

      if (
        !Number.isInteger(yearNumber) ||
        yearNumber < 1900 ||
        yearNumber > 2100
      ) {
        setError("Please enter a valid year.");
        return;
      }

      setLoading(true);

      const response = await fetch(
        "${import.meta.env.VITE_API_URL}/api/years",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            year: yearNumber,
            coverImage: "",
          }),
        }
      );

      const data = await response.json();

      console.log("Add Year Response:", data);

      if (!response.ok) {
        setError(data.message || "Failed to create year.");
        return;
      }

      navigate("/YearSelection");
    } catch (error) {
      console.error("Add Year Error:", error);
      setError("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
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
        "
      >

        {/* Header */}
        <div className="flex items-center justify-between pt-8 sm:pt-10">

          <button
            onClick={() => navigate("/YearSelection")}
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
              alt="Back"
              className="h-4 w-4"
            />
          </button>

          <h1 className="text-[14px] font-medium sm:text-[16px]">
            Add Year
          </h1>

          <div className="w-9" />

        </div>

        {/* Heading */}
        <div className="mt-12 text-center">

          <h2 className="text-[25px] font-semibold">
            Add a new year
          </h2>

          <p className="mt-2 text-[12px] text-[#777777]">
            Start a new chapter of your story.
          </p>

        </div>

        {/* Year Input */}
        <div className="mt-12">

          <label className="mb-2 block text-[11px] font-medium text-[#8a8a8a]">
            YEAR
          </label>

          <input
            type="number"
            placeholder="Enter year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="
              h-[44px]
              w-full
              rounded-[8px]
              border
              border-[#242424]
              bg-[#111111]
              px-3
              text-[14px]
              text-white
              outline-none
              placeholder:text-[#484848]
              focus:border-[#d71920]
            "
          />

        </div>

        {/* Error */}
        {error && (
          <p className="mt-3 text-center text-[12px] text-red-500">
            {error}
          </p>
        )}

        {/* Add Year Button */}
        <button
          onClick={handleAddYear}
          disabled={loading}
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
            disabled:opacity-50
            sm:left-8
            sm:right-8
            sm:h-[48px]
          "
        >
          {loading ? "ADDING..." : "ADD YEAR"}
        </button>

      </div>

    </div>
  );
};

export default AddYear;