import React,{useContext,useEffect,useState} from 'react'
import { Box,styled } from '@mui/material'
import AccountContext from '../../../context/accountContext'
import { setConversation,getConversation } from '../../../allApis/forAdding'
import {Animated} from "react-animated-css";
import ImageIcon from '@mui/icons-material/Image';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import new2 from '../../../images/new4.png';
const Box2= styled(Box)`
padding : 0 15px 0 13px;
display : flex;
align-items:center;
height: 72px;
`
const Box1= styled(Box)`
display : flex;
cursor: pointer;
`
const Box3= styled(Box)`
padding-right:15px;
display: flex;
flex-basis: auto;
flex-direction: column;
flex-grow: 1;
justify-content: center;
min-width: 0;
`

const Box4=styled(Box)`
display:flex;
justify-content: space-between;
`
const Box5=styled(Box)`
font-family:Segoe UI,Helvetica Neue;
color:#667781;
font-size:12px;
`
const Box7=styled(Box)`
font-family:Segoe UI,Helvetica Neue;
color:#667781;
font-size:14px;
display: flex;
align-items: center;
margin-top: 2px;

`
const ChatListItem = (props) => {
  const {darkMode,msgflag,setchatOfPersonOnWhichUHaveClicked,Details} = useContext(AccountContext)
  const Box6=styled(Box)`
color:${darkMode?"#8696a0":"#667781"} ;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
`
  const [message, setMessage] = useState({});
  const showChat= async ()=>{
    // here email will be my id
    await setConversation({senderId:Details.email,receiverId:props.user.email})
    setchatOfPersonOnWhichUHaveClicked(props.user);
  }

  useEffect(() => {
    const getConversationDetails=async()=>{
      const data=  await getConversation({senderId:Details.email,receiverId:props.user.email})
      setMessage({text: data.message,timestamp:data.updatedAt});
    }
    getConversationDetails();
  }, [msgflag]) 
  const formatDate = (date) => {
    const hours = new Date(date).getHours();
    const mins = new Date(date).getMinutes();
    return `${hours < 10 ? '0' + hours : hours}:${mins < 10 ? '0' + mins : mins}`;
  }
  let isImg = /\.png|\.jpg|\.webp|\.jpeg/.test(message.text);

  return (
    <Animated
                animationIn='slideInDown'
                animationInDuration={200}
                // animationOut='slideInUp'
                isVisible={true}>

    <Box1 onClick={showChat}>
      <Box2 >
        <img style={{
          "height":"49px",
          "width":"49px",
          "borderRadius":"50%",
        }} src={props.user.picture || new2} alt="" />
      </Box2>
      <Box3>
        
      <Box4>
        <div style={{color:`${darkMode?"white":"black"}`}}> {props.user.name}</div>
      
        <Box5>{message.text && formatDate(message.timestamp)}</Box5>
      </Box4> 
        {/* checking if msg exist then displaying date */}
        {/* /checking if if is a text or document */}
       <Box6>
         {message?.text?.includes('localhost')?isImg?<Box7><ImageIcon fontSize='small'/> Image</Box7>:<Box7><InsertDriveFileIcon/> Document</Box7>:message.text}
         
         </Box6>
      </Box3>
    </Box1>
          </Animated>
  )
}

export default ChatListItem