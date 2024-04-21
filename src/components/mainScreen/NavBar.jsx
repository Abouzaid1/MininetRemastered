import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import image from "../../assets/image (1).png"
import { UserButton, useSession } from '@clerk/clerk-react'
export default function NavBar() {
  const session = useSession()
  console.log(session);
  return (
    <>
      <div className='bg-secondary w-full py-4 px-5 z-[10]'>
        <div className='flex justify-between items-center'>
          <div>
            <img src={image} className='w-[150px]' alt="" />
          </div>
          <div className='px-3 py-1 border h-[50px] border-primary rounded-[10px] flex items-center justify-center gap-1'>
              <p className='text-primary'>{session?.session?.publicUserData?.firstName+" "+session?.session?.publicUserData?.lastName}</p>
              <UserButton/>
          </div>
        </div>
      </div>
    </>
  )
}
