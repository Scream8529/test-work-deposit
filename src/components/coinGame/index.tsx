import React, { useState } from 'react';
import '../../index.css';
import JarChecker from '../common/jarChecker';
import Modal from '../common/modal';
import GameSpace from '../gameSpace';
import Jars from '../jars';

export interface IJar {
    id: number;
    done: boolean;
    coins: number[];
}

const initJars = [
    {
        id: 0,
        done: false,
        coins: [0, 0, 0, 0]
    },
    {
        id: 1,
        done: false,
        coins: [0, 0, 0, 0]
    },
    {
        id: 2,
        done: false,
        coins: [0, 0, 0, 0]
    }];

function CoinGame() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isOpenResult, setIsOpenResult] = useState(false);
    const [jars, setJars] = useState<IJar[]>(initJars);

    const openResult = () => {
        setIsOpenResult(true);
    };

    const closeResults = () => {
        setIsOpenResult(false);
        setJars(initJars)
    }

    const pickNextJar = () => {
        if (currentIndex < 2) {
            return setCurrentIndex(currentIndex + 1)
        }
        for (let i = 0; i <= 2; i++) {
            if (jars[i].done) {
                return;
            }
            return setCurrentIndex(i);
        }
        setCurrentIndex(0);
    }

    const done = () => {
        setJars([...jars.map((jar) => {
            if (jar.id === currentIndex) {
                return { ...jar, done: true };
            }
            return jar;
        })]);
        setCurrentIndex(0);
        pickNextJar();
    };

    const clearJar = (id: number = currentIndex) => {
        if (jars[currentIndex].done === true) {
            setCurrentIndex(id)
        }
        setJar([0, 0, 0, 0], id, false)
    }

    const setJar = (jarCoins: number[], id: number = currentIndex, done?: boolean) => {
        const newJars = [...jars.map((jar) => {
            if (jar.id === id) {
                return {
                    ...jar,
                    done: done !== undefined ? done : jar.done,
                    coins: jarCoins
                }
            }
            return jar;
        })
        ];
        setJars(newJars);
    };

    return (
        <div className='container'>
            <div className='game__container'>
                <div className='title'>
                    <h2>Make three different combinations to get $0.56</h2>
                </div>
                <div className='game__space__container'>
                    {jars.some((jar) => jar.done === false) &&
                        <GameSpace jar={jars[currentIndex]} setJar={setJar} done={done} clearJar={clearJar} />}
                    <Jars jars={jars} clearJar={clearJar} />
                </div>
            </div>

            {/* submiit */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                    onClick={openResult}
                    className='contained__button'
                >
                    Submit
                </button>
            </div>

            <Modal
                isOpen={isOpenResult}
                close={closeResults}
            >
                <JarChecker jars={jars} done={closeResults} />
            </Modal>
        </div>
    )
}

export default CoinGame;
