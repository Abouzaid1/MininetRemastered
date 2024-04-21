import React from 'react'
import { SignIn, SignUp } from '@clerk/clerk-react'
export default function Auth() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <SignIn>
            <SignUp />
      </SignIn>
      {/* <SignUp/> */}
    </div>
  )
}
