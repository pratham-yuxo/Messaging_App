import React, { useContext, useState, useEffect, useRef,useMemo } from 'react'
import WaveSurfer from 'wavesurfer.js';
import { Box, styled, Typography } from '@mui/material'
import AccountContext from '../../../context/accountContext';

const AudioMessage = (props) => {
    let isAudio = props.message.text.includes('.mp3');
    const {  darkMode } = useContext(AccountContext)
  const [audio, setaudio] = useState(props.message.text);
    const [playing, setPlaying] = useState(false);
    const wavesurferRef = useRef(null);
    const text = useMemo(() => props.message.text, [props.message.text]);

    // here we have to use dynamic id for our wave part
    // const containerId = `waveform-${Math.random().toString(36).substring(7)}`
    const buttonId = `button-${Math.random().toString(36).substring(7)}`
    const containerId="a"+props.message._id
    useEffect(() => {
      buttonRef.current.style.pointerEvents = 'none';
      if (  isAudio&&!wavesurferRef.current) {
        wavesurferRef.current = WaveSurfer.create({
          container: document.getElementById(containerId),
          waveColor: '#D9DCFF',
          progressColor: 'black',
          cursorColor: 'black',
          barWidth: 3,
          barRadius: 3,
          cursorWidth: 1,
          height: 62,
          barGap: 3
        });
        wavesurferRef.current.load(props.message.text);
        wavesurferRef.current.on('finish', () => {
          // setPlaying(false);
          buttonRef.current.classList.remove('active');         

        });
        wavesurferRef.current.on('ready', () => {
             buttonRef.current.style.pointerEvents = 'auto';
          
       });
      }

    }, [text]);

    const BoxAudio = styled(Box)`
    display:flex;
    gap:15px;
    
    `
    const buttonRef = useRef(null);

    const handleClick = () => {

      if (buttonRef.current.classList.contains('active')) {
          wavesurferRef.current.pause();
          buttonRef.current.classList.remove('active');         
      }
      else{
        buttonRef.current.classList.add('active');
        wavesurferRef.current.play();

      }
    };
      // const handlePlay = () => {
      //   wavesurferRef.play();        
      //     setPlaying(true);
  
      // }
  
      // const handlePause = () => {
      //   wavesurferRef.pause();
      //   setPlaying(false);
      // }

  
  return (
    
    <div className={`${props.isSender ? "msg" : `${darkMode ? "recd" : "rec"}`}`} style={{ position: "relative" }}>

    {/* <audio src={props.message.text} controls/> */}
    <BoxAudio>
      <div ref={buttonRef} id={buttonId} className={`botón ${playing ? 'active' : ''}`} onClick={handleClick}>
        <div className="fondo" x={0} y={0} width={40} height={40}></div>
        <div className="icono" width={40} height={40}>
          <div className="parte izquierda" x={0} y={0} width={40} height={40} fill="#fff"></div>
          <div className="parte derecha" x={0} y={0} width={40} height={40} fill="#fff"></div>
        </div>
        <div className="puntero"></div>
      </div>

      <div style={{ width: "101px" }} >

        <div id={containerId}></div>
      </div>
    </BoxAudio>


  </div>
  )
}

export default AudioMessage