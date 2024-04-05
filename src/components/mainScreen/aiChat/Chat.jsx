import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { GoogleGenerativeAI } from '@google/generative-ai'
import { Skeleton } from "@/components/ui/skeleton"
import { CircleOff, SendHorizontal } from 'lucide-react';
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import axios from 'axios';
export default function Chat() {
    const [message, setMessage] = useState('')
    const [output, setOutput] = useState()
    const [loading, setLoading] = useState(false)
    // const safetySettings = [
    //     { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', probability: 'LOW' },
    //     { category: 'HARM_CATEGORY_HATE_SPEECH', probability: 'NEGLIGIBLE' },
    //     { category: 'HARM_CATEGORY_HARASSMENT', probability: 'HIGH' },
    //     {
    //         category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
    //         probability: 'NEGLIGIBLE'
    //     }
    // ];
    // const genAI = new GoogleGenerativeAI("AIzaSyCSsTjxFSuCWHixWhpLd2V1lydGSXFlp7I");
    // const clickHandler = async () => {
    //     if (message !== "") {

    //         setLoading(true);
    //         const model = genAI.getGenerativeModel({ model: "gemini-pro" ,safetySettings});
    //         setOutput("")
    //         const prompt = message

    //         const result = await model.generateContent(prompt);
    //         const response = await result.response;
    //         const text = response.text();
    //         if (text) {
    //             setLoading(false);
    //         }
    //         setOutput(text.replaceAll("*", ""))

    //         setMessage("")
    //     }
    //     // console.log(import.meta.env.API_KEY);
    // }
    // __________________________________________________________________________________________________
    const apiKey = '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';
    const endpoint = 'https://api.openai.com/v1/models';

    const clickHandler = async () => {
        setLoading(true)
        const prompt = message;
        const requestData = {
            prompt: prompt,
            max_tokens: 50, // Adjust as needed
            temperature: 0.7, // Adjust as needed
            n: 1 // Number of completions to generate
        };

        // Define the request headers
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        };

        // Send the request
        axios.post(endpoint, requestData, { headers: headers })
            .then(response => {
                console.log(response.data.choices[0].text);
                setOutput(response.data.choices[0].text)
                setLoading(false)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    return (
        <div className='min-w-[300px] transition-all p-5 max-w-[500px] min-h-[70px] max-h-[600px] z-30 bg-secondary absolute right-[20px] rounded-[10px] top-[100px] overflow-y-scroll'>
            {/* <p className='text-white font-semibold text-[30px]'>Gemini</p> */}
            <div className=' h-full '>
                <div className=' w-full '>
                    <Input value={message} onChange={(e) => { setMessage(e.target.value) }} type="text" className="text-white border-primary my-2 w-full rounded-3xl py-6 " placeholder="Email" />
                    {
                        message == "" ? <button disabled className=' w-full rounded-3xl py-2 bg-secondary border-[grey] border text-[grey] font-bold px-4 flex justify-center gap-3'>Type Something   <CircleOff /></button> : <button onClick={clickHandler} className=' w-full rounded-3xl py-2 bg-secondary border-white border text-white flex justify-center gap-3 font-bold px-4 '>Send  <SendHorizontal /></button>
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
                    {output}
                </div>

            </div>
        </div>
    )
}
