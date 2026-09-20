import React, { useEffect, useState } from 'react'
import Backtick from '../components/Backtick'
import { useNavigate } from 'react-router-dom'

const Storage = () => {

    const navigate = useNavigate()

    const [storage, setStorage] = useState({
    photos: 0,
    videos: 0,
    total: 0,
  })

  useEffect(() => {
    const fetchStorage = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/memories/storage`,
          {
            method: "GET",
            credentials: "include",
          }
        )

        const data = await response.json()

        if (!response.ok || !data.success) {
          console.error("Storage API Error:", data)
          return
        }

        setStorage(data.storage)
      } catch (error) {
        console.error("Storage Fetch Error:", error)
      }
    }

    fetchStorage()
  }, [])

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex justify-center">

      <div className="min-h-screen w-full max-w-[390px] px-5 sm:max-w-[600px] lg:max-w-[900px]">

        {/* Header */}
        <div className="flex items-center justify-between pt-10">

          <Backtick/>

          <h1 className="text-[12px] font-semibold">
            Storage
          </h1>

          <div className="w-5" />

        </div>

        {/* Storage circle */}
        <div className="mt-8 flex justify-center">

          <div className="
            flex
            h-[130px]
            w-[130px]
            flex-col
            items-center
            justify-center
            rounded-full
            border-[5px]
            border-[#d71920]
            bg-[#111111]
          ">

            <p className="text-[18px] font-semibold">
               {(storage.total / (1024 * 1024 * 1024)).toFixed(2)} GB
            </p>

            <p className="mt-1 text-[8px] text-[#666666]">
              of 10 GB
            </p>

          </div>

        </div>

        <p className="mt-4 text-center text-[9px] text-[#777777]">
         Free: {(10 - storage.total / (1024 * 1024 * 1024)).toFixed(2)} GB remaining
        </p>

        {/* Storage items */}
        <div className="mt-8 space-y-3">

          {[
  [
    'Photos',
    (storage.photos / (1024 * 1024 * 1024)).toFixed(2) + ' GB',
    storage.total > 0
      ? `${((storage.photos / storage.total) * 100).toFixed(0)}%`
      : '0%',
  ],
  [
    'Videos',
    (storage.videos / (1024 * 1024 * 1024)).toFixed(2) + ' GB',
    storage.total > 0
      ? `${((storage.videos / storage.total) * 100).toFixed(0)}%`
      : '0%',
  ],
].map(([name, size, width]) => (

            <div
              key={name}
              className="rounded-[7px] bg-[#111111] px-4 py-3"
            >

              <div className="flex justify-between">

                <span className="text-[10px]">
                  {name}
                </span>

                <span className="text-[9px] text-[#777777]">
                  {size}
                </span>

              </div>

              <div className="mt-3 h-[2px] bg-[#222222]">
                <div
                  className="h-full bg-[#d71920]"
                  style={{ width }}
                />
              </div>

            </div>

          ))}

        </div>

        <button className="
          mt-6
          h-[40px]
          w-full
          rounded-full
          border border-[#222222]
          text-[10px]
        ">
          Manage Memories
        </button>

      </div>
    </div>
  )
}

export default Storage