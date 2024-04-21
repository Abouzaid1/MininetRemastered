import React, { useEffect } from 'react'
import { useSession } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';
import { Network } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getTopo } from '@/slices/topoSlice';
import topoId from '@/components/mainScreen/topoId';
import { useHistory } from 'react-router-dom';
export default function HomePage() {
    const history = useHistory();
    const { session, isLoaded, isSignedIn } = useSession()
    const navigate = useNavigate()
        const getSession = () => {
            if (!isLoaded) {
                
                return null;
            }
            if (!isSignedIn) {
                history.push("https://star-shiner-26.accounts.dev/sign-in");
                // window.location.replace = 'https://star-shiner-26.accounts.dev/sign-in';
                return null
            }
        }
        getSession()

    return (
        <>
            {
                isSignedIn && <div className='text-white p-5'>
                    <h1 className='font-semibold text-[30px]'>Your Current topologies</h1>
                    {/* the user current topologies */}
                    <div className='p-5 flex gap-5'>
                        <div className=' bg-secondary flex justify-center items-center rounded-xl w-[200px] h-[200px]'>
                            <div>
                            <Network size={100} className='w-[100px]' />
                            <p></p>
                            </div>
                        </div>
                        <div className=' bg-secondary rounded-xl w-[200px] h-[200px]'>

                        </div>
                    </div>




                    <hr />
                    <h1 className='font-semibold text-[30px]'>Select a topology to get started</h1>
                    {/* the Public current topologies */}






                </div>
            }

        </>
    )
}
