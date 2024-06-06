import NavBar from '@/components/mainScreen/NavBar';
import React, { useEffect, useState } from 'react';
import Tools from '@/components/mainScreen/Tools';
import Devices from '@/components/mainScreen/Devices';
import Canvas from '@/components/mainScreen/Canvas';
import Chat from '@/components/mainScreen/aiChat/Chat.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getTopo } from '@/slices/topoSlice';
import { useParams } from "react-router-dom";
import { socket } from '../socket/socket';
import { MousePointer2 } from 'lucide-react';
import { useSession } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';

export default function MainScreen() {
    const { session, isLoaded, isSignedIn } = useSession();
    const navigate = useNavigate();
    const [usersJoined, setUsersJoined] = useState([]);
    const dispatch = useDispatch();
    const { topoId } = useParams();
    const [mousePositions, setMousePositions] = useState({});

    const getSession = () => {
        if (!isSignedIn) {
            navigate("/");
        }
    }
    getSession();

    useEffect(() => {
        socket.connect();
        socket.emit('dataFromClient', { room: topoId, message: 'Hello from client!' });
        return () => {
            socket.disconnect();
        };
    }, [topoId]);

    useEffect(() => {
        if (session) {
            socket.emit("joinRoom", {
                room: topoId,
                user: session.publicUserData.identifier,
                userPhoto: session.publicUserData.imageUrl
            });
        }
    }, [session, topoId]);

    useEffect(() => {
        socket.on("joinRoom", (data) => {
            setUsersJoined(data);
        });

        socket.on("mouseMove", (data) => {
            setMousePositions((prevPositions) => ({
                ...prevPositions,
                [data.user]: { x: data.x, y: data.y }
            }));
        });

        return () => {
            socket.off("joinRoom");
            socket.off("mouseMove");
        };
    }, []);

    useEffect(() => {
        const handleMouseMove = (event) => {
            if (session) {
                socket.emit("mouseMove", {
                    x: event.clientX,
                    y: event.clientY,
                    room: topoId,
                    user: session.publicUserData.identifier
                });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [session, topoId]);

    return (
        <>
            {usersJoined.map((item) => {
                const mouse = mousePositions[item.user];
                if (item.user !== session?.publicUserData?.identifier && mouse) {
                    const name = item.user
                    return (
                        <div
                            key={item.user}
                            className="w-[50px] h-[50px] absolute z-[100]"
                            style={{ top: `${mouse.y}px`, left: `${mouse.x}px` }}
                        >
                            <MousePointer2 color="white" />
                            <p className="text-white">{name.split('@')[0]}</p>
                        </div>
                    );
                }
                return null;
            })}

            <div className='w-full h-[1px] bg-background'></div>
            <div className="relative w-full h-[90vh]">
                <Chat />
                <Tools />
                <Devices topoId={topoId} />
                <Canvas topoId={topoId} />
            </div>
        </>
    );
}
// import NavBar from '@/components/mainScreen/NavBar'
// import React, { useEffect, useState } from 'react'
// import Tools from '@/components/mainScreen/Tools'
// import Devices from '@/components/mainScreen/Devices'
// import Canvas from '@/components/mainScreen/Canvas'
// import Chat from '@/components/mainScreen/aiChat/Chat.jsx'
// import { useDispatch, useSelector } from 'react-redux'
// import { getTopo } from '@/slices/topoSlice'
// // import topoId from '../components/mainScreen/topoId'
// import { useParams } from "react-router-dom";
// import { socket } from '../socket/socket';
// import { MousePointer2 } from 'lucide-react';
// import { useSession } from "@clerk/clerk-react";
// import { useNavigate } from 'react-router-dom';
// export default function MainScreen() {
//     const { session, isLoaded, isSignedIn } = useSession()
//     const navigate = useNavigate()
//     const [usersJoined, setUsersJoined] = useState()
//     const getSession = () => {
//         if (!isSignedIn) {
//             navigate("/");
//         }
//     }
//     getSession()
//     const dispatch = useDispatch();
//     const { topoId } = useParams()
//     const [mouse, setMouse] = useState({})
//     const [users, setUsers] = useState([]);
//     const [mousePositions, setMousePositions] = useState({});
//     useEffect(() => {
//         // dispatch(getTopo(topoId))
//         // Establish socket connection when the component mounts
//         socket.connect();
//         socket.emit('dataFromClient', { room: topoId, message: 'Hello from client!' });
//         // Clean up function to close the socket connection when the component unmounts

//     }, []);
//     useEffect(() => {
//         if (session) {
//             socket.emit("joinRoom", {
//                 room: topoId,
//                 user: session.publicUserData.identifier
//             })
//         }
//     }, [session])


//     socket.on("joinRoom", (data) => {
//         setUsersJoined(data)
//     })
//     useEffect(() => {
//         console.log(usersJoined);

//     }, [usersJoined])
//     socket.on("mouseMove", (data) => {
//         // console.log(data);
//         // setMouse({ x: data.x, y: data.y });
//         setMouse((prevPositions) => ({
//             ...prevPositions,
//             [data.user]: { x: data.x, y: data.y }
//         }));
//     })
//     useEffect(() => {
//         const handleMouseMove = (event) => {
//             // Emit mouse movement data to the server
//             socket.emit("mouseMove", {
//                 x: event.clientX,
//                 y: event.clientY,
//                 room: topoId,
//                 user: session?.publicUserData?.identifier
//             });
//         };

//         // Add event listener for mousemove
//         window.addEventListener("mousemove", handleMouseMove);

//         // Cleanup function to remove event listener when component unmounts
//         return () => {
//             window.removeEventListener("mousemove", handleMouseMove);
//         };
//     }, []);
//     return (
//         <>
//             {
//                 usersJoined?.map((item) => {

//                     console.log(item);
//                     if (item.user !== session?.publicUserData?.identifier) {
//                         return (
//                             <div key={item.user} className="w-[50px] h-[50px] absolute z-[100]" style={{ top: `${mouse.y}px`, left: `${mouse.x}px` }}>
//                                 <MousePointer2 color="white" />
//                                 <p className="text-white">{item.user}</p>
//                             </div>
//                         )
//                     }
//                 })
//             }

//             <div className='w-full h-[1px] bg-background'></div>
//             <div className="relative w-full h-[90vh]">
//                 <Chat />
//                 <Tools />
//                 <Devices topoId={topoId} />
//                 <Canvas topoId={topoId} />
//             </div>
//         </>
//     )
// }