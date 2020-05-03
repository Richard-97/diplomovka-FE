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
        if(open){
            fetch(`${nodejsApi}/text-to-speech`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: 'Ahoj, ako ti môžem pomôcť?'
                })
            })
            .then(resp => resp.json())
            .then(data => {
                //setUrl(URL.createObjectURL(data))
                dataToBase64StringAndPlayAudio(data);
            })
            .catch(err => {
                setError('Chyba služby text-to-speech');
            })
        }
    }, [open])
    const play = (url) =>  {
		return new Promise((resolve, reject) => {   // return a promise
			var audio = new Audio();                     // create audio wo/ src
			audio.preload = "auto";                      // intend to play through
			audio.autoplay = true;                    // autoplay when loaded
			audio.onerror = reject;                      // on error, reject
			audio.onended = resolve;
   
			audio.src = url; // just for example
		});
    }
    const dataToBase64StringAndPlayAudio = (data) => {
        play("data:audio/wav;base64," + data.audioContent)
    }
    
    useEffect(() => {
        fetch(`${nodejsApi}/text-to-speech`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: generateAnswer(answer, data, actions, socket, api, userID)
            })
        })
            .then(resp => resp.json())
            .then(data => {
                dataToBase64StringAndPlayAudio(data);
                //setUrl(URL.createObjectURL(data));
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
