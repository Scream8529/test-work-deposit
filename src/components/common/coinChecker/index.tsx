import React, { FC } from 'react';
import '../../../index.css';
import { IJar } from '../../coinGame';

interface ICoinCheckerProps {
    jar: IJar;
    clearJar: Function;
}

export default function CoinChecker(props: ICoinCheckerProps) {
    const clear = () => {
        props.clearJar(props.jar.id);
    }
    return (
        <div className='coin_checker__container'>
            <div className='coins'>
                {props.jar.coins.map((coin, index) => (
                    <div
                        style={{
                            height: '120px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '0 30px'
                        }}>
                        <div><img src={`/images/coin${index}.png`} alt='coin' /></div>
                        <div>x{coin}</div>
                    </div>))}
            </div>
            <button
                onClick={clear}
                style={{ margin: '40px 0' }}
                className='outline__button'>
                Redo
            </button>
        </div>
    );
}
