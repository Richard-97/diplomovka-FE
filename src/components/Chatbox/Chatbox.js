import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import Panel from './Panel';
import { generateAnswer } from './Answers';

export default function Chatbox({icon, data, actions, socket, api, nodejsApi, userID}) {
    console.log(api, nodejsApi)
    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState(undefined);
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`${api}/text_to_speech`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: 'Ahoj, ako ti môžem pomôcť?'
            })
        })
        .then(resp => resp.blob())
        .then(data => {
            setUrl(URL.createObjectURL(data))
        })
        .catch(err => {
            setError('Chyba služby text-to-speech');
        })
    }, [])
    
    useEffect(() => {
        fetch(`${api}/text_to_speech`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: generateAnswer(answer, data, actions, socket, api, userID)
            })
        })
            .then(resp => resp.blob())
            .then(data => {
                setUrl(URL.createObjectURL(data));
            })
            .catch(err => {
                setError('Chyba služby text-to-speech');
            })
    }, [answer]);

    const openPanelHandler = () => {
        setOpen(!open);
        setError('');
    }
    const clearUrl = () => {
        setUrl(undefined);
    }
    return (
        <div className='chatbox'>
            { open && <Panel url={url} onChange={(ans) => setAnswer(ans)} clearUrl={clearUrl} api={nodejsApi} error={error} /> }
            <div className='chatbox-btn' onClick={openPanelHandler}>
                <img src={icon} alt='chat_icon'/>
            </div>
        </div>
    )
}
