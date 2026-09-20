import React, { useState } from 'react'
import { assets } from '../assets/assets'

const Favorite = ({ memory }) => {

  const [isFavorite, setIsFavorite] = useState(
    memory?.isFavorite || false
  );

  const handleFavorite = async () => {

    if (!memory?._id) {
      alert("Memory not found.");
      return;
    }

    try {

      const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/memories/${memory._id}/favorite`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      const data = await response.json();

      console.log("Favorite Response:", data);

      if (!response.ok) {
        alert(data.message || "Failed to update favorite.");
        return;
      }

      setIsFavorite(data.isFavorite);

    } catch (error) {

      console.error("Favorite Error:", error);
      alert("Something went wrong.");

    }
  };

  return (
    <button
      onClick={handleFavorite}
      className="text-[22px] text-white"
    >
      {isFavorite ? (
        <img src={assets.heartPlus} alt="Remove from favorites" />
      ) : (
        <img src={assets.heart} alt="Add to favorites" />
      )}
    </button>
  )
}

export default Favorite