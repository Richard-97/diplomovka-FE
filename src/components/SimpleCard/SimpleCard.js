import React, { useState } from 'react'
import Button from '../Button/Button';
import ModalWindow from '../ModalWindow/ModalWindow';

export default function SimpleCard({ title, type }) {

    const [modal, setModal] = useState(false);

    function openCameraModal(){
        setModal(!modal)
    }

    return (
        <div className='simplecard'>
            <h3>{title}</h3>
            <div className='simplecard-btn'>
                <Button text='Otvoriť' onClick={openCameraModal}/>
            </div>
            {
                modal &&
                    <ModalWindow onClick={()=>setModal(!modal)} type={type} />
            }
        </div>
    )
}
