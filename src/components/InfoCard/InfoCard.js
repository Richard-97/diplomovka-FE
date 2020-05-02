import React from 'react';
import correct_icon from '../../img/icons/correct.svg';
import danger_icon from '../../img/icons/danger.svg';
import no from '../../img/icons/no_motion.svg';

export default function InfoCard({title, action, icon }) {
    return (
        <div className='infocard'>
            <h3>{title}</h3>
            {
                !icon 
                ? <img src={action ? danger_icon : correct_icon} alt='correct_icon' />
                : <img src={action ? icon : no} alt='correct_icon' />

            }
        </div>
    )
}
