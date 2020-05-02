import React, { useState, useEffect } from 'react';
import success from '../../img/icons/correct.svg';
import fail from '../../img/icons/no_motion.svg';

export default function SensorTest({api}) {
    const [err, setErr] = useState(false);
    const [test, setTest] = useState(undefined);
    useEffect(() => {
        fetch(`${api}/sensorTest`)
        .then(res => res.json())
        .then(data => {
            setTest(data);
        })
        .catch(err => {
            setErr(true);
            console.log(err)
        })
    }, [])
    return (
        <div className='sensorTest'>
            <div className='sensorTest-box'>
                {
                    err 
                    ? <h1>Chyba testu senzorov...</h1>
                    : <>
                        <p>Pohybový senzor</p>
                        
                        <img src={test !== undefined && test.motion ? success : fail} />
                    </>
                }
            </div>
        </div>
    )
}
