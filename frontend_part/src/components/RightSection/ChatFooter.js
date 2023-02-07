import React, { useEffect, useState, useContext } from 'react'
import { Box, styled, InputBase } from '@mui/material'
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import { uploadFile } from '../../allApis/forAdding';
import Loader from './Loader';
import AccountContext from '../../context/accountContext';
import Audio from './Audio';
import {Animated} from 'react-animated-css'
// css

const Box2 = styled(Box)`
padding: 5px 10px;
margin-right: -10px;
color:#54656f;
    margin-right: -10px;

`

const Input = styled(InputBase)`
width: 100%;
color:black;
font-size: 14px;
& > input{
  padding: 0 0;

}
`
const Clip = styled(AttachFileIcon)`
transform: scaleY(-1) rotate(148deg);
`
const style = { 'cursor': "pointer", "fontSize": "26px" };


const ChatFooter = (props) => {
  const {darkMode, loaderf, setloaderf } = useContext(AccountContext);
  const [showAudio, setshowAudio] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [file, setfile] = useState(false)
const [val, setval] = useState('')

  const Box4 = styled(Box)`
  padding: 5px 10px;
  width: ${!showAudio && "37px"};
  color:#54656f;
  margin-left:${showAudio && "auto"};
  & > path{
    font-size: 100%;
    transform : scale(1.1);
  }
  `
  const Box3 = styled(Box)`
display:flex;
flex:1;
padding: 9px 12px 11px;
margin: 5px 10px;
background-color: ${darkMode?"#2a3942":"white"};
border: 1px solid ${darkMode?"#2a3942":"white"};
border-radius: 8px;
flex: 1 1 auto;
font-weight: 400;
line-height: 20px;
& > MuiInputBase-input{
  color:black;
  font-size: 14px;
  padding: 0 0;
}
`
  const Box1 = styled(Box)`
display:flex;
padding-right: 17px;
padding-left: 10px;
border-left: 1px solid ${darkMode?"#black":"#e9edef"};
padding-top: 5px;
padding-bottom: 5px;
background-color:${darkMode?"#202c33":"#f0f2f5"} ;
align-items:center;
order:3;
`
  useEffect(() => {

    // await sendMessage()
    const getImage = async () => {
      if (props.file) {
        const data = new FormData();
        data.append("name", props.file.name);
        data.append("file", props.file);
        setloaderf(true);
        let response = await uploadFile(data);
        response && setloaderf(false);
        props.setimage(response.data);
       
        // response.data is the link to download file
      }

    }
    getImage();
  }, [props.file])

  const onchange = (e) => {
    props.setFile(e.target.files[0])// file is present in a event ,on 0th value of files array
    setval(e.target.files[0].name);
    props.setvalue(e.target.files[0].name)
  }
  const handleChange = (e) => {
    const newVal = e.target.value;
    setval(newVal);

  }
  const handleEnter=(e)=>{
    if (e.which==13) {
      
      props.setvalue(val); 
      setval('');
       props.sendChat(e,val);
    }
  }
  return (
    <div>

        
    <Box1 style={{ pointerEvents: `${loaderf ? 'none' : 'auto'}` }}>
    { !showAudio &&
     <>

      {loaderf && <div style={{
        position: "absolute",
        top: "-50vh",
        right: '30vw',

      }}><Loader /></div>}
      {/* for clip attack icon */}
 
      <Box2>
        <label htmlFor='fileInput'>

          <Clip style={style} />
        </label>
        <input type="file" id='fileInput'
          onChange={(e) => onchange(e)}
          style={{
            display: 'none',
          }} />
      </Box2>
      {/* texting space */}
      <Box3>
        <Input
        autoFocus={true}
          placeholder='Type a message to sent'
          onChange={handleChange}
          onKeyPress={handleEnter}
          value={val}
          sx={{color:`${darkMode && "white"}`}}
        />
        {/* onkeypress will be called when any key is press */}
      </Box3>
      </>
}

      {/* mic icon */}
      <Box4>

        {
          props.value === '' ?
           <Audio setimage={props.setimage} setval={setval} setvalue={props.setvalue} file={file} setfile={props.setFile} audioUrl={audioUrl} setAudioUrl={setAudioUrl} showAudio={showAudio} setshowAudio={setshowAudio} style={style}/>  
          : <SendIcon
            onClick={
              () => { let e = { which: 13 }; props.sendChat(e,val);setval('') }
            }
            style={style}
          />
        }

      </Box4>
     
 


    </Box1>


    </div>
  )
}

export default ChatFooter