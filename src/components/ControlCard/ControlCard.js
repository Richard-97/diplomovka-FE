import React, { useState, useEffect } from 'react'
import SlideButton from '../Button/SlideButton';

export default function ControlCard({ title, onClick, power, icon_on, icon_off, children, disabled }) {

    return (
        <div className='controlcard'>
            <h3>{title}</h3>
            <div className='controlcard-field'>
                { icon_on && <img src={power ? icon_on : icon_off} /> }
                
                {
                    children === undefined ?
                        <SlideButton buttonON={power} onClick={onClick} disabled={disabled} /> :
                        children
                }
            </div>
        </div>
    )
}
