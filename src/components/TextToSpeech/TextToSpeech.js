import React, { useState, useEffect } from "react";

const useAudio = (url, autoPlay) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    setPlaying(!playing);
  }

  useEffect(
    () => {
      playing ? audio.play() : audio.pause();
    },
    [playing]
  );

  return [playing, toggle];
};

const TextToSpeech = ({ url, autoPlay, clearUrl }) => {
  const [playing, toggle] = useAudio(url, autoPlay);
  if(autoPlay){
    const audio = new Audio(url);
    audio.play();
    clearUrl();
    return null;
  }
  return (
    <div>  
      <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
    </div>
  );
};

export default TextToSpeech;
