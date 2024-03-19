import React, { useEffect, useState } from "react"
import MainScreen from "./pages/MainScreen"
import { socket } from './socket/socket';
function App() {
  const [mouse, setMouse] = useState({})
  useEffect(() => {
    // Establish socket connection when the component mounts
    socket.connect();

    // Clean up function to close the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);
  socket.on("mouseMove", (data) => {
    setMouse({ x: data.x, y: data.y });
  })
  useEffect(() => {
    const handleMouseMove = (event) => {
      // Emit mouse movement data to the server
      socket.emit("mouseMove", {
        x: event.clientX - window.scrollX,
        y: event.clientY - window.scrollY
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
      <div className="w-[50px] h-[50px] absolute bg-white z-[100]" style={{ top: `${mouse.y + 150}px`, left: `${mouse.x + 150}px` }}></div>
      <div className="dark bg-background h-[100vh]">

        <MainScreen />

      </div>
    </>
  )
}
export default App
