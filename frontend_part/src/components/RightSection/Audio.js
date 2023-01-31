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
  console.log("component rendered",props.showAudio)
  setIsRecording(props.showAudio);

}, [props.showAudio])

  // const upload=async()=>{
  //   if (props.file && props.audioUrl) {
      
  //     const formData = new FormData();
  //     const file = await convertUrlToFile(props.audioUrl);
  //     formData.append("file", file);
  //     formData.append("name",`audio`);
      
  //     try {
  //       const res = await uploadFile(formData);
  //       props.setAudioUrl('');
  //       props.setfile(false);
  //       console.log(res.data,"url from use effect");
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // }


  const startRecording = () => {
    props.setshowAudio(true);
    console.log("started")

  }
  
  const stopRecording = () => {
    console.log("stopped")


  }
  

    const onStop = (recordedBlob) => {
console.log("on stop")
    console.log('recordedBlob is: ', recordedBlob.blobURL);
    const upload=async()=>{
      if (recordedBlob.blobURL) {
        
        // const formData = new FormData();
        const file = await convertUrlToFile(recordedBlob.blobURL);
        props.setfile(file);
        console.log(file.name,"ye file ka nam")
        props.setvalue(file.name);
      }

    }
upload().then(
  props.setshowAudio(false)
)  
    
  }
   const convertUrlToFile=async(url)=> {
    console.log("converting file")
    const response = await fetch(url);
    // props.setAudioUrl(null);
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
      {/* {console.log(audioUrl)} */}
      {/* {props.audioUrl && props.showAudio &&  <audio  controls  src={props.audioUrl}></audio>  } */}
    </div>
  )
}

export default Audio