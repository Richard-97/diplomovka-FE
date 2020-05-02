import React, { useState, useEffect, Fragment } from 'react';
import Button from '../Button/Button';

export default function VideoStream({ api, socket }) {
    const [camera, setCamera] = useState(null);
    const [play, setPlay] = useState(true);

    const connect = () => {
        socket.on('video_flask', data=>{
            console.log(data)
            setCamera(data.data)
          })
    }
    useEffect(()=>{
        connect()
    }, [])
    
    const playStremHandler = (play) => {
        fetch(`${api}/video_feed`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify({
            //     play
            // })
            })
            .then(res => res.json())
            // .then(data=>{
            //     console.log('oo', data)
            //     setCamera(data)
            // })
            .then(data => {
                console.log(data)
            })
            .catch(console.log)
            setPlay(!play);
    }
    return (
        <Fragment>
             { !play ? 
                <Fragment>
                    <img src={`data:image/png;base64,${camera}`} />
                    <Button text='Stop' onClick={()=>playStremHandler(play)} />
                </Fragment>
                :
                <Fragment>
                    <p style={{fontSize: '3rem'}}>Kamerový záznam</p>
                    <Button text='Spustiť' onClick={()=>playStremHandler(play)} />
                </Fragment> 
            }
        </Fragment>
    )
}
