import { useLocation, useNavigate } from 'react-router-dom'
import Backtick from '../components/Backtick';
import React, { useEffect, useState } from 'react';

const SecuritySettings = () => {

  const navigate = useNavigate();
const location = useLocation();
const [showPasswordForm, setShowPasswordForm] = useState(
  location.state?.openPassword || false
);
const [user, setUser] = useState(null);

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

    } catch (error) {
      console.error("Fetch User Error:", error);
    }
  };

  fetchUser();
}, [navigate]);

const getPasswordChangedText = () => {
  if (!user?.passwordChangedAt) {
    return "Password date unavailable";
  }

  const days = Math.floor(
    (Date.now() - new Date(user.passwordChangedAt).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  if (days === 0) {
    return "Changed today";
  }

  if (days === 1) {
    return "Changed 1 day ago";
  }

  return `Changed ${days} days ago`;
};

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex justify-center">

      <div className="min-h-screen w-full max-w-[390px] px-5 sm:max-w-[600px] lg:max-w-[900px]">

        {/* Header */}
        <div className="flex items-center justify-between pt-10">

        <Backtick/>

          <h1 className="text-[15px] font-semibold">
            Security
          </h1>

          <div className="w-5" />

        </div>

        {/* Account Security */}
        <p className="mt-8 text-[8px] text-[#666666]">
          ACCOUNT SECURITY
        </p>

        <div className="mt-3 space-y-2">

          <div 
           onClick={() =>
    navigate("/EditProfile", {
      state: { openPassword: true },
    })
  }
          className="flex items-center justify-between rounded-[7px] bg-[#111111] px-4 py-3">

            <div>
              <p className="text-[10px]">
                Password
              </p>

              <p className="mt-1 text-[8px] text-[#666666]">
                {getPasswordChangedText()}
              </p>
            </div>

            <span className="text-[9px]">
              ›
            </span>

          </div>

          <div className="flex items-center justify-between rounded-[7px] bg-[#111111] px-4 py-3">

            <div>
              <p className="text-[10px]">
                Two-Factor Authentication
              </p>
            </div>

           <button
  type="button"
  onClick={async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/toggle-2fa`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.message || "Failed to update 2FA");
        return;
      }

      setUser((prev) => ({
        ...prev,
        twoFactorEnabled: data.twoFactorEnabled,
      }));
    } catch (error) {
      console.error("Toggle 2FA Error:", error);
      alert("Something went wrong.");
    }
  }}
  className={`h-4 w-7 rounded-full ${
    user?.twoFactorEnabled ? "bg-[#d71920]" : "bg-[#333333]"
  }`}
>
  <div
    className={`mt-[2px] h-3 w-3 rounded-full bg-white transition-all ${
      user?.twoFactorEnabled ? "ml-3" : "ml-[2px]"
    }`}
  />
</button>

          </div>

          <div className="flex items-center justify-between rounded-[7px] bg-[#111111] px-4 py-3">

            <div>
              <p className="text-[10px]">
                Security Verification (OTP)
              </p>
            </div>

            {/* <span className="text-[8px] text-[#777777]">
              Enabled
            </span> */}

          </div>

        </div>

        {/* Active Sessions */}
        <p className="mt-7 text-[8px] text-[#666666]">
          ACTIVE SESSIONS
        </p>

        <div className="mt-3 space-y-2">

          <div className="rounded-[7px] bg-[#111111] px-4 py-3">

            <p className="text-[10px]">
               Current Browser
            </p>

            <p className="mt-1 text-[8px] text-[#555555]">
              Current device
            </p>

          </div>

        </div>

        {/* Privacy */}
        <p className="mt-7 text-[8px] text-[#666666]">
          PRIVACY
        </p>

        <div className="mt-3 space-y-2">

          <div className="flex justify-between rounded-[7px] bg-[#111111] px-4 py-3">
            <span className="text-[10px]">
              Lock REWIND
            </span>
            <span className="text-[#d71920]">
              ●
            </span>
          </div>

        <div className="flex items-center justify-between rounded-[7px] bg-[#111111] px-4 py-3">

  <span className="text-[10px]">
    Private by Default
  </span>

  <button
    type="button"
    onClick={async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/toggle-private-default`,
          {
            method: "PATCH",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          alert(data.message || "Failed to update privacy setting");
          return;
        }

        setUser((prev) => ({
          ...prev,
          privateByDefault: data.privateByDefault,
        }));
      } catch (error) {
        console.error("Toggle Private by Default Error:", error);
        alert("Something went wrong.");
      }
    }}
    className={`h-4 w-7 rounded-full ${
      user?.privateByDefault
        ? "bg-[#d71920]"
        : "bg-[#333333]"
    }`}
  >
    <div
      className={`mt-[2px] h-3 w-3 rounded-full bg-white transition-all ${
        user?.privateByDefault
          ? "ml-3"
          : "ml-[2px]"
      }`}
    />
  </button>

</div>

        </div>

      </div>
    </div>
  )
}

export default SecuritySettings