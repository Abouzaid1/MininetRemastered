import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PC from './devices/PC';
import { getTopo } from '@/slices/topoSlice';
import Switch from './devices/Switch';
import Routers from './devices/Routers';
import Controller from './devices/Controller';
import Laptops from './devices/Laptops';
import Xarrow from 'react-xarrows';
export default function Canvas() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getTopo("65def9f638ef056fe52852c1"))
    }, [])
    const topo = useSelector(state => state.topo)
    const pc = topo.pcs
    const sw = topo.sws
    const ro = topo.routers
    const co = topo.controllers
    const la = topo.laptops

    return (
        <div className='bg-background w-full h-full absolute top-0 z-0' >
            <div className='relative'>
                {
                    pc && pc.map((item) => {
                        return (
                            <PC key={item._id} name={item.name}></PC>
                        )
                    })
                }
                {
                    sw && sw.map((item) => {
                        return (
                            <Switch key={item._id} name={item.name}></Switch>
                        )
                    })
                }
                {
                    ro && ro.map((item) => {
                        return (
                            <Routers key={item._id} name={item.name}></Routers>
                        )
                    })
                }
                {
                    co && co.map((item) => {
                        return (
                            <Controller key={item._id} name={item.name}></Controller>
                        )
                    })
                }
                {
                    la && la.map((item) => {
                        return (
                            <Laptops key={item._id} name={item.name}></Laptops>
                        )
                    })
                }

                <Laptops arrow={'comp1'} name="kjksdfh"></Laptops>
                <Laptops arrow={'comp2'} name="kasdjfh"></Laptops>

                <Xarrow
                    start='comp1'
                    end='comp2'
                />
            </div>
        </div>
    )
}
