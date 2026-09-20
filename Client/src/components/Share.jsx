import React from 'react'
import { assets } from '../assets/assets';

const Share = ({ memory }) =>  {

    const handleShare = async () => {

  if (!memory?._id) {
    alert("Memory not found.");
    return;
  }

  try {

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/memories/${memory._id}/shareable`,
      {
        method: "PATCH",
        credentials: "include",
      }
    );

    const data = await response.json();

    console.log("Shareable Response:", data);

    if (!response.ok) {
      alert(data.message || "Failed to update sharing.");
      return;
    }

    if (!data.isShareable) {
      alert("Memory sharing has been disabled.");
      return;
    }

    const shareData = {
      title: memory.title || "My REWIND Memory",
      text: memory.description || "Check out my memory on REWIND!",
      url: window.location.href,
    };

    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }

  } catch (error) {

    console.error("Share Error:", error);
    alert("Something went wrong.");

  }
};

  return (
     <button onClick={handleShare}
                className="
                  flex h-8 w-8 items-center justify-center
                  rounded-full
                  bg-[#181818]
                  text-[15px]
                  text-[#aaaaaa]
                "
              >
                <img src={assets.share} alt=""/>
              </button>
  )
}

export default Share
