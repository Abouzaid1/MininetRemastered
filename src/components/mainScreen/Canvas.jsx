import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PC from './devices/PC';
import { getTopo } from '@/slices/topoSlice';
import Switch from './devices/Switch';
import Routers from './devices/Routers';
import Controller from './devices/Controller';
import Laptops from './devices/Laptops';
import { deleteDevice } from '@/slices/slice';
import { toast } from "sonner";
import Xarrow, { useXarrow, Xwrapper } from 'react-xarrows';
import axios from 'axios';
import { getToolName } from '@/slices/toolSlice';
// import topoId from './topoId';
import { socket } from '../../socket/socket';

export default function Canvas(props) {
    const dispatch = useDispatch();
    const updateXarrow = useXarrow();
    const [mouse, setMouse] = useState({})
    const tool = useSelector(state => state.tool);
    const [link, setLink] = useState({ from: null, to: null });
    const [pc, setPc] = useState();
    const [sw, setSw] = useState();
    const [ro, setRo] = useState();
    const [co, setCo] = useState();
    const [la, setLa] = useState();
    const [links, setLinks] = useState();
    const {topoId} = props
    const topoDevices = useSelector(state => state.topo);
    const [topo, setTopo] = useState(topoDevices)
    socket.on("topoChange", (data) => {
        setTopo(data);
    })

    useEffect(() => {
        dispatch(getTopo(topoId));
    }, []);

    useEffect(() => {
        console.log(topo);
        setPc(topo.pcs);
        setSw(topo.sws);
        setRo(topo.routers);
        setCo(topo.controllers);
        setLa(topo.laptops);
        setLinks(topo.links);
    }, [topo]);

    const actionSelect = (id, name, type) => {
        if (tool == "mouse") {
        } else if (tool == "link") {
            linkHandler(name);
        }
    };
    const deleteAction = async (id) => {
        if (id && tool == "delete") {
            dispatch(deleteDevice(id));
            setTimeout(() => { dispatch(getTopo(topoId)) }, 500);
            console.log("delete");
        }
    }
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
            axios.post(URL + "/link", { link: link, topoId: topoId }).then(response => {
                toast(response.data);
                dispatch(getTopo(topoId));
            });
            setLink({ from: null, to: null });
            dispatch(getToolName("mouse"));
        }
    }, [link]);
    useEffect(()=>{
        console.log(topoId);
    }, [topoId])
    return (
        <div className={`bg-background w-full h-full absolute overflow-hidden top-0 z-0${tool === "link" ? " cursor-crosshair" : ""} ${tool === "delete" ? "cursor-crosshair" : ""} ${tool === "addText" ? " cursor-text" : ""}`} >
            <div onMouseMove={updateXarrow} className='relative'>
                {
                    pc && pc.map((item) => {
                        return (
                            <PC key={item._id} id={item.name} name={item.name} topoId = {topoId} itemId={item._id} deleteHandler={() => deleteAction(item._id)} actionHandler={() => actionSelect(item._id, item.name, item.type)}></PC>
                        )
                    })
                }
                {
                    sw && sw.map((item) => {
                        return (
                            <Switch key={item._id} id={item.name} name={item.name} topoId={topoId} itemId={item._id} deleteHandler={() => deleteAction(item._id)} actionHandler={() => actionSelect(item._id, item.name, item.type)}></Switch>
                        )
                    })
                }
                {
                    ro && ro.map((item) => {
                        return (
                            <Routers key={item._id} id={item.name} name={item.name} topoId={topoId} itemId={item._id} deleteHandler={() => deleteAction(item._id)} actionHandler={() => actionSelect(item._id, item.name, item.type)}></Routers>
                        )
                    })
                }
                {
                    co && co.map((item) => {
                        return (
                            <Controller key={item._id} id={item.name} name={item.name} topoId={topoId} itemId={item._id} deleteHandler={() => deleteAction(item._id)} actionHandler={() => actionSelect(item._id, item.name, item.type)}></Controller>
                        )
                    })
                }
                {
                    la && la.map((item) => {
                        return (
                            <Laptops key={item._id} id={item.name} name={item.name} topoId={topoId} itemId={item._id} deleteHandler={() => deleteAction(item._id)} actionHandler={() => actionSelect(item._id, item.name, item.type)}></Laptops>
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
