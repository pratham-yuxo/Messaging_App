import React, { useEffect,useContext } from 'react';
import Button from '@mui/material/Button';
import AccountContext from '../../../context/accountContext';
import { SocketContext } from '../../../context/contextForVc/VcContext';
import IconButton from '@mui/material/IconButton';
import CallIcon from '@mui/icons-material/Call';
import CallEndIcon from '@mui/icons-material/CallEnd';
import { green,red } from '@mui/material/colors';

const Notifications = () => {
  const {idUser,socket, answerCall, call,setStream, callAccepted, myVideo, setcallEnded } = useContext(SocketContext);
  const {setVideoCall,videoCall}=useContext(AccountContext);

const accept=()=>{
  
  // setVideoCall(true);
  // setTimeout(() => {
      answerCall();
      // }, 2000);
  
}
const reject=()=>{
  setcallEnded(true);
}
  return (
    <>
    {console.log(call,"call")}
      {call.isReceivingCall && !callAccepted && 
      
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          position:'absolute',
          top: '40px',
          zIndex:'2',
          right:'20px',
          borderRadius:'10px',
          border:"1px solid black",
          padding:"10px 15px",
          background:"white",
          boxShadow: "10px 10px 15px rgba(0, 0, 0, 0.5)"
          // borderWidth:"1px solid"
          }}>
            <div style={{
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              gap:"8px"
            }}>

          <h2 style={{
            fontSize:"20px",
            fontWeight:"400",
            textAlign:"center"
          }}>{call.name || "Pratham"}</h2>
         {videoCall=="" && <CallIcon  sx={{ color: green[500] }}/>}
          </div>

           {videoCall!=""  && <div style={{
              display: 'flex', 
              // flexDirection: 'column',
              justifyContent:"center",
              alignItems:"center"
            }}>
            {/* accept button  */}
            <IconButton aria-label="CallIcon" onClick={accept} style={{
            fontSize:"15px",
            borderRadius:"10px"
          }}> 
            <div style={{
              display: 'flex', 
              flexDirection: 'column',
              justifyContent:"center",
              alignItems:"center"
            }}>
            
            <CallIcon  sx={{ color: green[500] }}/>
            <div style={{
              fontSize:"10px"
            }}>Answer</div>
            </div>
          </IconButton>
            {/* reject button */}
            <IconButton aria-label="CallIcon" onClick={reject} style={{
            fontSize:"15px",
            borderRadius:"10px"
          }}> 
             <div style={{
              display: 'flex', 
              flexDirection: 'column',
              justifyContent:"center",
              alignItems:"center"
            }}>
            
            <CallEndIcon sx={{ color: red[500] }}/>
            <div style={{
              fontSize:"10px"
            }}>Reject</div>
            </div>
          </IconButton>
          </div>}
          {videoCall=="" && <h2 style={{
            fontSize:"15px",
            fontWeight:"400",
            textAlign:"center"
          }}>click on video tab to join</h2>}

        </div>
      
       } 
    </>  
  );
};

export default Notifications;