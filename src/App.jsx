import React, { useEffect, useState } from "react"
import MainScreen from "./pages/MainScreen"
import { socket } from './socket/socket';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import topoId from "./components/mainScreen/topoId";
import { MousePointer2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import HomePage from "./pages/HomePage";
import NavBar from "./components/mainScreen/NavBar";
import { SignIn,SignUp, useSession } from "@clerk/clerk-react";

import Auth from "./pages/Auth";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
function App() {
  
  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
  }
  const { session, isLoaded, isSignedIn } = useSession()

  const getSession = () => {
    if (!isSignedIn) {

      return <Auth/>
    }
  }
  getSession()
  return (
    <>
      <div className="dark bg-background max-w-full h-[100vh] ">
        {
          isSignedIn ? <>

            <NavBar></NavBar>
            <Router>
              <Routes>
                {/* <Route path="/65def9f638ef056fe52852c1" element={<MainScreen />} /> */}
                <Route path="/" element={<HomePage />} />
                {/* <Route path="/auth" element={<Auth />} /> */}
                <Route path="/:topoId" element={<MainScreen />} />
              </Routes>
            </Router>
          </> :
            <div className=" w-full h-full justify-center items-center flex">

              <Router>
                <Routes>
                  <Route path="/" Component={SignIn} />
                  <Route path="/:topoId" Component={SignIn} />
                  <Route path="/sign-up" Component={SignUp} />
                </Routes>
              </Router>
            </div>
        }
      </div>
    </>
  )
}
export default App
