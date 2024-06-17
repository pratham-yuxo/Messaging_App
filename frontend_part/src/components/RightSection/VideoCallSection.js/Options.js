import React,{useContext,useState} from 'react'
import { SocketContext } from '../../../context/contextForVc/VcContext';
// import { Assignment, Phone, PhoneDisabled } from '@mui/icons-material';
import Notifications from './Notifications'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CallIcon from '@mui/icons-material/Call';
import CallEndIcon from '@mui/icons-material/CallEnd';
import { green,red } from '@mui/material/colors';

const Options = () => {
    const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState('')
  return (
    <div>
        {console.log(me)}
        <div class="contarols">
                            {/* <img src="https://i.postimg.cc/3NVtVtgf/chat.png"/>
                            <img src="https://i.postimg.cc/BQPYHG0r/disconnect.png"/> */}
    {  !callAccepted? <CallIcon  sx={{ color: green[500] }}  onClick={()=> callUser()}/>:
                            <CallEndIcon sx={{ color: red[500] }} onClick={()=> leaveCall()}/>

  }
                            {/* <img src="https://i.postimg.cc/bJFgSmFY/mic.png"/>
                            <img src="https://i.postimg.cc/Y2sDvCJN/cast.png"/> */}
                        </div>
<Notifications/>
    </div>
  )
}

export default Options  