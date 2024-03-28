import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PC from './devices/PC';
import { getTopo } from '@/slices/topoSlice';
import Switch from './devices/Switch';
import Routers from './devices/Routers';
import Controller from './devices/Controller';
import Laptops from './devices/Laptops';
import Arrow, { DIRECTION } from 'react-arrows';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { deleteDevice } from '@/slices/slice';
import { toast } from "sonner";
import Xarrow, { useXarrow, Xwrapper } from 'react-xarrows';
import axios from 'axios';
import { getToolName } from '@/slices/toolSlice';

export default function Canvas() {
    const dispatch = useDispatch();
    const updateXarrow = useXarrow();
    const tool = useSelector(state => state.tool);
    const [link, setLink] = useState({ from: null, to: null });
    const [pc, setPc] = useState();
    const [sw, setSw] = useState();
    const [ro, setRo] = useState();
    const [co, setCo] = useState();
    const [la, setLa] = useState();
    const [links, setLinks] = useState();

    const topo = useSelector(state => state.topo);
    useEffect(() => {
        setPc(topo.pcs);
        setSw(topo.sws);
        setRo(topo.routers);
        setCo(topo.controllers);
        setLa(topo.laptops);
        setLinks(topo.links);
    }, [topo]);

    const actionSelect = (id, name, type) => {
        if (tool === "mouse") {
        } else if (tool === "delete") {
            deleteHandler(id);
            dispatch(getTopo("65eb3205a0299917158de221"))
            
        } else if (tool === "link") {
            linkHandler(name);
        }
    };

    const linkHandler = (name) => {
        if (!link.from) {
            setLink(prevLink => ({ ...prevLink, from: name }));
        } else {
            if (link.from !== name) {
                setLink(prevLink => ({ ...prevLink, to: name }));
            }
        }
    };
    const URL = import.meta.env.VITE_APP_URL
    useEffect(() => {
        if (link.from != null && link.to != null) {
            axios.post(URL + "/link", { link: link, topoId: "65eb3205a0299917158de221" }).then(response => {
                toast(response.data);
                dispatch(getTopo("65eb3205a0299917158de221"));
            });
            setLink({ from: null, to: null });
            dispatch(getToolName("mouse"));
        }
    }, [link]);

    const deleteHandler = (id) => {
        dispatch(deleteDevice(id));
        setTimeout(() => {
            dispatch(getTopo("65eb3205a0299917158de221"));
        }, 500);
    };

    return (
        <div className={`bg-background w-full h-full absolute top-0 z-0${tool === "link" ? " cursor-crosshair" : ""} ${tool === "delete" ? "cursor-crosshair" : ""} ${tool === "addText" ? " cursor-text" : ""}`} >
            <div onMouseMove={updateXarrow} className='relative'>
                {
                    pc && pc.map((item) => {
                        return (
                            <PC key={item._id} id={item.name} name={item.name} actionHandler={() => actionSelect(item._id, item.name, item.type)}></PC>
                        )
                    })
                }
                {
                    sw && sw.map((item) => {
                        return (
                            <Switch key={item._id} id={item.name} name={item.name} actionHandler={() => actionSelect(item._id, item.name, item.type)}></Switch>
                        )
                    })
                }
                {
                    ro && ro.map((item) => {
                        return (
                            <Routers key={item._id} id={item.name} name={item.name} actionHandler={() => actionSelect(item._id, item.name, item.type)}></Routers>
                        )
                    })
                }
                {
                    co && co.map((item) => {
                        return (
                            <Controller key={item._id} id={item.name} name={item.name} itemId={item._id} actionHandler={() => actionSelect(item._id, item.name, item.type)}></Controller>
                        )
                    })
                }
                {
                    la && la.map((item) => {
                        return (
                            <Laptops key={item._id} id={item.name} name={item.name} actionHandler={() => actionSelect(item._id, item.name, item.type)}></Laptops>
                        )
                    })
                }
                {
                    links && links.map((item) => {
                        return (
                            <Xarrow
                                key={`${item._id}`}
                                start={item.link.from}
                                end={item.link.to}
                                lineColor="white"
                                headSize={0}
                                strokeWidth={1}
                                curveness={0} animation={1}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}
