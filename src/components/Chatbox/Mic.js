import React from 'react';
import { NODEJS_URL } from '../../utils/config';
import socketIOClient from 'socket.io-client';
import Button from '../Button/Button';


// Stream Audio
let bufferSize = 2048,
  AudioContext,
  // : {
  //   new (contextOptions?: AudioContext | undefined): AudioContext;
  //   prototype: AudioContext;
  // },
  context,
  processor,
  input,
  globalStream;

//vars
// let audioElement = document.querySelector('audio'),
let finalWord = false,
  removeLastSentence = true,
  streamStreaming = false;



//audioStream constraints
const constraints = {
  audio: true,
  video: false
};

class App extends React.Component{

    state = {
      nick: '',
      message: '',
      messages: [],
      record: false,
      connected: false,
      resultText: [],
      socket: null
    };

  componentDidMount() {
    this.connect();
  }

  connect = () => {
    const socket = socketIOClient(this.props.api, {});
    this.setState({ socket });
    socket.on('connect', function(data) {
      socket.emit('join', 'Server Connected to Client');
    });

    socket.on('messages', function(data) {
      console.log(data);
    });

    socket.on('join', function(data) {
      console.log(data);
    });

    socket.on('err', function(err) {
      console.log('errorik',err);
    });
    socket.on('speechData', data => {
      console.log('data', data);
      if (data !== null)
        this.setState({
          resultText: data.results[0].alternatives[0].transcript
        });
    });
  };

  capitalize = s => {
    if (s.length < 1) {
      return s;
    }
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  startRecording = () => {
    this.initRecording();
    this.setState({ record: true });
  };

  initRecording = () => {
    this.setState({resultText: []});
    this.state.socket.emit('startGoogleCloudStream', ''); //init socket Google Speech Connection
    streamStreaming = true;
    AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext({
      latencyHint: 'interactive'
    });
    processor = context.createScriptProcessor(bufferSize, 1, 1);
    processor.connect(context.destination);
    context.resume();

    const handleSuccess = stream => {
      globalStream = stream;
      input = context.createMediaStreamSource(stream);
      input.connect(processor);

      processor.onaudioprocess = e => {
        this.microphoneProcess(e);
      };
    };

    navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess);
  };

  microphoneProcess = e => {
    var left = e.inputBuffer.getChannelData(0);
    var left16 = this.downsampleBuffer(left, 44100, 16000);
    // SOCKET socket.emit('binaryData', left16);
    this.state.socket.emit('binaryData', left16);
  };

  downsampleBuffer = (buffer, sampleRate, outSampleRate) => {
    if (outSampleRate === sampleRate) {
      return buffer;
    }
    if (outSampleRate > sampleRate) {
      throw 'downsampling rate show be smaller than original sample rate';
    }
    var sampleRateRatio = sampleRate / outSampleRate;
    var newLength = Math.round(buffer.length / sampleRateRatio);
    var result = new Int16Array(newLength);
    var offsetResult = 0;
    var offsetBuffer = 0;
    while (offsetResult < result.length) {
      var nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
      var accum = 0,
        count = 0;
      for (
        var i = offsetBuffer;
        i < nextOffsetBuffer && i < buffer.length;
        i++
      ) {
        accum += buffer[i];
        count++;
      }

      result[offsetResult] = Math.min(1, accum / count) * 0x7fff;
      offsetResult++;
      offsetBuffer = nextOffsetBuffer;
    }
    return result.buffer;
  };
  callQnAMaker = () => {
    fetch('https://diplomovka.azurewebsites.net/qnamaker/knowledgebases/b8ead40f-2588-465f-bc12-0b57b8e1b669/generateAnswer', {
      method: 'POST',
      headers: {
        'Authorization': 'EndpointKey 62732297-5be9-40cb-8b11-183ea4d4dba6',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        question: this.state.resultText
      })
    })
      .then(res => res.json())
      .then(data => {
        this.props.onChange(data);
      })
  }
  stopRecording = () => {
    this.state.socket.emit('endGoogleCloudStream', '');

    let track = globalStream.getTracks()[0];
    track.stop();

    input.disconnect(processor);
    processor.disconnect(context.destination);
    context.close().then(function() {
      input = null;
      processor = null;
      context = null;
      AudioContext = null;
    });
    this.callQnAMaker();
  };

  render() {
    return (
      <div className="setup">
        <header className="box">
          <Button onClick={this.startRecording} text="Nahrávať" />
          <Button onClick={this.stopRecording} text="Stop" />
          <p>{this.state.resultText}</p>
        </header>
      </div>
    );
  }
}

export default App;
