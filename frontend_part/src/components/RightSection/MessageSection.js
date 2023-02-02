import React,{useEffect,useState,useRef,useContext} from 'react'
import { Box, styled } from '@mui/material'
import image from './logoo.jpg'
import { getMessages } from '../../allApis/forAdding'
import Message from './message'
import AccountContext from '../../context/accountContext'



const MessageSection = (props) => {
const {Details,darkMode} = useContext(AccountContext);
  const Box1=styled(Box)`
background-image: url(${image});
filter:${darkMode?"invert(1)":" "}
// background-color:red;
`
const Component=styled(Box)`
// height:81.2vh;
height: calc(100vh - 121.13px);
overflow-y:scroll;
// to make it scroll in y direction
filter:${darkMode?"invert(1)":" "}
`


  // whenever this component is loaded use effect will fetch all the messages corresponding to the person selected
  useEffect(() => {
    const fetchMessage=async()=>{
      const messages=await getMessages(props.conversation._id);
          props.setmessageToDisplay(messages);
    }
   props.conversation._id &&fetchMessage();
  }, [props.conversation._id,props.msgflag])
  const scrollRef = useRef()
  useEffect(() => {
    scrollRef.current?.scrollIntoView({transition:"smooth"})

  }, [props.messageToDisplay,props.value])
  return (
<Box1>
<Component >
{
  props.messageToDisplay&& props.messageToDisplay.map(message=>
  //  ensuring that deleted msg by user should not be displayed
 {
  return !(  ( message.senderDeleted && (Details.email === message.senderId)) ||  
    (message.receiverDeleted && (Details.email != message.senderId))) &&
 
 <Box key={message._id}  ref={scrollRef}>
      
   <Message  message={message}></Message>
   </Box>
   }
   
   )
  
}
</Component>
</Box1>
  )
}

export default MessageSection