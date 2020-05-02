import React from 'react'
import VideoStream from '../VideoStream/VideoStream';
import SensorTest from '../SensorTest/SensorTest';

export default function ModalWindow({ title, type, onClick, api }) {

        return(
            <div className='modalwindow'>
                <div className='modalwindow-box'>
                    {
                        type === 'camera' 
                        ? <VideoStream api={api} />
                        : <SensorTest api={api} />
                    }
                    <p onClick={onClick} className='modalwindow-box__p'>X</p>
                </div>
            </div>
        )
}
