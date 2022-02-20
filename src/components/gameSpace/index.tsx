import React, { SyntheticEvent, useEffect, useState } from 'react';
import '../../index.css';
import { IJar } from '../coinGame';
import Coin from '../common/coin';

interface IGameSpaceProps {
    jar: IJar;
    setJar: Function;
    clearJar: Function;
    done: Function;
}

interface ICoinPosition {
    id: number;
    left: number;
    coin: number;
}

export default function GameSpace({ jar, setJar, done, clearJar }: IGameSpaceProps) {
    const [over, setOver] = useState(false)
    const [dragedCoin, setDragetCoin] = useState<null | number>(null)
    const [coinPosition, setCoinPosition] = useState<ICoinPosition[]>([])

    const addedCoin = (coin: number) => {
        setCoinPosition([
            ...coinPosition, {
                id: coinPosition.length,
                left: Math.floor(Math.random() * 49 + 8),
                coin: coin
            }])
        setJar([...jar.coins.map((count, index) => index === coin ? (count + 1) : (count))])
    }
    useEffect(() => {
        let summ = 0;
        jar.coins.forEach((item) => {
            summ = summ + item;
        });
        if (summ === 0) {
            setCoinPosition([])
        }
    }, [jar]);

    const onDropStart = (e: SyntheticEvent, index: number) => {
        setDragetCoin(index);
    }

    const onDropEnd = (e: SyntheticEvent, index: number) => {
        if (over && dragedCoin !== null) {
            addedCoin(dragedCoin)
        }
        setDragetCoin(null);
        setOver(false);
    }

    const onDragLeave = (e: SyntheticEvent) => {
        setTimeout(() => { setOver(false); }, 1)
    }

    const onDragOver = (e: SyntheticEvent) => {
        if (dragedCoin !== null) {
            setOver(true);
        }
    }

    const toggleClear = () => {
        setCoinPosition([])
        clearJar()
    }
    const toggleDone = () => {
        setCoinPosition([])
        done();
    }

    return (
        <div className='game__space'>
            <div className='coins__container'>
                {
                    jar.coins.map((coin, index) => (
                        <Coin
                            key={index}
                            count={coin}
                            image={`/images/coin${index}.png`}
                            onDropStart={onDropStart}
                            onDropEnd={onDropEnd} index={index}
                        />))
                }
            </div>
            <div>
                <div className='jar__img__container'>
                    {
                        coinPosition.map((coin) => (<img
                            key={coin.id}
                            src={`/images/coin${coin.coin}.png`}
                            alt=''
                            className='coin_animated'
                            style={{ left: `${coin.left}px` }} />))
                    }
                    <img
                        draggable={true}
                        style={{ opacity: over ? '0.5' : '0.8' }}
                        onDragLeave={onDragLeave}
                        onDragOver={onDragOver}
                        src='/images/jar.png'
                        alt='jar'
                    />
                </div>

                <div className='game_space__button__container'>
                    <button
                        className='outline__button'
                        onClick={toggleClear}
                        disabled={!jar.coins.some((value: number) => value > 0)}>
                        Clear
                    </button>
                    <button
                        onClick={toggleDone}
                        className='outline__button'
                        disabled={!jar.coins.some((value: number) => value > 0)}>
                        Done
                    </button>
                </div>
            </div>
        </div>
    )
}
