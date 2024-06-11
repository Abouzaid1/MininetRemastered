import React, { useState } from 'react'
import { MousePointerSquareDashed, Search, XCircle, File, ZoomIn, ZoomOut, MailPlus, MailOpen } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useDispatch, useSelector } from 'react-redux';
import { getToolName } from '@/slices/toolSlice';
import { socketMininetPython } from '@/socket/socket';
import { getTopo } from '@/slices/topoSlice';
import topoId from './topoId';
export default function Tools() {
  const dispatch = useDispatch()
  const topo = useSelector(state => state.topo)
  const size = 35
  const strokeWidth = 1.25
  const iconClass = "text-primary "
  const divIconClass = "p-2 px-3 my-2 flex items-center justify-center box-content rounded-[12px] hover:bg-background transition cursor-pointer"
  const clickedIcon = useSelector(state => state.tool)
  const ping = () => {
    socketMininetPython.connect();
    dispatch(getTopo(topoId))
    socketMininetPython.emit("joinTopo", {
      topo
    })
  }

  return (
    <>
      <div className='w-[75px] z-20 bg-secondary absolute left-[20px] rounded-[10px] top-[100px] overflow-hidden p-3'>
        <div onClick={() => { dispatch(getToolName("mouse")) }} className={`${divIconClass} + ${clickedIcon === "mouse" ? "bg-background" : ""}`}   >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger><MousePointerSquareDashed className={iconClass} size={size} strokeWidth={strokeWidth} /></TooltipTrigger>
              <TooltipContent>
                <p>Mouse</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className={`${divIconClass} + ${clickedIcon === "delete" ? "bg-background" : ""}`} onClick={() => { dispatch(getToolName("delete")) }}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger><XCircle className={iconClass} size={size} strokeWidth={strokeWidth} /></TooltipTrigger>
              <TooltipContent>
                <p>Delete</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <hr />
        <div className={`${divIconClass} + ${clickedIcon === "zoomIn" ? "bg-background" : ""}`} onClick={() => { dispatch(getToolName("zoomIn")) }}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger><ZoomIn className={iconClass} size={size} strokeWidth={strokeWidth} /></TooltipTrigger>
              <TooltipContent>
                <p>ZoomIn</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className={`${divIconClass} + ${clickedIcon === "zoomOut" ? "bg-background" : ""}`} onClick={() => { dispatch(getToolName("zoomOut")) }}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger><ZoomOut className={iconClass} size={size} strokeWidth={strokeWidth} /></TooltipTrigger>
              <TooltipContent>
                <p>ZoomOut</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <hr />
        <div className={`${divIconClass} + ${clickedIcon === "ping" ? "bg-background" : ""}`} onClick={ping}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger><MailPlus className={iconClass} size={size} strokeWidth={strokeWidth} /></TooltipTrigger>
              <TooltipContent>
                <p>Ping All</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

    </>
  )
}
