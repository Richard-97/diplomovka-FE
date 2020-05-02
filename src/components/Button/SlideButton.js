import React from 'react';
import Switch from "react-switch";

export default function SlideButton({ buttonON, onClick, disabled, color }) {

    return (
        <label>
            <Switch onChange={onClick} checked={buttonON} height={35} width={67} disabled={disabled} onColor={color && color[0]} offColor={color && color[1]} />
        </label>
    )
}
