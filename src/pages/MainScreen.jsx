import NavBar from '@/components/mainScreen/NavBar'
import React, { useEffect } from 'react'
import Tools from '@/components/mainScreen/Tools'
import Devices from '@/components/mainScreen/Devices'
import Canvas from '@/components/mainScreen/Canvas'
import { RoomProvider } from '../../liveblocks.config';
import { ClientSideSuspense } from "@liveblocks/react";
import { useDispatch, useSelector } from 'react-redux'
import { getTopo } from '@/slices/topoSlice'
import topoId from '../components/mainScreen/topoId'
export default function MainScreen() {
    const dispatch = useDispatch();
    const topo = useSelector(state => state.topo)

    useEffect(() => {

        dispatch(getTopo(topoId))
    }, [])
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
