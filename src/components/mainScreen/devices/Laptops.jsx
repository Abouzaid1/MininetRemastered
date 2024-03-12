import React, { useEffect, useState } from 'react';
import { Laptop } from 'lucide-react';
import {useXarrow} from "react-xarrows"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Controller(props) {
    const { name, id,actionHandler } = props;
    const [position, setPosition] = useState({ x: 0, y: 100 });
    const [dragging, setDragging] = useState(false);
    const size = 50;
    const strokeWidth = 1;
    const iconClass = "text-primary mx-2";
    const divIconClass = "p-1 my-2 flex items-center justify-center transition-[0.2s] box-content h-[70px] w-[70px] hover:outline-dashed hover:outline-primary hover:outline-[2px] rounded-[28px] mx-2  hover:bg-background bg-secondary transition cursor-pointer";
    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', mouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', mouseUp);
        };
    }, [dragging]);

    const handleMouseMove = (e) => {
        if (dragging) {
            setPosition({ x: e.clientY - 100, y: e.clientX - 50 });
        }
    };

    const getPosition = () => {
        setDragging(true);
    };

    const mouseUp = () => {
        setDragging(false);

    };

    return (
        <div  key={id} className='absolute' onMouseDown={getPosition} onClick={actionHandler}
            style={{ top: position.x, left: position.y }}
        >
            <div className={divIconClass} id={id} >
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
    );
}
