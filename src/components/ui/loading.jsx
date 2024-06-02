import React from 'react'

export default function Loading() {
  return (
      <div className='z-[10000] backdrop-blur-sm absolute top-[-100px] flex justify-center items-center w-full h-screen'>
          <div className=" animate-spin inline-block size-20 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading">
              <span className="sr-only">Loading...</span>
          </div>
      </div>
  )
}
