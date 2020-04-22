import React from 'react'
import Loader from '../Loader/Loader';

export default function SensorCard({ title, value, unit, hint, onClick  }) {

    return (
        <div className='sensorecard'>
            <h3>{title}</h3>
            <div className='sensorecard-number'>
                {
                    value === undefined
                    ? <Loader />
                    :   
                    <>
                        <p className='sensorecard-number-value'>{value}</p>
                        <p className='sensorecard-number-unit'>{unit}</p>
                    </>
                }
            </div>
            <p className='sensorecard-hint'>{hint}</p>
        </div>
    )
}
