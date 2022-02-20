import React from 'react';
import '../../../index.css';
import { IJar } from '../../coinGame';

interface IJarProps {
    jar: IJar;
    check: Function;
}

export default function Jar({ jar, check }: IJarProps) {
    const toggleCheck = () => {
        check(jar)
    }
    return (
        <div>
            {jar.done
                ? <>
                    <img
                        style={{
                            display: 'block',
                            margin: '0 auto'

                        }}
                        src='/images/jar-full.png' alt='jar' />
                    <button
                        onClick={toggleCheck}
                        className='outline__button'
                    >
                        Double check
                    </button>
                </>
                : <img
                    style={{ display: 'block' }}
                    src='/images/jar-placeholder.png'
                    alt='jar' />
            }

        </div>
    )
}
