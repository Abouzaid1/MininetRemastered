import React, { useEffect, useState } from "react"
import MainScreen from "./pages/MainScreen"
import { socket } from './socket/socket';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import topoId from "./components/mainScreen/topoId";
import { MousePointer2 } from 'lucide-react';
function App() {
  const [mouse, setMouse] = useState({})

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
        y: event.clientY
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
      <div className="dark bg-background max-w-full h-[100vh] ">
        <Router>
          <Routes>
            <Route path="/65eb3205a0299917158de221" element={<MainScreen />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}
export default App
