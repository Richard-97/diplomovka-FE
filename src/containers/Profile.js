import React, { useState } from 'react';
import ProfileInfo from '../components/ProfileInfo/ProfileInfo'
import auth from '../utils/auth';

export default function Profile({user, api}) {

    const updateUser = (type, value) => {
        fetch(`${api}/${type}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                value, id: user.id
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.res === 'ok'){
                auth.updateUser(type, value)
            }
        })
    }
    return (
        <div className='profile'>
            <ProfileInfo text={user.surname} type='surname' className='profile-info' onUpdate={updateUser} />
            <ProfileInfo text={user.lastname} type='lastname' className='profile-info' onUpdate={updateUser} />
            <ProfileInfo text={'Nové heslo'} type='password' className='profile-info' onUpdate={updateUser} />
        </div>
    )
}
