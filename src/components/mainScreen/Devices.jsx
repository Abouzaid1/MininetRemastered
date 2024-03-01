import React, { useEffect, useState } from 'react'
import { Monitor, Laptop, Server, Router, Cable, ZoomOut, MailPlus, MailOpen, RadioReceiver } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useDispatch, useSelector } from 'react-redux';
import { getTopo } from '@/slices/topoSlice';
import { addDevice } from '@/slices/slice';
import axios from 'axios';
export default function Devices() {
    const [device, setDevice] = useState({})
    const pc = "pc"
    const sw = "sw"
    const ro = "ro"
    const co = "co"
    const la = "la"
    const x = Math.floor(Math.random() * 1000)
    const y = Math.floor(Math.random() * 1000)
    const dispatch = useDispatch()
    const size = 50
    const strokeWidth = 1
    const iconClass = "text-primary mx-2"
    const divIconClass = "p-1 my-2 flex items-center justify-center transition-[0.2s] box-content h-[70px] w-[70px] hover:outline-dashed hover:outline-primary hover:outline-[2px] rounded-[28px] mx-2  hover:bg-secondary bg-background transition cursor-pointer"
    const addHandler = (deviceType) => {
        setDevice({
            type: deviceType,
            name: "h1",
            position: { x: x, y: y },
            topoId: "65def9f638ef056fe52852c1"
        })
    }
    useEffect(() => {
        if (device.type) {

            dispatch(addDevice(device))
            setTimeout(() => { dispatch(getTopo("65def9f638ef056fe52852c1")) }, 500)
            console.log("test");
        }
    }, [device])
    return (
        <>
            <div className='flex justify-center'>
                <div className='px-2 bg-secondary z-20 flex absolute m-auto rounded-[30px] bottom-[20px] overflow-hidden p-1'>
                    <div className={divIconClass} onClick={() => addHandler(pc)}>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger><Monitor className={iconClass} size={size} strokeWidth={strokeWidth} /></TooltipTrigger>
                                <TooltipContent>
                                    <p>Monitor</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div className={divIconClass}>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger><Laptop className={iconClass} onClick={() => addHandler(la)} size={size} strokeWidth={strokeWidth} /></TooltipTrigger>
                                <TooltipContent>
                                    <p>Laptop</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div className={divIconClass} id='comp1' onClick={() => addHandler(co)}>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger><Server className={iconClass} size={size} strokeWidth={strokeWidth} /></TooltipTrigger>
                                <TooltipContent>
                                    <p>Server</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div className={divIconClass} onClick={() => addHandler(sw)}>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger><RadioReceiver className={iconClass} size={size} strokeWidth={strokeWidth} /></TooltipTrigger>
                                <TooltipContent>
                                    <p>RadioReceiver</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div className={divIconClass} id='comp2' onClick={() => addHandler(ro)}>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger><Router className={iconClass} size={size} strokeWidth={strokeWidth} /></TooltipTrigger>
                                <TooltipContent>
                                    <p>Router</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div className={divIconClass}>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger><Cable className={iconClass} size={size} strokeWidth={strokeWidth} /></TooltipTrigger>
                                <TooltipContent>
                                    <p>Cable</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
            </div>
        </>
    )
}
