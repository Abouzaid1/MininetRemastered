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
export default function NavBar() {
  return (
    <>
      <div className='bg-secondary w-full py-4 px-5 z-[10]'>
        <div className='flex justify-between items-center'>
          <div>
            <img src={image} className='w-[150px]' alt="" />
          </div>
          <div>
            <Select>
              <SelectTrigger className="border-primary w-[500px] h-[40px] text-[15px] text-foreground">
                <SelectValue className='' placeholder="Your current file.py" />
              </SelectTrigger>
              <SelectContent className="bg-primary text-white">
                <SelectItem className="text-white text-[15px]" value="light">file.py</SelectItem>
                <SelectItem className="text-white text-[15px]" value="dark">file.py</SelectItem>
                <SelectItem className="text-white text-[15px]" value="system">filr.py</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='px-3 py-1 border border-primary rounded-[10px] flex items-center justify-center gap-10'>
            <p className='text-primary'>Hi Abouzaid</p>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </>
  )
}
