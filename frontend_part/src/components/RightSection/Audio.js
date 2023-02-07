import React, { useState, useEffect } from 'react'
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { ReactMic } from 'react-mic';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { uploadAudio, uploadFile } from '../../allApis/forAdding';
const Audio = (props) => {
  const style = { 'cursor': "pointer", "fontSize": "26px" };
  const [isRecording, setIsRecording] = useState(false);

useEffect(() => {
  setIsRecording(props.showAudio);

}, [props.showAudio])




  const startRecording = () => {
    props.setshowAudio(true);

  }
  

  

    const onStop = (recordedBlob) => {
    const upload=async()=>{
      if (recordedBlob.blobURL) {
        
        // const formData = new FormData();
        const file = await convertUrlToFile(recordedBlob.blobURL);
        props.setfile(file);
       
        props.setval(file.name)
        props.setvalue(file.name);
      }

    }
upload().then(
  props.setshowAudio(false)
)  
    
  }
   const convertUrlToFile=async(url)=> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], `voiceRecord.mp3`, { type: 'audio/mp3' });
}

const handleAudioUpload = async () => {
  setIsRecording(false);


}
const cancelRecording=()=>{
  console.log("cancelled")
}
  return (
    <div style={{
      display:"flex",
      alignItems:"center",
      
    }}>
{ !isRecording &&  <KeyboardVoiceIcon onClick={startRecording} fontSize='large' style={style} />}
{ props.showAudio &&  <>
        <DeleteIcon style={style} onClick={cancelRecording} />
        <ReactMic
        
        style={{
          height:"40px"
        }}
        visualSetting="frequencyBars" 
          record={isRecording}
          className="sound-wave wave"
          onStop={onStop}
          // onData={onData}
          strokeColor="#0096ef"
        // backgroundColor="transparent"
      
        />
        <SendIcon style={style} onClick={handleAudioUpload} />
        </>}
 </div>
  )
}

export default Audio