import React from 'react'
import VideoStream from '../VideoStream/VideoStream';
import UserContext from '../../Context';

export default function ModalWindow({ title, type, onClick }) {

        return(
            <UserContext.Consumer>
                {
                    ({ api }) => (
                        <div className='modalwindow'>
                            <div className='modalwindow-box'>
                                {
                                    type==='camera' && <VideoStream api={api} />
                                }
                                <p onClick={onClick} className='modalwindow-box__p'>X</p>
                            </div>
                        </div>
                    )
                }  
            </UserContext.Consumer>
        )
}
