import React, { useEffect, useState } from 'react';
import { Textarea } from "@/components/ui/textarea"

export default function TextArea(props) {
    const { name, id, actionHandler } = props;
    const [position, setPosition] = useState({ x: 0, y: 100 });
    const [dragging, setDragging] = useState(false);
    const size = 50;
    const strokeWidth = 1;
    const iconClass = "text-primary mx-2";
    const divIconClass = "p-1 my-2 flex items-center justify-center transition-[0.2s] box-content h-[70px] hover:outline-dashed hover:outline-primary hover:outline-[2px] mx-2  hover:bg-background bg-secondary transition cursor-pointer";

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', mouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', mouseUp);
        };
    }, [dragging]);

    const handleMouseMove = (e) => {
        if (dragging) {
            setPosition({ x: e.clientY - 100, y: e.clientX - 50 });
        }
    };

    const getPosition = () => {
        setDragging(true);
    };

    const mouseUp = () => {
        setDragging(false);
    };

    return (
        <div key={id} className='absolute' onMouseDown={getPosition} onClick={actionHandler}
            style={{ top: position.x, left: position.y }}>
            <div className={divIconClass}>
                <Textarea />
            </div>
        </div>
    );
}
