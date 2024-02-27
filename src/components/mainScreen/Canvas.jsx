import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPc } from '@/slices/pcSlice'
import PC from './devices/PC';
export default function Canvas() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPc())
    }, [])
    const pc = useSelector(state => state.pc)
  
    return (
        <div className='bg-background w-full h-full absolute top-0 z-0' >
            <div className='relative'>
                {
                    pc && pc.map((item) => {
                        return (
                            <>
                                <PC key={item.id} name={item.name}></PC>
                            </>
                        )
                    })
                }
            </div >
        </div >
    )
}
