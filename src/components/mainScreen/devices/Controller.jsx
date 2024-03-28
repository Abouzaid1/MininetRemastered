import React, { useEffect, useState } from 'react';
import { Server } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDispatch, useSelector } from 'react-redux';
import { getDevice, updateDevice } from '@/slices/slice';
import { getTopo } from '@/slices/topoSlice';

export default function Controller(props) {
    const { itemId, name, id, actionHandler } = props;
    const [updatedDevice, setUpdatedDevice] = useState()
    const topo = useSelector(state => state.topo);
    const dispatch = useDispatch()
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const device = useSelector(state => state.device)
    useEffect(() => {
        dispatch(getDevice(itemId))
        console.log(device);
    }, [])
    useEffect(() => {
        if (device._id === itemId) {

            setPosition({ x: device?.position?.x, y: device?.position?.y })
            console.log("jd");
        }
    }, [device])

    const [dragging, setDragging] = useState(false);
    const size = 50;
    const strokeWidth = 1;
    const iconClass = "text-primary mx-2";
    const divIconClass = "p-1 my-2 flex items-center justify-center transition-[0.2s] box-content h-[70px] w-[70px] hover:outline-dashed hover:outline-primary hover:outline-[2px] rounded-[28px] mx-2  hover:bg-background bg-secondary transition cursor-pointer";
    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', mouseUp);
        if (dragging == false) {

            dispatch(updateDevice(updatedDevice))
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', mouseUp);
        };

    }, [dragging]);

    const handleMouseMove = (e) => {
        if (dragging) {
            setPosition({ x: e.clientY - 100, y: e.clientX - 50 });
            setUpdatedDevice({
                id: itemId,
                position: {
                    x: e.clientY - 100,
                    y: e.clientX - 50
                }
            })
        }

    };

    const getPosition = () => {
        setDragging(true);
    };

    const mouseUp = (e) => {
        setDragging(false)
    };
    // dispatch(getTopo("65def9f638ef056fe52852c1"))

    return (
        <div key={id} className='absolute' onMouseDown={getPosition} onClick={actionHandler}
            style={{ top: position.x, left: position.y }}
        >
            <div className={divIconClass} id={id} >
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger><Server className={iconClass} size={size} strokeWidth={strokeWidth} /></TooltipTrigger>
                        <TooltipContent>
                            <p>{name}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    );
}
