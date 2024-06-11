import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { GoogleGenerativeAI } from '@google/generative-ai'
import { Skeleton } from "@/components/ui/skeleton"
import { CircleOff, SendHorizontal } from 'lucide-react';
import { updateTopo } from '@/slices/topoSlice';
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { TextGenerateEffect } from "../../ui/text-generate-effect";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
export default function Chat() {
    const { topoId } = useParams();
    const [remoteController, setRemoteController] = useState("")
    const [remoteControllerPort, setRemoteControllerPort] = useState("")
    const [message, setMessage] = useState('')
    const [output, setOutput] = useState()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
    ];
    const genAI = new GoogleGenerativeAI("AIzaSyCSsTjxFSuCWHixWhpLd2V1lydGSXFlp7I");
    const clickHandler = async () => {
        if (message !== "") {

            setLoading(true);
            const model = genAI.getGenerativeModel({ model: "gemini-pro", safetySettings });
            setOutput("")
            const prompt = message

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            if (text) {
                setLoading(false);
            }
            setOutput(text.replaceAll("*", ""))

            setMessage("")
        }
        // console.log(import.meta.env.API_KEY);
    }
    // __________________________________________________________________________________________________
    return (
        <>
            <div className='min-w-[300px] transition-all p-5 max-w-[500px] min-h-[70px] max-h-[600px] z-30 bg-secondary absolute right-[-250px] hover:right-[20px] rounded-[10px]  top-[100px] overflow-y-scroll'>
                {/* <p className='text-white font-semibold text-[30px]'>Gemini</p> */}
                <div className=' h-full '>
                    <div className=' w-full '>
                        <Input value={message} onChange={(e) => { setMessage(e.target.value) }} type="text" className="text-white border-primary my-2 w-full rounded-3xl py-6 " placeholder="Talk to Gemini" />
                        {
                            message == "" ? <button disabled className=' w-full rounded-3xl py-2 bg-secondary border-[grey] border text-[grey] font-bold px-4 flex justify-center gap-3'>Type Something   <CircleOff /></button> : <button onClick={clickHandler} className=' w-full rounded-3xl py-2 bg-secondary border-white border text-white flex justify-center gap-3 font-bold px-4 '>Send  <SendHorizontal /></button>
                        }
                        {
                            output != "" && <button onClick={() => { setOutput("") }} className=' w-full rounded-3xl mt-4 py-2 bg-secondary border-[grey] border text-white  font-bold px-4 flex justify-center gap-3'>Clear<CircleOff /></button>
                        }

                    </div>
                    <div>
                        {loading && <div className="flex flex-col space-y-3 my-10">
                            <Skeleton className="h-4 w-[250px] rounded-xl" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </div>}

                    </div>
                    <div className='text-white'>
                        {
                            output && <TextGenerateEffect words={output} />
                        }

                        {/* {output} */}
                    </div>

                </div>
            </div>
            <div className='min-w-[300px] transition-all p-5 max-w-[500px] min-h-[70px] max-h-[600px] z-30 bg-secondary absolute right-[-250px] hover:right-[20px] rounded-[10px]  top-[500px] overflow-y-scroll'>
                {/* <p className='text-white font-semibold text-[30px]'>Gemini</p> */}
                <div className=' h-full '>
                    <h1 className='text-white font-bold'>Remote Controller</h1>
                    <div className=' w-full '>
                        <Input value={remoteController} onChange={(e) => { setRemoteController(e.target.value) }} type="text" className="text-white border-primary my-2 w-full rounded-3xl py-6 " placeholder="Remote Controller IP" />
                        <Input value={remoteControllerPort} onChange={(e) => { setRemoteControllerPort(e.target.value) }} type="text" className="text-white border-primary my-2 w-full rounded-3xl py-6 " placeholder="Remote Controller Port" />
                        {
                            remoteController == "" ? <button disabled className=' w-full rounded-3xl py-2 bg-secondary border-[grey] border text-[grey] font-bold px-4 flex justify-center gap-3'>Type Something   <CircleOff /></button> : <button onClick={() => { dispatch(updateTopo({ remoteController, remoteControllerPort, id: topoId })) }} className=' w-full rounded-3xl py-2 bg-secondary border-white border text-white flex justify-center gap-3 font-bold px-4 '>Send  <SendHorizontal /></button>
                        }


                    </div>


                </div>
            </div>
        </>
    )
}
