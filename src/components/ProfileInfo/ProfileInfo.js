import React, { useState, Fragment } from 'react'

export default function ProfileInfo({text, className, type, onUpdate}) {
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(text);

    const onSaveButtonHandler = () => {
        setEdit(false)
        onUpdate(type, value)
    }

    return (
        <div className={className} >
            {edit ? 
                <Fragment>
                    <input className='profile-input' type={text !== 'Nové heslo'? 'text' : 'password'} value={value} onChange={(e)=>setValue(e.target.value)} /> 
                    <p className='profile-edit' onClick={onSaveButtonHandler}>uložiť</p>
                </Fragment>
            : 
                <Fragment>
                    <p className='profile-ref'>{value}</p>
                    <p className='profile-edit' onClick={()=>setEdit(true)}>upraviť</p>
                </Fragment>
            }
        </div>
    )
}
