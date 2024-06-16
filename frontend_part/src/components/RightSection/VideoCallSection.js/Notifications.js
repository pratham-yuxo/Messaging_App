import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import AccountContext from '../../../context/accountContext';
import { SocketContext } from '../../../context/contextForVc/VcContext';
import IconButton from '@mui/material/IconButton';
import CallIcon from '@mui/icons-material/Call';
import CallEndIcon from '@mui/icons-material/CallEnd';
import { green,red } from '@mui/material/colors';

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);
  const {setVideoCall}=useContext(AccountContext);
const accept=()=>{
  setVideoCall(true);
  setTimeout(() => {
    answerCall();
  
  }, 100);
}
const reject=()=>{

}
  return (
    <>
    {console.log(call,"call")}
      {call.isReceivingCall && !callAccepted && 
      
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          position:'absolute',
          top: '20px',
          zIndex:'2',
          right:'20px',
          borderRadius:'10px',
          border:"1px solid black",
          padding:"10px 15px",
          background:"white"
          // borderWidth:"1px solid"
          }}>
          <h2 style={{
            fontSize:"20px",
            fontWeight:"400",
            textAlign:"center"
          }}>{call.name || "pratham"}</h2>


            <div style={{
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
          </div>

        </div>
      
       } 
    </>  
  );
};

export default Notifications;