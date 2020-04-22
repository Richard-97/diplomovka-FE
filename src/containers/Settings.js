import React, { Component } from 'react';
import VideoStream from '../components/VideoStream/VideoStream';
import TextToSpeech from '../components/TextToSpeech/TextToSpeech';


class Settings extends Component {
    state = {
        url: undefined,
    }
 
    async componentDidMount() {
        const resp = await fetch('http://localhost:5000/text_to_speech',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: 'I think Hungarian citizens are weird because of they are always drunk. Also i hate homosexuals!'
        })
    })
    const myBlob = await resp.blob();
    const objectURL = URL.createObjectURL(myBlob)
    this.setState({url: objectURL})
    }
    
    render() {
        return (
            <div className='settings'>
                <VideoStream />
                <input type='text' value={this.props.filter_value} onChange={(e)=>this.props.setFilterValue(e.target.value)}/>
                {this.state.url !== undefined && <TextToSpeech url={this.state.url}/>} 
            </div>
        )
    }
}

export default Settings