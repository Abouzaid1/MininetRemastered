import React from 'react'
import { RoomProvider } from "../liveblocks.config";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { myStore } from './slices/index.jsx'
import { Toaster } from "@/components/ui/sonner"
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={myStore}>
        <App />
        <Toaster />
    </Provider>
)
