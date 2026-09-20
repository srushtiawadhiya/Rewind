import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const CompleteAccount = () => {

const navigate = useNavigate();

 const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const email = sessionStorage.getItem("rewindEmail");

  const getPasswordStrength = () => {
  if (password.length === 0) {
    return {
      text: "",
      width: "0%",
    };
  }

  if (password.length < 8) {
    return {
      text: "Weak",
      width: "25%",
    };
  }

  if (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  ) {
    return {
      text: "Strong",
      width: "100%",
    };
  }

  return {
    text: "Medium",
    width: "65%",
  };
};

const passwordStrength = getPasswordStrength();



  const handleCreateAccount = async () => {

  if (!name || !password || !confirmPassword) {
    alert("Please fill in all fields");
    return;
  }

  if (password.length < 8) {
    alert("Password must be at least 8 characters");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  if (!email) {
    alert("Email verification is missing. Please start again.");
    navigate("/createaccount");
    return;
  }

  try {

    setLoading(true);

    const response = await fetch(
      "${import.meta.env.VITE_API_URL}/api/auth/register",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      }
    );

    const data = await response.json();

    if (!data.success) {
      alert(data.message);
      return;
    }

    sessionStorage.removeItem("rewindEmail");

    navigate("/AccountCreated");

  } catch (error) {

    console.error("Register Error:", error);

    alert("Something went wrong. Please try again.");

  } finally {

    setLoading(false);

  }
};

  return (
    <div className="min-h-screen w-full  bg-[#050505] text-white flex justify-center">

      <div className="relative min-h-screen w-full max-w-[390px] px-5 sm:px-8 bg-[radial-gradient(circle_at_50%_42%,rgba(125,0,0,0.55),transparent_42%)]">

      <div className='bg-[radial-gradient(circle,rgba(90,0,0,0.45),transparent_68%)]'>
        {/* Header */}
        <div className="flex items-center justify-between pt-10 sm:pt-12">

          <button onClick={()=> navigate("/OtpVerification")}
          className="text-lg text-white">
            <img src= {assets.backleft} alt=''/>
          </button>

          <p className="text-[12px] font-semibold tracking-[0.12em]">
            REWIND
          </p>

          <div className="w-4" />

        </div>

        {/* Heading */}
        <div className="mt-8 text-center">

          <h1 className="text-[25px] font-semibold leading-tight">
            Make your own Memories
          </h1>

          <p className="mx-auto mt-3 max-w-[220px] text-[12px] leading-relaxed text-[#777777]">
            Tell us a little about you and secure your memory vault.
          </p>

        </div>

        {/* Form */}
        <div className="mt-9">

          {/* Name */}
          <div>
            <label className="mb-2 block text-[9px] text-[#8a8a8a]">
              YOUR NAME
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
onChange={(e) => setName(e.target.value)}
              className="
                h-[42px]
                w-full
                rounded-[8px]
                border
                border-[#242424]
                bg-[#111111]
                px-3
                text-[11px]
                outline-none
                placeholder:text-[#484848]
                focus:border-[#d71920]
              "
            />
          </div>

          {/* Password */}
          <div className="mt-4">

            <label className="mb-2 block text-[9px] text-[#8a8a8a]">
              CREATE PASSWORD
            </label>

            <div className="relative">

              <input
                type= {showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={password}
onChange={(e) => setPassword(e.target.value)}
                className="
                  h-[42px]
                  w-full
                  rounded-[8px]
                  border
                  border-[#242424]
                  bg-[#111111]
                  px-3
                  pr-10
                  text-[11px]
                  outline-none
                  placeholder:text-[#484848]
                  focus:border-[#d71920]
                "
              />

              <button
                            type ="button" onClick={()=> setShowPassword(!showPassword) }
             
                             className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555555]">

                            {showPassword ? (
                          <img src={assets.eye} alt="Show password" />
                            ) : (
                            <img src={assets.eyeclose} alt="Hide password" />
                             )}  
                           
                             
                 </button>

            </div>

            {/* Password strength */}
            <div className="mt-2 flex justify-between text-[10px]">
              <span className="text-[#555555]">
                Password strength
              </span>

              <span className="text-[#d71920]">
                  {passwordStrength.text}
              </span>
            </div>

           <div className="mt-1 h-[2px] w-full bg-[#242424]">
  <div
    className="h-full bg-[#d71920] transition-all duration-300"
    style={{ width: passwordStrength.width }}
  />
</div>

            <p className="mt-2 text-[9px] text-[#555555]">
              Use at least 8 characters
            </p>

          </div>

          {/* Confirm password */}
          <div className="mt-4">

            <label className="mb-2 block text-[9px] text-[#8a8a8a]">
              CONFIRM PASSWORD
            </label>

            <div className="relative">

              <input
                 type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                value={confirmPassword}
onChange={(e) => setConfirmPassword(e.target.value)}
                className="
                  h-[42px]
                  w-full
                  rounded-[8px]
                  border
                  border-[#242424]
                  bg-[#111111]
                  px-3
                  pr-10
                  text-[11px]
                  outline-none
                  placeholder:text-[#484848]
                  focus:border-[#d71920]
                "
              />

               <button
                             type ="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555555]">
              
                             {showConfirmPassword ? (
  <img src={assets.eye} alt="Show password" />
) : (
  <img src={assets.eyeclose} alt="Hide password" />
)} 
                            
                              
                            </button>

            </div>

          </div>

          {/* Create button */}
          <button  onClick={handleCreateAccount}
  disabled={loading}
            className="
              mt-8
              h-[42px]
              w-full
              rounded-full
              bg-[#d71920]
              text-[11px]
              font-semibold
              shadow-[0_8px_25px_rgba(215,25,32,0.18)]
              hover:bg-[#ed1c24]
            "
          >
           {loading ? "CREATING..." : "CREATE MY REWIND"}
          </button>

        </div>

        {/* Privacy */}
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap">
          <img
            src={assets.lock}
            alt=""
            className="h-[9px] w-[9px] opacity-50"
          />

          <p className="text-[12px] sm:mt-1.5 text-[#555555]">
            Your memories are private by default.
          </p>
        </div>

        
      </div>
      </div>
    </div>
  )
}

export default CompleteAccount