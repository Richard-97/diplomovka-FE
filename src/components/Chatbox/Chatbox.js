import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import Panel from './Panel';
import { generateAnswer } from './Answers';
import { FLASK_URL } from '../../utils/config';

export default function Chatbox({icon, data, actions, socket}) {

    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState(undefined);
    const [answer, setAnswer] = useState('');

    useEffect(() => {
        fetch(`${FLASK_URL}/text_to_speech`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: 'Ahoj, ako ti môžem pomôcť? '
            })
        })
        .then(resp => resp.blob())
        .then(data => {
            setUrl(URL.createObjectURL(data))
        })
    }, [])
    
    useEffect(() => {
        console.log('aswer', answer)
        fetch(`${FLASK_URL}/text_to_speech`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: generateAnswer(answer, data, actions, socket)
            })
        })
            .then(resp => resp.blob())
            .then(data => {
                setUrl(URL.createObjectURL(data));
            })
            .catch(err => {
                console.log('error')
            })
    }, [answer]);

    const openPanelHandler = () => {
        setOpen(!open);
    }
    const clearUrl = () => {
        setUrl(undefined);
    }
    return (
        <div className='chatbox'>
            { open && <Panel url={url} onChange={(ans) => setAnswer(ans)} clearUrl={clearUrl} /> }
            <div className='chatbox-btn' onClick={openPanelHandler}>
                <img src={icon} alt='chat_icon'/>
            </div>
        </div>
    )
}
