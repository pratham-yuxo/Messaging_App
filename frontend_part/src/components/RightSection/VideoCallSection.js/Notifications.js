import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import AccountContext from '../../../context/accountContext';
import { SocketContext } from '../../../context/contextForVc/VcContext';

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);
  const {setVideoCall}=useContext(AccountContext);
const onclick=()=>{
  setVideoCall(true);
  setTimeout(() => {
    answerCall();
  
  }, 100);
}
  return (
    <>
    {console.log(call)}
      {call.isReceivingCall && !callAccepted && (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <h1>{call.name} is calling:</h1>
          <Button variant="contained" color="primary" onClick={onclick}>
            Answer
          </Button>
        </div>
      )}
    </>
  );
};

export default Notifications;