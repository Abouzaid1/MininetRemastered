import React from 'react'
import { MousePointerSquareDashed, Search, XCircle, File, ZoomIn, ZoomOut, MailPlus, MailOpen } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
export default function Tools() {
  const size = 35
  const strokeWidth = 1.25
  const iconClass = "text-primary"
  const divIconClass = "p-2 px-3 my-2 flex items-center justify-center box-content rounded-[12px] hover:bg-secondary transition cursor-pointer"
  return (
    <>
      <div className='w-[75px] bg-background absolute left-[20px] rounded-[20px] top-[100px] overflow-hidden p-3'>
        <div className={divIconClass}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger><MousePointerSquareDashed className={iconClass} size={size} strokeWidth={strokeWidth} /></TooltipTrigger>
              <TooltipContent>
                <p>MousePointerSquareDashed</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className={divIconClass}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger><Search className={iconClass} size={size} strokeWidth={strokeWidth} /></TooltipTrigger>
              <TooltipContent>
                <p>Search</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className={divIconClass}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger><XCircle className={iconClass} size={size} strokeWidth={strokeWidth} /></TooltipTrigger>
              <TooltipContent>
                <p>XCircle</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className={divIconClass}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger><File className={iconClass} size={size} strokeWidth={strokeWidth} /></TooltipTrigger>
              <TooltipContent>
                <p>File</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <hr />
        <div className={divIconClass}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger><ZoomIn className={iconClass} size={size} strokeWidth={strokeWidth} /></TooltipTrigger>
              <TooltipContent>
                <p>ZoomIn</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className={divIconClass}>
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
        <div className={divIconClass}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger><MailPlus className={iconClass} size={size} strokeWidth={strokeWidth} /></TooltipTrigger>
              <TooltipContent>
                <p>MailPlus</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className={divIconClass}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger><MailOpen className={iconClass} size={size} strokeWidth={strokeWidth} /></TooltipTrigger>
              <TooltipContent>
                <p>MailOpen</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </>
  )
}
