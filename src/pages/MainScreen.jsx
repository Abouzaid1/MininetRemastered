import NavBar from '@/components/mainScreen/NavBar'
import React from 'react'
import Tools from '@/components/mainScreen/Tools'
import Devices from '@/components/mainScreen/Devices'
import Canvas from '@/components/mainScreen/Canvas'
import { RoomProvider } from '../../liveblocks.config';
import { ClientSideSuspense } from "@liveblocks/react";
export default function MainScreen() {
    return (
        <>
            <NavBar></NavBar>
            <div className='w-full h-[1px] bg-background'></div>
            <div className="relative w-full h-[90vh]">
                <Tools />
                <Devices />
                <RoomProvider id="my-room" initialPresence={{}}>
                    <ClientSideSuspense fallback={<div>Loading…</div>}>
                        {() => <Canvas />}
                    </ClientSideSuspense>
                </RoomProvider>
            </div>
        </>
    )
}
