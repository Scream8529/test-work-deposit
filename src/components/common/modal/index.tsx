import React, { Component, FC, SyntheticEvent } from 'react';
import '../../../index.css';

interface IModalProps {
    isOpen: boolean;
    close: Function;
    children: any;
}

export default function Modal(props: IModalProps) {
    const closeModal = () => {
        props.close()
    };
    const stopPaginat = (e: SyntheticEvent) => {
        e.stopPropagation();
    }
    if (!props.isOpen)
        return <></>

    return (
        <div className='modal__container' onClick={closeModal} >
            <div onClick={stopPaginat}>
                {props.children}
            </div>

        </div>
    );
}
