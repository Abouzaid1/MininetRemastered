import NavBar from '@/components/mainScreen/NavBar'
import React, { useEffect, useState } from 'react'
import Tools from '@/components/mainScreen/Tools'
import Devices from '@/components/mainScreen/Devices'
import Canvas from '@/components/mainScreen/Canvas'
import Chat from '@/components/mainScreen/aiChat/Chat.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { getTopo } from '@/slices/topoSlice'
// import topoId from '../components/mainScreen/topoId'
import { useParams } from "react-router-dom";
import { socket } from '../socket/socket';
import { MousePointer2 } from 'lucide-react';
import { useSession } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';
export default function MainScreen() {
    const { session, isLoaded, isSignedIn } = useSession()
    const navigate = useNavigate()
        const getSession = () => {
            if (!isLoaded) {
                // Add logic to handle loading state
                return null;
            }
            if (!isSignedIn) {
                navigate("/");
                return null
            }
        }
        getSession()
    const dispatch = useDispatch();
    const { topoId } = useParams()
    const [mouse, setMouse] = useState({})
    useEffect(() => {
        dispatch(getTopo(topoId))
    }, [])
    useEffect(() => {

        // Establish socket connection when the component mounts
        socket.connect();
        socket.emit('dataFromClient', { room: topoId, message: 'Hello from client!' });
        // Clean up function to close the socket connection when the component unmounts

    }, []);

    socket.on("mouseMove", (data) => {
        setMouse({ x: data.x, y: data.y });
    })
    useEffect(() => {
        const handleMouseMove = (event) => {
            // Emit mouse movement data to the server
            socket.emit("mouseMove", {
                x: event.clientX,
                y: event.clientY,
                room: topoId
            });
        };

        // Add event listener for mousemove
        window.addEventListener("mousemove", handleMouseMove);

        // Cleanup function to remove event listener when component unmounts
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);
    return (
        <>
            <div className="w-[50px] h-[50px] absolute  z-[100]" style={{ top: `${mouse.y}px`, left: `${mouse.x}px` }}>
                <MousePointer2 color="white" />
                <p className="text-white ">Abouzaid</p>

            </div>

            <div className='w-full h-[1px] bg-background'></div>
            <div className="relative w-full h-[90vh]">
                <Chat />
                <Tools />
                <Devices topoId={topoId} />
                <Canvas topoId={topoId} />
            </div>
        </>
    )
}
