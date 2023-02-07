import React,{useContext,useState} from 'react'
import { SocketContext } from '../../../context/contextForVc/VcContext';
// import { Assignment, Phone, PhoneDisabled } from '@mui/icons-material';
import Notifications from './Notifications'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const Options = () => {
    const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState('')
  return (
    <div>
        {console.log(me)}
        <div class="contarols">
                            <img src="https://i.postimg.cc/3NVtVtgf/chat.png"/>
                            <img src="https://i.postimg.cc/BQPYHG0r/disconnect.png"/>
    {  !callAccepted? <LocalPhoneIcon  onClick={()=> callUser()}/>:
                            <img src="https://i.postimg.cc/fyJH8G00/call.png" class="call-icon"/>

  }
                            <img src="https://i.postimg.cc/bJFgSmFY/mic.png"/>
                            <img src="https://i.postimg.cc/Y2sDvCJN/cast.png"/>
                        </div>
<Notifications/>
    </div>
  )
}

export default Options  