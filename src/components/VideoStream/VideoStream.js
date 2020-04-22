import React, { useState, useEffect, Fragment } from 'react';
import io from 'socket.io-client';
import Button from '../Button/Button';

export default function VideoStream({ api }) {
    const [socket, setSocket] = useState(null);
    const [camera, setCamera] = useState(null);
    const [play, setPlay] = useState(true);

    const connect = () => {
        const socket = io(api, {});
        setSocket(socket);
        socket.on('connect', data => {
            socket.emit('join', 'Server Connected to Client.');
        });
        socket.on('video_flask', data => {
            setCamera(data.data)
        })
        socket.on('message', data => {
            console.log(data)
        })
        socket.on('video_feed', data => {
            console.log(data)
        })
    }
    useEffect(()=>{
        connect()
    }, [])
    
    const playStremHandler = (play) => {
        fetch('http://localhost:5000/video_feed',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ play })
            })
            .then(res => res.json())
            .then(data=>setCamera(data.data))
            .catch(console.log)
            setPlay(!play)
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
