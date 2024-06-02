import React, { useEffect, useState } from 'react'
import { Monitor, Laptop, Server, Router, Cable, ZoomOut, MailPlus, MailOpen, RadioReceiver } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner";
import { useDispatch, useSelector } from 'react-redux';
import { getTopo } from '@/slices/topoSlice';
import { addDevice } from '@/slices/slice';
import { Input } from "@/components/ui/input"
import { Button } from '../ui/button';
import { getToolName } from '@/slices/toolSlice';
// import topoId from './topoId';
export default function Devices(props) {
    const [device, setDevice] = useState({})
    const pc = "pc"
    const sw = "sw"
    const ro = "ro"
    const co = "co"
    const la = "la"
    const [hostName, setHostName] = useState({
        pc: "",
        sw: "",
        ro: "",
        co: "",
        la: ""
    })
    const {topoId} = props
    const url = import.meta.env.VITE_URL
    const tool = useSelector(state => state.tool)
    const topo = useSelector(state => state.topo)
    const dispatch = useDispatch()
    const size = 50
    const strokeWidth = 1
    const iconClass = "text-primary mx-2"
    const divIconClass = "p-1 my-2 flex items-center justify-center transition-[0.2s] box-content h-[70px] w-[70px] hover:outline-dashed hover:outline-primary hover:outline-[2px] rounded-[28px] mx-2  hover:bg-secondary bg-background transition cursor-pointer"
    const handleChange = (e) => {
        const { name, value } = e.target;
        setHostName((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    const addHandler = (deviceType) => {
        
        setDevice({
            type: deviceType,
            name: hostName[deviceType],
            position: { x: 0, y: 0 },
            topoId: topoId
        })
    }
    useEffect(() => {
        if (device.type) {
            if (device.name) {
                dispatch(addDevice(device))
                setTimeout(() => dispatch(getTopo(topoId)),2000)
            }
            else {
                toast("You need to write a host name");
            }
        }
    }, [device])

    useEffect(() => { 
    }, [topo])
    return (
        <>
            <div className='flex justify-center'>
                <div className='px-2 bg-secondary z-20 flex absolute m-auto rounded-[30px] bottom-[20px] overflow-hidden p-1'>
                    <Dialog >
                        <DialogTrigger>
                            <div className={divIconClass} >
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger><Monitor className={iconClass} size={size} strokeWidth={strokeWidth} /></TooltipTrigger>
                                        <TooltipContent>
                                            <p>Monitor</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </DialogTrigger>
                        <DialogContent className="bg-primary text-secondary">
                            <DialogHeader>
                                <DialogTitle className="text-[25px]">Write the host name?</DialogTitle>
                                <DialogDescription >
                                    <Input onChange={(e) => { handleChange(e) }} className="mb-8 mt-4" name="pc" placeholder="It should be a number" />
                                </DialogDescription>
                                <DialogClose asChild>

                                    <Button className="" onClick={() => addHandler(pc)}>Add PC</Button>
                                </DialogClose>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <Dialog>
                        <DialogTrigger>
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
                        </DialogTrigger>
                        <DialogContent className="bg-primary text-secondary">
                            <DialogHeader>
                                <DialogTitle className="text-[25px]">Write the host name?</DialogTitle>
                                <DialogDescription >
                                    <Input onChange={(e) => { handleChange(e) }} className="mb-8 mt-4" name="la" placeholder="It should be a number" />
                                </DialogDescription>
                                <DialogClose asChild>

                                    <Button className="" onClick={() => addHandler(la)}>Add Laptop</Button>
                                </DialogClose>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <Dialog>
                        <DialogTrigger>
                            <div className={divIconClass} >
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger><Server className={iconClass} size={size} strokeWidth={strokeWidth} /></TooltipTrigger>
                                        <TooltipContent>
                                            <p>Server</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </DialogTrigger>
                        <DialogContent className="bg-primary text-secondary">
                            <DialogHeader>
                                <DialogTitle className="text-[25px]">Write the host name?</DialogTitle>
                                <DialogDescription >
                                    <Input onChange={(e) => { handleChange(e) }} className="mb-8 mt-4" name="co" placeholder="It should be a number" />
                                </DialogDescription>
                                <DialogClose asChild>

                                    <Button className="" onClick={() => addHandler(co)}>Add Controller</Button>
                                </DialogClose>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <Dialog >
                        <DialogTrigger>
                            <div className={divIconClass}>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger><RadioReceiver className={iconClass} size={size} strokeWidth={strokeWidth} /></TooltipTrigger>
                                        <TooltipContent>
                                            <p>RadioReceiver</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </DialogTrigger>
                        <DialogContent className="bg-primary text-secondary">
                            <DialogHeader>
                                <DialogTitle className="text-[25px]">Write the host name?</DialogTitle>
                                <DialogDescription >
                                    <Input onChange={(e) => { handleChange(e) }} className="mb-8 mt-4" name="sw" placeholder="It should be a number" />
                                </DialogDescription>
                                <DialogClose asChild>

                                    <Button className="" onClick={() => addHandler(sw)}>Add Switch</Button>
                                </DialogClose>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <Dialog >
                        <DialogTrigger>
                            <div className={divIconClass} id='comp2' >
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger><Router className={iconClass} size={size} strokeWidth={strokeWidth} /></TooltipTrigger>
                                        <TooltipContent>
                                            <p>Router</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </DialogTrigger>
                        <DialogContent className="bg-primary text-secondary">
                            <DialogHeader>
                                <DialogTitle className="text-[25px]">Write the host name?</DialogTitle>
                                <DialogDescription >
                                    <Input onChange={(e) => { handleChange(e) }} className="mb-8 mt-4" name="ro" placeholder="It should be a number" />
                                </DialogDescription>
                                <DialogClose asChild>

                                    <Button className="" onClick={() => addHandler(ro)}>Add Router</Button>
                                </DialogClose>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <div className={`${divIconClass} ${tool === "link" ? "bg-secondary" : ""}`} onClick={() => dispatch(getToolName("link"))}>
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
