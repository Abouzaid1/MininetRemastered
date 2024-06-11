import React, { useEffect, useState } from 'react'
import { useSession } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';
import { Network, Replace } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getTopo } from '@/slices/topoSlice';
import topoId from '@/components/mainScreen/topoId';
import { Plus } from 'lucide-react';
import axios from 'axios';
const url = import.meta.env.VITE_APP_URL
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
export default function HomePage() {
    const { session, isLoaded, isSignedIn } = useSession()
    const [userTopos,setUserTopos] = useState()
    const [topoName,setTopoName] = useState("")
    console.log(session.id)
    useEffect(()=>{
        axios.post(url + "/user", { username: session.publicUserData.firstName, clerkId: session.publicUserData.identifier }).then(res=>{console.log(res.data);setUserTopos(res.data)})
    },[session])

    const navigate = useNavigate()
        const getSession = () => {
            if (!isSignedIn) {
                navigate("/auth");
            }
        }
        getSession()
    const addTopologyHandler = ()=>{
        if (topoName != ""){
            axios.post(url + "/topo", { clerkId: session.publicUserData.identifier, topoName: topoName }).then(res => { console.log(res.data); setUserTopos(res.data) })
        }
        // axios.post(url + "/user", { username: session.publicUserData.firstName, clerkId: session.id }).then(res => { console.log(res.data); setUserTopos(res.data) })
    }
    return (
        <>
            {
                isSignedIn && <div className='text-white p-5 max-w-[1800px] overflow-x-scroll'>
                    <h1 className='font-semibold text-[30px]'>Your Current topologies</h1>
                    {/* the user current topologies */}
                    <div className='p-5 flex gap-5'>
                        <Dialog>
                            <DialogTrigger asChild>
                                <div className=' flex justify-center hover:outline-dashed hover:outline-primary hover:outline-[2px] mx-2   hover:bg-background bg-secondary transition cursor-pointer items-center rounded-xl w-[200px] h-[200px]'>
                                    <div>
                                        <Plus size={100} className='w-[100px]' />
                                        <p></p>
                                    </div>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Add a topology</DialogTitle>
                                    <DialogDescription>
                                        Here you can add a topology 
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="gap-4">
                                        <Label htmlFor="name" className="text-right">
                                          Topology Name 
                                        </Label>
                                        <Input
                                            id="name"
                                            placeHolder="Mesh Topology"
                                            className="col-span-3"
                                            value={topoName}
                                            onChange={(e)=>{setTopoName(e.target.value)}}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button onClick={addTopologyHandler}>Add Topology</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        
                        {
                            userTopos && userTopos.map(topo=>{
                                return(
                                <div>
                                <div onClick={()=>navigate(`/${topo._id}`)} className=' flex justify-center hover:outline-dashed hover:outline-primary hover:outline-[2px] mx-2 hover:bg-background bg-secondary transition cursor-pointer items-center rounded-xl w-[200px] h-[200px]'>
                                    <div>
                                        <Network size={100} className='w-[100px]' />
                                    </div>
                                </div>
                                <p className=' px-3 font-semibold mt-3'>Topo name: {topo?.name}</p>
                                    </div>)
                            })
                        }
                        
                    </div>
                    <hr />
                    <h1 className='font-semibold text-[30px]'>Select a template to get started</h1>
                    {/* the Public current topologies */}
                </div>
            }

        </>
    )
}
