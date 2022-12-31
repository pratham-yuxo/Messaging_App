import React,{useEffect,useState,useRef} from 'react'
import { Box, styled } from '@mui/material'
import image from './logoo.jpg'
import { getMessages } from '../../allApis/forAdding'
import Message from './message'
const Box1=styled(Box)`
background-image: url(${image});
// background-color:red;
`
const Component=styled(Box)`
// height:81.2vh;
height: calc(100vh - 121.13px);
overflow-y:scroll;
// to make it scroll in y direction
`


const MessageSection = (props) => {

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

  }, [props.messageToDisplay])
  return (
<Box1>
  {/* <img src={image} alt="" /> */}
<Component >
{
  props.messageToDisplay&& props.messageToDisplay.map(message=>
    <Box ref={scrollRef}>

   <Message key={message._id} message={message}></Message>
   </Box>)
  
}
</Component>
</Box1>
  )
}

export default MessageSection