import React, { useState } from 'react';
import '../../index.css';
import { IJar } from '../coinGame';
import CoinChecker from '../common/coinChecker';
import Jar from '../common/jar';
import Modal from '../common/modal';

interface IJarsProps {
    jars: IJar[];
    clearJar: Function;

}

export default function Jars({ jars, clearJar }: IJarsProps) {
    const [checker, setChecker] = useState<{ isOpen: boolean, jar: IJar }>({
        isOpen: false,
        jar: {
            id: 0,
            done: false,
            coins: [],

        }
    });
    const closeModal = () => {
        setChecker({
            isOpen: false,
            jar: {
                id: 0,
                done: false,
                coins: [],

            }
        })
    }

    const toggleCheck = (jar: IJar) => {
        setChecker({
            isOpen: true,
            jar
        })
    };

    const clear = (id: number) => {
        clearJar(id);
        closeModal();
    }

    return (
        <div className='jars__ontainer'>
            {jars.map((jar, index) => (<Jar key={index} jar={jar} check={toggleCheck} />))}
            <Modal
                close={closeModal}
                isOpen={checker.isOpen}
            >
                <CoinChecker jar={checker.jar} clearJar={clear} />
            </Modal>
        </div>
    )
}
