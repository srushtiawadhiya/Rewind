import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import BottomNavigation from '../components/BottomNavigation';

const YearSelection = () => {

   const navigate = useNavigate();

     const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [years, setYears] = useState([]);

 // Authenticaiton 
    useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/me`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();
        console.log("Years API Response:", data);

        if (!data.success) {
          navigate("/login");
          return;
        }

        setUser(data.user);

       const yearsResponse = await fetch(
  `${import.meta.env.VITE_API_URL}/api/years`,
  {
    credentials: "include",
  }
);

console.log("Years Response Status:", yearsResponse.status);

const yearsData = await yearsResponse.json();

console.log("Years Data:", yearsData);
console.log("Years Array:", yearsData.years);

if (!yearsData.success) {
  console.error("Failed to fetch years:", yearsData.message);
  return;
}

setYears(yearsData.years);

      } catch (error) {
        console.error("Authentication Check Error:", error);
        navigate("/login");

      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [navigate]);



//Loading 
if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#050505] text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }
  

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex justify-center">

      <div
        className="
          relative
          min-h-screen
          w-full
          max-w-[390px]
          sm:max-w-[410px]
          md:max-w-[430px]
          lg:max-w-[460px]
          xl:max-w-[480px]
          bg-[#050505]
          px-5
          sm:px-6
          md:px-7
          lg:px-8
          pb-24
        "
      >

        {/* Background red glow */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_50%_35%,rgba(65,0,0,0.30),transparent_50%)]
          "
        />


        {/* ================= HEADER ================= */}

        <header
          className="
            relative
            z-10
            flex
            items-center
            justify-between
            pt-10
            sm:pt-11
            md:pt-12
            lg:pt-14
          "
        >

          {/* REWIND */}
          <p
            className="
              text-[16px]
              sm:text-[13px]
              md:text-[14px]
              font-bold
              tracking-wide
            "
          >
            REWIND
          </p>


          {/* Right icons */}
          <div className="flex items-center gap-4 sm:gap-5 md:gap-5">
            
            <button onClick={()=> navigate("/LockRewind")}>
            <img
              src={assets.lock}
              alt=""
              className="
                h-[16px]
                w-[16px]
                sm:h-[17px]
                sm:w-[17px]
                md:h-[18px]
                md:w-[18px]
                opacity-70
              "
            />
            </button>

            <div
              className="
                h-[30px]
                w-[30px]
                sm:h-[32px]
                sm:w-[32px]
                md:h-[34px]
                md:w-[34px]
                overflow-hidden
                rounded-full
                border
                border-[#333333]
              "
            >
              <img onClick={() => navigate("/Profile")}
                src={assets.sampleImage}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>

          </div>

        </header>


        {/* ================= TITLE ================= */}

        <section
          className="
            relative
            z-10
            mt-12
            sm:mt-13
            md:mt-14
            lg:mt-16
          "
        >

          <h1
            className="
              text-[29px]
              sm:text-[30px]
              md:text-[31px]
              lg:text-[32px]
              xl:text-[33px]
              font-semibold
              leading-tight
            "
          >
            Your Memories
          </h1>


          <p
            className="
              mt-2
              text-[14px]
              sm:text-[14px]
              md:text-[15px]
              lg:text-[16px]
              text-[#777777]
            "
          >
            Every year, a chapter of your story.
          </p>

        </section>


        {/* ================= YEAR CARDS ================= */}

        <section
          className="
            relative
            z-10
            mt-8
            sm:mt-9
            md:mt-10
            grid
            grid-cols-2
            gap-4
            sm:gap-4
            md:gap-5
            lg:gap-5
          "
        >

   
   {years.map((year, index) => (

  <div
    key={year._id}
    onClick={() =>
      navigate("/YearDetails", {
        state: { year }
      })
    }
    className="
      relative
      h-[148px]
      sm:h-[154px]
      md:h-[160px]
      lg:h-[168px]
      overflow-hidden
      rounded-[14px]
      border
      border-[#292929]
      bg-[#111111]
      cursor-pointer
    "
  >

    <img
      src={
  year.coverImage
    ? `${import.meta.env.VITE_API_URL}${year.coverImage}`
    : index === 0
    ? assets.heroImage
    : index === 1
    ? assets.heroImage1
    : assets.heroImage2
}
      alt={`${year.year} memories`}
      className="absolute inset-0 h-full w-full object-cover"
    />

    <div
      className="
        absolute
        inset-0
        bg-gradient-to-t
        from-black
        via-black/30
        to-transparent
      "
    />

    <div
      className="
        absolute
        right-3
        top-3
        flex
        h-[26px]
        w-[26px]
        sm:h-[28px]
        sm:w-[28px]
        items-center
        justify-center
        rounded-full
        bg-black/50
      "
    >
      <img
        src={assets.send}
        alt=""
        className="
          h-[13px]
          w-[13px]
          sm:h-[14px]
          sm:w-[14px]
        "
      />
    </div>

    <div
      className="
        absolute
        bottom-3
        left-3
        sm:bottom-4
        sm:left-4
      "
    >

      <h2
        className="
          text-[22px]
          sm:text-[23px]
          md:text-[24px]
          lg:text-[25px]
          font-semibold
        "
      >
        {year.year}
      </h2>

      <p
        className="
          text-[11px]
          sm:text-[11px]
          md:text-[12px]
          text-white/80
        "
      >
         Memories
      </p>

    </div>

  </div>

))}

          {/* ADD YEAR */}
          <button onClick={() => navigate("/AddYear")}
            className="
              flex
              h-[148px]
              sm:h-[154px]
              md:h-[160px]
              lg:h-[168px]
              flex-col
              items-center
              justify-center
              rounded-[14px]
              border
              border-dashed
              border-[#333333]
              bg-[#111111]
              transition
              hover:border-[#d71920]
              hover:bg-[#151515]
            "
          >

            <div
              className="
                flex
                h-[32px]
                w-[32px]
                sm:h-[34px]
                sm:w-[34px]
                items-center
                justify-center
                rounded-full
                bg-[#292929]
              "
            >
              <span
                className="
                  text-[22px]
                  sm:text-[23px]
                  text-[#888888]
                "
              >
                +
              </span>
            </div>

            <span
              className="
                mt-3
                text-[12px]
                sm:text-[12px]
                md:text-[13px]
                text-[#777777]
              "
            >
              Add Year
            </span>

          </button>

        </section>


      <BottomNavigation/>

      </div>
    </div>
  )
}

export default YearSelection