import React, { SyntheticEvent } from 'react'

interface ICoinProps {
    count: number;
    image: string;
    onDropStart: Function;
    onDropEnd: Function;
    index: number;
}
export default function Coin({ count, image, onDropStart, onDropEnd, index }: ICoinProps) {
    const toggleDropStart = (e: SyntheticEvent) => {
        onDropStart(e, index);
    }
    const toggleDropEnd = (e: SyntheticEvent) => {
        onDropEnd(e, index);
    }

    return (
        <div
            draggable={true}
            onDragEnd={toggleDropEnd}
            onDragStart={toggleDropStart}
            style={{ position: 'relative' }}
        >
            <img src={image} alt='coin' />
            <div className='coin__counter'>
                x{count}
            </div>
        </div>
    )
}
