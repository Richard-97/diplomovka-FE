import React, { useState, Fragment } from 'react'

export default function ProfileInfo({text, className}) {
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(text);

    const onSaveButtonHandler = () => {
        setEdit(false)
        if(value === text){ return }
        console.log('database update')
    }

    return (
        <div className={className} >
            {edit ? 
                <Fragment>
                    <input className='profile-input' type='text' value={value} onChange={(e)=>setValue(e.target.value)} /> 
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
