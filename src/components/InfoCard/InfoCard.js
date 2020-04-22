import React from 'react';
import correct_icon from '../../img/icons/correct.svg';
import danger_icon from '../../img/icons/danger.svg';

export default function InfoCard({title, danger }) {
    return (
        <div className='infocard'>
            <h3>{title}</h3>
            <img src={danger ? danger_icon : correct_icon} alt='correct_icon' />
        </div>
    )
}
