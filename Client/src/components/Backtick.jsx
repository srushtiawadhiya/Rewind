import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'


const Backtick = () => {

    const navigate = useNavigate();
    const handleBack = () => {
  navigate(-1);
};

  return (
    <button onClick={handleBack}
                className="
                  flex h-8 w-8 items-center justify-center
                  rounded-full
                  bg-[#181818]
                  text-[#dddddd]
                  text-lg
                  transition
                  hover:bg-[#242424]
                "
              >
                <img src={assets.backleft} alt=""/>
              </button>
  )
}

export default Backtick
