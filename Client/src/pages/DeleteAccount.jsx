import React, { useState } from 'react'
import Backtick from '../components/Backtick'
import { useNavigate } from 'react-router-dom'

const DeleteAccount = () => {

  const navigate = useNavigate();
  const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);

const handleDeleteAccount = async () => {
  if (!password) {
    alert("Please enter your password.");
    return;
  }

  const confirmDelete = window.confirm(
    "Are you sure you want to permanently delete your account?"
  );

  if (!confirmDelete) {
    return;
  }

  try {
    setLoading(true);

    const response = await fetch(
      `http://${import.meta.env.VITE_API_URL}/api/auth/delete-account`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
        }),
      }
    );

    const data = await response.json();

    console.log("Delete Account Response:", data);

    if (!response.ok) {
      alert(data.message || "Failed to delete account.");
      return;
    }

    alert("Account deleted successfully.");

    navigate("/login");

  } catch (error) {
    console.error("Delete Account Error:", error);
    alert("Something went wrong.");
  } finally {
    setLoading(false);
  }
};

  
  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex justify-center">

      <div className="relative min-h-screen w-full max-w-[390px] px-5">

        {/* Header */}
        <div className="flex items-center justify-between pt-6">

        <Backtick/>

          <div className="w-5" />

        </div>

        {/* Warning */}
        <div className="mt-20 flex flex-col items-center text-center">

          <div className="
            flex
            h-[55px]
            w-[55px]
            items-center
            justify-center
            rounded-full
            bg-[rgba(215,25,32,0.12)]
            text-[#d71920]
          ">
            ⚠
          </div>

          <h1 className="mt-7 text-[17px] font-semibold">
            Delete your REWIND account?
          </h1>

          <p className="mt-3 max-w-[270px] text-[9px] leading-relaxed text-[#666666]">
            All your memories, photos, videos and stories
            will be permanently deleted. This action cannot
            be undone.
          </p>

        </div>

        {/* Warning list */}
        <div className="
          mt-8
          rounded-[8px]
          bg-[#111111]
          px-4
          py-4
        ">

          <p className="mb-3 text-[8px] font-semibold text-[#d71920]">
            WHAT WILL BE DELETED
          </p>

          {[
            'All memories and stories',
            'All photos and videos',
            'Your account data',
            'Shared memories'
          ].map((item) => (

            <div
              key={item}
              className="mt-2 flex items-center gap-2"
            >

              <span className="text-[9px] text-[#d71920]">
                ●
              </span>

              <span className="text-[9px] text-[#777777]">
                {item}
              </span>

            </div>

          ))}

        </div>

        {/* Confirm */}
        <div className="absolute bottom-9 left-5 right-5">

          <label className="mb-2 block text-[8px] text-[#777777]">
            ENTER YOUR PASSWORD TO CONFIRM
          </label>

          <input
            type="password"
            placeholder="••••••••"
            value={password}
onChange={(event) => setPassword(event.target.value)}
            className="
              h-[42px]
              w-full
              rounded-[7px]
              border border-[#222222]
              bg-[#111111]
              px-3
              text-[11px]
              outline-none
              placeholder:text-[#444444]
            "
          />

          <button
           onClick={handleDeleteAccount}
  disabled={loading} 
          className="
            mt-4
            h-[44px]
            w-full
            rounded-full
            bg-[#d71920]
            text-[12px]
            font-semibold
          ">
            {loading ? "Deleting..." : "Delete Account"}
          </button>

          <button onClick={()=> navigate('/Profile')}
          className="
            mt-3
            w-full
            text-[11px]
            text-[#777777]
          ">
            Cancel
          </button>

        </div>

      </div>
    </div>
  )
}

export default DeleteAccount