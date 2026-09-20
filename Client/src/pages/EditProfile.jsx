import React, { useEffect, useRef, useState } from 'react'
import { assets } from '../assets/assets'
import Backtick from '../components/Backtick'
import { useNavigate } from 'react-router-dom'

const EditProfile = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [showPasswordForm, setShowPasswordForm] = useState(false);
const [currentPassword, setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

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

      if (!response.ok) {
        navigate("/login");
        return;
      }

      setUser(data.user);
      setName(data.user.name);
      setEmail(data.user.email);

    } catch (error) {
      console.error("Fetch User Error:", error);
    }
  };

  fetchUser();
}, [navigate]);

   const[profilePhoto , setProfilePhoto] = useState(null);
   const [profilePhotoFile, setProfilePhotoFile] = useState(null);
    const fileInputRef = useRef(null);
  
    const handlePhotoChange = (event) => {
  const file = event.target.files[0];

  if (file) {
    const imageURL = URL.createObjectURL(file);

    setProfilePhoto(imageURL);
    setProfilePhotoFile(file);
  }
};
  
    const handleEditPhoto = () => {
      fileInputRef.current.click()
    }
    
  const handleSaveChanges = async () => {
  try {
    if (!name.trim() || !email.trim()) {
      alert("Name and email are required.");
      return;
    }

    const formData = new FormData();

    formData.append("name", name.trim());
    formData.append("email", email.trim());

    if (profilePhotoFile) {
      formData.append("profileImage", profilePhotoFile);
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/profile`,
      {
        method: "PATCH",
        credentials: "include",
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to update profile.");
      return;
    }

    alert("Profile updated successfully.");

    navigate("/Profile");

  } catch (error) {
    console.error("Update Profile Error:", error);
    alert("Something went wrong.");
  }
};

const handleChangePassword = async () => {
  try {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("All password fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/change-password`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to change password.");
      return;
    }

    alert("Password changed successfully.");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowPasswordForm(false);

  } catch (error) {
    console.error("Change Password Error:", error);
    alert("Something went wrong.");
  }
};


  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex justify-center">

      <div className="
        min-h-screen
        w-full
        max-w-[390px]
        px-5
        sm:max-w-[600px]
        lg:max-w-[900px]
      ">

        {/* Header */}
        <div className="flex items-center justify-between pt-10">

         <Backtick/>

          <h1 className="text-[12px] font-semibold">
            Edit Profile
          </h1>

          <div className="w-5" />

        </div>

        {/* Profile photo */}
        <div className="mt-8 flex flex-col items-center">

          <div className="relative">

            <img 
               src={profilePhoto || assets.profile}
              alt=""
              className="h-[65px] w-[65px] rounded-full object-cover"
            />

            <button
            onClick={handleEditPhoto}
             className="
              absolute
              bottom-0
              right-0
              h-5
              w-5
              rounded-full
              bg-[#d71920]
              text-[8px]
            ">
              ✎
            </button>

          </div>
            

  <input
    ref={fileInputRef}
    type="file"
    accept="image/*"
    onChange={handlePhotoChange}
    className="hidden"
  />

          <button onClick={handleEditPhoto}
          className="mt-2 text-[9px] text-[#d71920]">
            Change Photo
          </button>

        </div>

        {/* Form */}
        <div className="mt-8 space-y-5">

          <div>
            <label className="mb-2 block text-[8px] text-[#777777]">
              NAME
            </label>

            <input
              value={name}
  onChange={(event) => setName(event.target.value)}
              className="
                h-[42px]
                w-full
                rounded-[7px]
                border border-[#222222]
                bg-[#111111]
                px-3
                text-[11px]
                outline-none
                focus:border-[#d71920]
              "
            />
          </div>

          <div>
            <label className="mb-2 block text-[8px] text-[#777777]">
              EMAIL
            </label>

            <input
              value={email}
  onChange={(event) => setEmail(event.target.value)}
              className="
                h-[42px]
                w-full
                rounded-[7px]
                border border-[#222222]
                bg-[#111111]
                px-3
                text-[11px]
                outline-none
                focus:border-[#d71920]
              "
            />
          </div>

          <button 
          onClick={() => setShowPasswordForm(!showPasswordForm)}
          className="
            h-[42px]
            w-full
            rounded-[7px]
            bg-[#111111]
            text-left
            px-4
            text-[10px]
          ">
            🔑 Change Password
          </button>
          
          {showPasswordForm && (
  <div className="space-y-3">

    <input
      type="password"
      placeholder="Current password"
      value={currentPassword}
      onChange={(event) => setCurrentPassword(event.target.value)}
      className="
        h-[42px]
        w-full
        rounded-[7px]
        border border-[#222222]
        bg-[#111111]
        px-3
        text-[11px]
        outline-none
        focus:border-[#d71920]
      "
    />

    <input
      type="password"
      placeholder="New password"
      value={newPassword}
      onChange={(event) => setNewPassword(event.target.value)}
      className="
        h-[42px]
        w-full
        rounded-[7px]
        border border-[#222222]
        bg-[#111111]
        px-3
        text-[11px]
        outline-none
        focus:border-[#d71920]
      "
    />

    <input
      type="password"
      placeholder="Confirm new password"
      value={confirmPassword}
      onChange={(event) => setConfirmPassword(event.target.value)}
      className="
        h-[42px]
        w-full
        rounded-[7px]
        border border-[#222222]
        bg-[#111111]
        px-3
        text-[11px]
        outline-none
        focus:border-[#d71920]
      "
    />

    <button
      onClick={handleChangePassword}
      className="
        h-[40px]
        w-full
        rounded-[7px]
        bg-[#d71920]
        text-[10px]
        font-semibold
      "
    >
      Update Password
    </button>

  </div>
)}

        </div>

        {/* Save */}
        <button 
         onClick={handleSaveChanges}
        className="
          mt-10
          h-[44px]
          w-full
          rounded-full
          bg-[#d71920]
          text-[11px]
          font-semibold
        ">
          Save Changes
        </button>

      </div>
    </div>
  )
}

export default EditProfile