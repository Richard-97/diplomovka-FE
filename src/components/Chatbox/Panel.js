import React, { useState, useEffect } from 'react';
import TextToSpeech from '../TextToSpeech/TextToSpeech';
import Mic from './Mic';

export default function Panel({ url, onChange, clearUrl, api, error }) {

    return (
        <div className='panel'>
            <h1>Asistent</h1>
            <p className='panel-error'>{error !== '' && error}</p>
            {
                url !== undefined && <TextToSpeech url={url} clearUrl={clearUrl} autoPlay/>
            }
            <Mic onChange={onChange} api={api} />
        </div>
    )
}
