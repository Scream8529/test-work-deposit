import React from 'react';
import '../../../index.css';
import { IJar } from '../../coinGame';

interface IJarsCheckerProps {
    jars: IJar[];
    done: Function;
}

export const coinCoast = [0.25, 0.1, 0.05, 0.01];

export default function JarChecker(props: IJarsCheckerProps) {
    const results = [...props.jars.map((jar) => {
        return (jar.coins[0] * coinCoast[0]) +
            (jar.coins[1] * coinCoast[1]) +
            (jar.coins[2] * coinCoast[2]) +
            (jar.coins[3] * coinCoast[3]);
    })]

    const done = () => {
        props.done();
    }
    return (
        <div className='jars_checker__container'>

            <div className='jars_checker__jars__container'>
                {results.map((jar) => (
                    <div style={{ padding: '20px' }}>
                        <div style={{ textAlign: 'center' }}>
                            ${jar.toFixed(2)}
                        </div>
                        <div
                            style={{
                                padding: '10px',
                                border: `1px solid ${jar !== 0.56 ? 'red' : 'green'}`,
                                backgroundColor: jar !== 0.56 ? 'red' : 'green'
                            }}>
                            <img src={'/images/jar-full.png'} alt={'jar'} />
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <button
                    onClick={done}
                    className='outline__button'>
                    Redo
                </button>
            </div>
        </div>
    );
}
