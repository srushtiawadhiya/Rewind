import React from 'react'
import { useNavigate } from 'react-router-dom'

const Menu = () => {

  const navigate = useNavigate()
//   const[profilePhoto , setProfilePhoto] = useState(null);
//   const fileInputRef = useRef(null);

//   const handlePhotoChange = (event) => {
//     const file = event.target.files[0]

//     if(file){
//         const imageURL = URL.createObjectURL(file)
//       setProfilePhoto(imageURL)
//     }
//   }

//   const handleEditPhoto = () => {
//     fileInputRef.current.click()
//   }


  const menuItems = [
    {
      name: '✎  Edit Profile',
      action: () => navigate('/EditProfile')
    },
    {
      name: '⚙  Security',
      action: () => navigate('/SecuritySettings')
    },
    {
      name: '▣  Storage',
      action: () => navigate('/Storage')
    },
    {
      name: '♧  Lock REWIND',
      action: () => navigate('/LockRewind')
    }
  ]

  return (
    <div className="mt-6 space-y-2">

      {menuItems.map((item) => (
        <button
          key={item.name}
          onClick={item.action}
          className="
            flex
            h-[42px]
            w-full
            items-center
            justify-between
            rounded-[7px]
            bg-[#111111]
            px-4
            text-[11px]
          "
        >
          {item.name}

          <span className="text-[#555555]">
            ›
          </span>

        </button>
      ))}

    </div>
  )
}

export default Menu