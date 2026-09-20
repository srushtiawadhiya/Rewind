import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import Backtick from '../components/Backtick.jsx';
import Menu from '../components/Menu.jsx';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
const [stats, setStats] = useState({
  memories: 0,
  photos: 0,
  videos: 0,
  stories: 0,
});

  useEffect(() => {

  const fetchUser = async () => {
    try {

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/me`,
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      console.log("Profile User Response:", data);

      if (!response.ok) {
        alert(data.message || "Failed to fetch profile.");
        return;
      }

      setUser(data.user);

      const memoriesResponse = await fetch(
  `${import.meta.env.VITE_API_URL}/api/memories/timeline`,
  {
    credentials: "include",
  }
);

const memoriesData = await memoriesResponse.json();

console.log("Profile Memories Response:", memoriesData);

if (memoriesResponse.ok) {

  const memories = memoriesData.memories || [];

  const photos = memories.reduce(
    (total, memory) =>
      total +
      (memory.media?.filter(
        (media) => media.type === "photo"
      ).length || 0),
    0
  );

  const videos = memories.reduce(
    (total, memory) =>
      total +
      (memory.media?.filter(
        (media) => media.type === "video"
      ).length || 0),
    0
  );

  const stories = memories.filter(
    (memory) => !memory.media?.length
  ).length;

  setStats({
    memories: memories.length,
    photos: photos,
    videos: videos,
    stories: stories,
  });
}

    } catch (error) {

      console.error("Profile Error:", error);
      alert("Something went wrong.");

    } finally {

      setLoading(false);

    }
  };

  fetchUser();

}, []);

const handleLogout = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/logout`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    const data = await response.json();

    console.log("Logout Response:", data);

    if (!response.ok) {
      alert(data.message || "Failed to logout.");
      return;
    }

    navigate("/login");

  } catch (error) {
    console.error("Logout Error:", error);
    alert("Something went wrong.");
  }
};


  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex justify-center">

      <div className="min-h-screen w-full max-w-[390px] px-5 sm:max-w-[600px] lg:max-w-[900px]">

        {/* Header */}
        <div className="pt-5 text-center">
          <Backtick/>

          <p className="text-[15px] text-[#888888]">
            Profile
          </p>

        </div>

        {/* Profile */}
        <div className="mt-5 flex flex-col items-center">

          <img
           src={
  user?.profileImage
    ? `${import.meta.env.VITE_API_URL}${user.profileImage}`
    : assets.user
}
            alt=""
            className="
              h-[64px]
              w-[64px]
              rounded-full
              border-2
              border-[#d71920]
              object-cover
            "
          />

          <h1 className="mt-3 text-[18px] font-semibold">
           {loading ? "Loading..." : user?.name || "User"}
          </h1>

          <p className="mt-1 text-[9px] text-[#777777]">
            {loading ? "Loading..." : user?.email || ""}
          </p>

        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-4 rounded-[8px] bg-[#111111] py-4">

          {[
             [stats.memories, 'Memories'],
  [stats.photos, 'Photos'],
  [stats.videos, 'Videos'],
  [stats.stories, 'Stories'],
          ].map(([value, label]) => (
            <div key={label} className="text-center">

              <p className="text-[13px] font-semibold">
                {value}
              </p>

              <p className="mt-1 text-[8px] text-[#666666]">
                {label}
              </p>

            </div>
          ))}

        </div>

        {/* Menu */}
    <Menu/>

        {/* Logout */}
        <button  onClick={handleLogout}
         className="
          mt-5
          h-[45px]
          w-full
          rounded-[7px]
          bg-[#111111]
          text-[11px]
        ">
          ↪ Logout
        </button>

        {/* Delete */}
        <button onClick={() =>navigate('/DelectAccount')}
         className="
          mt-2
          h-[45px]
          w-full
          rounded-[7px]
          bg-[#111111]
          text-[10px]
          text-[#d71920]
        ">
          Delete Account
        </button>

      </div>
    </div>
  )
}

export default Profile