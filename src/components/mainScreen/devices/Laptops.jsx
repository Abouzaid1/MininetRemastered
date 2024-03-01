import { Monitor, Laptop, Server, Router, Cable, ZoomOut, MailPlus, MailOpen, RadioReceiver } from 'lucide-react';
import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
export default function Laptops(props) {
    const { name, id, arrow } = props
    const [position, setPosition] = useState({ x: 0, y: 100 });
    const [dragging, setDragging] = useState(false);
    // const [offset, setOffset] = useState({ x: 0, y: 0 });
    const size = 50
    const strokeWidth = 1
    const iconClass = "text-primary mx-2"
    const divIconClass = "p-1 my-2 flex items-center justify-center transition-[0.2s] box-content h-[70px] w-[70px] hover:outline-dashed hover:outline-primary hover:outline-[2px] rounded-[28px] mx-2  hover:bg-background bg-secondary transition cursor-pointer"
    const handleMouseMove = (e) => {
        dragging ? setPosition({ x: e.clientY - 100, y: e.clientX - 50 }) : null

    }
    const getPosition = (e) => {
        setDragging(true)
    }
    const mouseUp = (e) => {
        setDragging(false)
    }
    return (
        <div>
            <div key={id} id={arrow} className='absolute' onMouseMove={handleMouseMove} onMouseDown={getPosition} onMouseUpCapture={mouseUp} onMouseUp={mouseUp}
                style={{ top: position.x, left: position.y }}
            >
                <div className={divIconClass}>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger><Laptop className={iconClass} size={size} strokeWidth={strokeWidth} /></TooltipTrigger>
                            <TooltipContent>
                                <p>{name}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </div>

    )
}