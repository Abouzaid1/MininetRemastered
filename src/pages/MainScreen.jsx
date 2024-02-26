import NavBar from '@/components/mainScreen/NavBar'
import React from 'react'
import Tools from '@/components/mainScreen/Tools'
import Devices from '@/components/mainScreen/Devices'
export default function MainScreen() {
    return (
        <>
            <NavBar></NavBar>
            <div className='w-full h-[1px] bg-border'></div>
            <div className="relative w-full h-[90vh]">
                <Tools></Tools>
                <Devices></Devices>
            </div>
        </>
    )
}
