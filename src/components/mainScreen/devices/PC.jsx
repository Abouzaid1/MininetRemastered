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
import { getToolName } from '@/slices/toolSlice';
// import topoId from '../topoId';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
export default function PC(props) {
    const { itemId, name, id, actionHandler, deleteHandler, topoId, ipAddress, gateWayComming, x, y } = props;
    const [updatedDevice, setUpdatedDevice] = useState();
    const topo = useSelector(state => state.topo);
    const dispatch = useDispatch();
    const [position, setPosition] = useState({ x: x, y: y });
    const device = useSelector(state => state.device);
    const tool = useSelector(state => state.tool);
    const [dragging, setDragging] = useState(false);
    const [open, setOpen] = useState(false);
    const size = 50;
    const strokeWidth = 1;
    const iconClass = "text-primary mx-2";
    const divIconClass = "p-1 my-2 flex items-center justify-center hover:shadow-2xl hover:shadow-gray-600  transition-[0.2s] box-content h-[70px] w-[70px] hover:outline-dashed hover:outline-primary hover:outline-[2px] rounded-[28px] mx-2  hover:bg-background bg-secondary transition cursor-pointer";
    const prevItemIdRef = useRef();
    const [hostName, setHostName] = useState(name)
    const [deviceIpAddress, setDeviceIpAddress] = useState(ipAddress)
    const [gateWay, setGateWay] = useState(gateWayComming)
    // useEffect(() => {
    //     dispatch(getDevice(itemId));
    // }, []);

    useEffect(() => {
        // if (device._id === itemId) {
        // setPosition({ x: device?.position?.x, y: device?.position?.y });
        setPosition({ x: x, y: y })
        // }
    }, []);
    const handleIpAddressChange = (e) => {
        setDeviceIpAddress(e.target.value);
        console.log(e.target.value);
    }
    const handleGateWayChange = (e) => {
        setGateWay(e.target.value);
        console.log(e.target.value);
    }
    socket.on("deviceUpdate", (data) => {
        setGateWay(data.defaultGateWay)
        setDeviceIpAddress(data.ipAddress)
    })
    const updateData = () => {
        console.log("data");
        dispatch(updateDevice({ ipAddress: deviceIpAddress, defaultGateWay: gateWay, id: itemId }))
        socket.emit("deviceUpdate", {
            id: itemId,
            ipAddress: deviceIpAddress,
            defaultGateWay: gateWay,
            room: topoId,
            name: hostName,
        })
    }
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
                    room: topoId
                });
            }

        };

        const mouseUp = () => {
            setDragging(false);
        };
        if (dragging == false) {
            dispatch(updateDevice(updatedDevice))
        }
        console.log(open);

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
        <div key={id} className='absolute' onMouseDown={getPosition} onClick={actionHandler} onMouseUp={tool == "delete" ? deleteHandler : null}
            style={{ top: position.x, left: position.y }}
        >
            <div className={divIconClass} id={id} >
                <TooltipProvider>
                    <Tooltip>
                        {
                            tool == "mouse" ? <Dialog onOpenChange={() => { setOpen(!open) }}>
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
                                                <Input placeholder="Host Name" value={hostName} className="text-white" />
                                            </DialogDescription>
                                        </div>
                                        <div>
                                            <DialogTitle className="mb-2">IP Address</DialogTitle>
                                            <DialogDescription>
                                                <Input placeholder="IP Address" onChange={(e) => { handleIpAddressChange(e) }} value={deviceIpAddress} className="text-white" />
                                            </DialogDescription>
                                        </div>
                                        <div>
                                            <DialogTitle className="mb-2">Default GateWay</DialogTitle>
                                            <DialogDescription>
                                                <Input placeholder="IP Address" onChange={(e) => { handleGateWayChange(e) }} value={gateWay} className="text-white" />
                                            </DialogDescription>
                                        </div>
                                        <div>
                                            <Button onClick={updateData} className="bg-white text-black hover:text-white font-[500] w-full">Update</Button>
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
