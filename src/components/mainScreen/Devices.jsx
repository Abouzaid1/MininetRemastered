import React from 'react'
import { Monitor, Laptop, Server, Router, Cable, ZoomOut, MailPlus, MailOpen, RadioReceiver } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
export default function Devices() {
    const size = 50
    const strokeWidth = 1
    const iconClass = "text-primary mx-2"
    const divIconClass = "p-1 my-2 flex items-center justify-center transition-[0.2s] box-content h-[70px] w-[70px] rounded-[12px] mx-2 hover:bg-background bg-secondary transition cursor-pointer"
    return (
        <>
            <div className='flex justify-center'>
                <div className='px-4 bg-background flex absolute m-auto rounded-[20px] bottom-[20px] overflow-hidden p-1'>
                    <div className={divIconClass}>
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
                                <TooltipTrigger><Laptop className={iconClass} size={size} strokeWidth={strokeWidth} /></TooltipTrigger>
                                <TooltipContent>
                                    <p>Laptop</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div className={divIconClass}>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger><Server className={iconClass} size={size} strokeWidth={strokeWidth} /></TooltipTrigger>
                                <TooltipContent>
                                    <p>Server</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div className={divIconClass}>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger><RadioReceiver className={iconClass} size={size} strokeWidth={strokeWidth} /></TooltipTrigger>
                                <TooltipContent>
                                    <p>RadioReceiver </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div className={divIconClass}>
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
