import React, { useState } from 'react';
import ProfileInfo from '../components/ProfileInfo/ProfileInfo'

export default function Profile() {
    
    const renderProfileInfo = (user) => {
        return Object.keys(user).map((key, i) => {
            return(
                <ProfileInfo text={user[key]} className='profile-info' key={i} />
            )
        })
    }
    return (
        <div className='profile'>
            { renderProfileInfo({firstName: 'Richard', lastName: 'Rusňák', email: 'peter.novak@gmail.com', password: '*************'}) }
        </div>
    )
}
