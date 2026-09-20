import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate, useLocation } from 'react-router-dom';


const BottomNavigation = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const year = location.state?.year;

  return (
              <nav
                className="absolute
                  bottom-0
                  left-0
                  right-0
                  flex
                  h-[76px]
                  sm:h-[78px]
                  md:h-[80px]
                  items-center
                  justify-around
                  border-t
                  border-[#202020]
                  bg-[#0b0b0b]
                  px-3
                  sm:px-4
                "
              >
      
                {/* Home */}
                <button  onClick={() => navigate("/YearSelection")} 
                className="flex flex-col items-center gap-1">
      
                  <img
                    src={assets.house}
                    alt=""
                    className="
                      h-[18px]
                      w-[18px]
                      sm:h-[19px]
                      sm:w-[19px]
                      opacity-90
                    "
                  />
      
                  <span
                    className="
                      text-[10px]
                      sm:text-[11px]
                      text-white
                    "
                  >
                    Home
                  </span>
      
                </button>
      
      
                {/* Timeline */}
                <button  onClick={() => navigate("/Timeline")}
                className="flex flex-col items-center gap-1">
      
                  <img
                    src={assets.timeline}
                    alt=""
                    className="
                      h-[18px]
                      w-[18px]
                      sm:h-[19px]
                      sm:w-[19px]
                      opacity-60
                    "
                  />
      
                  <span
                    className="
                      text-[10px]
                      sm:text-[11px]
                      text-[#666666]
                    "
                  >
                    Timeline
                  </span>
      
                </button>
      
      
                {/* Add */}
                <button onClick={() =>
    navigate("/AddMemory", {
      state: {
        year,
      },
    })
  }
                  className="
                    -mt-7
                    flex
                    h-[48px]
                    w-[48px]
                    sm:h-[50px]
                    sm:w-[50px]
                    md:h-[52px]
                    md:w-[52px]
                    items-center
                    justify-center
                    rounded-full
                    bg-[#d71920]
                    text-[28px]
                    sm:text-[29px]
                    md:text-[30px]
                    font-light
                    shadow-[0_5px_25px_rgba(215,25,32,0.35)]
                  "
                >
                  +
                </button>
      
      
                {/* Favorites */}
                <button onClick={() => navigate("/Favorites")}
                className="flex flex-col items-center gap-1">
      
                  <img
                    src={assets.heart}
                    alt=""
                    className="
                      h-[18px]
                      w-[18px]
                      sm:h-[19px]
                      sm:w-[19px]
                      opacity-60
                    "
                  />
      
                  <span
                    className="
                      text-[10px]
                      sm:text-[11px]
                      text-[#666666]
                    "
                  >
                    Favorites
                  </span>
      
                </button>
      
      
                {/* Profile */}
                <button onClick={() => navigate("/Profile")}
                className="flex flex-col items-center gap-1">
      
                  <img
                    src={assets.profile}
                    alt=""
                    className="
                      h-[18px]
                      w-[18px]
                      sm:h-[19px]
                      sm:w-[19px]
                      opacity-60
                    "
                  />
      
                  <span
                    className="
                      text-[10px]
                      sm:text-[11px]
                      text-[#666666]
                    "
                  >
                    Profile
                  </span>
      
                </button>
      
              </nav>
  );
};

export default BottomNavigation
