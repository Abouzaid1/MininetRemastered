import React from 'react'
import { RoomProvider } from "../liveblocks.config";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { myStore } from './slices/index.jsx'
import { Toaster } from "@/components/ui/sonner"
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
import { ClerkProvider } from '@clerk/clerk-react'
import { dark, neobrutalism } from '@clerk/themes';
if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}
document.title = "Mininet Remastered";
ReactDOM.createRoot(document.getElementById('root')).render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} appearance={{
        baseTheme: [dark],
        signIn: { baseTheme: dark},
}}>
    <Provider store={myStore}>
        <App />
        <Toaster />
    </Provider>
    </ClerkProvider>
)
