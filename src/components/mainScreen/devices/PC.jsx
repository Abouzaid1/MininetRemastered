import React, { useEffect, useState, useRef } from 'react';
import { Monitor } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDispatch, useSelector } from 'react-redux';
import { getDevice, updateDevice } from '@/slices/slice';
import { getTopo } from '@/slices/topoSlice';
import { socket } from '../../../socket/socket';
// import topoId from '../topoId';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
export default function PC(props) {
    const { itemId, name, id, actionHandler, deleteHandler, topoId } = props;
    const [updatedDevice, setUpdatedDevice] = useState();
    const topo = useSelector(state => state.topo);
    const dispatch = useDispatch();
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const device = useSelector(state => state.device);
    const [dragging, setDragging] = useState(false);
    const size = 50;
    const tool = useSelector(state => state.tool);
    const strokeWidth = 1;
    const iconClass = "text-primary mx-2";
    const divIconClass = "p-1 my-2 flex items-center justify-center transition-[0.2s] box-content h-[70px] w-[70px] hover:outline-dashed hover:outline-primary hover:outline-[2px] rounded-[28px] mx-2  hover:bg-background bg-secondary transition cursor-pointer";
    const prevItemIdRef = useRef();
    const [open, setOpen] = useState(false);
    useEffect(() => {
        dispatch(getDevice(itemId));
    }, []);

    useEffect(() => {
        if (device._id === itemId) {
            setPosition({ x: device?.position?.x, y: device?.position?.y });
        }
    }, [device]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (dragging) {
                setPosition({ x: e.clientY - 100, y: e.clientX - 50 });
                setUpdatedDevice({
                    id: itemId,
                    position: {
                        x: e.clientY - 100,
                        y: e.clientX - 50
                    }
                });
                socket.emit("controllerMove", {
                    x: e.clientY - 100,
                    y: e.clientX - 50,
                    id: itemId,
                    room:topoId
                });
            }
        };

        const mouseUp = () => {
            setDragging(false);
        };
        if (dragging == false) {
            dispatch(updateDevice(updatedDevice))
        }
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', mouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', mouseUp);
        };
    }, [dragging]);

    useEffect(() => {
        prevItemIdRef.current = itemId;
    }, [itemId]);

    useEffect(() => {

        socket.on("controllerMove", (data) => {
            if (prevItemIdRef.current == data.id) {
                setPosition({ x: data.x, y: data.y });
            }
        });

        return () => {
            socket.off("controllerMove");
        };
    }, []);

    const getPosition = () => {
        if (!open) {
            setDragging(true);
        }
    };

    return (
        <div key={id} className='absolute' onMouseDown={tool == "delete" ? actionHandler : getPosition}
            style={{ top: position.x, left: position.y }} onClick={actionHandler} onMouseUp={deleteHandler}
        >
            <div className={divIconClass} id={id} >
                <TooltipProvider>
                    <Tooltip>
                        {
                            tool =="mouse"  ? <Dialog onOpenChange={() => { setOpen(!open) }}>
                                <DialogTrigger>
                                    <TooltipTrigger><Monitor className={iconClass} size={size} strokeWidth={strokeWidth} /></TooltipTrigger>
                                    <TooltipContent>
                                        <p>{name}</p>
                                    </TooltipContent>
                                </DialogTrigger>
                                <DialogContent className="bg-primary text-secondary">
                                    <DialogHeader className="flex-1 gap-[20px]">
                                        <h1 className='text-[20px] font-bold mb-[20px]'>PC</h1>
                                        <div>
                                            <DialogTitle className="mb-2">Host Name</DialogTitle>
                                            <DialogDescription>
                                                <Input placeholder="Host Name" value={device.name} className="text-white" />
                                            </DialogDescription>
                                        </div>
                                        <div>
                                            <DialogTitle className="mb-2">IP Address</DialogTitle>
                                            <DialogDescription>
                                                <Input placeholder="IP Address" className="text-white" />
                                            </DialogDescription>
                                        </div>
                                        <div>
                                            <DialogTitle className="mb-2">Default Gateway</DialogTitle>
                                            <DialogDescription>
                                                <Input placeholder="Default Gateway" className="text-white" />
                                            </DialogDescription>
                                        </div>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog> : <>
                                    <TooltipTrigger><Monitor className={iconClass} size={size} strokeWidth={strokeWidth} /></TooltipTrigger>
                                <TooltipContent>
                                    <p>{name}</p>
                                </TooltipContent></>
                        }
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    );
}
