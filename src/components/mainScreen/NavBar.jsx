import React, { useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import image from "../../assets/image.png"
import { UserButton, useSession } from '@clerk/clerk-react'
import { socket } from '../../socket/socket';
export default function NavBar() {
  const [usersJoined, setUsersJoined] = React.useState([]);
  socket.on("joinRoom", (data) => {
    setUsersJoined(data);
  });
  useEffect(() => {
    console.log(usersJoined);
  }, [usersJoined])

  const session = useSession()
  console.log(session);
  return (
    <>
      <div className='bg-secondary w-full py-4 px-5 z-[10]'>
        <div className='flex justify-between items-center'>
          <div>
            <img src={image} className='w-[150px]' alt="" />
          </div>
          <div className='flex justify-center items-center gap-5'>

            <div className='px-3 py-1 border h-[50px] border-primary rounded-[10px] flex items-center justify-center gap-1'>
              <p className='text-primary'>Users in room</p>
              <div className='flex justify-center items-center gap-1'>
                {
                  usersJoined.map((user) => {
                    if (user.userPhoto != session?.session?.publicUserData.imageUrl) {
                      return (
                        <Avatar className="w-[30px] h-[30px]">
                          <AvatarImage className="" src={user.userPhoto} alt={user.user} />
                          {/* <AvatarImage src={user.userPhoto} alt={user.user} /> */}
                          <AvatarFallback>{user.user.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )
                    }
                  })
                }
              </div>
            </div>
            <div className='px-3 py-1 border h-[50px] border-primary rounded-[10px] flex items-center justify-center gap-1'>
              <p className='text-primary'>{session?.session?.publicUserData?.firstName + " " + session?.session?.publicUserData?.lastName}</p>
              <UserButton />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
